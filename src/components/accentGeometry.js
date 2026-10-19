import * as THREE from "three";

// One visual language: small terminals and an open circuit.
export function createAccentGeometry(kind) {
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-2, 2, 2, -2, 0.1, 30);
  camera.position.z = 10;
  const group = new THREE.Group();
  scene.add(group);
  const owned = new Set();
  const own = (resource) => {
    owned.add(resource);
    return resource;
  };
  const copper = own(
    new THREE.MeshStandardMaterial({
      color: 0xb38060,
      metalness: 0.35,
      roughness: 0.52,
    }),
  );
  const sage = own(
    new THREE.MeshStandardMaterial({
      color: 0x87927b,
      metalness: 0.2,
      roughness: 0.7,
    }),
  );
  scene.add(new THREE.HemisphereLight(0xfff6e5, 0x46523e, 2.4));
  const light = new THREE.DirectionalLight(0xffe9d0, 2.3);
  light.position.set(-2, 4, 5);
  scene.add(light);
  let aspect = 1,
    lastActive = -1;
  const state = { x: 0, y: 0, emphasis: 0 };
  let terminal, terminals, rings, route;
  const matrix = new THREE.Object3D();
  const muted = new THREE.Color(0xabb1a0),
    accent = new THREE.Color(0xa66543);

  if (kind === "rail") {
    terminals = new THREE.InstancedMesh(
      own(new THREE.BoxGeometry(0.28, 0.12, 0.28)),
      sage,
      4,
    );
    rings = new THREE.InstancedMesh(
      own(new THREE.TorusGeometry(0.26, 0.018, 6, 32)),
      copper,
      4,
    );
    group.add(terminals, rings);
    const geometry = own(new THREE.BufferGeometry());
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(81 * 3), 3),
    );
    route = new THREE.Line(
      geometry,
      own(new THREE.LineBasicMaterial({ color: 0xb8b9a8 })),
    );
    group.add(route);
  } else {
    const ring = new THREE.Mesh(
      own(new THREE.TorusGeometry(1.58, 0.018, 6, 72, Math.PI * 1.75)),
      copper,
    );
    ring.rotation.z = Math.PI / 2;
    ring.rotation.x = 0.16;
    group.add(ring);
    const vertices = [];
    for (let i = 0; i < 28; i++) {
      const angle = (i / 28) * Math.PI * 2;
      if (angle > 0.2 && angle < 1.3) continue;
      const outer = i % 7 === 0 ? 1.92 : 1.86;
      vertices.push(
        Math.cos(angle) * 1.78,
        Math.sin(angle) * 1.78,
        0,
        Math.cos(angle) * outer,
        Math.sin(angle) * outer,
        0,
      );
    }
    group.add(
      new THREE.LineSegments(
        own(
          new THREE.BufferGeometry().setAttribute(
            "position",
            new THREE.Float32BufferAttribute(vertices, 3),
          ),
        ),
        own(
          new THREE.LineBasicMaterial({
            color: 0x98a18d,
            transparent: true,
            opacity: 0.55,
          }),
        ),
      ),
    );
    terminal = new THREE.Mesh(
      own(new THREE.SphereGeometry(0.045, 8, 6)),
      copper,
    );
    terminal.position.set(0, 1.58, 0);
    group.add(terminal);
  }

  function placeTerminals(active) {
    for (let i = 0; i < 4; i++) {
      matrix.position.set((((i + 0.5) / 4) * 2 - 1) * aspect, 0, 0);
      matrix.rotation.set(0.65, 0.4, Math.PI / 4);
      matrix.scale.setScalar(i === active ? 1.18 : 1);
      matrix.updateMatrix();
      terminals.setMatrixAt(i, matrix.matrix);
      terminals.setColorAt(i, i === active ? accent : muted);
      matrix.rotation.set(0.28, 0, 0);
      matrix.updateMatrix();
      rings.setMatrixAt(i, matrix.matrix);
    }
    terminals.instanceMatrix.needsUpdate =
      rings.instanceMatrix.needsUpdate = true;
    terminals.instanceColor.needsUpdate = true;
  }
  return {
    scene,
    camera,
    resize(nextAspect) {
      aspect = nextAspect;
      const extent = kind === "rail" ? 0.8 : 2.25;
      camera.left = -extent * aspect;
      camera.right = extent * aspect;
      camera.top = extent;
      camera.bottom = -extent;
      camera.updateProjectionMatrix();
      if (kind === "rail") {
        // Keep terminals exactly under the four DOM navigation labels.
        aspect *= extent;
        const positions = route.geometry.attributes.position;
        for (let i = 0; i <= 80; i++) {
          const t = i / 80;
          positions.setXYZ(
            i,
            (t * 2 - 1) * aspect * 0.94,
            Math.sin(t * Math.PI * 4) * 0.045,
            -0.1,
          );
        }
        positions.needsUpdate = true;
        route.geometry.computeBoundingSphere();
        placeTerminals(lastActive);
      }
    },
    update({ pointer, progress, engaged, active, reduced }, delta) {
      const blend = reduced ? 1 : 1 - Math.exp(-delta * 12);
      const x = reduced ? 0 : pointer.y * 0.12 + progress * 0.08;
      const y = reduced ? 0 : pointer.x * 0.18;
      const emphasis = reduced ? 0 : engaged ? 1 : 0;
      state.x += (x - state.x) * blend;
      state.y += (y - state.y) * blend;
      state.emphasis += (emphasis - state.emphasis) * blend;
      if (kind === "rail") {
        if (active !== lastActive) placeTerminals(active);
      } else {
        group.rotation.x = state.x;
        group.rotation.y = state.y;
        group.rotation.z = -state.emphasis * 0.09;
        if (kind === "orbit")
          copper.emissive.setRGB(
            state.emphasis * 0.07,
            state.emphasis * 0.03,
            0,
          );
      }
      lastActive = active;
      return (
        Math.abs(state.x - x) +
          Math.abs(state.y - y) +
          Math.abs(state.emphasis - emphasis) >
        0.001
      );
    },
    dispose() {
      owned.forEach((resource) => resource.dispose());
    },
  };
}
