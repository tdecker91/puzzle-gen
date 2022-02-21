import { TurnType } from "./algorithms/algorithm";
import { parseCubeAlgorithm } from "./algorithms/cube";
import { Square1Simualtor } from "./simulator/square1/square1Simulator";
import { SkewbSimulator } from "./simulator/skewb/skewbSimulator";
import { PyraminxSimulator } from "./simulator/pyraminx/pyraminxSimulator";
import { MegaminxSimulator } from "./simulator/megaminx/megaminxSimulator";
import { RubiksCubeSimulator } from "./simulator/rubiksCube/rubiksCubeSimulator";
import { Square1Net } from "./puzzles/square1/square1Net";
import { Square1 } from "./puzzles/square1/square1";
import { SkewbNet } from "./puzzles/skewbNet";
import { Skewb } from "./puzzles/skewb";
import { PyraminxNet } from "./puzzles/pyraminxNet";
import { Pyraminx } from "./puzzles/pyraminx";
import { MegaminxNet } from "./puzzles/megaminxNet";
import { Megaminx } from "./puzzles/megaminx";
import { RubiksCubeTopLayer } from "./puzzles/rubiksCube/rubiksCubeTop";
import { RubiksCubeNet } from "./puzzles/rubiksCube/rubiksCubeNet";
import { RubiksCube } from "./puzzles/rubiksCube/rubiksCube";
import { HtmlSvgRenderer } from "./rendering/htmlSvgRenderer";
import { HtmlCanvasRenderer } from "./rendering/htmlCanvasRenderer";
import { PolygonRenderer } from "./rendering/polygonRenderer";
import { Camera } from "./rendering/camera";
import { Scene } from "./rendering/scene";
import { parseMegaminxAlgorithm } from "./algorithms/megaminx";
import { parsePyraminxAlgorithm } from "./algorithms/pyraminx";
import { parseSkewbAlgorithm } from "./algorithms/skewb";
import { parseSquare1Algorithm } from "./algorithms/square1";

export * as Colors from "./puzzles/colors";
export * from "./visualizer";
export * from "./rendering/renderer";

export const Rendering = {
  Scene,
  Camera,
  HtmlSvgRenderer,
  HtmlCanvasRenderer,
  PolygonRenderer,
};

export const PuzzleGeometry = {
  RubiksCube,
  RubiksCubeNet,
  RubiksCubeTopLayer,
  Megaminx,
  MegaminxNet,
  Pyraminx,
  PyraminxNet,
  Skewb,
  SkewbNet,
  Square1,
  Square1Net,
};

export const Simulator = {
  RubiksCubeSimulator,
  MegaminxSimulator,
  PyraminxSimulator,
  SkewbSimulator,
  Square1Simualtor,
};

export const Algorithm = {
  TurnType,
  parseCubeAlgorithm: parseCubeAlgorithm,
  parseMegaminxAlgorithm: parseMegaminxAlgorithm,
  parsePyraminxAlgorithm: parsePyraminxAlgorithm,
  parseSkewbAlgorithm: parseSkewbAlgorithm,
  parseSquare1Algorithm: parseSquare1Algorithm,
};
