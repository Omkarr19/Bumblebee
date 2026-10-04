import { DecisionInput, BlindSpotReport } from './types';

export const INTERNSHIP_SAMPLE_INPUT: DecisionInput = {
  decision: "I need to decide whether to accept a six-month software internship.",
  options: "Accept the internship / Continue focusing on college and placements",
  reasoning: "I am leaning toward accepting it because the stipend is good, the company is close to home, and it will give me industry experience.",
  factors: "Money, Career growth, Learning, Academic performance",
  concerns: "I'm worried about managing college and the internship workload.",
  constraints: "College attendance requirement is 75%, final semester project due in 4 months."
};

export const INTERNSHIP_SAMPLE_REPORT: BlindSpotReport = {
  id: "sample-internship-001",
  createdAt: new Date().toISOString(),
  input: INTERNSHIP_SAMPLE_INPUT,
  decisionSnapshot: {
    decision: "Deciding whether to accept a six-month software internship vs continue college and campus placements",
    options: "Option A: Accept 6-month software internship | Option B: Continue focusing on college and placements",
    leaning: "Leaning toward accepting the internship offer",
    statedPriorities: "Financial return (stipend), geographical convenience (close to home), and acquiring industry credentials"
  },
  priorities: [
    {
      factor: "Immediate Financial Benefit",
      description: "The stipend provides near-term monetary earnings, weighted heavily due to immediate tangibility."
    },
    {
      factor: "Industry Exposure & Resume Growth",
      description: "Desire to show real-world company experience ahead of upcoming placement cycles."
    },
    {
      factor: "Geographical Convenience",
      description: "Proximity to home minimizes travel friction and preserves daily comfort."
    },
    {
      factor: "Academic Baseline Preservation",
      description: "Need to protect academic standing and meet college graduation criteria."
    }
  ],
  assumptions: [
    {
      assumption: "Industry experience automatically translates into valuable career and technical growth.",
      whyExamine: "The career value of an internship depends directly on the specific tech stack, mentorship quality, and degree of engineering autonomy, not just company employment status.",
      question: "What specific engineering tasks or production codebase responsibilities will you own vs repetitive QA or maintenance tasks?"
    },
    {
      assumption: "Proximity to home will leave sufficient energy and study hours for academic requirements.",
      whyExamine: "Commute distance is only one dimension of fatigue; cognitive overload from 8-9 hours of software delivery can deplete evening study capacity regardless of distance.",
      question: "Have you calculated the cognitive energy cost of context-switching between sprint deadlines and semester coursework?"
    },
    {
      assumption: "An internship will carry more weight in placements than higher grades or dedicated placement preparation.",
      whyExamine: "Some top recruitment drives enforce strict CGPA cutoffs or prioritize deep algorithmic problem-solving over short-term internship brand names.",
      question: "Do your target placement recruiters filter heavily on CGPA and LeetCode-style assessments or prior company experience?"
    }
  ],
  blindSpots: [
    {
      category: "Mentorship & Engineering Culture",
      blindSpot: "Absence of verified mentorship structure or engineering team seniority.",
      missingFromReasoning: "The reasoning highlights 'industry experience' in the abstract without examining who will review code, conduct 1-on-1s, or guide technical practices.",
      impact: "Without skilled mentors, six months may reinforce bad habits or stall technical velocity."
    },
    {
      category: "Academic Attendance & College Regulations",
      blindSpot: "Strict institutional attendance penalties and capstone project milestones.",
      missingFromReasoning: "The reasoning does not mention formal college approval or whether attendance leniency is contractually permitted.",
      impact: "A 75% attendance violation could risk semester debarment or academic probation."
    },
    {
      category: "Opportunity Cost of Placement Preparation",
      blindSpot: "Sacrificing 40+ hours per week of dedicated interview preparation and on-campus pool drives.",
      missingFromReasoning: "Reasoning evaluates the internship in isolation rather than comparing it to focused algorithmic prep and attending campus drives.",
      impact: "Accepting a moderate internship might lock you out of premier hiring windows happening concurrently."
    },
    {
      category: "Reversibility & Exit Clauses",
      blindSpot: "Terms of exit if the internship workload jeopardizes exam schedules.",
      missingFromReasoning: "No contingency plan or exit policy mentioned if academic workload peaks unexpectedly.",
      impact: "Inability to scale back hours during finals could force an unmanaged crisis."
    }
  ],
  tensions: [
    {
      tension: "High career growth ambition vs Academic baseline protection",
      tradeOffQuestion: "If meeting daily internship sprint deadlines causes your semester GPA to drop by 0.5–1.0 point, how would you evaluate whether the tradeoff was worthwhile?"
    },
    {
      tension: "Valuing short-term stipend income vs Long-term placement compensation ceiling",
      tradeOffQuestion: "If six months of full-time campus placement preparation yielded an entry offer with 2x the annual compensation, how does that compare against six months of modest stipend today?"
    }
  ],
  evidenceMap: [
    {
      type: "Known",
      statement: "Company is located close to home",
      details: "Explicit geographical fact stated in current reasoning"
    },
    {
      type: "Known",
      statement: "Offer includes a monthly monetary stipend",
      details: "Explicit financial compensation confirmed by user"
    },
    {
      type: "Belief",
      statement: "The six-month internship will translate directly to career growth",
      details: "Subjective expectation based on general prestige rather than verified project scope"
    },
    {
      type: "Unverified",
      statement: "Daily working hours and overtime expectations",
      details: "Unspecified whether the role requires 35 hrs/wk or 50+ hrs/wk during critical release cycles"
    },
    {
      type: "Unverified",
      statement: "Mentorship and technical role depth",
      details: "Unclear if the role involves production code, automated testing, or non-technical support"
    },
    {
      type: "Missing",
      statement: "Official college attendance waiver or no-objection certificate policy",
      details: "Critical institutional rule that could determine academic eligibility"
    },
    {
      type: "Missing",
      statement: "Target company's historical PPO (Pre-Placement Offer) conversion rate",
      details: "Unknown whether this internship typically converts to full-time employment"
    }
  ],
  perspectives: [
    {
      name: "Short-Term Tactical Perspective",
      viewpoint: "Provides immediate financial independence, structured daily routine, and removes the anxiety of having a blank resume right now."
    },
    {
      name: "Long-Term Strategic Perspective",
      viewpoint: "The real value hinges on whether you build demonstrable technical artifacts and systems knowledge that make you stand out 3-5 years from now, rather than merely logging company hours."
    },
    {
      name: "Risk & Downside Perspective",
      viewpoint: "The primary asymmetric risk is academic derailment: a poor final GPA is permanent and difficult to reverse, whereas internship opportunities recur throughout career phases."
    },
    {
      name: "Academic Stakeholder Perspective",
      viewpoint: "College administrators and evaluators focus on attendance thresholds, lab evaluations, and project defense dates regardless of external corporate commitments."
    }
  ],
  reflectionQuestions: [
    "What specific evidence supports your belief that this particular company's internship will improve your recruitment odds more than focused campus prep?",
    "If you found out on Day 30 that the work consisted mainly of manual documentation and bug ticketing with no senior code review, how would your evaluation change?",
    "Are you giving more psychological weight to the immediate stipend and proximity because they are tangible and certain, compared to uncertain future placement outcomes?",
    "What would make this opportunity a net negative for you in hindsight twelve months from now?",
    "Which single assumption—if proven false—would most quickly invert your leaning?"
  ],
  whatWouldChangeMyMind: [
    {
      informationToInvestigate: "Actual daily project assignments and tech stack used by recent interns at this firm",
      whyItMatters: "Distinguishes high-yield production engineering experience from low-yield maintenance or manual verification tasks.",
      assumptionTested: "Assumption that industry tenure automatically guarantees technical learning."
    },
    {
      informationToInvestigate: "Historical Pre-Placement Offer (PPO) conversion percentage for previous intern cohorts",
      whyItMatters: "Clarifies whether this internship represents a direct bridge to full-time employment or a temporary seasonal staffing role.",
      assumptionTested: "Assumption that this internship secures post-graduation career placement."
    },
    {
      informationToInvestigate: "Written college department policy regarding attendance exemptions for off-campus internships",
      whyItMatters: "Verifies whether completing this internship is legally and academically permissible without attendance penalty.",
      assumptionTested: "Assumption that college attendance and semester deadlines can be informally balanced."
    },
    {
      informationToInvestigate: "Exact expected weekly working hours including sprint crunch and on-call expectations",
      whyItMatters: "Determines realistic remaining bandwidth for final year project and exam study.",
      assumptionTested: "Assumption that physical proximity will leave sufficient free time for academics."
    }
  ],
  challengeMyThinking: [
    {
      assumption: "This internship will improve my long-term software career prospects.",
      alternativePossibility: "The internship may provide brand exposure but lock you into outdated legacy tools, while your peers dedicate time to modern cloud architectures and interview algorithms.",
      question: "If top employers in your target tier prioritize system design and algorithmic fluency over generic internship titles, how does this role advance that specific standard?",
      evidenceToInvestigate: "Job descriptions of your dream roles: do they ask for specific years of legacy experience or proven mastery of modern architecture and problem solving?"
    },
    {
      assumption: "I can smoothly manage both 75% college attendance and a full-time software internship.",
      alternativePossibility: "Midterm exams, project presentations, and sprint deliverables often coincide during the exact same weeks, creating acute burnout and forced compromise.",
      question: "When a critical company release deadline collides with a mandatory semester submission, which one are you structurally forced to sacrifice?",
      evidenceToInvestigate: "College academic calendar dates for lab exams, project reviews, and end-semester finals mapped against company sprint cycles."
    },
    {
      assumption: "Proximity to home solves the primary logistical burden.",
      alternativePossibility: "The dominant tax of an engineering role is mental fatigue and context switching, not the 20-minute physical commute.",
      question: "Have you tested your ability to complete 3 hours of rigorous technical coursework after 8 hours of debugging code for a company?",
      evidenceToInvestigate: "Past academic periods where you worked long hours: did study quality remain high or did it degrade?"
    }
  ],
  possibleCognitivePatterns: [
    {
      patternName: "Availability & Salience Bias",
      observation: "Possible pattern to examine: You may be placing disproportionate weight on immediate, visible factors (cash stipend, physical proximity) because they are concrete, while long-term opportunity costs (placement preparation, academic standing) are abstract and deferred."
    },
    {
      patternName: "Optimism Bias regarding Bandwidth",
      observation: "Possible pattern to examine: Your reasoning assumes you will successfully juggle full academic compliance (75% attendance) and a 6-month software workload without estimating weekly hour allocations or contingency buffers."
    }
  ],
  beforeYouDecide: [
    {
      id: "chk-1",
      task: "Speak with 1–2 former or current interns at this specific company regarding actual mentorship, tech stack, and code review practices",
      category: "Mentorship & Quality",
      completed: false
    },
    {
      id: "chk-2",
      task: "Obtain explicit written clarification on daily working hours, expected overtime, and remote flexibility during college exam weeks",
      category: "Workload & Schedule",
      completed: false
    },
    {
      id: "chk-3",
      task: "Review official college regulations on mandatory attendance and confirm whether a formal NOC (No Objection Certificate) is granted",
      category: "Academic Compliance",
      completed: false
    },
    {
      id: "chk-4",
      task: "Inquire about historical full-time conversion rates (PPO) and salary bands for interns who successfully completed the program",
      category: "Career Trajectory",
      completed: false
    },
    {
      id: "chk-5",
      task: "Identify which core assumptions remain unverified before signing the offer letter or committing to attendance guidelines",
      category: "Reasoning Audit",
      completed: false
    }
  ]
};

