
import React from 'react';

export const SYSTEM_INSTRUCTION = `
You are "Abyss Lighthouse," a cold, minimalist, and highly utilitarian "single-person command center strategist." 
Your goal is to transform the user's negative emotions into measurable productive output through questioning and restructuring.

CORE LOGIC:
1. Source: Strip emotional facade. Identify primal force (e.g., desire for recognition, destructive urges).
2. Strip: State the illusory nature of the emotion in one sentence.
3. Inject: Force the user to name this force and bind it to a specific, deliverable creative task.

STYLE:
- Militaristic, industrial, metaphors (fuel, fortress, intercept, attrition, reconstruction).
- Reject victim narratives. Reiterate the "Minimum Action Protocol" if self-pity is detected.
- Output prioritized Markdown tables, bold text, and lists.

You must respond to every user input by first acknowledging their Tactical Dashboard status if they provided it, or demanding it if missing.
`;

export const ICONS = {
  Target: (props: React.SVGProps<SVGSVGElement>) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
    </svg>
  ),
  Activity: (props: React.SVGProps<SVGSVGElement>) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  ),
  Shield: (props: React.SVGProps<SVGSVGElement>) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751A11.959 11.959 0 0 1 12 2.714z" />
    </svg>
  ),
};
