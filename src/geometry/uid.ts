/**
 * Simple generator that yields a new ID every time
 * its called. Used to give unique IDs to geometry.
 */
export const generateUid = (() => {
  let current = 0;

  return function () {
    return current++;
  };
})();
