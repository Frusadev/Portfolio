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

// Single unified grayish paper material
const UNIFIED_GRAY = 0xb4b4bc;

function getPaperMaterial(wireframe = false) {
  if (wireframe) {
    return new THREE.MeshBasicMaterial({
      color: 0x8a8a92,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
  }
  return new THREE.MeshStandardMaterial({
    color: UNIFIED_GRAY,
    roughness: 0.68,
    metalness: 0.12,
    side: THREE.DoubleSide,
    flatShading: true, // Gives crisp, folded paper facet aesthetic
  });
}

function createAlgorithmsModel(): THREE.Group {
  const group = new THREE.Group();
  const mat = getPaperMaterial();
  const lineMat = new THREE.LineBasicMaterial({
    color: 0x8a8a92,
    transparent: true,
    opacity: 0.7,
  });

  // 3D paper network graph
  const coords: [number, number, number][] = [
    [-11, 8, -6],
    [10, 10, 4],
    [-7, -9, 7],
    [11, -7, -4],
    [0, 1, 8],
  ];

  coords.forEach(([x, y, z]) => {
    const geo = new THREE.IcosahedronGeometry(4, 0);
    const node = new THREE.Mesh(geo, mat);
    node.position.set(x, y, z);
    group.add(node);
  });

  // Connecting graph struts
  const linePairs: [number, number][] = [
    [0, 1],
    [0, 4],
    [1, 4],
    [2, 4],
    [3, 4],
    [2, 3],
    [1, 3],
  ];
  const pts: THREE.Vector3[] = [];
  linePairs.forEach(([a, b]) => {
    pts.push(new THREE.Vector3(...coords[a]));
    pts.push(new THREE.Vector3(...coords[b]));
  });
  const lineGeo = new THREE.BufferGeometry().setFromPoints(pts);
  const lines = new THREE.LineSegments(lineGeo, lineMat);
  group.add(lines);

  return group;
}

function createInterfacesModel(): THREE.Group {
  const group = new THREE.Group();
  const mat = getPaperMaterial();

  // 3D folded paper screen / card with depth
  const bodyGeo = new THREE.BoxGeometry(26, 19, 4);
  bodyGeo.center();
  const body = new THREE.Mesh(bodyGeo, mat);
  group.add(body);

  // Inset viewport bevel
  const screenGeo = new THREE.BoxGeometry(22, 12, 4.8);
  screenGeo.center();
  const screenMat = new THREE.MeshStandardMaterial({
    color: 0x8a8a92,
    roughness: 0.8,
    metalness: 0.05,
    flatShading: true,
  });
  const screen = new THREE.Mesh(screenGeo, screenMat);
  screen.position.set(0, -1.5, 0);
  group.add(screen);

  return group;
}

function createHumorModel(): THREE.Group {
  const group = new THREE.Group();
  const mat = getPaperMaterial();

  // Abstract neural particle cluster
  for (let i = 0; i < 7; i++) {
    const angle = (i / 7) * Math.PI * 2;
    const r = 10 + (i % 2) * 3;
    const geo = new THREE.OctahedronGeometry(3.5, 0);
    geo.center();
    const shard = new THREE.Mesh(geo, mat);
    shard.position.set(
      Math.cos(angle) * r,
      Math.sin(angle) * r,
      ((i % 3) - 1) * 6
    );
    shard.rotation.set(angle, i, angle * 0.5);
    group.add(shard);
  }

  // Center core spark
  const coreGeo = new THREE.IcosahedronGeometry(4.5, 0);
  coreGeo.center();
  const core = new THREE.Mesh(coreGeo, mat);
  group.add(core);

  return group;
}

function createMusicModel(): THREE.Group {
  const group = new THREE.Group();
  const mat = getPaperMaterial();

  // 3D paper eighth note with volume
  const noteShape = new THREE.Shape();
  // Notehead 1
  noteShape.absellipse(-7, -7, 5, 3.5, 0, Math.PI * 2, false, -0.3);
  const head1Geo = new THREE.ExtrudeGeometry(noteShape, {
    depth: 3,
    bevelEnabled: true,
    bevelThickness: 0.5,
    bevelSize: 0.5,
  });
  head1Geo.center();
  const head1 = new THREE.Mesh(head1Geo, mat);
  head1.position.set(-6, -6, 0);
  group.add(head1);

  // Notehead 2
  const head2 = head1.clone();
  head2.position.set(6, -3, 0);
  group.add(head2);

  // Stems
  const stemGeo = new THREE.BoxGeometry(1.8, 16, 2.5);
  stemGeo.center();
  const stem1 = new THREE.Mesh(stemGeo, mat);
  stem1.position.set(-2, 1, 0);
  group.add(stem1);

  const stem2 = new THREE.Mesh(stemGeo, mat);
  stem2.position.set(10, 4, 0);
  group.add(stem2);

  // Connecting beam
  const beamGeo = new THREE.BoxGeometry(14, 3.5, 2.5);
  beamGeo.center();
  const beam = new THREE.Mesh(beamGeo, mat);
  beam.position.set(4, 11, 0);
  beam.rotation.z = 0.22;
  group.add(beam);

  return group;
}

function createChessModel(): THREE.Group {
  const group = new THREE.Group();
  const mat = getPaperMaterial();

  // Origami paper knight profile with clean 3D depth
  const shape = new THREE.Shape();
  shape.moveTo(-7, -11);
  shape.lineTo(7, -11);
  shape.lineTo(6, -7);
  shape.lineTo(8, -1);
  shape.lineTo(5, 5);
  shape.lineTo(9, 11);
  shape.lineTo(2, 12);
  shape.lineTo(-5, 8);
  shape.lineTo(-8, 3);
  shape.lineTo(-5, -1);
  shape.lineTo(-6, -7);
  shape.closePath();

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 4,
    bevelEnabled: true,
    bevelThickness: 0.8,
    bevelSize: 0.8,
    bevelSegments: 1,
  });
  geo.center();
  const mesh = new THREE.Mesh(geo, mat);
  group.add(mesh);

  return group;
}

function createMathModel(): THREE.Group {
  const group = new THREE.Group();
  const mat = getPaperMaterial();

  // 3D Sigma (Σ) with clear paper depth
  const shape = new THREE.Shape();
  shape.moveTo(-8, 10);
  shape.lineTo(8, 10);
  shape.lineTo(8, 6.5);
  shape.lineTo(-2, 6.5);
  shape.lineTo(4, 0);
  shape.lineTo(-2, -6.5);
  shape.lineTo(8, -6.5);
  shape.lineTo(8, -10);
  shape.lineTo(-8, -10);
  shape.lineTo(0.5, 0);
  shape.closePath();

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 4,
    bevelEnabled: true,
    bevelThickness: 0.6,
    bevelSize: 0.6,
    bevelSegments: 1,
  });
  geo.center();
  const mesh = new THREE.Mesh(geo, mat);
  group.add(mesh);

  return group;
}

function createFinanceModel(): THREE.Group {
  const group = new THREE.Group();
  const mat = getPaperMaterial();

  // 3D ascending candlestick chart
  const barsData = [
    { height: 10, offset: -8 },
    { height: 15, offset: 0 },
    { height: 21, offset: 8 },
  ];

  barsData.forEach(({ height, offset }) => {
    const barGeo = new THREE.BoxGeometry(4.5, height, 4);
    barGeo.center();
    const bar = new THREE.Mesh(barGeo, mat);
    bar.position.set(offset, (height - 21) / 2 + 3, 0);
    group.add(bar);

    // Wick
    const wickGeo = new THREE.BoxGeometry(1.2, height + 6, 1.2);
    wickGeo.center();
    const wick = new THREE.Mesh(wickGeo, mat);
    wick.position.set(offset, (height - 21) / 2 + 3, 0);
    group.add(wick);
  });

  return group;
}

function createEconomyModel(): THREE.Group {
  const group = new THREE.Group();
  const mat = getPaperMaterial();
  const wireMat = getPaperMaterial(true);

  // 3D paper icosahedron mesh with node points
  const icoGeo = new THREE.IcosahedronGeometry(11, 0);
  icoGeo.center();
  const wire = new THREE.Mesh(icoGeo, wireMat);
  group.add(wire);

  // Node beads on vertices
  const nodeGeo = new THREE.OctahedronGeometry(2, 0);
  nodeGeo.center();
  const posAttr = icoGeo.attributes.position;
  for (let i = 0; i < posAttr.count; i += 2) {
    const node = new THREE.Mesh(nodeGeo, mat);
    node.position.set(posAttr.getX(i), posAttr.getY(i), posAttr.getZ(i));
    group.add(node);
  }

  return group;
}

interface PaperCanvasProps {
  containerRef: React.RefObject<HTMLElement | null>;
  scrollProgress: number;
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

    // Scene & Lighting: Balanced lighting so paper facets and depth are clearly visible
    const scene = new THREE.Scene();

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.8);
    dirLight1.position.set(30, 50, 40);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xa1a1aa, 0.8);
    dirLight2.position.set(-30, -20, 20);
    scene.add(dirLight2);

    // Pixel-perfect perspective camera
    const camera = new THREE.PerspectiveCamera(35, 1, 1, 3000);
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

    // The 8 models: using an isometric three-quarter tilt (X ~55-65 deg, Y ~25-35 deg)
    // so paper models show full 3D silhouette, facets, and depth rather than squishing
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

      // Angle on X between 50 deg and 75 deg (in the specified 50-120 range, avoiding edge-on 90)
      const baseRotX = (54 + (idx * 11) % 20) * (Math.PI / 180);
      // Three-quarter Y rotation gives beautiful paper isometric visibility
      const baseRotY = (24 + (idx * 13) % 20) * (Math.PI / 180);
      const baseRotZ = (((idx * 17) % 24) - 12) * (Math.PI / 180);

      group.rotation.set(baseRotX, baseRotY, baseRotZ);
      group.scale.set(0, 0, 0);
      scene.add(group);

      return {
        type,
        domId,
        group,
        baseRotX,
        baseRotY,
        baseRotZ,
        floatOffset: idx * 0.8,
      };
    });
    modelsRef.current = models;

    // Mouse tracking for floating tilt
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
        y: -(((e.clientY - rect.top) / rect.height) * 2 - 1),
      };
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    let animId: number;
    const clock = new THREE.Clock();

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
        const screenX = targetRect.left + targetRect.width / 2 - containerRect.left;
        const screenY = targetRect.top + targetRect.height / 2 - containerRect.top;

        const targetX = screenX - canvasWidth / 2;
        const targetY = -(screenY - canvasHeight / 2);

        // Tactile floating motion
        const floatY = Math.sin(elapsed * 1.6 + item.floatOffset) * 2.2;
        const floatRot = Math.sin(elapsed * 1.2 + item.floatOffset) * 0.04;

        item.group.position.x = targetX;
        item.group.position.y = targetY + floatY;
        item.group.position.z = 0;

        item.group.rotation.x = item.baseRotX + floatRot;
        item.group.rotation.y = item.baseRotY + floatRot * 0.5;
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
