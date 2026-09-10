import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { clampedInterp, easeOutCubic, fadeRise } from "./utils";
import { Statement } from "./Statement";
import { CLOSE_1, CLOSE_2_KEY, CLOSE_2_LEAD, T } from "./timeline";

/** Act 5: the shift the whole scene was arguing for. */
export const ClosingStatement: React.FC = () => {
  const frame = useCurrentFrame();

  const rule = clampedInterp(
    frame,
    [T.closeRuleIn, T.closeRuleIn + T.closeRuleDur],
    [0, 140],
    easeOutCubic,
  );
  const first = fadeRise(frame, T.close1In, T.close1Dur, 12);
  const second = fadeRise(frame, T.close2In, T.close2Dur, 12);

  if (first.opacity <= 0 && rule <= 0) return null;

  return (
    <Statement
      opacity={1}
      rule={rule}
      gap={30}
      lines={[
        {
          content: CLOSE_1,
          opacity: first.opacity,
          shift: first.translateY,
          size: 44,
          weight: 500,
          letterSpacing: 3,
          color: palette.mutedGray,
        },
        {
          content: (
            <>
              {CLOSE_2_LEAD}
              <span style={{ color: palette.gold }}>{CLOSE_2_KEY}</span>
            </>
          ),
          opacity: second.opacity,
          shift: second.translateY,
          size: 64,
        },
      ]}
    />
  );
};
