"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";

/**
 * Símbolo do SD extrudado em 3D.
 *
 * O modelo gerado pelo serviço de IA tinha 159.748 faces. Não usamos: o símbolo é
 * um único <path> com fill-rule="evenodd", então extrudar o vetor em runtime dá
 * geometria limpa de ~3k triângulos a partir de alguns KB — e, de brinde, as duas
 * metades ficam em meshes separados, que é o que torna possível a interação
 * assinatura. Ver docs/DIRECAO-V2.md §5.
 *
 * Acabamento (25/09, referência: studiors.be): preto brilhante, como laca ou
 * obsidiana, em vez do metal rosado com luzes laranja. O que dá o ar "premium" é
 * o reflexo: um ambiente de estúdio (RoomEnvironment, gerado em runtime — sem
 * baixar HDR) reflete painéis claros no verniz, e o chanfro arredondado pega luz
 * nas arestas, desenhando o contorno sobre o fundo preto. Uma luz de recorte por
 * trás separa a peça do fundo. Um granulado fino (textura gerada em canvas) quebra
 * a rugosidade para o reflexo não ficar de plástico. Por baixo, luz laranja
 * SENAI: o chão do estúdio refletido é uma placa laranja acesa, e duas luzes
 * vindas de baixo reforçam — as faces e arestas de baixo ficam quentes, como se
 * a peça estivesse sobre uma fonte de luz; o resto continua preto. Como
 * complemento frio, um pouco de Azul Solução pela esquerda-alto (um painel no
 * ambiente e uma luz de recorte), bem mais fraco que o laranja.
 */

// Igual a public/brand/sd-simbolo-branco.svg. Inline para evitar um fetch no caminho
// crítico do Hero — se o SVG mudar, este `d` precisa acompanhar.
const MARK_SVG = `<svg viewBox="0 0 122 145" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M24.5508 16.9459C26.7469 14.8113 30.0247 14.1829 32.9092 15.3444C35.7937 16.4745 37.6621 19.1432 37.6621 22.1569V72.2584L65.8838 92.1295C67.8505 93.5108 69.0303 95.7401 69.0303 98.0631V137.617C69.0303 140.411 67.4249 142.923 64.8027 144.178C63.7212 144.712 62.508 144.994 61.3281 144.994C59.722 144.994 58.1481 144.492 56.7715 143.55L4.58887 106.884C2.78616 105.597 1.63859 103.651 1.47461 101.485C1.31072 99.3503 2.09798 97.2467 3.7041 95.7399L18.2578 81.8014L26.2549 87.4528L12.4229 100.7L59.1973 133.567V99.0993L33.2041 80.7975L25.2061 75.1471L3.21191 59.6705C1.27824 58.2894 0.0987975 56.0919 0.0986328 53.7692L0 43.566C5.80706e-05 41.6199 0.78653 39.7052 2.22852 38.2926L24.5508 16.9459ZM57.165 0.810185C59.7544 -0.445432 62.8353 -0.225552 65.1953 1.43812L117.378 38.1041C119.181 39.3912 120.328 41.3375 120.492 43.5035C120.689 45.6382 119.87 47.7417 118.264 49.2799L96.7939 69.8414L118.755 85.318C120.689 86.6992 121.869 88.8964 121.901 91.2194L122 101.422C122 103.399 121.181 105.315 119.738 106.696L97.4492 128.043C95.9742 129.455 94.0072 130.209 92.0078 130.209C91.0245 130.209 90.0081 130.02 89.0576 129.643C86.1735 128.513 84.3058 125.845 84.3057 122.832V84.5953L94.1387 91.5651V117.903L112.134 100.637L112.068 92.318L94.1387 79.6666L84.3057 72.7291L56.083 52.858C54.1166 51.4768 52.9366 49.2482 52.9365 46.9254V7.37073C52.9367 4.60839 54.5429 2.0658 57.165 0.810185ZM9.83301 44.3512L9.89941 52.6696L27.8281 65.3209V27.0856L9.83301 44.3512ZM62.7695 45.8893L88.7627 64.191L109.544 44.2887L62.7695 11.4205V45.8893Z"/></svg>`;

const EXTRUDE = {
  depth: 18,
  bevelEnabled: true,
  bevelThickness: 2,
  bevelSize: 1.3,
  // Chanfro redondo: é nele que o reflexo vira um fio de luz nas arestas.
  bevelSegments: 8,
  curveSegments: 24,
} satisfies THREE.ExtrudeGeometryOptions;

/**
 * Granulado fino, repetido: modula a rugosidade e dá um relevo mínimo à laca.
 * Gerado uma vez por módulo, com semente fixa — igual em todo carregamento.
 */
let grainTexture: THREE.CanvasTexture | null = null;
function getGrain() {
  if (grainTexture) return grainTexture;
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const img = ctx.createImageData(size, size);
  let seed = 0x5d1e;
  const rand = () => {
    // mulberry32
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  for (let i = 0; i < img.data.length; i += 4) {
    const v = 118 + rand() * 40;
    img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
    img.data[i + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
  grainTexture = new THREE.CanvasTexture(canvas);
  grainTexture.wrapS = grainTexture.wrapT = THREE.RepeatWrapping;
  // As UVs da extrusão estão nas unidades do SVG (0–145): um ladrilho a cada 24.
  grainTexture.repeat.set(1 / 24, 1 / 24);
  return grainTexture;
}

/**
 * Ambiente de estúdio para os reflexos, gerado uma vez e preso à cena. O chão do
 * estúdio ganha uma placa laranja SENAI acesa: é ela que o verniz reflete nas
 * faces e chanfros virados para baixo — a luz quente "de baixo".
 */
function StudioEnvironment() {
  const gl = useThree((s) => s.gl);
  const env = useMemo(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const room = new RoomEnvironment();
    const warm = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide });
    warm.color.setRGB(2, 0.55, 0.13); // #e84910 um pouco acima de 1 — só um toque quente
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(14, 14), warm);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.6;
    room.add(floor);
    // Contraponto frio: um painel Azul Solução alto, à esquerda e um pouco atrás.
    const cool = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide });
    cool.color.setRGB(0.025, 0.29, 1.1); // #0574d9 — mais fraco que o laranja
    const panel = new THREE.Mesh(new THREE.PlaneGeometry(3, 7), cool);
    panel.position.set(-6, 2.5, -2);
    panel.rotation.y = Math.PI / 2.6;
    room.add(panel);
    const texture = pmrem.fromScene(room, 0.04).texture;
    floor.geometry.dispose();
    warm.dispose();
    panel.geometry.dispose();
    cool.dispose();
    pmrem.dispose();
    return texture;
  }, [gl]);
  useEffect(() => () => env.dispose(), [env]);
  return <primitive object={env} attach="environment" />;
}

function useMarkGeometries() {
  return useMemo(() => {
    const parsed = new SVGLoader().parse(MARK_SVG);
    const shapes = parsed.paths.flatMap((p) => p.toShapes());

    const geometries = shapes.map((shape) => {
      const geo = new THREE.ExtrudeGeometry(shape, EXTRUDE);
      // O eixo Y do SVG aponta para baixo; o do three.js, para cima.
      // Flip Y on the group so Three also corrects the face winding.
      geo.computeVertexNormals();
      return geo;
    });

    // Centraliza o conjunto, não cada peça — senão as metades se sobrepõem.
    const union = new THREE.Box3();
    for (const g of geometries) {
      g.computeBoundingBox();
      union.union(g.boundingBox!);
    }
    const center = union.getCenter(new THREE.Vector3());
    for (const g of geometries) g.translate(-center.x, -center.y, -center.z);

    return geometries;
  }, []);
}

function Mark({ onReady, intro }: { onReady: () => void; intro: boolean }) {
  const group = useRef<THREE.Group>(null);
  const geometries = useMarkGeometries();
  const grain = useMemo(() => getGrain(), []);
  const ready = useRef(false);
  const rotation = useRef(0);
  const speed = useRef(.55);
  const lastPointer = useRef({ x: 0, y: 0, movedAt: 0 });
  useFrame((state, delta) => {
    if (!ready.current) { ready.current = true; onReady(); }
    const g = group.current;
    if (!g) return;
    const p = lastPointer.current;
    const now = state.clock.elapsedTime;
    const dx = state.pointer.x - p.x;
    const dy = state.pointer.y - p.y;
    if (!intro && Math.abs(dx) + Math.abs(dy) > .001) {
      rotation.current += dx * .7;
      p.movedAt = now;
    }
    speed.current = THREE.MathUtils.damp(speed.current, intro ? .55 : .12, 3, delta);
    if (intro || now - p.movedAt > .25) rotation.current += Math.min(delta, .05) * speed.current;
    p.x = state.pointer.x;
    p.y = state.pointer.y;
    const targetY = rotation.current;
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, targetY, 2.5, delta);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, intro ? Math.sin(now * .3) * .04 : -state.pointer.y * .12, 2.5, delta);
    g.position.y = THREE.MathUtils.damp(g.position.y, Math.sin(now * (intro ? 1.8 : 1.2)) * (intro ? .24 : .1), 2.5, delta);
  });
  return <group ref={group} scale={[.0175, -.0175, .0175]}>
    {geometries.map((geo, i) => <mesh key={i} geometry={geo}>
      <meshPhysicalMaterial
        color="#101012"
        metalness={.55}
        roughness={.32}
        roughnessMap={grain}
        bumpMap={grain}
        bumpScale={.35}
        clearcoat={1}
        clearcoatRoughness={.07}
        envMapIntensity={1.15}
      />
    </mesh>)}
  </group>;
}

export default function LogoMark3DScene({ onReady, intro }: { onReady: () => void; intro: boolean }) {
  return <Canvas resize={{ offsetSize: true }} camera={{ position: [0, 0, 4.2], fov: 45 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }} aria-hidden="true" style={{ touchAction: "pan-y" }}>
    <StudioEnvironment />
    <ambientLight intensity={.08} />
    {/* Chave suave pela frente-alto e recorte forte por trás, dos dois lados. */}
    <directionalLight position={[3, 4, 5]} intensity={.9} color="#ffffff" />
    <directionalLight position={[-5, 3, -4]} intensity={2.4} color="#ffffff" />
    {/* Recorte Azul Solução pela esquerda-alto: o complemento frio do laranja. */}
    <directionalLight position={[-6, 4, -1]} intensity={0.9} color="#0574d9" />
    <directionalLight position={[5, -2, -3]} intensity={1.4} color="#dfe6ff" />
    {/* Laranja por baixo: um ponto quente logo abaixo da peça e um preenchimento
        largo vindo de baixo-frente, que pinta os chanfros de baixo. */}
    <pointLight position={[0, -2.4, 1.4]} intensity={40} distance={9} decay={2} color="#e84910" />
    <directionalLight position={[-1, -5, 2]} intensity={2} color="#ff6a1f" />
    <Mark onReady={onReady} intro={intro} />
  </Canvas>;
}
