export type CinematicFrame = {
  /** Normalized document story position, from hero (0) to contact (1). */
  chapter: number;
  hero: number;
  velocity: number;
  pointerX: number;
  pointerY: number;
  reducedMotion: boolean;
};

export type CinematicRenderer = {
  resize(width: number, height: number): void;
  render(frame: CinematicFrame): void;
  dispose(): void;
};

type Vec3 = [number, number, number];
type Matrix = Float32Array;
type Pose = { open: number; x: number; y: number; roll: number; yaw: number; scale: number; tint: number };
type Resources = {
  program: WebGLProgram;
  buffer: WebGLBuffer;
  count: number;
  position: number;
  normal: number;
  material: number;
  model: WebGLUniformLocation;
  viewProjection: WebGLUniformLocation;
  eye: WebGLUniformLocation;
  light: WebGLUniformLocation;
  tint: WebGLUniformLocation;
  tone: WebGLUniformLocation;
};

const LENGTH = 0.84;
const clamp = (value: number, minimum = 0, maximum = 1) => Math.max(minimum, Math.min(maximum, value));
const finite = (value: number) => Number.isFinite(value) ? value : 0;
const mix = (a: number, b: number, t: number) => a + (b - a) * t;
const smooth = (value: number) => value * value * (3 - 2 * value);
const radians = (degrees: number) => degrees * Math.PI / 180;

function identity(): Matrix {
  return new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
}

function multiply(a: Matrix, b: Matrix): Matrix {
  const result = new Float32Array(16);
  for (let column = 0; column < 4; column++) {
    for (let row = 0; row < 4; row++) {
      let value = 0;
      for (let k = 0; k < 4; k++) value += a[k * 4 + row] * b[column * 4 + k];
      result[column * 4 + row] = value;
    }
  }
  return result;
}

function translate(x: number, y: number, z: number): Matrix {
  const result = identity();
  result[12] = x; result[13] = y; result[14] = z;
  return result;
}

function rotate(axis: "x" | "y" | "z", angle: number): Matrix {
  const result = identity();
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  if (axis === "x") { result[5] = c; result[6] = s; result[9] = -s; result[10] = c; }
  if (axis === "y") { result[0] = c; result[2] = s; result[8] = -s; result[10] = c; }
  if (axis === "z") { result[0] = c; result[1] = s; result[4] = -s; result[5] = c; }
  return result;
}

function scale(value: number): Matrix {
  const result = identity();
  result[0] = value; result[5] = value; result[10] = value;
  return result;
}

function normalize(v: Vec3): Vec3 {
  const length = Math.hypot(...v) || 1;
  return [v[0] / length, v[1] / length, v[2] / length];
}

function cross(a: Vec3, b: Vec3): Vec3 {
  return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
}

function view(eye: Vec3): Matrix {
  const z = normalize(eye);
  const x = normalize(cross([0, 1, 0], z));
  const y = cross(z, x);
  return new Float32Array([
    x[0], y[0], z[0], 0, x[1], y[1], z[1], 0, x[2], y[2], z[2], 0,
    -(x[0] * eye[0] + x[1] * eye[1] + x[2] * eye[2]),
    -(y[0] * eye[0] + y[1] * eye[1] + y[2] * eye[2]),
    -(z[0] * eye[0] + z[1] * eye[1] + z[2] * eye[2]), 1,
  ]);
}

function perspective(aspect: number, fieldOfView: number): Matrix {
  const f = 1 / Math.tan(fieldOfView / 2);
  const near = 0.1;
  const far = 40;
  return new Float32Array([
    f / aspect, 0, 0, 0, 0, f, 0, 0, 0, 0, (far + near) / (near - far), -1,
    0, 0, (2 * far * near) / (near - far), 0,
  ]);
}

/** One closed, beveled plate and its hinge; the same small mesh is reused six times. */
function segmentMesh(): Float32Array {
  const vertices: number[] = [];
  const halfWidth = 0.42;
  const halfDepth = 0.065;
  const bevel = 0.028;

  const triangle = (a: Vec3, b: Vec3, c: Vec3, facing: Vec3, material: number) => {
    let normal = normalize(cross([b[0] - a[0], b[1] - a[1], b[2] - a[2]], [c[0] - a[0], c[1] - a[1], c[2] - a[2]]));
    if (normal[0] * facing[0] + normal[1] * facing[1] + normal[2] * facing[2] < 0) {
      [b, c] = [c, b];
      normal = [-normal[0], -normal[1], -normal[2]];
    }
    for (const point of [a, b, c]) vertices.push(...point, ...normal, material);
  };
  const quad = (a: Vec3, b: Vec3, c: Vec3, d: Vec3, facing: Vec3, material: number) => {
    triangle(a, b, c, facing, material);
    triangle(a, c, d, facing, material);
  };
  const ring = (inset: number, z: number): Vec3[] => {
    const x = halfWidth - inset;
    const bottom = inset;
    const top = LENGTH - inset;
    const corner = bevel * 0.7;
    return [
      [-x + corner, bottom, z], [x - corner, bottom, z], [x, bottom + corner, z], [x, top - corner, z],
      [x - corner, top, z], [-x + corner, top, z], [-x, top - corner, z], [-x, bottom + corner, z],
    ];
  };
  const front = ring(bevel, halfDepth);
  const frontEdge = ring(0, halfDepth - bevel);
  const back = ring(bevel, -halfDepth);
  const backEdge = ring(0, -halfDepth + bevel);
  for (let i = 0; i < 8; i++) {
    const next = (i + 1) % 8;
    const outward: Vec3 = [(frontEdge[i][0] + frontEdge[next][0]) / 2, (frontEdge[i][1] + frontEdge[next][1]) / 2 - LENGTH / 2, 0];
    triangle([0, LENGTH / 2, halfDepth], front[i], front[next], [0, 0, 1], 0);
    triangle([0, LENGTH / 2, -halfDepth], back[i], back[next], [0, 0, -1], 0);
    quad(front[i], frontEdge[i], frontEdge[next], front[next], [outward[0], outward[1], 1], 1);
    quad(back[i], backEdge[i], backEdge[next], back[next], [outward[0], outward[1], -1], 1);
    quad(frontEdge[i], backEdge[i], backEdge[next], frontEdge[next], outward, 2);
  }
  // A narrow inlay is part of the material, with no bloom or extra rendering pass.
  quad([0.352, 0.1, 0.066], [0.366, 0.1, 0.066], [0.366, LENGTH - 0.1, 0.066], [0.352, LENGTH - 0.1, 0.066], [0, 0, 1], 3);
  const hingeRadius = 0.071;
  for (let i = 0; i < 16; i++) {
    const a = i * Math.PI / 8;
    const b = (i + 1) * Math.PI / 8;
    const aY = Math.cos(a) * hingeRadius;
    const aZ = Math.sin(a) * hingeRadius;
    const bY = Math.cos(b) * hingeRadius;
    const bZ = Math.sin(b) * hingeRadius;
    const leftA: Vec3 = [-0.372, aY, aZ];
    const rightA: Vec3 = [0.372, aY, aZ];
    const leftB: Vec3 = [-0.372, bY, bZ];
    const rightB: Vec3 = [0.372, bY, bZ];
    quad(leftA, rightA, rightB, leftB, [0, Math.cos((a + b) / 2), Math.sin((a + b) / 2)], 2);
    triangle([-0.372, 0, 0], leftA, leftB, [-1, 0, 0], 1);
    triangle([0.372, 0, 0], rightA, rightB, [1, 0, 0], 1);
  }
  return new Float32Array(vertices);
}

const vertexSource = `
  attribute vec3 aPosition;
  attribute vec3 aNormal;
  attribute float aMaterial;
  uniform mat4 uModel;
  uniform mat4 uViewProjection;
  varying mediump vec3 vPosition;
  varying mediump vec3 vNormal;
  varying mediump float vMaterial;
  varying mediump float vLocalY;
  void main() {
    vec4 world = uModel * vec4(aPosition, 1.0);
    vPosition = world.xyz;
    vNormal = mat3(uModel) * aNormal;
    vMaterial = aMaterial;
    vLocalY = aPosition.y;
    gl_Position = uViewProjection * world;
  }
`;

const fragmentSource = `
  precision mediump float;
  uniform vec3 uEye;
  uniform vec3 uLight;
  uniform float uTint;
  uniform float uTone;
  varying mediump vec3 vPosition;
  varying mediump vec3 vNormal;
  varying mediump float vMaterial;
  varying mediump float vLocalY;
  void main() {
    vec3 normal = normalize(vNormal);
    vec3 direction = normalize(uEye - vPosition);
    vec3 light = normalize(uLight - vPosition);
    vec3 halfVector = normalize(light + direction);
    float diffuse = max(dot(normal, light), 0.0);
    float fill = max(dot(normal, normalize(vec3(0.8, -0.2, 0.5))), 0.0);
    float sky = max(normal.y, 0.0);
    float bevel = step(0.5, vMaterial) * (1.0 - step(1.5, vMaterial));
    float hinge = step(1.5, vMaterial) * (1.0 - step(2.5, vMaterial));
    float inlay = step(2.5, vMaterial);
    vec3 base = mix(vec3(0.41, 0.48, 0.62), vec3(0.65, 0.72, 0.84), bevel);
    base = mix(base, vec3(0.22, 0.29, 0.42), hinge);
    vec3 keyColor = mix(vec3(0.79, 0.88, 1.0), vec3(0.79, 0.73, 1.0), uTint);
    float specular = pow(max(dot(normal, halfVector), 0.0), mix(28.0, 58.0, bevel)) * diffuse;
    float rim = pow(1.0 - max(dot(normal, direction), 0.0), 3.0);
    float joint = 0.84 + 0.16 * smoothstep(0.0, 0.16, min(vLocalY, ${LENGTH.toFixed(2)} - vLocalY));
    vec3 color = base * (0.22 + sky * 0.15 + diffuse * 0.76 + fill * 0.13) * joint * uTone;
    color += keyColor * specular * (0.32 + bevel * 0.23);
    color += vec3(0.18, 0.35, 0.69) * rim * (0.1 + fill * 0.15);
    color = mix(color, vec3(0.26, 0.53, 0.94) * (0.72 + diffuse * 0.2), inlay);
    gl_FragColor = vec4(clamp(color * 0.7, 0.0, 1.0), 1.0);
  }
`;

function createResources(gl: WebGLRenderingContext): Resources | null {
  const compile = (type: number, source: string) => {
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) { gl.deleteShader(shader); return null; }
    return shader;
  };
  const vertex = compile(gl.VERTEX_SHADER, vertexSource);
  const fragment = compile(gl.FRAGMENT_SHADER, fragmentSource);
  if (!vertex || !fragment) { if (vertex) gl.deleteShader(vertex); if (fragment) gl.deleteShader(fragment); return null; }
  const program = gl.createProgram();
  if (!program) { gl.deleteShader(vertex); gl.deleteShader(fragment); return null; }
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  gl.deleteShader(vertex);
  gl.deleteShader(fragment);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) { gl.deleteProgram(program); return null; }
  const buffer = gl.createBuffer();
  const model = gl.getUniformLocation(program, "uModel");
  const viewProjection = gl.getUniformLocation(program, "uViewProjection");
  const eye = gl.getUniformLocation(program, "uEye");
  const light = gl.getUniformLocation(program, "uLight");
  const tint = gl.getUniformLocation(program, "uTint");
  const tone = gl.getUniformLocation(program, "uTone");
  if (!buffer || !model || !viewProjection || !eye || !light || !tint || !tone) {
    if (buffer) gl.deleteBuffer(buffer);
    gl.deleteProgram(program);
    return null;
  }
  const mesh = segmentMesh();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, mesh, gl.STATIC_DRAW);
  return {
    program, buffer, count: mesh.length / 7, model, viewProjection, eye, light, tint, tone,
    position: gl.getAttribLocation(program, "aPosition"), normal: gl.getAttribLocation(program, "aNormal"), material: gl.getAttribLocation(program, "aMaterial"),
  };
}

function interpolatePose(a: Pose, b: Pose, t: number): Pose {
  return { open: mix(a.open, b.open, t), x: mix(a.x, b.x, t), y: mix(a.y, b.y, t), roll: mix(a.roll, b.roll, t), yaw: mix(a.yaw, b.yaw, t), scale: mix(a.scale, b.scale, t), tint: mix(a.tint, b.tint, t) };
}

function scenePose(chapter: number, hero: number): Pose {
  const upright: Pose = { open: 0, x: 1.5, y: 0.12, roll: -0.14, yaw: -0.65, scale: 1.12, tint: 0.12 };
  const bridge: Pose = { open: 1, x: 1.5, y: 0.08, roll: -1.14, yaw: -0.45, scale: 0.97, tint: 0.2 };
  const poses: Pose[] = [
    interpolatePose(upright, bridge, smooth(hero)),
    { open: 0.32, x: 1.7, y: 0.08, roll: -0.7, yaw: 0.65, scale: 1, tint: 0.2 },
    { open: 0.62, x: 1.8, y: 0.12, roll: -0.9, yaw: -0.7, scale: 1.02, tint: 0.25 },
    { open: 0.15, x: 1.9, y: 0.08, roll: -0.25, yaw: 0.8, scale: 0.94, tint: 0.12 },
    { open: 0.5, x: 1.8, y: 0.1, roll: -1, yaw: -0.62, scale: 1, tint: 0.25 },
    { open: 0.2, x: 2.4, y: 0.05, roll: -0.18, yaw: -0.5, scale: 0.82, tint: 0.15 },
    { open: 0.58, x: 2.1, y: 0.08, roll: -0.7, yaw: 0.62, scale: 0.96, tint: 0.23 },
    { open: 0.25, x: 1.85, y: 0.02, roll: -0.35, yaw: -0.75, scale: 1, tint: 0.18 },
    { open: 0.55, x: 2.1, y: 0.1, roll: -0.82, yaw: 0.72, scale: 0.95, tint: 0.25 },
    { open: 0.15, x: 2.1, y: 0.05, roll: -0.18, yaw: -0.5, scale: 0.9, tint: 0.12 },
    { open: 0.38, x: 2.4, y: 0.08, roll: -0.72, yaw: 0.6, scale: 0.95, tint: 0.18 },
  ];
  const position = clamp(chapter, 0, poses.length - 1);
  const index = Math.floor(position);
  return interpolatePose(poses[index], poses[Math.min(index + 1, poses.length - 1)], smooth(position - index));
}

/** A single context and six small draw calls. The caller owns every frame. */
export function createCinematicRenderer(canvas: HTMLCanvasElement, onInvalidate: () => void): CinematicRenderer | null {
  canvas.dataset.ready = "false";
  let gl: WebGLRenderingContext | null;
  try {
    gl = canvas.getContext("webgl", { alpha: true, antialias: true, depth: true, stencil: false, powerPreference: "low-power", preserveDrawingBuffer: false });
  } catch { return null; }
  if (!gl) return null;
  const context = gl;
  let resources = createResources(context);
  if (!resources) return null;
  let disposed = false;
  let lost = false;
  let width = 1;
  let height = 1;

  const resize = (nextWidth: number, nextHeight: number) => {
    if (disposed) return;
    width = Math.max(1, finite(nextWidth));
    height = Math.max(1, finite(nextHeight));
    const budget = width <= 800 ? 450_000 : 1_000_000;
    const ratio = Math.min(window.devicePixelRatio || 1, 1.5, Math.sqrt(budget / (width * height)));
    const pixelWidth = Math.max(1, Math.floor(width * ratio));
    const pixelHeight = Math.max(1, Math.floor(height * ratio));
    if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
      canvas.width = pixelWidth;
      canvas.height = pixelHeight;
      if (!lost) context.viewport(0, 0, pixelWidth, pixelHeight);
      onInvalidate();
    }
  }

  const onLost = (event: Event) => {
    event.preventDefault();
    lost = true;
    resources = null;
    canvas.dataset.ready = "false";
    onInvalidate();
  };
  const onRestored = () => {
    if (disposed) return;
    resources = createResources(context);
    lost = !resources;
    context.viewport(0, 0, canvas.width, canvas.height);
    onInvalidate();
  };
  canvas.addEventListener("webglcontextlost", onLost);
  canvas.addEventListener("webglcontextrestored", onRestored);

  return {
    resize,
    render(frame) {
      if (disposed || lost || !resources || context.isContextLost()) return;
      const chapter = clamp(finite(frame.chapter)) * 10;
      const hero = clamp(finite(frame.hero));
      const pointerX = frame.reducedMotion ? 0 : clamp(finite(frame.pointerX), -1, 1);
      const pointerY = frame.reducedMotion ? 0 : clamp(finite(frame.pointerY), -1, 1);
      const velocity = frame.reducedMotion ? 0 : clamp(finite(frame.velocity), -1, 1);
      const mobile = width <= 800;
      const pose = scenePose(chapter, hero);
      if (frame.reducedMotion) { pose.open = mix(0.45, pose.open, 0.4); pose.roll *= 0.6; pose.yaw *= 0.45; }
      const cameraTurn = frame.reducedMotion ? 0 : mix(-0.15, 0.24, hero) * Math.exp(-chapter * 0.22) + Math.sin(chapter * 0.62) * 0.13 + pointerX * 0.035;
      const distance = mobile ? 8 : 7.3;
      const eye: Vec3 = [Math.sin(cameraTurn) * distance, 0.55 + pointerY * 0.1, Math.cos(cameraTurn) * distance];
      const viewProjection = multiply(perspective(width / height, radians(mobile ? 42 : 36)), view(eye));
      const folds = [8, 76, -122, 116, -110, 58];
      const unfolded = [0, 14, -28, 28, -24, 12];
      const openFrame = [0, 0, 90, 0, 90, 0];
      const contact = smooth(clamp(chapter - 9));
      const joints: Matrix[] = [];
      let joint = identity();
      let minY = 0; let maxY = 0; let minZ = 0; let maxZ = 0;
      for (let i = 0; i < folds.length; i++) {
        const foldedAngle = mix(folds[i], unfolded[i], pose.open);
        joint = multiply(joint, rotate("x", radians(mix(foldedAngle, openFrame[i], contact))));
        joints.push(joint);
        joint = multiply(joint, translate(0, LENGTH, 0));
        minY = Math.min(minY, joint[13]); maxY = Math.max(maxY, joint[13]);
        minZ = Math.min(minZ, joint[14]); maxZ = Math.max(maxZ, joint[14]);
      }
      let placement = translate(mobile ? pose.x * 0.38 : pose.x, pose.y + (mobile ? -0.13 : 0) + velocity * 0.015, 0);
      placement = multiply(placement, rotate("y", pose.yaw + pointerX * 0.055));
      placement = multiply(placement, rotate("z", pose.roll + velocity * 0.025));
      placement = multiply(placement, scale(pose.scale * (mobile ? 0.7 : 1)));
      placement = multiply(placement, translate(0, -(minY + maxY) / 2, -(minZ + maxZ) / 2));

      context.viewport(0, 0, canvas.width, canvas.height);
      context.clearColor(0, 0, 0, 0);
      context.clear(context.COLOR_BUFFER_BIT | context.DEPTH_BUFFER_BIT);
      context.enable(context.DEPTH_TEST);
      context.depthFunc(context.LEQUAL);
      context.enable(context.CULL_FACE);
      context.cullFace(context.BACK);
      context.disable(context.BLEND);
      context.useProgram(resources.program);
      context.bindBuffer(context.ARRAY_BUFFER, resources.buffer);
      context.enableVertexAttribArray(resources.position);
      context.enableVertexAttribArray(resources.normal);
      context.enableVertexAttribArray(resources.material);
      context.vertexAttribPointer(resources.position, 3, context.FLOAT, false, 28, 0);
      context.vertexAttribPointer(resources.normal, 3, context.FLOAT, false, 28, 12);
      context.vertexAttribPointer(resources.material, 1, context.FLOAT, false, 28, 24);
      context.uniformMatrix4fv(resources.viewProjection, false, viewProjection);
      context.uniform3f(resources.eye, ...eye);
      context.uniform3f(resources.light, -3.5 + Math.sin(chapter * 0.5) * 0.8, 5.4, 5.8);
      context.uniform1f(resources.tint, pose.tint);
      for (let i = 0; i < joints.length; i++) {
        context.uniformMatrix4fv(resources.model, false, multiply(placement, joints[i]));
        context.uniform1f(resources.tone, 0.9 + i * 0.025);
        context.drawArrays(context.TRIANGLES, 0, resources.count);
      }
      canvas.dataset.ready = "true";
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      canvas.removeEventListener("webglcontextlost", onLost);
      canvas.removeEventListener("webglcontextrestored", onRestored);
      if (resources && !lost) { context.deleteBuffer(resources.buffer); context.deleteProgram(resources.program); }
      resources = null;
      canvas.dataset.ready = "false";
      // React StrictMode can initialize the same canvas again immediately.
      // Release owned resources without deliberately losing its reusable context.
      if (!lost && !context.isContextLost()) {
        context.clearColor(0, 0, 0, 0);
        context.clear(context.COLOR_BUFFER_BIT | context.DEPTH_BUFFER_BIT);
      }
    },
  };
}
