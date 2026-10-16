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

// Single unified grayish paper tone
const UNIFIED_GRAY = 0xb4b4bc;

function getPaperMaterial(wireframe = false) {
  if (wireframe) {
    return new THREE.MeshBasicMaterial({
      color: 0x8e8e98,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
  }
  return new THREE.MeshStandardMaterial({
    color: UNIFIED_GRAY,
    roughness: 0.65,
    metalness: 0.1,
    side: THREE.DoubleSide,
    flatShading: true, // Gives crisp, folded paper facet aesthetic
  });
}

function createAlgorithmsModel(): THREE.Group {
  const group = new THREE.Group();
  const mat = getPaperMaterial();
  const lineMat = new THREE.LineBasicMaterial({
    color: 0x8e8e98,
    transparent: true,
    opacity: 0.75,
  });

  // 3D paper network graph nodes
  const coords: [number, number, number][] = [
    [-15, 12, -8],
    [14, 13, 7],
    [-10, -12, 9],
    [15, -9, -6],
    [0, 2, 11],
  ];

  coords.forEach(([x, y, z]) => {
    const geo = new THREE.IcosahedronGeometry(5.5, 0);
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

  // 3D folded paper screen / laptop display
  // Display bezel
  const screenGeo = new THREE.BoxGeometry(36, 24, 4.5);
  screenGeo.center();
  const screen = new THREE.Mesh(screenGeo, mat);
  screen.position.set(0, 3, -3);
  screen.rotation.x = -0.15; // tilted slightly back like a monitor
  group.add(screen);

  // Inset display panel
  const panelGeo = new THREE.BoxGeometry(30, 18, 5.2);
  panelGeo.center();
  const panelMat = new THREE.MeshStandardMaterial({
    color: 0x9898a0,
    roughness: 0.75,
    metalness: 0.05,
    flatShading: true,
  });
  const panel = new THREE.Mesh(panelGeo, panelMat);
  panel.position.set(0, 3, -3);
  panel.rotation.x = -0.15;
  group.add(panel);

  // Folded paper base deck
  const baseGeo = new THREE.BoxGeometry(36, 3.5, 18);
  baseGeo.center();
  const base = new THREE.Mesh(baseGeo, mat);
  base.position.set(0, -9, 5);
  group.add(base);

  return group;
}

function createHumorModel(): THREE.Group {
  const group = new THREE.Group();
  const mat = getPaperMaterial();

  // Dynamic abstract neural spark / laughter crystal cluster
  const coreGeo = new THREE.IcosahedronGeometry(7, 0);
  coreGeo.center();
  const core = new THREE.Mesh(coreGeo, mat);
  group.add(core);

  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    const r = 14 + (i % 3) * 3;
    const geo = new THREE.OctahedronGeometry(4.5, 0);
    geo.center();
    const shard = new THREE.Mesh(geo, mat);
    shard.position.set(
      Math.cos(angle) * r,
      Math.sin(angle) * r,
      ((i % 3) - 1) * 7
    );
    shard.rotation.set(angle, i * 0.7, angle * 0.5);
    group.add(shard);
  }

  return group;
}

function createMusicModel(): THREE.Group {
  const group = new THREE.Group();
  const mat = getPaperMaterial();

  // 3D paper eighth note with bold volume
  const noteShape = new THREE.Shape();
  noteShape.absellipse(-8, -9, 6.5, 4.8, 0, Math.PI * 2, false, -0.35);
  const head1Geo = new THREE.ExtrudeGeometry(noteShape, {
    depth: 4.5,
    bevelEnabled: true,
    bevelThickness: 0.8,
    bevelSize: 0.8,
  });
  head1Geo.center();
  const head1 = new THREE.Mesh(head1Geo, mat);
  head1.position.set(-8, -8, 0);
  group.add(head1);

  // Notehead 2
  const head2 = head1.clone();
  head2.position.set(8, -4, 0);
  group.add(head2);

  // Stems
  const stemGeo = new THREE.BoxGeometry(2.5, 23, 3.5);
  stemGeo.center();
  const stem1 = new THREE.Mesh(stemGeo, mat);
  stem1.position.set(-2.5, 3, 0);
  group.add(stem1);

  const stem2 = new THREE.Mesh(stemGeo, mat);
  stem2.position.set(13.5, 7, 0);
  group.add(stem2);

  // Connecting beam
  const beamGeo = new THREE.BoxGeometry(20, 5, 3.5);
  beamGeo.center();
  const beam = new THREE.Mesh(beamGeo, mat);
  beam.position.set(5.5, 17, 0);
  beam.rotation.z = 0.2;
  group.add(beam);

  return group;
}

function createChessModel(): THREE.Group {
  const group = new THREE.Group();
  const mat = getPaperMaterial();

  // Origami paper knight profile with bold, unmistakable silhouette
  const shape = new THREE.Shape();
  shape.moveTo(-10, -14);
  shape.lineTo(10, -14);
  shape.lineTo(8, -9);
  shape.lineTo(11, -1);
  shape.lineTo(7, 7);
  shape.lineTo(12, 15);
  shape.lineTo(3, 17);
  shape.lineTo(-6, 11);
  shape.lineTo(-11, 4);
  shape.lineTo(-7, -1);
  shape.lineTo(-8, -9);
  shape.closePath();

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 5.5,
    bevelEnabled: true,
    bevelThickness: 1,
    bevelSize: 1,
    bevelSegments: 1,
  });
  geo.center();
  const knight = new THREE.Mesh(geo, mat);
  knight.position.set(0, 2, 0);
  group.add(knight);

  // Plinth base
  const baseGeo = new THREE.BoxGeometry(24, 4.5, 10);
  baseGeo.center();
  const base = new THREE.Mesh(baseGeo, mat);
  base.position.set(0, -13, 0);
  group.add(base);

  return group;
}

function createMathModel(): THREE.Group {
  const group = new THREE.Group();
  const mat = getPaperMaterial();

  // 3D Sigma (Σ) with clear paper volume and beveled facets
  const shape = new THREE.Shape();
  shape.moveTo(-11, 15);
  shape.lineTo(11, 15);
  shape.lineTo(11, 9.5);
  shape.lineTo(-3, 9.5);
  shape.lineTo(6, 0);
  shape.lineTo(-3, -9.5);
  shape.lineTo(11, -9.5);
  shape.lineTo(11, -15);
  shape.lineTo(-11, -15);
  shape.lineTo(0.5, 0);
  shape.closePath();

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 5.5,
    bevelEnabled: true,
    bevelThickness: 0.9,
    bevelSize: 0.9,
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
    { height: 14, offset: -11 },
    { height: 22, offset: 0 },
    { height: 31, offset: 11 },
  ];

  barsData.forEach(({ height, offset }) => {
    const barGeo = new THREE.BoxGeometry(6.5, height, 5.5);
    barGeo.center();
    const bar = new THREE.Mesh(barGeo, mat);
    bar.position.set(offset, (height - 31) / 2 + 4, 0);
    group.add(bar);

    // Wick
    const wickGeo = new THREE.BoxGeometry(1.8, height + 9, 1.8);
    wickGeo.center();
    const wick = new THREE.Mesh(wickGeo, mat);
    wick.position.set(offset, (height - 31) / 2 + 4, 0);
    group.add(wick);
  });

  return group;
}

function createEconomyModel(): THREE.Group {
  const group = new THREE.Group();
  const mat = getPaperMaterial();
  const wireMat = getPaperMaterial(true);

  // 3D interconnected paper icosahedron mesh with vertex node beads
  const icoGeo = new THREE.IcosahedronGeometry(15, 0);
  icoGeo.center();
  const wire = new THREE.Mesh(icoGeo, wireMat);
  group.add(wire);

  // Central core bead
  const core = new THREE.Mesh(new THREE.OctahedronGeometry(5.5, 0), mat);
  group.add(core);

  // Node beads on vertices
  const nodeGeo = new THREE.OctahedronGeometry(3.2, 0);
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

    // Scene & Lighting
    const scene = new THREE.Scene();

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.35);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.85);
    dirLight1.position.set(40, 60, 50);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x9a9aa2, 0.85);
    dirLight2.position.set(-35, -25, 30);
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

    // The 8 models: rotated on Y axis (between 50 deg and 120 deg)
    // with baseRotX = 0 so they never collapse horizontally,
    // plus a subtle 2D in-plane tilt on Z as if placed like 2D paper figures
    const modelConfigs: {
      type: ModelType;
      domId: string;
      creator: () => THREE.Group;
      rotYDeg: number;
      rotZDeg: number;
    }[] = [
      { type: "algorithms", domId: "figure-algorithms", creator: createAlgorithmsModel, rotYDeg: 56, rotZDeg: -4 },
      { type: "interfaces", domId: "figure-interfaces", creator: createInterfacesModel, rotYDeg: 112, rotZDeg: 5 },
      { type: "humor", domId: "figure-humor", creator: createHumorModel, rotYDeg: 64, rotZDeg: -6 },
      { type: "music", domId: "figure-music", creator: createMusicModel, rotYDeg: 54, rotZDeg: 6 },
      { type: "chess", domId: "figure-chess", creator: createChessModel, rotYDeg: 68, rotZDeg: -5 },
      { type: "math", domId: "figure-math", creator: createMathModel, rotYDeg: 58, rotZDeg: 4 },
      { type: "finance", domId: "figure-finance", creator: createFinanceModel, rotYDeg: 115, rotZDeg: -6 },
      { type: "economy", domId: "figure-economy", creator: createEconomyModel, rotYDeg: 62, rotZDeg: 5 },
    ];

    const models: PaperModelInstance[] = modelConfigs.map(
      ({ type, domId, creator, rotYDeg, rotZDeg }, idx) => {
        const group = creator();

        const baseRotX = 0; // Strictly 0 so models stand tall and never squash edge-on horizontally
        const baseRotY = rotYDeg * (Math.PI / 180); // Varied on Y between 50 deg and 120 deg
        const baseRotZ = rotZDeg * (Math.PI / 180); // Natural 2D in-plane tilt

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
      }
    );
    modelsRef.current = models;

    // Mouse tracking for subtle interactive float
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
        const floatY = Math.sin(elapsed * 1.5 + item.floatOffset) * 2.8;
        const floatRotY = Math.sin(elapsed * 1.1 + item.floatOffset) * 0.05;
        const floatRotZ = Math.cos(elapsed * 0.9 + item.floatOffset) * 0.02;

        item.group.position.x = targetX;
        item.group.position.y = targetY + floatY;
        item.group.position.z = 0;

        item.group.rotation.x = 0;
        item.group.rotation.y = item.baseRotY + floatRotY;
        item.group.rotation.z = item.baseRotZ + floatRotZ;
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
