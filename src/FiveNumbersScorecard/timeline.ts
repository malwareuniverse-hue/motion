export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const DURATION_IN_FRAMES = 1420; // 47s 10f

/**
 * The payoff to FiveNumbersIntro's cliffhanger ("let's start with the number
 * almost everybody watches"): the thesis for why the number matters at all
 * (not more data — better decisions), then the scorecard's own name, then all
 * five questions revealed in order. Full-bleed on the locked PBM near-black
 * ground, 16:9, no chroma, no side panel — same register as FiveNumbersIntro.
 *
 * Source placement: drop this composition at 00:00:00:09 on the master timeline.
 *
 *   abs 00:00:00:09  local    0  that is the job — not more data
 *   abs 00:00:04:13  local  124  better decisions
 *   abs 00:00:06:00  local  171  because more numbers do not make you smarter
 *   abs 00:00:09:21  local  282  knowing what the numbers mean
 *   abs 00:00:12:01  local  352  that's the difference
 *   abs 00:00:13:13  local  394  so the simple pricing by mira scorecard is
 *   abs 00:00:16:01  local  472  if you remember doing nothing else from this video
 *   abs 00:00:18:29  local  560  remember these five questions
 *   abs 00:00:21:13  local  634  number one — occupancy
 *   abs 00:00:23:11  local  692  how full are we (— number two)
 *   abs 00:00:25:12  local  753  ADR — what did we sell those nights for
 *   abs 00:00:29:07  local  868  No 3 is your revpar
 *   abs 00:00:31:17  local  938  how hard is the whole calendar working for us
 *   abs 00:00:35:09  local 1050  number four is your booking window
 *   abs 00:00:37:17  local 1118  are guests booking earlier or later than expected
 *   abs 00:00:41:05  local 1226  and No 5 is your market pace
 *   abs 00:00:43:21  local 1302  is the market moving faster or slower than us
 *
 * Only OCCUPANCY, REVPAR, BOOKING WINDOW and MARKET PACE get a genuine
 * label/question split from the transcript's own two-line cues. ADR's label
 * and question land in one clip (local 753), so its question is staggered by
 * an invented +16 frames purely to match the other four rows' rhythm — the
 * same kind of invented internal pacing OccupancyMeter's timeline documents
 * rather than implying a precision the transcript doesn't give.
 *
 * "pricing by mirror scorecard" is the transcript's own mishearing of
 * "Pricing By Mira" — rendered on screen as THE PRICING BY MIRA SCORECARD,
 * the same correction FiveThings' timeline documents for "pricing by mirror
 * framework".
 */
export const SOURCE_IN_TIMECODE = "00:00:00:09";

export const T = {
  // stage A — the thesis's first clause
  stageAIn: 0,
  stageADur: 28,
  stageBetterIn: 124,
  stageBetterDur: 26,
  stageARecedeStart: 150,
  stageARecedeDur: 21,

  // stage B — why the number matters
  stageBSmarterIn: 171,
  stageBMeaningIn: 282,
  stageBDifferenceIn: 352,
  stageBDur: 26,
  stageBRecedeStart: 368,
  stageBRecedeDur: 26,

  // the card behind everything from here to the end
  cardBgStart: 368,
  cardBgDur: 26,

  // act 2 — naming the scorecard
  scorecardIsIn: 394,
  rememberVideoIn: 472,
  rememberQuestionsIn: 560,
  act2Dur: 28,
  act2RecedeStart: 610,
  act2RecedeDur: 24,

  // act 3 — the persistent header once the five rows start listing
  headerIn: 610,
  headerDur: 24,

  rowDur: 24,

  outStart: 1372,
  outDur: 40,

  end: DURATION_IN_FRAMES,
} as const;

export const STAGE_A_LEAD = "THAT IS THE JOB — NOT MORE DATA";
export const STAGE_A_ACCENT = "BETTER DECISIONS";

export const STAGE_B_SMARTER = "BECAUSE MORE NUMBERS DO NOT MAKE YOU SMARTER";
export const STAGE_B_MEANING = "KNOWING WHAT THE NUMBERS MEAN";
export const STAGE_B_DIFFERENCE = "THAT'S THE DIFFERENCE";

export const SCORECARD_IS_LEAD = "SO THE SIMPLE ";
export const SCORECARD_IS_ACCENT = "PRICING BY MIRA SCORECARD";
export const SCORECARD_IS_TAIL = " IS —";
export const REMEMBER_VIDEO =
  "IF YOU REMEMBER DOING NOTHING ELSE FROM THIS VIDEO";
export const REMEMBER_QUESTIONS = "REMEMBER THESE FIVE QUESTIONS";

export const HEADER_TEXT = "REMEMBER THESE FIVE QUESTIONS";

export type RowSpec = {
  slot: number;
  index: string;
  label: string;
  question: string;
  emphasis?: boolean;
  labelIn: number;
  questionIn: number;
};

export const ROWS: RowSpec[] = [
  {
    slot: 0,
    index: "01",
    label: "OCCUPANCY",
    question: "How full are we?",
    labelIn: 634,
    questionIn: 692,
  },
  {
    slot: 1,
    index: "02",
    label: "ADR",
    question: "What did we sell those nights for?",
    labelIn: 753,
    questionIn: 769,
  },
  {
    slot: 2,
    index: "03",
    label: "REVPAR",
    question: "How hard is the whole calendar working for us?",
    labelIn: 868,
    questionIn: 938,
  },
  {
    slot: 3,
    index: "04",
    label: "BOOKING WINDOW",
    question: "Are guests booking earlier or later than expected?",
    labelIn: 1050,
    questionIn: 1118,
  },
  {
    slot: 4,
    index: "05",
    label: "MARKET PACE",
    question: "Is the market moving faster or slower than us?",
    emphasis: true,
    labelIn: 1226,
    questionIn: 1302,
  },
];
