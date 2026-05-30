// ─────────────────────────────────────────────────────────────────────────────
// constants/journey.ts
// Timeline data for the Journey & Achievements page — chronological order.
// ─────────────────────────────────────────────────────────────────────────────

export type JourneyType =
  | "achievement"
  | "education"
  | "community"
  | "recognition"
  | "certification";

export interface JourneyItem {
  /** Unique slug for React key / DOM id */
  id: string;
  /** Human-readable date label shown on the card (e.g. "April 2023") */
  date: string;
  /** ISO-style sort key for correct chronological ordering (YYYY-MM) */
  sortKey: string;
  /** Headline title of the milestone */
  title: string;
  /** Supporting detail / organisation / location */
  body: string;
  /** Category tag — drives icon colour in the timeline */
  type: JourneyType;
}

export const journeyItems: JourneyItem[] = [
  {
    id:      "issso-2022",
    date:    "2022",
    sortKey: "2022-01",
    title:   "SOF ISSSO — Zonal Rank 21",
    body:    "Medal of Distinction, Science Olympiad Foundation, UP and UK Zone",
    type:    "achievement",
  },
  {
    id:      "pm-letter-2023",
    date:    "April 2023",
    sortKey: "2023-04",
    title:   "Personal Letter from Prime Minister Narendra Modi",
    body:    "Pariksha Pe Charcha 2023, Government of India",
    type:    "recognition",
  },
  {
    id:      "ncc-joined-2023",
    date:    "2023",
    sortKey: "2023-06",
    title:   "NCC Joined — 31 UK BN NCC",
    body:    "Haridwar, Uttarakhand",
    type:    "community",
  },
  {
    id:      "bca-begun-2024",
    date:    "July 2024",
    sortKey: "2024-07",
    title:   "BCA (Honours) Begun",
    body:    "Dev Sanskriti Vishwavidyalaya, Haridwar. CGPA: 8.26",
    type:    "education",
  },
  {
    id:      "cyber-quiz-2024",
    date:    "October 2024",
    sortKey: "2024-10",
    title:   "Cybersecurity Awareness Month Quiz — 3rd Place",
    body:    "DSVV Institution-Wide Competition",
    type:    "achievement",
  },
  {
    id:      "blood-donor-2024",
    date:    "November 2024",
    sortKey: "2024-11",
    title:   "Voluntary Blood Donor",
    body:    "MAA Gange Blood Centre, S.R. Medicity Hospital, Haridwar",
    type:    "community",
  },
  {
    id:      "polish-cert-2025",
    date:    "2025",
    sortKey: "2025-01",
    title:   "Polish Language — Certificate of Merit",
    body:    "DSVV International Relations Office",
    type:    "certification",
  },
  {
    id:      "ncc-camp-2025",
    date:    "June 2025",
    sortKey: "2025-06",
    title:   "NCC Annual Training Camp, Aurangabad",
    body:    "Conduct rated Good / Very Good by commanding officers",
    type:    "community",
  },
  {
    id:      "yoga-workshop-2025",
    date:    "June 2025",
    sortKey: "2025-06",
    title:   "7-Day Yoga Workshop — Active Participation",
    body:    "Faculty of Naturopathy, University of Patanjali, Haridwar",
    type:    "community",
  },
  {
    id:      "ai-conf-1st-2026",
    date:    "February 2026",
    sortKey: "2026-02",
    title:   "AI for Sanskriti Conference — 1st Place, Short Film Competition",
    body:    "International AI Conference, Department of Computer Science and Institute of AI, DSVV",
    type:    "achievement",
  },
  {
    id:      "ai-conf-3rd-2026",
    date:    "February 2026",
    sortKey: "2026-02",
    title:   "AI for Sanskriti Conference — 3rd Place, Website & Hackathon",
    body:    "Also participated as debate speaker on digital data-protection and privacy themes",
    type:    "achievement",
  },
  {
    id:      "iit-roorkee-2026",
    date:    "April 2026",
    sortKey: "2026-04",
    title:   "Chhatra Sansad 4.0 — Think India at IIT Roorkee",
    body:    "Simulated parliamentary debates on national policy alongside student leaders from top institutions across India",
    type:    "recognition",
  },
  {
    id:      "nielit-2026",
    date:    "May 2026",
    sortKey: "2026-05",
    title:   "NIELIT Basic Cyber Course Completed",
    body:    "15 hours via NDU.DIGITAL under NCC Directorate Uttarakhand",
    type:    "certification",
  },
];
