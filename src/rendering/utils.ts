import { vec3, mat4 } from "gl-matrix";

export function applyTransformations(vertex: vec3, transforms: mat4[]): vec3 {
  return transforms.reduce((v, t) => {
    return vec3.transformMat4(v, v, t);
  }, vec3.clone(vertex));
}
