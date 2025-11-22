"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, GizmoHelper, GizmoViewport } from "@react-three/drei";
import { Card } from "@/components/ui/card";
import { useEffect, useRef, useState, ElementRef } from "react";
import * as THREE from "three";
import { PDBLoader } from "three/addons/loaders/PDBLoader.js";
import { Button } from "@/components/ui/button";
import { 
  RotateCcwIcon, 
  EyeIcon, 
  EyeOffIcon, 
  CameraIcon 
} from "lucide-react";
import { toast } from "sonner";

declare global {
  interface Window {
    __threeGL?: THREE.WebGLRenderer;
    __threeScene?: THREE.Scene;
    __threeCamera?: THREE.Camera;
  }
}

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

        type Atom = [number, number, number, string, string];
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

function SceneSetup() {
  const { gl, scene, camera } = useThree();

  useEffect(() => {
    window.__threeGL = gl;
    window.__threeScene = scene;
    window.__threeCamera = camera;
    
    return () => {
      delete window.__threeGL;
      delete window.__threeScene;
      delete window.__threeCamera;
    };
  }, [gl, scene, camera]);

  return null;
}

type ToolbarProps = {
  onResetView: () => void;
  showAxes: boolean;
  setShowAxes: (show: boolean) => void;
  onScreenshot: () => void;
};

function Toolbar({
  onResetView,
  showAxes,
  setShowAxes,
  onScreenshot,
}: ToolbarProps) {
  return (
    <div className="absolute top-4 left-4 z-10 flex flex-col gap-2 bg-background/80 backdrop-blur-sm p-2 rounded-lg border shadow-lg">
      {/* Reset View */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onResetView}
        className="justify-start"
        title="Reset View"
      >
        <RotateCcwIcon className="h-4 w-4 mr-2" />
        Reset
      </Button>

      {/* Toggle Axes */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowAxes(!showAxes)}
        className="justify-start"
        title={showAxes ? "Hide Axes" : "Show Axes"}
      >
        {showAxes ? (
          <>
            <EyeOffIcon className="h-4 w-4 mr-2" />
            Hide Axes
          </>
        ) : (
          <>
            <EyeIcon className="h-4 w-4 mr-2" />
            Show Axes
          </>
        )}
      </Button>

      {/* Screenshot */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onScreenshot}
        className="justify-start"
        title="Take Screenshot"
      >
        <CameraIcon className="h-4 w-4 mr-2" />
        Screenshot
      </Button>
    </div>
  );
}

export default function ModelViewer({ url }: { url?: string }) {
  const pdbFile = url || "/diazene.pdb";
  const controlsRef = useRef<ElementRef<typeof OrbitControls>>(null);
  
  // Toolbar states
  const [showAxes, setShowAxes] = useState(false);
  
  // Initial camera position
  const initialCameraPosition: [number, number, number] = [0, 0, 90];
  const initialTarget: [number, number, number] = [0, 0, 0];

  const handleResetView = () => {
    if (controlsRef.current) {
      // Reset camera position
      controlsRef.current.object.position.set(...initialCameraPosition);
      controlsRef.current.target.set(...initialTarget);
      controlsRef.current.update();
      toast.success("View reset");
    }
  };

  const handleScreenshot = () => {
    const gl = window.__threeGL;
    const scene = window.__threeScene;
    const camera = window.__threeCamera;
    
    if (gl && scene && camera) {
      try {
        gl.render(scene, camera);
        
        const canvas = gl.domElement;
        
        canvas.toBlob((blob: Blob | null) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `molecule-${Date.now()}.png`;
            link.click();
            URL.revokeObjectURL(url);
            toast.success("Screenshot saved");
          } else {
            toast.error("Failed to create screenshot");
          }
        }, "image/png");
      } catch (error) {
        console.error("Screenshot error:", error);
        toast.error("Failed to capture screenshot");
      }
    } else {
      toast.error("Canvas not ready");
    }
  };

  return (
    <Card className="bg-transparent h-full w-full relative">
      <Toolbar
        onResetView={handleResetView}
        showAxes={showAxes}
        setShowAxes={setShowAxes}
        onScreenshot={handleScreenshot}
      />
      
      <Canvas 
        camera={{ position: initialCameraPosition, fov: 10 }}
        gl={{ preserveDrawingBuffer: true }}
      >
        <SceneSetup />
        
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 10]} intensity={0.8} />
        <directionalLight position={[-10, -10, -10]} intensity={0.4} />
        <pointLight position={[0, 0, 0]} intensity={0.3} />

        <MoleculeModel url={pdbFile} />

        {/* Axes Helper */}
        {showAxes && (
          <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
            <GizmoViewport 
              axisColors={['#ff0000', '#00ff00', '#0000ff']} 
              labelColor="white"
            />
          </GizmoHelper>
        )}

        <OrbitControls
          ref={controlsRef}
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