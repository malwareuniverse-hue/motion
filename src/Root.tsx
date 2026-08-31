import "./index.css";
import { Composition } from "remotion";
import { MyComposition } from "./Composition";
import { OwnerGuestEyesScene } from "./OwnerGuestEyes";
import * as OwnerGuestEyesTimeline from "./OwnerGuestEyes/timeline";
import { MiraIntroScene } from "./MiraIntro";
import * as MiraIntroTimeline from "./MiraIntro/timeline";
import { BrowserShoppingScene } from "./BrowserShopping";
import * as BrowserShoppingTimeline from "./BrowserShopping/timeline";
import { PropertyAnalyticsScene } from "./PropertyAnalytics";
import * as PropertyAnalyticsTimeline from "./PropertyAnalytics/timeline";
import { WrongCompsScene } from "./WrongComps";
import * as WrongCompsTimeline from "./WrongComps/timeline";
import { BookingDecisionScene } from "./BookingDecision";
import * as BookingDecisionTimeline from "./BookingDecision/timeline";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <MyComposition />
      <Composition
        id="OwnerGuestEyes"
        component={OwnerGuestEyesScene}
        durationInFrames={OwnerGuestEyesTimeline.DURATION_IN_FRAMES}
        fps={OwnerGuestEyesTimeline.FPS}
        width={OwnerGuestEyesTimeline.WIDTH}
        height={OwnerGuestEyesTimeline.HEIGHT}
      />
      <Composition
        id="MiraIntro"
        component={MiraIntroScene}
        durationInFrames={MiraIntroTimeline.DURATION_IN_FRAMES}
        fps={MiraIntroTimeline.FPS}
        width={MiraIntroTimeline.WIDTH}
        height={MiraIntroTimeline.HEIGHT}
      />
      <Composition
        id="BrowserShopping"
        component={BrowserShoppingScene}
        durationInFrames={BrowserShoppingTimeline.DURATION_IN_FRAMES}
        fps={BrowserShoppingTimeline.FPS}
        width={BrowserShoppingTimeline.WIDTH}
        height={BrowserShoppingTimeline.HEIGHT}
      />
      <Composition
        id="PropertyAnalytics"
        component={PropertyAnalyticsScene}
        durationInFrames={PropertyAnalyticsTimeline.DURATION_IN_FRAMES}
        fps={PropertyAnalyticsTimeline.FPS}
        width={PropertyAnalyticsTimeline.WIDTH}
        height={PropertyAnalyticsTimeline.HEIGHT}
      />
      <Composition
        id="WrongComps"
        component={WrongCompsScene}
        durationInFrames={WrongCompsTimeline.DURATION_IN_FRAMES}
        fps={WrongCompsTimeline.FPS}
        width={WrongCompsTimeline.WIDTH}
        height={WrongCompsTimeline.HEIGHT}
      />
      <Composition
        id="BookingDecision"
        component={BookingDecisionScene}
        durationInFrames={BookingDecisionTimeline.DURATION_IN_FRAMES}
        fps={BookingDecisionTimeline.FPS}
        width={BookingDecisionTimeline.WIDTH}
        height={BookingDecisionTimeline.HEIGHT}
      />
    </>
  );
};
