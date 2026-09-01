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
import { CompsChainScene } from "./CompsChain";
import * as CompsChainTimeline from "./CompsChain/timeline";
import { RevenueChainScene } from "./RevenueChain";
import * as RevenueChainTimeline from "./RevenueChain/timeline";
import { DecisionLoopScene } from "./DecisionLoop";
import * as DecisionLoopTimeline from "./DecisionLoop/timeline";
import { DecisionScaleScene } from "./DecisionScale";
import * as DecisionScaleTimeline from "./DecisionScale/timeline";

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
      <Composition
        id="CompsChain"
        component={CompsChainScene}
        durationInFrames={CompsChainTimeline.DURATION_IN_FRAMES}
        fps={CompsChainTimeline.FPS}
        width={CompsChainTimeline.WIDTH}
        height={CompsChainTimeline.HEIGHT}
      />
      <Composition
        id="DecisionScale"
        component={DecisionScaleScene}
        durationInFrames={DecisionScaleTimeline.DURATION_IN_FRAMES}
        fps={DecisionScaleTimeline.FPS}
        width={DecisionScaleTimeline.WIDTH}
        height={DecisionScaleTimeline.HEIGHT}
      />
      <Composition
        id="DecisionLoop"
        component={DecisionLoopScene}
        durationInFrames={DecisionLoopTimeline.DURATION_IN_FRAMES}
        fps={DecisionLoopTimeline.FPS}
        width={DecisionLoopTimeline.WIDTH}
        height={DecisionLoopTimeline.HEIGHT}
      />
      <Composition
        id="RevenueChain"
        component={RevenueChainScene}
        durationInFrames={RevenueChainTimeline.DURATION_IN_FRAMES}
        fps={RevenueChainTimeline.FPS}
        width={RevenueChainTimeline.WIDTH}
        height={RevenueChainTimeline.HEIGHT}
      />
    </>
  );
};
