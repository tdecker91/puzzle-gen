import { Face } from './face';
import { vec3 } from 'gl-matrix';
import { Geometry } from './geometry';
import { IColor } from './color';

/**
 * Makes a (size*size) grid of colored planes for the
 * rubiks cube stickers. Indexed from the top
 * left to bottom right. See Below
 * 
 *    0 1 2 
 *    3 4 5
 *    6 7 8
 * 
 * @param length length of the grid
 * @param size number of elements to segment grid into
 * @param color
 */
export function makeGrid(length: number, size: number, color: IColor): Geometry[] {
  const halfLength = length/2;
  const elementWidth = length/size;
  const halfElementWidth = elementWidth/2;

  let stickers: Geometry[] = [];
  for (let i = 0; i < size; i++) {
    let vOffset = -(-halfLength + halfElementWidth + (elementWidth * i));
    stickers = stickers.concat(makeRow(length, size, color, vOffset))
  }

  return stickers;
}

/**
 * Makes a row of planes for the rubiks cube stickers.
 * indexed from left to right
 * 
 *     0 1 2
 * 
 * @param length length of the row horizontally
 * @param size number of elements to segment row into
 * @param color color
 * @param vOffset vertical offset. places vertices of row vertically offset by this amount from x axis
 */
export function makeRow(length: number, size: number, color: IColor, vOffset: number = 0): Geometry[] {
  const halfLength = length/2;
  const elementWidth = length/size;
  const halfElementWidth = elementWidth/2;

  let stickers = [];
  
  for (let i = 0; i < size; i++) {
    let hOffset = -halfLength + halfElementWidth + (elementWidth * i);
    let vertices: vec3[] = [
      [-halfElementWidth + hOffset, halfElementWidth + vOffset,  0],
      [halfElementWidth  + hOffset, halfElementWidth + vOffset,  0],
      [halfElementWidth  + hOffset, -halfElementWidth + vOffset, 0],
      [-halfElementWidth + hOffset, -halfElementWidth + vOffset, 0],
    ]
    let faces = [
      new Face([0,1,2,3], vertices, color)
    ]
    stickers.push(new Geometry(vertices, faces));
  }

  return stickers;
}