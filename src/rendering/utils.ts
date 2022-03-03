import { Matrix4 } from "../math/matrix";
import { Vector3 } from "../math/vector";

export function applyTransformations(
  vertex: Vector3,
  transforms: Matrix4[]
): Vector3 {
  let v = vertex.clone();
  transforms.forEach((m, i) => {
    v.transformMat4(m);
  });
  return v;
}
