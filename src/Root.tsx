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
import { GuestMindsetScene } from "./GuestMindset";
import * as GuestMindsetTimeline from "./GuestMindset/timeline";
import { SubscribeCTAScene } from "./SubscribeCTA";
import * as SubscribeCTATimeline from "./SubscribeCTA/timeline";
import { ChapterThreeScene } from "./ChapterThree";
import * as ChapterThreeTimeline from "./ChapterThree/timeline";
import { FiveThingsScene } from "./FiveThings";
import * as FiveThingsTimeline from "./FiveThings/timeline";
import { AssessmentCTAScene } from "./AssessmentCTA";
import * as AssessmentCTATimeline from "./AssessmentCTA/timeline";
import { CalmDiagnosisScene } from "./CalmDiagnosis";
import * as CalmDiagnosisTimeline from "./CalmDiagnosis/timeline";
import { RevenueLossScene } from "./RevenueLoss";
import * as RevenueLossTimeline from "./RevenueLoss/timeline";
import { OccupancyMeterScene } from "./OccupancyMeter";
import * as OccupancyMeterTimeline from "./OccupancyMeter/timeline";
import { FiveNumbersIntroScene } from "./FiveNumbersIntro";
import * as FiveNumbersIntroTimeline from "./FiveNumbersIntro/timeline";
import { FullCalendarTrapScene } from "./FullCalendarTrap";
import * as FullCalendarTrapTimeline from "./FullCalendarTrap/timeline";
import { HighRateTrapScene } from "./HighRateTrap";
import * as HighRateTrapTimeline from "./HighRateTrap/timeline";
import { RevenueDuelScene } from "./RevenueDuel";
import * as RevenueDuelTimeline from "./RevenueDuel/timeline";
import { RevParRevealScene } from "./RevParReveal";
import * as RevParRevealTimeline from "./RevParReveal/timeline";
import { BookingWindowScene } from "./BookingWindow";
import * as BookingWindowTimeline from "./BookingWindow/timeline";
import { ProblemMayBeYouScene } from "./ProblemMayBeYou";
import * as ProblemMayBeYouTimeline from "./ProblemMayBeYou/timeline";
import { FiveNumbersScorecardScene } from "./FiveNumbersScorecard";
import * as FiveNumbersScorecardTimeline from "./FiveNumbersScorecard/timeline";
import { RevenueAssessmentCTAScene } from "./RevenueAssessmentCTA";
import * as RevenueAssessmentCTATimeline from "./RevenueAssessmentCTA/timeline";
import { SimpleStrategiesCTAScene } from "./SimpleStrategiesCTA";
import * as SimpleStrategiesCTATimeline from "./SimpleStrategiesCTA/timeline";

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
        id="GuestMindset"
        component={GuestMindsetScene}
        durationInFrames={GuestMindsetTimeline.DURATION_IN_FRAMES}
        fps={GuestMindsetTimeline.FPS}
        width={GuestMindsetTimeline.WIDTH}
        height={GuestMindsetTimeline.HEIGHT}
      />
      <Composition
        id="SubscribeCTA"
        component={SubscribeCTAScene}
        durationInFrames={SubscribeCTATimeline.DURATION_IN_FRAMES}
        fps={SubscribeCTATimeline.FPS}
        width={SubscribeCTATimeline.WIDTH}
        height={SubscribeCTATimeline.HEIGHT}
      />
      <Composition
        id="ChapterThree"
        component={ChapterThreeScene}
        durationInFrames={ChapterThreeTimeline.DURATION_IN_FRAMES}
        fps={ChapterThreeTimeline.FPS}
        width={ChapterThreeTimeline.WIDTH}
        height={ChapterThreeTimeline.HEIGHT}
      />
      <Composition
        id="FiveThings"
        component={FiveThingsScene}
        durationInFrames={FiveThingsTimeline.DURATION_IN_FRAMES}
        fps={FiveThingsTimeline.FPS}
        width={FiveThingsTimeline.WIDTH}
        height={FiveThingsTimeline.HEIGHT}
        defaultProps={{ backdrop: "green" as const }}
      />
      <Composition
        id="AssessmentCTA"
        component={AssessmentCTAScene}
        durationInFrames={AssessmentCTATimeline.DURATION_IN_FRAMES}
        fps={AssessmentCTATimeline.FPS}
        width={AssessmentCTATimeline.WIDTH}
        height={AssessmentCTATimeline.HEIGHT}
        defaultProps={{ backdrop: "green" as const }}
      />
      <Composition
        id="CalmDiagnosis"
        component={CalmDiagnosisScene}
        durationInFrames={CalmDiagnosisTimeline.DURATION_IN_FRAMES}
        fps={CalmDiagnosisTimeline.FPS}
        width={CalmDiagnosisTimeline.WIDTH}
        height={CalmDiagnosisTimeline.HEIGHT}
      />
      <Composition
        id="RevenueLoss"
        component={RevenueLossScene}
        durationInFrames={RevenueLossTimeline.DURATION_IN_FRAMES}
        fps={RevenueLossTimeline.FPS}
        width={RevenueLossTimeline.WIDTH}
        height={RevenueLossTimeline.HEIGHT}
        defaultProps={{ backdrop: "dark" as const }}
      />
      <Composition
        id="OccupancyMeter"
        component={OccupancyMeterScene}
        durationInFrames={OccupancyMeterTimeline.DURATION_IN_FRAMES}
        fps={OccupancyMeterTimeline.FPS}
        width={OccupancyMeterTimeline.WIDTH}
        height={OccupancyMeterTimeline.HEIGHT}
      />
      <Composition
        id="FiveNumbersIntro"
        component={FiveNumbersIntroScene}
        durationInFrames={FiveNumbersIntroTimeline.DURATION_IN_FRAMES}
        fps={FiveNumbersIntroTimeline.FPS}
        width={FiveNumbersIntroTimeline.WIDTH}
        height={FiveNumbersIntroTimeline.HEIGHT}
      />
      <Composition
        id="FullCalendarTrap"
        component={FullCalendarTrapScene}
        durationInFrames={FullCalendarTrapTimeline.DURATION_IN_FRAMES}
        fps={FullCalendarTrapTimeline.FPS}
        width={FullCalendarTrapTimeline.WIDTH}
        height={FullCalendarTrapTimeline.HEIGHT}
      />
      <Composition
        id="HighRateTrap"
        component={HighRateTrapScene}
        durationInFrames={HighRateTrapTimeline.DURATION_IN_FRAMES}
        fps={HighRateTrapTimeline.FPS}
        width={HighRateTrapTimeline.WIDTH}
        height={HighRateTrapTimeline.HEIGHT}
      />
      <Composition
        id="RevenueDuel"
        component={RevenueDuelScene}
        durationInFrames={RevenueDuelTimeline.DURATION_IN_FRAMES}
        fps={RevenueDuelTimeline.FPS}
        width={RevenueDuelTimeline.WIDTH}
        height={RevenueDuelTimeline.HEIGHT}
      />
      <Composition
        id="RevParReveal"
        component={RevParRevealScene}
        durationInFrames={RevParRevealTimeline.DURATION_IN_FRAMES}
        fps={RevParRevealTimeline.FPS}
        width={RevParRevealTimeline.WIDTH}
        height={RevParRevealTimeline.HEIGHT}
      />
      <Composition
        id="BookingWindow"
        component={BookingWindowScene}
        durationInFrames={BookingWindowTimeline.DURATION_IN_FRAMES}
        fps={BookingWindowTimeline.FPS}
        width={BookingWindowTimeline.WIDTH}
        height={BookingWindowTimeline.HEIGHT}
      />
      <Composition
        id="ProblemMayBeYou"
        component={ProblemMayBeYouScene}
        durationInFrames={ProblemMayBeYouTimeline.DURATION_IN_FRAMES}
        fps={ProblemMayBeYouTimeline.FPS}
        width={ProblemMayBeYouTimeline.WIDTH}
        height={ProblemMayBeYouTimeline.HEIGHT}
      />
      <Composition
        id="FiveNumbersScorecard"
        component={FiveNumbersScorecardScene}
        durationInFrames={FiveNumbersScorecardTimeline.DURATION_IN_FRAMES}
        fps={FiveNumbersScorecardTimeline.FPS}
        width={FiveNumbersScorecardTimeline.WIDTH}
        height={FiveNumbersScorecardTimeline.HEIGHT}
      />
      <Composition
        id="RevenueAssessmentCTA"
        component={RevenueAssessmentCTAScene}
        durationInFrames={RevenueAssessmentCTATimeline.DURATION_IN_FRAMES}
        fps={RevenueAssessmentCTATimeline.FPS}
        width={RevenueAssessmentCTATimeline.WIDTH}
        height={RevenueAssessmentCTATimeline.HEIGHT}
      />
      <Composition
        id="SimpleStrategiesCTA"
        component={SimpleStrategiesCTAScene}
        durationInFrames={SimpleStrategiesCTATimeline.DURATION_IN_FRAMES}
        fps={SimpleStrategiesCTATimeline.FPS}
        width={SimpleStrategiesCTATimeline.WIDTH}
        height={SimpleStrategiesCTATimeline.HEIGHT}
      />
    </>
  );
};
