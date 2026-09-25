"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";

/**
 * Símbolo do SD extrudado em 3D.
 *
 * O modelo gerado pelo serviço de IA tinha 159.748 faces. Não usamos: o símbolo é
 * um único <path> com fill-rule="evenodd", então extrudar o vetor em runtime dá
 * geometria limpa de ~3k triângulos a partir de alguns KB — e, de brinde, as duas
 * metades ficam em meshes separados, que é o que torna possível a interação
 * assinatura. Ver docs/DIRECAO-V2.md §5.
 */

// Igual a public/brand/sd-simbolo-branco.svg. Inline para evitar um fetch no caminho
// crítico do Hero — se o SVG mudar, este `d` precisa acompanhar.
const MARK_SVG = `<svg viewBox="0 0 122 145" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M24.5508 16.9459C26.7469 14.8113 30.0247 14.1829 32.9092 15.3444C35.7937 16.4745 37.6621 19.1432 37.6621 22.1569V72.2584L65.8838 92.1295C67.8505 93.5108 69.0303 95.7401 69.0303 98.0631V137.617C69.0303 140.411 67.4249 142.923 64.8027 144.178C63.7212 144.712 62.508 144.994 61.3281 144.994C59.722 144.994 58.1481 144.492 56.7715 143.55L4.58887 106.884C2.78616 105.597 1.63859 103.651 1.47461 101.485C1.31072 99.3503 2.09798 97.2467 3.7041 95.7399L18.2578 81.8014L26.2549 87.4528L12.4229 100.7L59.1973 133.567V99.0993L33.2041 80.7975L25.2061 75.1471L3.21191 59.6705C1.27824 58.2894 0.0987975 56.0919 0.0986328 53.7692L0 43.566C5.80706e-05 41.6199 0.78653 39.7052 2.22852 38.2926L24.5508 16.9459ZM57.165 0.810185C59.7544 -0.445432 62.8353 -0.225552 65.1953 1.43812L117.378 38.1041C119.181 39.3912 120.328 41.3375 120.492 43.5035C120.689 45.6382 119.87 47.7417 118.264 49.2799L96.7939 69.8414L118.755 85.318C120.689 86.6992 121.869 88.8964 121.901 91.2194L122 101.422C122 103.399 121.181 105.315 119.738 106.696L97.4492 128.043C95.9742 129.455 94.0072 130.209 92.0078 130.209C91.0245 130.209 90.0081 130.02 89.0576 129.643C86.1735 128.513 84.3058 125.845 84.3057 122.832V84.5953L94.1387 91.5651V117.903L112.134 100.637L112.068 92.318L94.1387 79.6666L84.3057 72.7291L56.083 52.858C54.1166 51.4768 52.9366 49.2482 52.9365 46.9254V7.37073C52.9367 4.60839 54.5429 2.0658 57.165 0.810185ZM9.83301 44.3512L9.89941 52.6696L27.8281 65.3209V27.0856L9.83301 44.3512ZM62.7695 45.8893L88.7627 64.191L109.544 44.2887L62.7695 11.4205V45.8893Z"/></svg>`;

const EXTRUDE = {
  depth: 18,
  bevelEnabled: true,
  bevelThickness: 1.2,
  bevelSize: 0.8,
  bevelSegments: 2,
} satisfies THREE.ExtrudeGeometryOptions;

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
      <meshStandardMaterial color="#a8a4a3" metalness={.22} roughness={.3} />
    </mesh>)}
  </group>;
}

export default function LogoMark3DScene({ onReady, intro }: { onReady: () => void; intro: boolean }) {
  return <Canvas resize={{ offsetSize: true }} camera={{ position: [0, 0, 4.2], fov: 45 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }} aria-hidden="true" style={{ touchAction: "pan-y" }}>
    <ambientLight intensity={.45} />
    <directionalLight position={[4, 5, 6]} intensity={1.9} color="#ffffff" />
    <directionalLight position={[-3, -2, 4]} intensity={.8} color="#ffffff" />
    <pointLight position={[0, -3, 1]} intensity={50} color="#ff681c" />
    <directionalLight position={[0, -5, 1]} intensity={1.1} color="#ff8b46" />
    <pointLight position={[-5, 3, 2]} intensity={25} color="#e84910" />
    <Mark onReady={onReady} intro={intro} />
  </Canvas>;
}
