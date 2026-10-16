"use client";

import * as React from "react";
import * as THREE from "three";

export type ModelType =
  | "algorithms"
  | "interfaces"
  | "humor"
  | "music"
  | "math"
  | "chess"
  | "finance"
  | "economy";

interface PaperModelInstance {
  type: ModelType;
  domId: string;
  group: THREE.Group;
  baseRotX: number;
  baseRotY: number;
  baseRotZ: number;
  floatOffset: number;
}

// Minimal matte paper material
function createPaperMaterial(colorHex: number = 0xd4d4d8, opacity: number = 0.95) {
  return new THREE.MeshStandardMaterial({
    color: colorHex,
    roughness: 0.82,
    metalness: 0.08,
    side: THREE.DoubleSide,
    transparent: true,
    opacity,
  });
}

function createAlgorithmsModel(): THREE.Group {
  const group = new THREE.Group();
  const mat = createPaperMaterial(0x55c7e8, 0.9); // subtle blue highlight
  const lineMat = new THREE.LineBasicMaterial({ color: 0x858585, transparent: true, opacity: 0.6 });

  // 4 nodes in a 3D network
  const positions: [number, number, number][] = [
    [-10, 8, -4],
    [10, 10, 2],
    [-4, -8, 6],
    [8, -6, -3],
  ];

  positions.forEach(([x, y, z]) => {
    const node = new THREE.Mesh(new THREE.IcosahedronGeometry(3.5, 0), mat);
    node.position.set(x, y, z);
    group.add(node);
  });

  // Connecting line edges
  const points = [
    new THREE.Vector3(...positions[0]),
    new THREE.Vector3(...positions[1]),
    new THREE.Vector3(...positions[2]),
    new THREE.Vector3(...positions[3]),
    new THREE.Vector3(...positions[0]),
    new THREE.Vector3(...positions[2]),
  ];
  const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
  const lines = new THREE.Line(lineGeo, lineMat);
  group.add(lines);

  return group;
}

function createInterfacesModel(): THREE.Group {
  const group = new THREE.Group();
  const paperMat = createPaperMaterial(0xe5e7eb, 0.92);
  const accentMat = createPaperMaterial(0x202020, 0.85);

  // Minimal paper screen card
  const frameGeo = new THREE.BoxGeometry(26, 18, 1);
  const frame = new THREE.Mesh(frameGeo, paperMat);
  group.add(frame);

  // Inner display inset
  const screenGeo = new THREE.BoxGeometry(22, 12, 1.2);
  const screen = new THREE.Mesh(screenGeo, accentMat);
  screen.position.set(0, -1, 0.2);
  group.add(screen);

  return group;
}

function createHumorModel(): THREE.Group {
  const group = new THREE.Group();
  const mat = createPaperMaterial(0xededed, 0.9);
  const accentMat = createPaperMaterial(0x39d353, 0.85);

  // Abstract firing neural particles / floating paper shards
  for (let i = 0; i < 7; i++) {
    const angle = (i / 7) * Math.PI * 2;
    const r = 8 + (i % 3) * 3;
    const shard = new THREE.Mesh(
      new THREE.TetrahedronGeometry(2 + (i % 2), 0),
      i % 2 === 0 ? mat : accentMat
    );
    shard.position.set(Math.cos(angle) * r, Math.sin(angle) * r, ((i % 4) - 2) * 3);
    shard.rotation.set(angle, angle * 0.5, i);
    group.add(shard);
  }

  return group;
}

function createMusicModel(): THREE.Group {
  const group = new THREE.Group();
  const mat = createPaperMaterial(0xe5e7eb, 0.92);

  // 2 noteheads and a connecting beam
  const noteGeo = new THREE.CylinderGeometry(3.5, 3.5, 1, 16);
  const head1 = new THREE.Mesh(noteGeo, mat);
  head1.position.set(-6, -6, 0);
  head1.rotation.x = Math.PI / 2;
  head1.scale.set(1, 0.7, 1);
  group.add(head1);

  const head2 = new THREE.Mesh(noteGeo, mat);
  head2.position.set(6, -4, 0);
  head2.rotation.x = Math.PI / 2;
  head2.scale.set(1, 0.7, 1);
  group.add(head2);

  // Stems
  const stemGeo = new THREE.BoxGeometry(1.2, 14, 0.8);
  const stem1 = new THREE.Mesh(stemGeo, mat);
  stem1.position.set(-3.5, 1, 0);
  group.add(stem1);

  const stem2 = new THREE.Mesh(stemGeo, mat);
  stem2.position.set(8.5, 3, 0);
  group.add(stem2);

  // Beam
  const beamGeo = new THREE.BoxGeometry(13.2, 2.2, 0.8);
  const beam = new THREE.Mesh(beamGeo, mat);
  beam.position.set(2.5, 9, 0);
  beam.rotation.z = 0.16;
  group.add(beam);

  return group;
}

function createChessModel(): THREE.Group {
  const group = new THREE.Group();
  const mat = createPaperMaterial(0xe5e7eb, 0.92);

  // Origami knight silhouette via extruded paper shape
  const shape = new THREE.Shape();
  shape.moveTo(-6, -10);
  shape.lineTo(6, -10);
  shape.lineTo(5, -6);
  shape.lineTo(7, -1);
  shape.lineTo(4, 5);
  shape.lineTo(8, 10);
  shape.lineTo(2, 11);
  shape.lineTo(-4, 7);
  shape.lineTo(-7, 3);
  shape.lineTo(-5, 0);
  shape.lineTo(-5, -6);
  shape.closePath();

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 1.5,
    bevelEnabled: true,
    bevelSegments: 1,
    steps: 1,
    bevelSize: 0.4,
    bevelThickness: 0.4,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.scale.set(0.85, 0.85, 0.85);
  mesh.position.set(0, 0, -0.75);
  group.add(mesh);

  return group;
}

function createMathModel(): THREE.Group {
  const group = new THREE.Group();
  const mat = createPaperMaterial(0xe5e7eb, 0.92);

  // Sigma (Σ) shape
  const shape = new THREE.Shape();
  shape.moveTo(-7, 9);
  shape.lineTo(7, 9);
  shape.lineTo(7, 6.5);
  shape.lineTo(-2, 6.5);
  shape.lineTo(3.5, 0);
  shape.lineTo(-2, -6.5);
  shape.lineTo(7, -6.5);
  shape.lineTo(7, -9);
  shape.lineTo(-7, -9);
  shape.lineTo(0, 0);
  shape.closePath();

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 1.5,
    bevelEnabled: false,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(0, 0, -0.75);
  group.add(mesh);

  return group;
}

function createFinanceModel(): THREE.Group {
  const group = new THREE.Group();
  const matUp = createPaperMaterial(0x39d353, 0.9); // green chart
  const matNeutral = createPaperMaterial(0xa1a1aa, 0.85);

  // Stepped candlestick bars
  const heights = [8, 12, 18];
  heights.forEach((h, i) => {
    const bar = new THREE.Mesh(
      new THREE.BoxGeometry(3.5, h, 1.2),
      i === 2 ? matUp : matNeutral
    );
    bar.position.set((i - 1) * 7, (h - 18) / 2 + 2, 0);
    group.add(bar);

    // Wick
    const wick = new THREE.Mesh(new THREE.BoxGeometry(0.8, h + 5, 0.6), matNeutral);
    wick.position.set((i - 1) * 7, (h - 18) / 2 + 2, 0);
    group.add(wick);
  });

  return group;
}

function createEconomyModel(): THREE.Group {
  const group = new THREE.Group();
  const mat = createPaperMaterial(0xa1a1aa, 0.85);

  // Interconnected society-monetary mesh (icosahedron wireframe with vertices)
  const icoGeo = new THREE.IcosahedronGeometry(9, 0);
  const wireMat = new THREE.MeshBasicMaterial({
    color: 0x858585,
    wireframe: true,
    transparent: true,
    opacity: 0.5,
  });
  const wire = new THREE.Mesh(icoGeo, wireMat);
  group.add(wire);

  // Small node points at vertices
  const nodeGeo = new THREE.SphereGeometry(1.2, 8, 8);
  const nodeMat = createPaperMaterial(0x55c7e8, 0.9);
  const posAttr = icoGeo.attributes.position;
  for (let i = 0; i < posAttr.count; i += 2) {
    const node = new THREE.Mesh(nodeGeo, nodeMat);
    node.position.set(posAttr.getX(i), posAttr.getY(i), posAttr.getZ(i));
    group.add(node);
  }

  return group;
}

interface PaperCanvasProps {
  containerRef: React.RefObject<HTMLElement | null>;
  scrollProgress: number; // 0 to 1 scrubbed by GSAP
}

export function PaperCanvas({ containerRef, scrollProgress }: PaperCanvasProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const modelsRef = React.useRef<PaperModelInstance[]>([]);
  const mouseRef = React.useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Scene & Lighting
    const scene = new THREE.Scene();
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.8);
    dirLight.position.set(20, 40, 50);
    scene.add(dirLight);

    const backLight = new THREE.DirectionalLight(0x55c7e8, 0.4);
    backLight.position.set(-20, -30, -20);
    scene.add(backLight);

    // Camera setup for pixel-perfect screen mapping
    const camera = new THREE.PerspectiveCamera(45, 1, 1, 2000);
    camera.position.z = 600;

    const updateCameraAndSize = () => {
      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.fov = 2 * Math.atan(height / 2 / 600) * (180 / Math.PI);
      camera.updateProjectionMatrix();
    };
    updateCameraAndSize();

    // Create the 8 models with random X tilts between 50deg and 120deg
    const modelConfigs: { type: ModelType; domId: string; creator: () => THREE.Group }[] = [
      { type: "algorithms", domId: "figure-algorithms", creator: createAlgorithmsModel },
      { type: "interfaces", domId: "figure-interfaces", creator: createInterfacesModel },
      { type: "humor", domId: "figure-humor", creator: createHumorModel },
      { type: "music", domId: "figure-music", creator: createMusicModel },
      { type: "chess", domId: "figure-chess", creator: createChessModel },
      { type: "math", domId: "figure-math", creator: createMathModel },
      { type: "finance", domId: "figure-finance", creator: createFinanceModel },
      { type: "economy", domId: "figure-economy", creator: createEconomyModel },
    ];

    const models: PaperModelInstance[] = modelConfigs.map(({ type, domId, creator }, idx) => {
      const group = creator();
      // Random tilt on X axis strictly between 50deg and 120deg (0.87 to 2.09 radians)
      const baseRotX = (50 + (idx * 17) % 70) * (Math.PI / 180);
      const baseRotY = (((idx * 23) % 40) - 20) * (Math.PI / 180);
      const baseRotZ = (((idx * 13) % 30) - 15) * (Math.PI / 180);

      group.rotation.set(baseRotX, baseRotY, baseRotZ);
      group.scale.set(0, 0, 0); // Initially scaled down, driven by scroll
      scene.add(group);

      return {
        type,
        domId,
        group,
        baseRotX,
        baseRotY,
        baseRotZ,
        floatOffset: idx * 0.7,
      };
    });
    modelsRef.current = models;

    // Track mouse for subtle interactive tilt
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
        y: -(((e.clientY - rect.top) / rect.height) * 2 - 1),
      };
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      const containerRect = container.getBoundingClientRect();
      const canvasWidth = containerRect.width;
      const canvasHeight = containerRect.height;

      models.forEach((item) => {
        const domEl = document.getElementById(item.domId);
        if (!domEl) return;

        const targetRect = domEl.getBoundingClientRect();
        // Project DOM position to Three.js world position relative to container center
        const screenX = targetRect.left + targetRect.width / 2 - containerRect.left;
        const screenY = targetRect.top + targetRect.height / 2 - containerRect.top;

        const targetX = screenX - canvasWidth / 2;
        const targetY = -(screenY - canvasHeight / 2);

        // Gentle floating motion
        const floatY = Math.sin(elapsed * 1.5 + item.floatOffset) * 2.5;
        const floatRot = Math.sin(elapsed + item.floatOffset) * 0.05;

        item.group.position.x = targetX;
        item.group.position.y = targetY + floatY;
        item.group.position.z = 0;

        item.group.rotation.x = item.baseRotX + floatRot;
        item.group.rotation.y = item.baseRotY + floatRot * 0.6;
        item.group.rotation.z = item.baseRotZ;
      });

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      updateCameraAndSize();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, [containerRef]);

  // Synchronize scroll-driven scaling/unfolding
  React.useEffect(() => {
    modelsRef.current.forEach((item) => {
      const scale = Math.min(Math.max(scrollProgress * 1.25, 0), 1);
      item.group.scale.set(scale, scale, scale);
    });
  }, [scrollProgress]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
      aria-hidden="true"
    />
  );
}

export default PaperCanvas;
