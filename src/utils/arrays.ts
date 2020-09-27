/**
 * Splits an array into chunks
 * 
 * @param array original array
 * @param chunkSize 
 * 
 * @example
 * ```
 * chunkArray([1,2,3,4,5,6], 2)
 * // returns [[1,2], [3,4], [5,6]]
 * ```
 */
export function chunkArray<T>(array: T[], chunkSize: number): T[][] {
  const newSize = Math.ceil(array.length/chunkSize);

  return new Array(newSize)
    .fill(null)
    .map((_, index) => array.slice(index*chunkSize, (index+1)*chunkSize));
}

/**
 * Generates an array of set size filled with a specific value
 * 
 * @param length length of the array
 * @param value value to fill the array with
 */
export function fillArray<T>(length: number, value: T): T[] {
  return new Array(length).fill(value);
}