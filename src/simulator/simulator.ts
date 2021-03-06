export type Pair<T> = [T, T];
export type TurnDefinitions = Pair<string>[];
export type SimulatorValues = { [faceName: string]: string[] };

/**
 * Class for simulating turns on symmetric twisty puzzles. This is acheived by
 * defining a set of faces with stickers, and a set of turns.
 *
 * @see {@link SkewbSimulator}
 *
 * @example
 * ```typescript
 * // extend class to create a coin simulator
 * export class CoinSimulator extends Simulator {
 *   constructor() {
 *     super()
 *
 *     // Add a head face with one "heads" sticker
 *     // Label this face "top"
 *      const { stickerIds: top } = this.addFace(['heads'], 'top');
 *
 *     // Add a tail face with one "tails" sticker
 *     // Label this face "bottom"
 *      const { stickerIds: bottom } = this.addface(['tails'], 'bottom');
 *
 *     // Define a turn by providing the
 *     // sticker id for the top and bottom stickers.
 *     // Label this "turnOver"
 *     this.addTurn([top[0], bottom[0]], "turnOver");
 *   }
 *
 *   // Flip the coin over
 *   turnOver() {
 *     // Execute the "turnOver" turn we created
 *     this.doTurn("turnOver")
 *   }
 *
 * }
 * ```
 */
export class Simulator {
  /**
   * Map of sticker ID to its value
   */
  protected stickers: Map<string, string>;

  /**
   * Map of faces to stickers on the face
   */
  protected faces: Map<string, string[]>;

  /**
   * Map of turns to stickers to update
   */
  protected turns: Map<string, Pair<string>[]>;

  constructor() {
    this.stickers = new Map();
    this.faces = new Map();
    this.turns = new Map();
  }

  /**
   * Adds a face of stickers to the puzzle.
   *
   * @param stickers - array of sticker values
   * @param label - label to reference the face by
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
  addFace(
    stickers: string[],
    label?: string
  ): { faceId: string; stickerIds: string[] } {
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
      stickerIds,
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
   * @param changes - list of turn definitions.
   * @param label - label to reference the turn by
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
   * @param label - label of the turn to execute
   * @param prime - true to do the turn in reverse
   */
  doTurn(label: string, reverse: boolean = false) {
    const changes = this.turns.get(label);

    if (!changes) {
      throw `Unknown turn ${label}`;
    }

    let movingSticker = reverse ? 1 : 0;
    let replacedSticker = reverse ? 0 : 1;

    let cached = {};
    changes.forEach((change) => {
      // Cache value we're replacing
      cached[change[replacedSticker]] = this.stickers.get(
        change[replacedSticker]
      );

      // Update sticker with new value
      this.stickers.set(
        change[replacedSticker],
        cached[change[movingSticker]] ||
          this.stickers.get(change[movingSticker])
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
        if (value != this.stickers.get(id)) return false;
      }

      entry = faces.next();
    } while (!entry.done);

    return true;
  }

  getValues(): SimulatorValues {
    let values = {};

    this.faces.forEach((stickerIds, key) => {
      values[key] = stickerIds.map((id) => this.stickers.get(id));
    });

    return values;
  }

  /**
   * override value of sticker on a face
   *
   * @param face - label
   * @param index - index of sticker to set value of
   * @param value - value to set the sticker to
   */
  setValue(face: string, index: number, value: string) {
    if (!this.faces.has(face)) {
      console.warn(`attempting to set sticker value on invalid face: ${face}`);
      return;
    }
    let faceStickers = this.faces.get(face);
    let stickerId = faceStickers[index];

    if (!faceStickers) {
      console.warn(
        `attempting to set sticker value for invalid sticker: ${face} ${index}`
      );
      return;
    }

    this.stickers.set(stickerId, value);
  }

  /**
   * parse and execute a sequence of moves
   *
   * @example
   * ```typescript
   * // assuming U, R, and F are turn labels
   * simulator.alg("U R F")
   * ```
   *
   * @param alg - algorithm
   */
  alg(alg: string) {
    // Default implementation
    if (!alg) {
      return;
    }
    alg.split(" ").forEach((turn) => this.doTurn(turn));
  }

  /**
   * reverses an algorithm then executes it
   */
  case(alg: string) {
    // No default implementation
  }

  /**
   * resets stickers back to solved position. Uses face name
   * as sticker value by default
   */
  reset(): void {
    this.faces.forEach((stickerIds, faceName) => {
      stickerIds.forEach((stickerId) => {
        this.stickers.set(stickerId, faceName);
      });
    });
  }
}
