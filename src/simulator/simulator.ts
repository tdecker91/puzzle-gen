export type Pair<T> = [T, T];
export type TurnDefinitions = Pair<string>[];

/**
 * Class for simulating turns on symmetric twisty puzzles
 */
export class Simulator {

  // Map of sticker ID to its value
  protected stickers: Map<string, string>;
  
  // Map of faces to stickers on the face
  protected faces: Map<string, string[]>;
  
  // Map of turns to stickers to update
  protected turns: Map<string, Pair<string>[]>;

  constructor() {
    this.stickers = new Map();
    this.faces = new Map();
    this.turns = new Map();
  }

  /**
   * 
   * @param stickers array of sticker values
   * @param label label to reference the face by
   * @returns object with the faceId and list of sticker ids.
   *  faceId will be label if that is present. Otherwise it
   *  will be generated.
   * @example
   * ```
   * const stickers = ['red', 'red', 'red', 'red'];
   * 
   * // Add the F face
   * addFace(stickers, 'F')
   * ```
   */
  addFace(stickers: string[], label?: string): { faceId: string, stickerIds: string[] } {
    if (label && this.faces.has(label)) {
      throw `Face ${label} already exists`;
    } else if (!label) {
      label = (this.faces.size + 1).toString();
    }

    // Add Stickers
    const stickerIds = stickers.reduce((stickerIds, nextSticker) => {
      const stickerId = (this.stickers.size + 1).toString();
      this.stickers.set(stickerId, nextSticker);

      stickerIds.push(stickerId);
      return stickerIds;
    }, []);

    // Add Face
    this.faces.set(label, stickerIds);

    return {
      faceId: label,
      stickerIds
    };
  }

  /**
   * Creates a turn definition that tells the simulator
   * what sticker values to change when turning.
   * 
   * A change is an array with two sticker ids (ex. ['sticker1', 'sticker2'])
   * this means that when turning 'sticker1' will go to 'sticker2'.
   * Or when doing a reverse turn, `sticker2' will go to 'sticker1'
   * 
   * @param changes list of turn definitions.
   * @param label label to reference the turn by
   * @returns label of the turn that was created
   */
  addTurn(changes: Pair<string>[], label?: string): string {
    if (label && this.turns.has(label)) {
      throw `Turn ${label} already exists`;
    } else if (!label) {
      label = (this.turns.size + 1).toString();
    }

    this.turns.set(label, changes);

    return label;
  }
  

  /**
   * Executes a turn on the puzzle
   * 
   * @param label label of the turn to execute
   * @param prime true to do the turn in reverse
   */
  doTurn(label: string, reverse: boolean = false) {
    const changes = this.turns.get(label);

    if (!changes) {
      throw `Unknown turn ${label}`;
    }

    let movingSticker =  reverse ? 1 : 0;
    let replacedSticker = reverse ? 0 : 1;

    let cached = {};
    changes.forEach(change => {
      // Cache value we're replacing
      cached[change[replacedSticker]] = this.stickers.get(change[replacedSticker]);

      // Update sticker with new value
      this.stickers.set(
        change[replacedSticker],
        cached[change[movingSticker]] || this.stickers.get(change[movingSticker])
      );
    });
  }

  /**
   * checks that every sticker on every face
   * is the same value
   */
  isSolved(): boolean {
    const faces = this.faces.entries();
    let entry = faces.next();
    
    do {
      const stickerIds = entry.value[1];
      let value = this.stickers.get(stickerIds[0]);

      for (let id of stickerIds) {
        if (value != this.stickers.get(id))
          return false;
      }

      entry = faces.next();
    } while (!entry.done)

    return true;
  }

  getValues(): { [faceName: string]: string[]} {
    let values = {};

    this.faces.forEach((stickerIds, key) => {
      values[key] = stickerIds.map(id => this.stickers.get(id));
    });

    return values;
  }

}