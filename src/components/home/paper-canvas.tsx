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
    [-15, 12, 0],
    [14, 14, 0],
    [-11, -12, 0],
    [15, -10, 0],
    [0, 1, 0.5],
  ];

  coords.forEach(([x, y, z]) => {
    const geo = new THREE.IcosahedronGeometry(5.8, 0);
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
  const outerGeo = new THREE.BoxGeometry(38, 27, 4.2);
  outerGeo.center();
  const outer = new THREE.Mesh(outerGeo, mat);
  group.add(outer);

  // Inset display panel
  const panelGeo = new THREE.BoxGeometry(31, 18, 4.8);
  panelGeo.center();
  const panelMat = new THREE.MeshStandardMaterial({
    color: 0x9a9aa2,
    roughness: 0.75,
    metalness: 0.05,
    flatShading: true,
  });
  const panel = new THREE.Mesh(panelGeo, panelMat);
  panel.position.set(0, -2.4, 0);
  group.add(panel);

  // 3 window control dots on top header
  [-9, -4.5, 0].forEach((x) => {
    const dot = new THREE.Mesh(
      new THREE.CylinderGeometry(1.4, 1.4, 5, 8),
      mat
    );
    dot.rotation.x = Math.PI / 2;
    dot.position.set(x, 8.5, 0);
    group.add(dot);
  });

  return group;
}

function createHumorModel(): THREE.Group {
  const group = new THREE.Group();
  const mat = getPaperMaterial();

  // Flat 2D paper abstract spark / firing neuron starburst
  const coreGeo = new THREE.IcosahedronGeometry(7, 0);
  coreGeo.center();
  const core = new THREE.Mesh(coreGeo, mat);
  group.add(core);

  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    const r = 15 + (i % 2) * 3.5;
    const geo = new THREE.OctahedronGeometry(4.2, 0);
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
  noteShape.absellipse(-8.5, -9, 6.6, 4.8, 0, Math.PI * 2, false, -0.35);
  const head1Geo = new THREE.ExtrudeGeometry(noteShape, {
    depth: 4.2,
    bevelEnabled: true,
    bevelThickness: 1,
    bevelSize: 1,
  });
  head1Geo.center();
  const head1 = new THREE.Mesh(head1Geo, mat);
  head1.position.set(-8.5, -8.5, 0);
  group.add(head1);

  // Notehead 2
  const head2 = head1.clone();
  head2.position.set(8.5, -4, 0);
  group.add(head2);

  // Stems
  const stemGeo = new THREE.BoxGeometry(2.6, 24, 4.2);
  stemGeo.center();
  const stem1 = new THREE.Mesh(stemGeo, mat);
  stem1.position.set(-2.5, 2, 0);
  group.add(stem1);

  const stem2 = new THREE.Mesh(stemGeo, mat);
  stem2.position.set(14.5, 6.5, 0);
  group.add(stem2);

  // Connecting beam
  const beamGeo = new THREE.BoxGeometry(22, 5.2, 4.2);
  beamGeo.center();
  const beam = new THREE.Mesh(beamGeo, mat);
  beam.position.set(6, 17.5, 0);
  beam.rotation.z = 0.2;
  group.add(beam);

  return group;
}

function createChessModel(): THREE.Group {
  const group = new THREE.Group();
  const mat = getPaperMaterial();

  // Flat 2D chess pawn with clean, iconic paper relief silhouette
  const shape = new THREE.Shape();
  // Base
  shape.moveTo(-13, -17);
  shape.lineTo(13, -17);
  shape.lineTo(13, -13.5);
  shape.lineTo(9.5, -10.5);
  // Waist curve up to collar
  shape.lineTo(5.5, -2);
  shape.lineTo(4.5, 3.5);
  // Collar ring
  shape.lineTo(7, 5);
  shape.lineTo(7, 7.5);
  shape.lineTo(3, 7.5);
  // Head bulb dome
  const headR = 6.2;
  const headCY = 13.5;
  const steps = 14;
  for (let i = 0; i <= steps; i++) {
    const a = -Math.PI * 0.2 + (i / steps) * (Math.PI * 1.4);
    shape.lineTo(Math.cos(a) * headR, headCY + Math.sin(a) * headR);
  }
  // Left collar
  shape.lineTo(-3, 7.5);
  shape.lineTo(-7, 7.5);
  shape.lineTo(-7, 5);
  // Left waist curve down to base
  shape.lineTo(-4.5, 3.5);
  shape.lineTo(-5.5, -2);
  shape.lineTo(-9.5, -10.5);
  shape.lineTo(-13, -13.5);
  shape.closePath();

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 4.5,
    bevelEnabled: true,
    bevelThickness: 1.0,
    bevelSize: 1.0,
    bevelSegments: 1,
  });
  geo.center();
  const pawn = new THREE.Mesh(geo, mat);
  group.add(pawn);

  return group;
}

function createMathModel(): THREE.Group {
  const group = new THREE.Group();
  const mat = getPaperMaterial();

  // Flat 2D Sigma (Σ) with beveled relief
  const shape = new THREE.Shape();
  shape.moveTo(-12, 16);
  shape.lineTo(12, 16);
  shape.lineTo(12, 10);
  shape.lineTo(-3.5, 10);
  shape.lineTo(6, 0);
  shape.lineTo(-3.5, -10);
  shape.lineTo(12, -10);
  shape.lineTo(12, -16);
  shape.lineTo(-12, -16);
  shape.lineTo(0.5, 0);
  shape.closePath();

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 4.5,
    bevelEnabled: true,
    bevelThickness: 1.0,
    bevelSize: 1.0,
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
    { height: 14, offset: -11 },
    { height: 22, offset: 0 },
    { height: 31, offset: 11 },
  ];

  barsData.forEach(({ height, offset }) => {
    const barGeo = new THREE.BoxGeometry(6.5, height, 4.5);
    barGeo.center();
    const bar = new THREE.Mesh(barGeo, mat);
    bar.position.set(offset, (height - 31) / 2 + 4, 0);
    group.add(bar);

    // Wick
    const wickGeo = new THREE.BoxGeometry(1.8, height + 9, 2);
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

  // Flat 2D interconnected paper mesh with vertex node beads
  const icoGeo = new THREE.IcosahedronGeometry(16, 0);
  icoGeo.center();
  const wire = new THREE.Mesh(icoGeo, wireMat);
  group.add(wire);

  // Central core bead
  const core = new THREE.Mesh(new THREE.OctahedronGeometry(5.5, 0), mat);
  group.add(core);

  // Node beads on vertices
  const nodeGeo = new THREE.OctahedronGeometry(3.4, 0);
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

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.25);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.7);
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

    // The 8 models laid flat on screen: pawn for chess, larger dimensions, zero rotation
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
      ({ type, domId, creator }) => {
        const group = creator();
        // Strictly flat on the screen with zero rotation
        group.rotation.set(0, 0, 0);
        group.scale.set(0, 0, 0);
        scene.add(group);

        return {
          type,
          domId,
          group,
        };
      }
    );
    modelsRef.current = models;

    // Stable rendering: update positions to lock to DOM slots without floating animation
    let animId: number;

    const render = () => {
      animId = requestAnimationFrame(render);
      const containerRect = container.getBoundingClientRect();
      const canvasWidth = containerRect.width;
      const canvasHeight = containerRect.height;

      models.forEach((item) => {
        const domEl = document.getElementById(item.domId);
        if (!domEl) return;

        const targetRect = domEl.getBoundingClientRect();
        const screenX = targetRect.left + targetRect.width / 2 - containerRect.left;
        const screenY = targetRect.top + targetRect.height / 2 - containerRect.top;

        // Position stably at center of inline placeholder slot, zero rotation, no floating
        item.group.position.x = screenX - canvasWidth / 2;
        item.group.position.y = -(screenY - canvasHeight / 2);
        item.group.position.z = 0;
        item.group.rotation.set(0, 0, 0);
      });

      renderer.render(scene, camera);
    };
    render();

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
