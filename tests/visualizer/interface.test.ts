import { BLACK } from "../../src/puzzles/colors";
import { validatePuzzleOptions } from "../../src/visualizer/interface";

beforeEach(() => {
  global.console = {warn: jest.fn()} as any;
});

describe("Puzzle Options alg", () => {
  it("alg can be string", () => {
    let options: any = {
      alg: ""
    }

    validatePuzzleOptions(options);

    expect(typeof options.alg).toEqual("string");
    expect(console.warn).not.toBeCalled();
  });

  it("alg cannot be number", () => {
    let options: any = {
      alg: 1
    }

    validatePuzzleOptions(options);

    expect(typeof options.alg).toEqual("string");
    expect(console.warn).toBeCalled();
  });

  it("alg cannot be object", () => {
    let options: any = {
      alg: {}
    }

    validatePuzzleOptions(options);

    expect(typeof options.alg).toEqual("string");
    expect(console.warn).toBeCalled();
  });
});

describe("Puzzle Options case", () => {
  it("case can be string", () => {
    let options: any = {
      case: ""
    }

    validatePuzzleOptions(options);

    expect(typeof options.case).toEqual("string");
    expect(console.warn).not.toBeCalled();
  });

  it("case cannot be number", () => {
    let options: any = {
      case: 1
    }

    validatePuzzleOptions(options);

    expect(typeof options.case).toEqual("string");
    expect(console.warn).toBeCalled();
  });

  it("case cannot be object", () => {
    let options: any = {
      case: {}
    }

    validatePuzzleOptions(options);

    expect(typeof options.case).toEqual("string");
    expect(console.warn).toBeCalled();
  });
});

describe("Puzzle Options scheme", () => {
  it('passes valid scheme', () => {
    let options: any = {
      scheme: {
        U: BLACK
      }
    }

    validatePuzzleOptions(options);

    expect(typeof options.scheme).toEqual("object");
    expect(console.warn).not.toBeCalled();
  });

  it('scheme properties must be object', () => {
    let options: any = {
      scheme: {
        U: "test"
      }
    }

    validatePuzzleOptions(options);

    expect(options.scheme.U).toEqual(BLACK);
    expect(console.warn).toBeCalled();

    (<any>console.warn).mockClear();

    options.scheme.U = 1

    validatePuzzleOptions(options);

    expect(options.scheme.U).toEqual(BLACK);
    expect(console.warn).toBeCalled();

    (<any>console.warn).mockClear();

    options.scheme.U = [1]

    validatePuzzleOptions(options);

    expect(options.scheme.U).toEqual(BLACK);
    expect(console.warn).toBeCalled();

    (<any>console.warn).mockClear();

    options.scheme.U = null;

    validatePuzzleOptions(options);

    expect(options.scheme.U).toEqual(BLACK);
    expect(console.warn).toBeCalled();
  });

  it('scheme must be object', () => {
    let options: any = {
      scheme: "test"
    }

    validatePuzzleOptions(options);
    expect(options.scheme).toEqual({});
    expect(console.warn).toBeCalled();

    (<any>console.warn).mockClear();
    options.scheme = 1;
    validatePuzzleOptions(options);
    expect(options.scheme).toEqual({});
    expect(console.warn).toBeCalled();

    (<any>console.warn).mockClear();
    options.scheme = [1];
    validatePuzzleOptions(options);
    expect(options.scheme).toEqual({});
    expect(console.warn).toBeCalled();
  });
});

describe("Puzzle Options mask", () => {
  it("mask must be an object", () => {
    let options: any = {
      mask: {
        U: [1]
      }
    }

    validatePuzzleOptions(options);
    expect(console.warn).not.toBeCalled();

    (<any>console.warn).mockClear();
    options.mask = "test";
    validatePuzzleOptions(options);
    expect(options.mask).toEqual({});
    expect(console.warn).toBeCalled();

    (<any>console.warn).mockClear();
    options.mask = [1];
    validatePuzzleOptions(options);
    expect(options.mask).toEqual({});
    expect(console.warn).toBeCalled();

    (<any>console.warn).mockClear();
    options.mask = 1;
    validatePuzzleOptions(options);
    expect(options.mask).toEqual({});
    expect(console.warn).toBeCalled();
  });

  it("mask properties must be arrays of numbers", () => {
    let options: any = {
      mask: {
        U: "test"
      }
    }

    validatePuzzleOptions(options);
    expect(options.mask.U).toEqual([]);
    expect(console.warn).toBeCalled();

    (<any>console.warn).mockClear();
    options.mask.U = 1;
    validatePuzzleOptions(options);
    expect(options.mask.U).toEqual([]);
    expect(console.warn).toBeCalled();

    (<any>console.warn).mockClear();
    options.mask.U = null;
    validatePuzzleOptions(options);
    expect(options.mask.U).toEqual([]);
    expect(console.warn).toBeCalled();

    (<any>console.warn).mockClear();
    options.mask.U = {};
    validatePuzzleOptions(options);
    expect(options.mask.U).toEqual([]);
    expect(console.warn).toBeCalled();

    (<any>console.warn).mockClear();
    options.mask.U = ["string"];
    validatePuzzleOptions(options);
    expect(options.mask.U).toEqual([]);
    expect(console.warn).toBeCalled();

    (<any>console.warn).mockClear();
    options.mask.U = [1, 1, "string"];
    validatePuzzleOptions(options);
    expect(options.mask.U).toEqual([]);
    expect(console.warn).toBeCalled();
  });
});

describe("Puzzle Options stickerColors", () => {
  it("stickerColors must be an object", () => {
    let options: any = {
      stickerColors: {
        U: [BLACK]
      }
    }

    validatePuzzleOptions(options);
    expect(console.warn).not.toBeCalled();

    (<any>console.warn).mockClear();
    options.stickerColors = 1;
    validatePuzzleOptions(options);
    expect(options.stickerColors).toEqual({});
    expect(console.warn).toBeCalled();

    (<any>console.warn).mockClear();
    options.stickerColors = [1];
    validatePuzzleOptions(options);
    expect(options.stickerColors).toEqual({});
    expect(console.warn).toBeCalled();

    (<any>console.warn).mockClear();
    options.stickerColors = "1";
    validatePuzzleOptions(options);
    expect(options.stickerColors).toEqual({});
    expect(console.warn).toBeCalled();
  });

  it("stickerColor properties must be array of colors", () => {
    let options: any = {
      stickerColors: {
        U: null
      }
    }

    validatePuzzleOptions(options);
    expect(options.stickerColors.U).toEqual([]);
    expect(console.warn).toBeCalled();

    (<any>console.warn).mockClear();
    options.stickerColors.U = "1";
    validatePuzzleOptions(options);
    expect(options.stickerColors.U).toEqual([]);
    expect(console.warn).toBeCalled();

    (<any>console.warn).mockClear();
    options.stickerColors.U = 1;
    validatePuzzleOptions(options);
    expect(options.stickerColors.U).toEqual([]);
    expect(console.warn).toBeCalled();

    (<any>console.warn).mockClear();
    options.stickerColors.U = {};
    validatePuzzleOptions(options);
    expect(options.stickerColors.U).toEqual([]);
    expect(console.warn).toBeCalled();

    (<any>console.warn).mockClear();
    options.stickerColors.U = [1];
    validatePuzzleOptions(options);
    expect(options.stickerColors.U).toEqual([]);
    expect(console.warn).toBeCalled();

    (<any>console.warn).mockClear();
    options.stickerColors.U = [BLACK, 1];
    validatePuzzleOptions(options);
    expect(options.stickerColors.U).toEqual([]);
    expect(console.warn).toBeCalled();
  });
});

describe("Puzzle Options rotations", () => {
  it("rotations must be array of rotations", () => {
    let options: any = {
      rotations: [{
        x: 0, y: 1.2, z: 0
      }]
    };

    validatePuzzleOptions(options);
    expect(console.warn).not.toBeCalled();

    (<any>console.warn).mockClear();
    options.rotations = 1;
    validatePuzzleOptions(options);
    expect(options.rotations).toEqual([]);
    expect(console.warn).toBeCalled();

    (<any>console.warn).mockClear();
    options.rotations = "1";
    validatePuzzleOptions(options);
    expect(options.rotations).toEqual([]);
    expect(console.warn).toBeCalled();

    (<any>console.warn).mockClear();
    options.rotations = {};
    validatePuzzleOptions(options);
    expect(options.rotations).toEqual([]);
    expect(console.warn).toBeCalled();

    (<any>console.warn).mockClear();
    options.rotations = [null];
    validatePuzzleOptions(options);
    expect(options.rotations).toEqual([]);
    expect(console.warn).toBeCalled();

    (<any>console.warn).mockClear();
    options.rotations = [{x: "test"}];
    validatePuzzleOptions(options);
    expect(options.rotations).toEqual([]);
    expect(console.warn).toBeCalled();

    (<any>console.warn).mockClear();
    options.rotations = [{x: []}];
    validatePuzzleOptions(options);
    expect(options.rotations).toEqual([]);
    expect(console.warn).toBeCalled();

    (<any>console.warn).mockClear();
    options.rotations = [{x: {}}];
    validatePuzzleOptions(options);
    expect(options.rotations).toEqual([]);
    expect(console.warn).toBeCalled();
  });
});

describe("Puzzle Options scale", () => {
  it("scale must be a number", () => {
    let options: any = {
      scale: 2
    };

    validatePuzzleOptions(options);
    expect(console.warn).not.toBeCalled();

    (<any>console.warn).mockClear();
    options.scale = "test";
    validatePuzzleOptions(options);
    expect(options.scale).toEqual(1);
    expect(console.warn).toBeCalled();

    (<any>console.warn).mockClear();
    options.scale = ["test"];
    validatePuzzleOptions(options);
    expect(options.scale).toEqual(1);
    expect(console.warn).toBeCalled();

    (<any>console.warn).mockClear();
    options.scale = {};
    validatePuzzleOptions(options);
    expect(options.scale).toEqual(1);
    expect(console.warn).toBeCalled();

    (<any>console.warn).mockClear();
    options.scale = Infinity;
    validatePuzzleOptions(options);
    expect(options.scale).toEqual(1);
    expect(console.warn).toBeCalled();
  });
});

describe("Puzzle Options translation", () => {
  it("translation must be valid translation object", () => {
    let options: any = {
      translation: { x: 1, y: 2.3, z: 3 }
    };

    validatePuzzleOptions(options);
    expect(console.warn).not.toBeCalled();

    (<any>console.warn).mockClear();
    options.translation = "test";
    validatePuzzleOptions(options);
    expect(options.translation).toEqual({ x: 0, y: 0, z: 0 });
    expect(console.warn).toBeCalled();

    (<any>console.warn).mockClear();
    options.translation = ["test"];
    validatePuzzleOptions(options);
    expect(options.translation).toEqual({ x: 0, y: 0, z: 0 });
    expect(console.warn).toBeCalled();

    (<any>console.warn).mockClear();
    options.translation = 1;
    validatePuzzleOptions(options);
    expect(options.translation).toEqual({ x: 0, y: 0, z: 0 });
    expect(console.warn).toBeCalled();
  });
});

describe("Puzzle Options arrows", () => {
  it("arrows must be valid array of arrows", () => {
    let options: any = {
      arrows: [{
        start: { face: "U", sticker: 1 },
        end: { face: "U", sticker: 2 }
      }]
    };

    validatePuzzleOptions(options);
    expect(console.warn).not.toBeCalled();

    (<any>console.warn).mockClear();
    options.arrows = 1;
    validatePuzzleOptions(options);
    expect(options.translation).toBeUndefined();
    expect(console.warn).toBeCalled();

    (<any>console.warn).mockClear();
    options.arrows = "1";
    validatePuzzleOptions(options);
    expect(options.translation).toBeUndefined();
    expect(console.warn).toBeCalled();

    (<any>console.warn).mockClear();
    options.arrows = ["1"];
    validatePuzzleOptions(options);
    expect(options.translation).toBeUndefined();
    expect(console.warn).toBeCalled();

    (<any>console.warn).mockClear();
    options.arrows = {};
    validatePuzzleOptions(options);
    expect(options.translation).toBeUndefined();
    expect(console.warn).toBeCalled();

    (<any>console.warn).mockClear();
    options.arrows = [{ start: 1, end: 1 }];
    validatePuzzleOptions(options);
    expect(options.translation).toBeUndefined();
    expect(console.warn).toBeCalled();

    (<any>console.warn).mockClear();
    options.arrows = [{ start: [], end: [] }];
    validatePuzzleOptions(options);
    expect(options.translation).toBeUndefined();
    expect(console.warn).toBeCalled();

    (<any>console.warn).mockClear();
    options.arrows = [{ start: "U", end: "R" }];
    validatePuzzleOptions(options);
    expect(options.translation).toBeUndefined();
    expect(console.warn).toBeCalled();
  });
});