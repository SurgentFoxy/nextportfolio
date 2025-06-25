"use client";

import { useEffect, useRef, useState } from "react";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import * as THREE from "three";

function FoxModel({ setBoundingBox }) {
  const { scene } = useGLTF("/models/scene.gltf");
  const foxRef = useRef();

  useEffect(() => {    
    const box = new THREE.Box3().setFromObject(scene);
    setBoundingBox(box); 
  }, [scene, setBoundingBox]);

  return (
    <group ref={foxRef}>
      <primitive object={scene} scale={1} />
    </group>
  );
}

function FoxScene() {
  const [boundingBox, setBoundingBox] = useState(null);

  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} />      
      <FoxModel setBoundingBox={setBoundingBox} />      
      <OrbitControls maxDistance={20} minDistance={20}/>
      <CameraController boundingBox={boundingBox} />
    </Canvas>
  );
}

function CameraController({ boundingBox }) {
  const { camera, gl } = useThree(); 
  useEffect(() => {
    if (boundingBox) {
      const center = new THREE.Vector3();
      boundingBox.getCenter(center);
      const size = boundingBox.getSize(new THREE.Vector3());
      const distance = Math.max(size.x, size.y, size.z) * 1.5;
      camera.position.set(center.x, center.y, center.z + distance);
      camera.lookAt(center);
      const near = distance / 10;
      const far = distance * 10;
      camera.near = near;
      camera.far = far;
      camera.updateProjectionMatrix();
    }
  }, [boundingBox, camera]);

  return null;
}

export default function App() {
  return <FoxScene />;
}
