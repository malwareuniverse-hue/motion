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
import { MovingPictureScene } from "./MovingPicture";
import * as MovingPictureTimeline from "./MovingPicture/timeline";
import { STRPortfolioScene, DURATION_IN_FRAMES as STR_DURATION, WIDTH as STR_WIDTH, HEIGHT as STR_HEIGHT } from "./STRPortfolio";
import { CompsWindowScene, DURATION_IN_FRAMES as CW_DURATION, WIDTH as CW_WIDTH, HEIGHT as CW_HEIGHT } from "./CompsWindow";
import { ScoreCardScene, DURATION_IN_FRAMES as SC_DURATION, WIDTH as SC_WIDTH, HEIGHT as SC_HEIGHT } from "./ScoreCard";
import { MarketSignalScene, DURATION_IN_FRAMES as MS_DURATION, WIDTH as MS_WIDTH, HEIGHT as MS_HEIGHT } from "./MarketSignal";

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
        id="MovingPicture"
        component={MovingPictureScene}
        durationInFrames={MovingPictureTimeline.DURATION_IN_FRAMES}
        fps={MovingPictureTimeline.FPS}
        width={MovingPictureTimeline.WIDTH}
        height={MovingPictureTimeline.HEIGHT}
      />
      <Composition
        id="STRPortfolio"
        component={STRPortfolioScene}
        durationInFrames={STR_DURATION}
        fps={30}
        width={STR_WIDTH}
        height={STR_HEIGHT}
      />
      <Composition
        id="CompsWindow"
        component={CompsWindowScene}
        durationInFrames={CW_DURATION}
        fps={30}
        width={CW_WIDTH}
        height={CW_HEIGHT}
      />
      <Composition
        id="ScoreCard"
        component={ScoreCardScene}
        durationInFrames={SC_DURATION}
        fps={30}
        width={SC_WIDTH}
        height={SC_HEIGHT}
      />
      <Composition
        id="MarketSignal"
        component={MarketSignalScene}
        durationInFrames={MS_DURATION}
        fps={30}
        width={MS_WIDTH}
        height={MS_HEIGHT}
      />
    </>
  );
};
