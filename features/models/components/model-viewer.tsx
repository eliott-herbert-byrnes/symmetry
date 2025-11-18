"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Card } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { PDBLoader } from "three/addons/loaders/PDBLoader.js";

const CPK_COLORS: { [key: string]: number } = {
  H: 0xffffff, // White
  C: 0x909090, // Gray
  N: 0x3050f8, // Blue
  O: 0xff0d0d, // Red
  S: 0xffff30, // Yellow
  P: 0xff8000, // Orange
  F: 0x90e050, // Green
  Cl: 0x1ff01f, // Light green
  Br: 0xa62929, // Dark red
  I: 0x940094, // Purple
  Fe: 0xe06633, // Orange-red
  Ca: 0x3dff00, // Bright green
};

function MoleculeModel({ url }: { url?: string }) {
  const groupRef = useRef<THREE.Group>(null);
  const [atoms, setAtoms] = useState<THREE.Group | null>(null);

  useEffect(() => {
    const loader = new PDBLoader();
    loader.load(
      url || "/diazene.pdb",
      (pdb) => {
        const group = new THREE.Group();

        const bondsMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
        const bonds = new THREE.LineSegments(pdb.geometryBonds, bondsMaterial);
        group.add(bonds);

        const json = pdb.json;
        const atomGeometry = new THREE.IcosahedronGeometry(1, 2);

        type Atom = [number, number, number, string, string]; // [x, y, z, name, element]
        (json.atoms as Atom[]).forEach((atom) => {
          const element = atom[4];
          const color = CPK_COLORS[element] || 0xffffff;

          const material = new THREE.MeshPhongMaterial({
            color,
            shininess: 30,
          });

          const atomMesh = new THREE.Mesh(atomGeometry, material);
          atomMesh.position.set(atom[0], atom[1], atom[2]);

          const scale = element === "H" ? 0.5 : 0.5;
          atomMesh.scale.setScalar(scale);

          group.add(atomMesh);
        });

        const box = new THREE.Box3().setFromObject(group);
        const center = box.getCenter(new THREE.Vector3());
        group.position.sub(center);

        setAtoms(group);
      },
      undefined,
      (error) => {
        console.error("Error loading PDB file:", error);
      }
    );
  }, [url]);

  return atoms ? <primitive object={atoms} ref={groupRef} /> : null;
}

export default function ModelViewer({ url }: { url?: string }) {
  const pdbFile = url || "/diazene.pdb";

  return (
    <Card className="bg-transparent h-full w-full">
      <Canvas camera={{ position: [0, 0, 90], fov: 10 }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 10]} intensity={0.8} />
        <directionalLight position={[-10, -10, -10]} intensity={0.4} />
        <pointLight position={[0, 0, 0]} intensity={0.3} />

        <MoleculeModel url={pdbFile} />

        <OrbitControls
          autoRotate
          autoRotateSpeed={1}
          enableDamping
          dampingFactor={0.05}
          minDistance={20}
          maxDistance={200}
        />
      </Canvas>
    </Card>
  );
}
