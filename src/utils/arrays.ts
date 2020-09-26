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