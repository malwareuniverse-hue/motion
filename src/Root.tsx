import "./index.css";
import { Composition } from "remotion";
import { MyComposition } from "./Composition";
import { PropertyComparisonScene } from "./PropertyComparison";
import { DURATION_IN_FRAMES, FPS, HEIGHT, WIDTH } from "./PropertyComparison/timeline";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <MyComposition />
      <Composition
        id="PropertyComparison"
        component={PropertyComparisonScene}
        durationInFrames={DURATION_IN_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
    </>
  );
};
