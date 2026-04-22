"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Float, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

function RoadLines() {
  const groupRef = useRef<THREE.Group>(null);
  const markers = useMemo(
    () =>
      Array.from({ length: 12 }, (_, index) => ({
        x: index % 2 === 0 ? -0.38 : 0.38,
        z: -index * 2.8
      })),
    []
  );

  useFrame((_, delta) => {
    if (!groupRef.current) {
      return;
    }

    groupRef.current.children.forEach((child) => {
      child.position.z += delta * 8.4;
      if (child.position.z > 5.5) {
        child.position.z = -28;
      }
    });
  });

  return (
    <group ref={groupRef} position={[0, -1.18, 0]}>
      {markers.map((item, index) => (
        <mesh key={`${item.x}-${item.z}-${index}`} position={[item.x, 0.02, item.z]} castShadow>
          <boxGeometry args={[0.18, 0.012, 1.55]} />
          <meshStandardMaterial color="#61f0ff" emissive="#61f0ff" emissiveIntensity={1.2} />
        </mesh>
      ))}
    </group>
  );
}

function SignalBeacons() {
  const leftRef = useRef<THREE.Mesh>(null);
  const rightRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const leftPulse = 0.5 + Math.sin(t * 1.4) * 0.18;
    const rightPulse = 0.55 + Math.cos(t * 1.2) * 0.16;

    if (leftRef.current) {
      leftRef.current.scale.setScalar(1 + Math.sin(t * 1.8) * 0.06);
      ((leftRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = leftPulse);
    }

    if (rightRef.current) {
      rightRef.current.scale.setScalar(1 + Math.cos(t * 1.6) * 0.08);
      ((rightRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = rightPulse);
    }
  });

  return (
    <group position={[0, 1.9, -2.8]}>
      <mesh ref={leftRef} position={[-3.9, 0.6, -1.4]}>
        <sphereGeometry args={[0.18, 18, 18]} />
        <meshStandardMaterial color="#ff6a1a" emissive="#ff6a1a" emissiveIntensity={0.55} />
      </mesh>
      <mesh ref={rightRef} position={[3.7, 0.2, -1.2]}>
        <sphereGeometry args={[0.16, 18, 18]} />
        <meshStandardMaterial color="#b8ff5a" emissive="#b8ff5a" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

function TowRig() {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const compact = viewport.width < 8;
  const baseX = compact ? 1.15 : 1.95;
  const baseZ = compact ? -0.4 : 0.35;
  const rigScale = compact ? 1.08 : 1.34;

  useFrame(({ clock }) => {
    if (!groupRef.current) {
      return;
    }

    const t = clock.getElapsedTime();
    groupRef.current.position.x = baseX + Math.sin(t * 0.28) * 0.14;
    groupRef.current.position.y = 0.12 + Math.sin(t * 1.25) * 0.08;
    groupRef.current.position.z = baseZ + Math.cos(t * 0.4) * 0.08;
    groupRef.current.rotation.y = -0.46 + Math.sin(t * 0.42) * 0.05;
    groupRef.current.rotation.z = Math.sin(t * 0.8) * 0.012;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.06} floatIntensity={0.08}>
      <group ref={groupRef} scale={rigScale}>
        <mesh position={[0.2, -0.64, -0.2]} receiveShadow rotation-x={-Math.PI / 2}>
          <planeGeometry args={[9.8, 28]} />
          <meshStandardMaterial color="#101113" metalness={0.2} roughness={0.88} />
        </mesh>

        <mesh position={[0.3, -0.08, 0.35]} castShadow receiveShadow>
          <boxGeometry args={[4.8, 0.28, 1.55]} />
          <meshStandardMaterial color="#1d2127" emissive="#61f0ff" emissiveIntensity={0.08} metalness={0.78} roughness={0.28} />
        </mesh>

        <mesh position={[-1.6, 0.24, 0.5]} castShadow receiveShadow>
          <boxGeometry args={[1.55, 0.86, 1.38]} />
          <meshStandardMaterial color="#ff6a1a" emissive="#ff6a1a" emissiveIntensity={0.32} metalness={0.55} roughness={0.28} />
        </mesh>

        <mesh position={[-1.2, 0.49, 0.5]} castShadow>
          <boxGeometry args={[0.88, 0.44, 1.14]} />
          <meshPhysicalMaterial color="#bcd7ee" transmission={0.45} roughness={0.08} metalness={0.12} transparent opacity={0.9} />
        </mesh>

        <mesh position={[0.78, 0.3, 0.48]} castShadow receiveShadow rotation-z={-0.04}>
          <boxGeometry args={[2.45, 0.64, 1.16]} />
          <meshStandardMaterial color="#2c3138" emissive="#ff6a1a" emissiveIntensity={0.1} metalness={0.72} roughness={0.28} />
        </mesh>

        <mesh position={[0.82, 0.63, 0.48]} castShadow rotation-z={-0.04}>
          <boxGeometry args={[1.65, 0.22, 0.96]} />
          <meshStandardMaterial color="#61f0ff" emissive="#61f0ff" emissiveIntensity={0.55} metalness={0.4} roughness={0.18} />
        </mesh>

        <mesh position={[2.65, 0.08, 0.1]} castShadow receiveShadow rotation-z={-0.22}>
          <boxGeometry args={[1.15, 0.14, 1.38]} />
          <meshStandardMaterial color="#2d3137" emissive="#b8ff5a" emissiveIntensity={0.12} metalness={0.7} roughness={0.22} />
        </mesh>

        <mesh position={[-1.78, 0.15, -0.25]} castShadow>
          <boxGeometry args={[0.36, 0.22, 0.18]} />
          <meshStandardMaterial color="#b8ff5a" emissive="#b8ff5a" emissiveIntensity={0.9} />
        </mesh>

        <mesh position={[-1.78, 0.15, 1.18]} castShadow>
          <boxGeometry args={[0.36, 0.22, 0.18]} />
          <meshStandardMaterial color="#61f0ff" emissive="#61f0ff" emissiveIntensity={0.9} />
        </mesh>

        <mesh position={[1.58, 0.16, -0.18]} castShadow>
          <boxGeometry args={[0.22, 0.12, 0.12]} />
          <meshStandardMaterial color="#ff6a1a" emissive="#ff6a1a" emissiveIntensity={0.85} />
        </mesh>

        <mesh position={[1.58, 0.16, 1.1]} castShadow>
          <boxGeometry args={[0.22, 0.12, 0.12]} />
          <meshStandardMaterial color="#ff6a1a" emissive="#ff6a1a" emissiveIntensity={0.85} />
        </mesh>

        {[
          [-1.55, -0.38, -0.52],
          [-1.55, -0.38, 1.12],
          [0.55, -0.38, -0.52],
          [0.55, -0.38, 1.12],
          [1.92, -0.38, -0.52],
          [1.92, -0.38, 1.12]
        ].map((position, index) => (
          <group key={`${position.join("-")}-${index}`} position={new THREE.Vector3(...position)}>
            <mesh castShadow rotation-z={Math.PI / 2}>
              <cylinderGeometry args={[0.34, 0.34, 0.28, 20]} />
              <meshStandardMaterial color="#050607" roughness={0.86} metalness={0.2} />
            </mesh>
            <mesh castShadow rotation-z={Math.PI / 2}>
              <cylinderGeometry args={[0.11, 0.11, 0.3, 18]} />
              <meshStandardMaterial color="#b8ff5a" emissive="#b8ff5a" emissiveIntensity={0.24} />
            </mesh>
          </group>
        ))}
      </group>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <Canvas
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance", preserveDrawingBuffer: true }}
        shadows
      >
        <PerspectiveCamera makeDefault position={[0.55, 1.52, 7.25]} fov={34} />
        <color attach="background" args={["#090909"]} />
        <fog attach="fog" args={["#090909", 9, 23]} />

        <ambientLight intensity={0.95} />
        <hemisphereLight intensity={0.6} groundColor="#090909" color="#d4f8ff" />
        <spotLight
          position={[5, 7, 4]}
          intensity={3.2}
          angle={0.42}
          penumbra={0.5}
          color="#ff6a1a"
          castShadow
        />
        <pointLight position={[-4.2, 2.4, 5]} intensity={18} distance={15} color="#61f0ff" />
        <pointLight position={[4.6, 1.8, -1]} intensity={14} distance={15} color="#b8ff5a" />
        <pointLight position={[1.8, 1.2, 3.4]} intensity={10} distance={10} color="#ff6a1a" />

        <mesh position={[0, 3.8, -8]}>
          <planeGeometry args={[24, 14]} />
          <meshBasicMaterial color="#0c0f12" />
        </mesh>

        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.52, -4]} receiveShadow>
          <planeGeometry args={[20, 34]} />
          <meshStandardMaterial color="#0d0f12" metalness={0.25} roughness={0.92} />
        </mesh>

        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-3.8, -1.48, -4]}>
          <planeGeometry args={[3.4, 34]} />
          <meshStandardMaterial color="#0a0d10" emissive="#ff6a1a" emissiveIntensity={0.06} />
        </mesh>

        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[3.8, -1.48, -4]}>
          <planeGeometry args={[3.4, 34]} />
          <meshStandardMaterial color="#0a0d10" emissive="#61f0ff" emissiveIntensity={0.06} />
        </mesh>

        <RoadLines />
        <SignalBeacons />
        <TowRig />
        <ContactShadows position={[0, -1.34, 0]} opacity={0.55} scale={20} blur={1.65} />
      </Canvas>
    </div>
  );
}
