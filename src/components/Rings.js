import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Rings({ center }) {
  const groupRef = useRef();

  // Optional animation (rotation)
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  const rings = [];

  const numRings = 5;
  const spacing = 0.5;

  for (let i = 1; i <= numRings; i++) {
    const innerRadius = i * spacing;
    const outerRadius = innerRadius + 0.05;

    rings.push(
      <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={center.toArray()}>
        <ringGeometry args={[innerRadius, outerRadius, 64]} />
        <meshBasicMaterial color="white" side={THREE.DoubleSide} />
      </mesh>
    );
  }

  return <group ref={groupRef}>{rings}</group>;
}