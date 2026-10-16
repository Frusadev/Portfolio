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
      opacity: 0.65,
    });
  }
  return new THREE.MeshStandardMaterial({
    color: UNIFIED_GRAY,
    roughness: 0.6,
    metalness: 0.1,
    side: THREE.DoubleSide,
    flatShading: true, // Beveled facets catch directional light, giving crisp paper relief depth
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

  // Flat 2D paper network graph with beveled nodes
  const coords: [number, number, number][] = [
    [-11, 8, 0],
    [10, 10, 0],
    [-8, -9, 0],
    [11, -7, 0],
    [0, 1, 0.5],
  ];

  coords.forEach(([x, y, z]) => {
    const geo = new THREE.IcosahedronGeometry(4.2, 0);
    const node = new THREE.Mesh(geo, mat);
    node.position.set(x, y, z);
    group.add(node);
  });

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

  // Flat 2D paper window / screen frame with clear beveled relief
  const outerGeo = new THREE.BoxGeometry(28, 20, 3.2);
  outerGeo.center();
  const outer = new THREE.Mesh(outerGeo, mat);
  group.add(outer);

  // Inset display panel
  const panelGeo = new THREE.BoxGeometry(23, 13.5, 3.8);
  panelGeo.center();
  const panelMat = new THREE.MeshStandardMaterial({
    color: 0x9a9aa2,
    roughness: 0.75,
    metalness: 0.05,
    flatShading: true,
  });
  const panel = new THREE.Mesh(panelGeo, panelMat);
  panel.position.set(0, -1.8, 0);
  group.add(panel);

  // 3 window control dots on top header
  [-7, -3.5, 0].forEach((x) => {
    const dot = new THREE.Mesh(
      new THREE.CylinderGeometry(1.1, 1.1, 4, 8),
      mat
    );
    dot.rotation.x = Math.PI / 2;
    dot.position.set(x, 6.2, 0);
    group.add(dot);
  });

  return group;
}

function createHumorModel(): THREE.Group {
  const group = new THREE.Group();
  const mat = getPaperMaterial();

  // Flat 2D paper abstract spark / firing neuron starburst
  const coreGeo = new THREE.IcosahedronGeometry(5.2, 0);
  coreGeo.center();
  const core = new THREE.Mesh(coreGeo, mat);
  group.add(core);

  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    const r = 11 + (i % 2) * 2.5;
    const geo = new THREE.OctahedronGeometry(3.2, 0);
    geo.center();
    const shard = new THREE.Mesh(geo, mat);
    shard.position.set(Math.cos(angle) * r, Math.sin(angle) * r, 0);
    shard.rotation.z = angle;
    group.add(shard);
  }

  return group;
}

function createMusicModel(): THREE.Group {
  const group = new THREE.Group();
  const mat = getPaperMaterial();

  // Flat 2D paper eighth note with beveled depth
  const noteShape = new THREE.Shape();
  noteShape.absellipse(-6.5, -7, 5, 3.6, 0, Math.PI * 2, false, -0.35);
  const head1Geo = new THREE.ExtrudeGeometry(noteShape, {
    depth: 3.2,
    bevelEnabled: true,
    bevelThickness: 0.8,
    bevelSize: 0.8,
  });
  head1Geo.center();
  const head1 = new THREE.Mesh(head1Geo, mat);
  head1.position.set(-6, -6.5, 0);
  group.add(head1);

  // Notehead 2
  const head2 = head1.clone();
  head2.position.set(6, -3, 0);
  group.add(head2);

  // Stems
  const stemGeo = new THREE.BoxGeometry(2, 18, 3.2);
  stemGeo.center();
  const stem1 = new THREE.Mesh(stemGeo, mat);
  stem1.position.set(-1.8, 1.5, 0);
  group.add(stem1);

  const stem2 = new THREE.Mesh(stemGeo, mat);
  stem2.position.set(10.2, 5, 0);
  group.add(stem2);

  // Connecting beam
  const beamGeo = new THREE.BoxGeometry(16, 4, 3.2);
  beamGeo.center();
  const beam = new THREE.Mesh(beamGeo, mat);
  beam.position.set(4.2, 13, 0);
  beam.rotation.z = 0.2;
  group.add(beam);

  return group;
}

function createChessModel(): THREE.Group {
  const group = new THREE.Group();
  const mat = getPaperMaterial();

  // Flat 2D origami paper knight with clear silhouette and beveled relief
  const shape = new THREE.Shape();
  shape.moveTo(-8, -11);
  shape.lineTo(8, -11);
  shape.lineTo(6.5, -7);
  shape.lineTo(9, -0.5);
  shape.lineTo(5.5, 6);
  shape.lineTo(9.5, 12);
  shape.lineTo(2.5, 13.5);
  shape.lineTo(-4.5, 9);
  shape.lineTo(-8.5, 3.5);
  shape.lineTo(-5.5, -0.5);
  shape.lineTo(-6.5, -7);
  shape.closePath();

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 3.5,
    bevelEnabled: true,
    bevelThickness: 0.8,
    bevelSize: 0.8,
    bevelSegments: 1,
  });
  geo.center();
  const knight = new THREE.Mesh(geo, mat);
  knight.position.set(0, 1.5, 0);
  group.add(knight);

  // Plinth base
  const baseGeo = new THREE.BoxGeometry(19, 3.5, 4);
  baseGeo.center();
  const base = new THREE.Mesh(baseGeo, mat);
  base.position.set(0, -10.5, 0);
  group.add(base);

  return group;
}

function createMathModel(): THREE.Group {
  const group = new THREE.Group();
  const mat = getPaperMaterial();

  // Flat 2D Sigma (Σ) with beveled relief
  const shape = new THREE.Shape();
  shape.moveTo(-9, 12);
  shape.lineTo(9, 12);
  shape.lineTo(9, 7.5);
  shape.lineTo(-2.5, 7.5);
  shape.lineTo(4.5, 0);
  shape.lineTo(-2.5, -7.5);
  shape.lineTo(9, -7.5);
  shape.lineTo(9, -12);
  shape.lineTo(-9, -12);
  shape.lineTo(0.5, 0);
  shape.closePath();

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 3.5,
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

function createFinanceModel(): THREE.Group {
  const group = new THREE.Group();
  const mat = getPaperMaterial();

  // Flat 2D ascending candlestick chart with beveled bars and wicks
  const barsData = [
    { height: 11, offset: -8 },
    { height: 17, offset: 0 },
    { height: 24, offset: 8 },
  ];

  barsData.forEach(({ height, offset }) => {
    const barGeo = new THREE.BoxGeometry(5, height, 3.5);
    barGeo.center();
    const bar = new THREE.Mesh(barGeo, mat);
    bar.position.set(offset, (height - 24) / 2 + 3, 0);
    group.add(bar);

    // Wick
    const wickGeo = new THREE.BoxGeometry(1.4, height + 7, 1.6);
    wickGeo.center();
    const wick = new THREE.Mesh(wickGeo, mat);
    wick.position.set(offset, (height - 24) / 2 + 3, 0);
    group.add(wick);
  });

  return group;
}

function createEconomyModel(): THREE.Group {
  const group = new THREE.Group();
  const mat = getPaperMaterial();
  const wireMat = getPaperMaterial(true);

  // Flat 2D interconnected paper mesh with vertex node beads
  const icoGeo = new THREE.IcosahedronGeometry(12, 0);
  icoGeo.center();
  const wire = new THREE.Mesh(icoGeo, wireMat);
  group.add(wire);

  // Central core bead
  const core = new THREE.Mesh(new THREE.OctahedronGeometry(4.2, 0), mat);
  group.add(core);

  // Node beads on vertices
  const nodeGeo = new THREE.OctahedronGeometry(2.5, 0);
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

    // Scene & Lighting: Directional light from top-left illuminates beveled facets to highlight depth
    const scene = new THREE.Scene();

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.6);
    dirLight1.position.set(30, 45, 50);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x9a9aa2, 0.7);
    dirLight2.position.set(-30, -25, 25);
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

    // The 8 models laid flat on screen: zero rotation, front-facing 2D silhouettes with beveled relief
    const modelConfigs: {
      type: ModelType;
      domId: string;
      creator: () => THREE.Group;
    }[] = [
      { type: "algorithms", domId: "figure-algorithms", creator: createAlgorithmsModel },
      { type: "interfaces", domId: "figure-interfaces", creator: createInterfacesModel },
      { type: "humor", domId: "figure-humor", creator: createHumorModel },
      { type: "music", domId: "figure-music", creator: createMusicModel },
      { type: "chess", domId: "figure-chess", creator: createChessModel },
      { type: "math", domId: "figure-math", creator: createMathModel },
      { type: "finance", domId: "figure-finance", creator: createFinanceModel },
      { type: "economy", domId: "figure-economy", creator: createEconomyModel },
    ];

    const models: PaperModelInstance[] = modelConfigs.map(
      ({ type, domId, creator }, idx) => {
        const group = creator();
        // Strictly flat on the screen with zero rotation
        group.rotation.set(0, 0, 0);
        group.scale.set(0, 0, 0);
        scene.add(group);

        return {
          type,
          domId,
          group,
          floatOffset: idx * 0.8,
        };
      }
    );
    modelsRef.current = models;

    // Animation loop: subtle vertical floating levitation with zero rotation
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

        // Tactile vertical floating motion
        const floatY = Math.sin(elapsed * 1.5 + item.floatOffset) * 2;

        item.group.position.x = targetX;
        item.group.position.y = targetY + floatY;
        item.group.position.z = 0;

        // Completely flat on screen - zero rotation
        item.group.rotation.set(0, 0, 0);
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
