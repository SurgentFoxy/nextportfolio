"use client";

import { useEffect, useRef, useState } from "react";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

function FoxModel({ setBoundingBox }) {
  const { scene } = useGLTF("/models/scene.gltf");
  const foxRef = useRef();

  useEffect(() => {    
    const box = new THREE.Box3().setFromObject(scene);
    setBoundingBox(box); 
  }, [scene, setBoundingBox]);

  return (
    <group ref={foxRef} position={[0, -3, 2]}>
      <primitive object={scene} scale={1} />
    </group>
  );
}

function Rings({ center }) {
  const groupRef = useRef();
  const { camera } = useThree();

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.quaternion.copy(camera.quaternion);
    }
  });

  const rings = [];
  const numRings = 4;
  const spacing = 0.15;
  const baseRadius = 4.3;
  const thickness = 0.1;

  for (let i = 0; i < numRings; i++) {
    const innerRadius = baseRadius + i * spacing;
    const outerRadius = innerRadius + thickness;

    rings.push(
      <mesh position={[center.x, center.y, center.z + 0.5]}>
        <ringGeometry args={[outerRadius, outerRadius + 5, 64]} />
        <meshBasicMaterial color="black" transparent opacity={1} side={THREE.DoubleSide} depthTest={false}/>        
      </mesh>
    );
  }

  return <group ref={groupRef}>{rings}</group>;
}



function FoxScene() {
  const [boundingBox, setBoundingBox] = useState(null);
  const [center, setCenter] = useState(new THREE.Vector3());

  useEffect(() => {
    if (boundingBox) {
      const newCenter = new THREE.Vector3();
      boundingBox.getCenter(newCenter);
      setCenter(newCenter);
    }
  }, [boundingBox]);

  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      <FoxModel setBoundingBox={setBoundingBox} />
      <OrbitControls maxDistance={20} minDistance={20} />
      {boundingBox && <CameraController boundingBox={boundingBox} />}
      {boundingBox && <Rings center={center} />}
    </Canvas>
  );
}

function CameraController({ boundingBox }) {
  const { camera } = useThree();

  useEffect(() => {
    if (boundingBox) {
      const center = new THREE.Vector3();
      boundingBox.getCenter(center);
      const size = boundingBox.getSize(new THREE.Vector3());
      const distance = Math.max(size.x, size.y, size.z) * 2;

      // Move camera further back on Z-axis, facing forward
      camera.position.set(center.x, center.y, center.z + distance);
      camera.lookAt(center);
      camera.near = distance / 10;
      camera.far = distance * 10;
      camera.updateProjectionMatrix();
    }
  }, [boundingBox, camera]);

  return null;
}


export default function App() {
  return <FoxScene />;
}
