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
import {
  BookingHistory,
  BookingWindows,
  CompScan,
  DecisionSet,
  ForwardView,
  GuestSignal,
  MarketPace,
  SurfacePrice,
  VrmaLowerThird,
  decisionSetDefaults,
  vrmaLowerThirdDefaults,
} from "./VRMA4";
import * as VRMA4 from "./VRMA4/timeline";

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

      {/* VRMA Reel 4 - vertical 1080x1920 B-roll inserts. See src/VRMA4/README.md */}
      <Composition
        id="VRMA4-CompScan"
        component={CompScan}
        durationInFrames={VRMA4.COMP_SCAN_DURATION}
        fps={VRMA4.FPS}
        width={VRMA4.WIDTH}
        height={VRMA4.HEIGHT}
      />
      <Composition
        id="VRMA4-BookingHistory"
        component={BookingHistory}
        durationInFrames={VRMA4.BOOKING_HISTORY_DURATION}
        fps={VRMA4.FPS}
        width={VRMA4.WIDTH}
        height={VRMA4.HEIGHT}
      />
      <Composition
        id="VRMA4-GuestSignal"
        component={GuestSignal}
        durationInFrames={VRMA4.GUEST_SIGNAL_DURATION}
        fps={VRMA4.FPS}
        width={VRMA4.WIDTH}
        height={VRMA4.HEIGHT}
      />
      <Composition
        id="VRMA4-SurfacePrice"
        component={SurfacePrice}
        durationInFrames={VRMA4.SURFACE_PRICE_DURATION}
        fps={VRMA4.FPS}
        width={VRMA4.WIDTH}
        height={VRMA4.HEIGHT}
      />
      <Composition
        id="VRMA4-MarketPace"
        component={MarketPace}
        durationInFrames={VRMA4.MARKET_PACE_DURATION}
        fps={VRMA4.FPS}
        width={VRMA4.WIDTH}
        height={VRMA4.HEIGHT}
      />
      <Composition
        id="VRMA4-BookingWindows"
        component={BookingWindows}
        durationInFrames={VRMA4.BOOKING_WINDOWS_DURATION}
        fps={VRMA4.FPS}
        width={VRMA4.WIDTH}
        height={VRMA4.HEIGHT}
      />
      <Composition
        id="VRMA4-ForwardView"
        component={ForwardView}
        durationInFrames={VRMA4.FORWARD_VIEW_DURATION}
        fps={VRMA4.FPS}
        width={VRMA4.WIDTH}
        height={VRMA4.HEIGHT}
      />
      <Composition
        id="VRMA4-DecisionSet"
        component={DecisionSet}
        defaultProps={decisionSetDefaults}
        durationInFrames={VRMA4.DECISION_SET_DURATION}
        fps={VRMA4.FPS}
        width={VRMA4.WIDTH}
        height={VRMA4.HEIGHT}
      />
      <Composition
        id="VRMA4-VrmaLowerThird"
        component={VrmaLowerThird}
        defaultProps={vrmaLowerThirdDefaults}
        durationInFrames={VRMA4.LOWER_THIRD_DURATION}
        fps={VRMA4.FPS}
        width={VRMA4.WIDTH}
        height={VRMA4.HEIGHT}
      />
    </>
  );
};
