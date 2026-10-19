import * as THREE from "three";
import { gsap } from "gsap";

export function createSystemScene({
  system,
  appearance = "dark",
  canvas,
  host,
  labels,
  onSelect,
  onLost,
  reducedMotion,
}) {
  const { nodes: systemNodes, edges: systemEdges } = system;
  const paper = appearance === "paper";
  const layerState = { amount: 0 };
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: "low-power",
  });
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-5.4, 5.4, 3.5, -3.5, 0.1, 60);
  camera.position.set(2.8, 8, 10);
  camera.lookAt(0, 0, 0);
  const world = new THREE.Group();
  scene.add(world);
  scene.add(new THREE.HemisphereLight(0xfff5df, 0x343c31, 2.8));
  const key = new THREE.DirectionalLight(0xffe1c2, 3.5);
  key.position.set(-3, 8, 5);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xc5dfdb, 1.5);
  rim.position.set(5, 3, -6);
  scene.add(rim);

  const resources = new Set();
  const own = (object) => {
    resources.add(object);
    return object;
  };
  const block = own(new THREE.BoxGeometry(1.05, 0.24, 0.66));
  const chip = own(new THREE.BoxGeometry(0.61, 0.06, 0.36));
  const outline = own(new THREE.EdgesGeometry(block));
  // Terminal pads and foundations share two instanced draw calls.
  const pads = own(
    new THREE.InstancedMesh(
      own(new THREE.BoxGeometry(0.09, 0.035, 0.11)),
      own(new THREE.MeshBasicMaterial({ color: 0xba997b })),
      systemNodes.length * 6,
    ),
  );
  const foundations = own(
    new THREE.InstancedMesh(
      own(new THREE.BoxGeometry(1.15, 0.07, 0.82)),
      own(new THREE.MeshStandardMaterial({ color: 0x435141, roughness: 0.8 })),
      systemNodes.length,
    ),
  );
  const instance = new THREE.Object3D();
  systemNodes.forEach((data, index) => {
    let padIndex = index * 6;
    for (const side of [-1, 1])
      for (const z of [-0.2, 0, 0.2]) {
        instance.position.set(
          data.position[0] + side * 0.57,
          -0.015,
          data.position[2] + z,
        );
        instance.updateMatrix();
        pads.setMatrixAt(padIndex++, instance.matrix);
      }
    instance.position.set(data.position[0], -0.24, data.position[2]);
    instance.updateMatrix();
    foundations.setMatrixAt(index, instance.matrix);
  });
  pads.computeBoundingSphere();
  foundations.computeBoundingSphere();
  world.add(pads, foundations);
  const nodes = systemNodes.map((data, index) => {
    const group = new THREE.Group();
    group.position.set(...data.position);
    const material = own(
      new THREE.MeshStandardMaterial({
        color: 0x657263,
        metalness: 0.45,
        roughness: 0.5,
      }),
    );
    const kind = data.kind || "compute";
    const geometry =
      kind === "store"
        ? own(new THREE.CylinderGeometry(0.4, 0.4, 0.3, 24))
        : kind === "document"
          ? own(new THREE.BoxGeometry(0.82, 0.12, 0.75))
          : block;
    const core = new THREE.Group();
    group.add(core);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.userData.index = index;
    core.add(mesh);
    const edgeMaterial = own(
      new THREE.LineBasicMaterial({
        color: 0xb8c5ab,
        transparent: true,
        opacity: 0.65,
      }),
    );
    core.add(
      new THREE.LineSegments(
        kind === "compute" || kind === "output"
          ? outline
          : own(new THREE.EdgesGeometry(geometry)),
        edgeMaterial,
      ),
    );
    const top = new THREE.Mesh(
      kind === "store"
        ? own(new THREE.CylinderGeometry(0.29, 0.29, 0.055, 24))
        : chip,
      own(
        new THREE.MeshStandardMaterial({
          color: 0x252e29,
          metalness: 0.4,
          roughness: 0.6,
        }),
      ),
    );
    top.position.y = 0.15;
    group.add(top);
    const support = new THREE.Line(
      own(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(0, -0.2, 0),
          new THREE.Vector3(0, 0.85, 0),
        ]),
      ),
      own(
        new THREE.LineDashedMaterial({
          color: 0xb0bca2,
          dashSize: 0.08,
          gapSize: 0.06,
          transparent: true,
          opacity: 0,
        }),
      ),
    );
    support.computeLineDistances();
    group.add(support);
    world.add(group);
    return { group, core, top, support, mesh, material, edgeMaterial };
  });
  const grid = new THREE.GridHelper(11, 22, 0x54604e, 0x384435);
  grid.position.y = -0.38;
  grid.material.transparent = true;
  grid.material.opacity = paper ? 0.12 : 0.45;
  own(grid.geometry);
  own(grid.material);
  world.add(grid);
  const base = new THREE.Mesh(
    own(new THREE.BoxGeometry(10.4, 0.12, 6.6)),
    own(
      new THREE.MeshStandardMaterial({
        color: paper ? 0xcbd2bf : 0x222b23,
        metalness: 0.1,
        roughness: 0.9,
        transparent: true,
        opacity: paper ? 0.22 : 0.8,
      }),
    ),
  );
  base.position.y = -0.48;
  world.add(base);

  const lines = systemEdges.map(([from, to]) => {
    const geometry = own(new THREE.BufferGeometry());
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(4 * 3), 3),
    );
    const material = own(
      new THREE.LineBasicMaterial({
        color: 0x667760,
        transparent: true,
        opacity: 0.7,
      }),
    );
    const line = new THREE.Line(geometry, material);
    world.add(line);
    const bead = new THREE.Mesh(
      own(new THREE.SphereGeometry(0.045, 8, 6)),
      own(new THREE.MeshBasicMaterial({ color: 0xf1bf92 })),
    );
    bead.visible = false;
    world.add(bead);
    return { from, to, line, bead, path: [] };
  });

  let selected = 0,
    active = [0],
    tracing = false,
    visible = true,
    dirty = true;
  let width = 1,
    height = 1,
    disposed = false,
    lastTime = -Infinity;
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const projected = new THREE.Vector3();
  const resize = () => {
    width = host.clientWidth;
    height = host.clientHeight;
    if (!width || !height) return;
    const coarse = matchMedia("(pointer: coarse)").matches;
    const ratio = Math.min(
      window.devicePixelRatio || 1,
      coarse ? 1.25 : 1.5,
      Math.sqrt(600000 / (width * height)),
    );
    renderer.setSize(
      Math.round(width * ratio),
      Math.round(height * ratio),
      false,
    );
    // Fit both layer states, with room for HTML labels. Layer changes never
    // move a stage sideways or change the camera framing.
    camera.position.set(...(width < 420 ? [0, 14, 8] : [1.6, 10, 12]));
    camera.lookAt(0, 0, 0);
    camera.updateMatrixWorld(true);
    const bounds = new THREE.Box2();
    systemNodes.forEach((node) => {
      for (const y of [-0.45, 1.2]) {
        const p = new THREE.Vector3(
          node.position[0],
          y,
          node.position[2],
        ).applyMatrix4(camera.matrixWorldInverse);
        bounds.expandByPoint(new THREE.Vector2(p.x - 0.7, p.y));
        bounds.expandByPoint(new THREE.Vector2(p.x + 0.7, p.y));
      }
    });
    const size = bounds.getSize(new THREE.Vector2());
    const center = bounds.getCenter(new THREE.Vector2());
    const halfWidth = Math.max(
      5.35,
      size.x / (2 * (1 - 28 / width)),
      (size.y * width) / (2 * (height - 65)),
    );
    const halfHeight = (halfWidth * height) / width;
    camera.left = center.x - halfWidth;
    camera.right = center.x + halfWidth;
    camera.top = center.y + halfHeight + (halfHeight * 10) / height;
    camera.bottom = center.y - halfHeight + (halfHeight * 10) / height;
    camera.updateProjectionMatrix();
    dirty = true;
  };
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(host);
  const intersectionObserver = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    dirty = true;
  });
  intersectionObserver.observe(host);

  function updateLines() {
    for (const edge of lines) {
      const start = nodes[edge.from].group.position
        .clone()
        .add(new THREE.Vector3(0.57, 0, 0));
      const end = nodes[edge.to].group.position
        .clone()
        .add(new THREE.Vector3(-0.57, 0, 0));
      const midpoint = (start.x + end.x) / 2;
      if (
        Math.abs(
          nodes[edge.from].group.position.x - nodes[edge.to].group.position.x,
        ) < 0.1
      ) {
        end.x += 1.14;
        const outside = Math.max(start.x, end.x) + 0.45;
        edge.path = [
          start,
          new THREE.Vector3(outside, start.y, start.z),
          new THREE.Vector3(outside, end.y, end.z),
          end,
        ];
      } else {
        edge.path = [
          start,
          new THREE.Vector3(midpoint, start.y, start.z),
          new THREE.Vector3(midpoint, end.y, end.z),
          end,
        ];
      }
      const positions = edge.line.geometry.attributes.position;
      edge.path.forEach((p, i) => positions.setXYZ(i, p.x, p.y, p.z));
      positions.needsUpdate = true;
      edge.line.geometry.computeBoundingSphere();
    }
  }

  function draw(time) {
    if (disposed || !visible || document.hidden || (!dirty && !tracing)) return;
    if (time - lastTime < 1 / 40) return;
    lastTime = time;
    if (dirty) {
      lines.forEach((edge) => {
        const highlighted =
          active.includes(edge.from) || active.includes(edge.to);
        edge.line.material.color.set(highlighted ? 0xd6a37e : 0x667760);
        edge.line.material.opacity = highlighted ? 0.9 : 0.45;
      });
      nodes.forEach((node) => {
        node.core.position.y = layerState.amount * 0.3;
        node.top.position.y = 0.15 + layerState.amount * 0.7;
        node.support.visible = layerState.amount > 0.001;
        node.support.material.opacity = layerState.amount * 0.65;
      });
      nodes.forEach((node, index) => {
        node.material.color.set(active.includes(index) ? 0xc28c62 : 0x596956);
        node.material.emissive.set(
          active.includes(index) ? 0x422415 : 0x000000,
        );
        node.edgeMaterial.color.set(index === selected ? 0xffd5aa : 0x9bab8e);
      });
      world.updateMatrixWorld(true);
      nodes.forEach((node, i) => {
        // DOM labels give the 3D nodes the same keyboard and screen-reader access.
        projected
          .copy(node.group.position)
          .add(new THREE.Vector3(0, 0.4 + layerState.amount * 0.7, 0));
        world.localToWorld(projected);
        projected.project(camera);
        labels[i].style.left = `${(projected.x * 0.5 + 0.5) * width}px`;
        labels[i].style.top = `${(-projected.y * 0.5 + 0.5) * height}px`;
      });
    }
    lines.forEach((edge) => {
      edge.bead.visible = tracing && !reducedMotion && active.includes(edge.to);
      if (edge.bead.visible) {
        const t = (time * 0.65) % 1;
        const segment = Math.min(2, Math.floor(t * 3));
        edge.bead.position.lerpVectors(
          edge.path[segment],
          edge.path[segment + 1],
          t * 3 - segment,
        );
      }
    });
    renderer.render(scene, camera);
    dirty = false;
  }
  const setPointer = (event) => {
    const rect = canvas.getBoundingClientRect();
    pointer.set(
      ((event.clientX - rect.left) / rect.width) * 2 - 1,
      -((event.clientY - rect.top) / rect.height) * 2 + 1,
    );
    raycaster.setFromCamera(pointer, camera);
    return raycaster.intersectObjects(
      nodes.map((node) => node.mesh),
      false,
    )[0];
  };
  const onClick = (event) => {
    const hit = setPointer(event);
    if (hit) onSelect(hit.object.userData.index);
  };
  const onMove = (event) => {
    canvas.style.cursor = setPointer(event) ? "pointer" : "default";
  };
  const onContextLost = (event) => {
    event.preventDefault();
    onLost();
  };
  canvas.addEventListener("click", onClick);
  canvas.addEventListener("pointermove", onMove);
  canvas.addEventListener("webglcontextlost", onContextLost);
  const onVisibility = () => {
    dirty = true;
  };
  document.addEventListener("visibilitychange", onVisibility);
  gsap.ticker.add(draw);
  updateLines();
  resize();
  draw(0);

  return {
    select(index, group = [index], isTracing = false) {
      selected = index;
      active = group;
      tracing = isTracing;
      dirty = true;
    },
    setMotion(reduced) {
      reducedMotion = reduced;
      if (reduced)
        gsap.getTweensOf(layerState).forEach((tween) => tween.progress(1));
      dirty = true;
    },
    setLayers(exploded) {
      gsap.to(layerState, {
        amount: exploded ? 1 : 0,
        duration: reducedMotion ? 0 : 0.8,
        ease: "power3.inOut",
        overwrite: true,
        onUpdate: () => {
          dirty = true;
        },
      });
    },
    dispose() {
      disposed = true;
      gsap.ticker.remove(draw);
      gsap.killTweensOf(layerState);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("click", onClick);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      resources.forEach((resource) => resource.dispose());
      renderer.dispose();
      renderer.forceContextLoss();
    },
  };
}
