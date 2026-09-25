"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, type RefObject } from "react";
import * as THREE from "three";

/**
 * Globo de arame em 3D — a versão real de `public/home/globo.svg`.
 *
 * O SVG é a projeção de uma esfera transparente com meridianos e paralelos em
 * volta de um eixo inclinado: o polo da frente aparece em cima à esquerda e o
 * de trás, visto através da esfera, embaixo à direita. Aqui a esfera é montada
 * com as mesmas linhas (36 meridianos, 17 paralelos) e o eixo na mesma
 * inclinação, então o poster SVG e o 3D batem quando a cena termina de carregar.
 *
 * As linhas somam luz (blending aditivo): onde elas se juntam, nos polos, o
 * globo brilha sozinho, sem sprite nem glow.
 */

const MERIDIANS = 36;
const PARALLELS = 17;
const SEGMENTS = 128;

/** Polo da frente no SVG, em coordenadas do three.js (y para cima, z para a câmera). */
const AXIS = new THREE.Vector3(-0.33, 0.68, 0.65).normalize();

/** Campo de visão vertical; a câmera fica à distância em que a esfera enche o quadro. */
const FOV = 20;
const DISTANCE = 1.01 / Math.sin(THREE.MathUtils.degToRad(FOV / 2));

function useGlobeGeometry() {
  return useMemo(() => {
    const pts: number[] = [];
    const push = (a: THREE.Vector3, b: THREE.Vector3) => pts.push(a.x, a.y, a.z, b.x, b.y, b.z);
    const onSphere = (theta: number, phi: number) =>
      new THREE.Vector3(Math.sin(theta) * Math.cos(phi), Math.cos(theta), Math.sin(theta) * Math.sin(phi));

    // Meridianos: de polo a polo.
    for (let m = 0; m < MERIDIANS; m++) {
      const phi = (m / MERIDIANS) * Math.PI * 2;
      for (let s = 0; s < SEGMENTS / 2; s++) {
        push(onSphere((s / (SEGMENTS / 2)) * Math.PI, phi), onSphere(((s + 1) / (SEGMENTS / 2)) * Math.PI, phi));
      }
    }
    // Paralelos: círculos completos, sem os polos.
    for (let p = 1; p <= PARALLELS; p++) {
      const theta = (p / (PARALLELS + 1)) * Math.PI;
      for (let s = 0; s < SEGMENTS; s++) {
        push(onSphere(theta, (s / SEGMENTS) * Math.PI * 2), onSphere(theta, ((s + 1) / SEGMENTS) * Math.PI * 2));
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
    return geo;
  }, []);
}

function Globe({ spin }: { spin: RefObject<number> }) {
  const inner = useRef<THREE.LineSegments>(null);
  const current = useRef<number | null>(null);
  const geometry = useGlobeGeometry();
  const tilt = useMemo(
    () => new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), AXIS),
    [],
  );

  useFrame((state, delta) => {
    if (!inner.current) return;
    // Giro lento contínuo + o giro que o scroll pede, amortecido.
    const target = (spin.current ?? 0) + state.clock.elapsedTime * 0.06;
    if (current.current === null) current.current = target;
    current.current += (target - current.current) * (1 - Math.exp(-delta * 6));
    inner.current.rotation.y = current.current;
  });

  return (
    <group quaternion={tilt}>
      <lineSegments ref={inner} geometry={geometry}>
        <lineBasicMaterial
          color="#b3b3b3"
          transparent
          opacity={0.55}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

export default function GlobeScene({ spin, active }: { spin: RefObject<number>; active: boolean }) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      // Mede sem a escala da camada (GlobeTrack): o canvas não é redimensionado
      // enquanto o globo cresce ou encolhe.
      resize={{ offsetSize: true }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      camera={{ fov: FOV, position: [0, 0, DISTANCE], near: 0.1, far: 20 }}
      style={{ position: "absolute", inset: 0 }}
      aria-hidden="true"
    >
      <Globe spin={spin} />
    </Canvas>
  );
}
