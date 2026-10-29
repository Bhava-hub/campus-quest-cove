export const SUBJECTS = [
  { id: "cs", label: "Computer Science", icon: "computer" },
  { id: "math", label: "Mathematics", icon: "sigma" },
  { id: "physics", label: "Physics", icon: "atom" },
  { id: "chem", label: "Chemistry", icon: "flask" },
  { id: "lit", label: "Literature", icon: "book" },
] as const;

export type Question = {
  id: string; title: string; body: string; subject: string; author: string; year: string;
  answers: number; votes: number; time: string; tags: string[]; solved?: boolean;
};

export const QUESTIONS: Question[] = [
  { id: "q1", title: "Why does Dijkstra fail with negative edge weights?", body: "I get that it's greedy, but I can't build an intuition for the exact case where it breaks. Can someone walk through a small example graph?", subject: "cs", author: "Aanya Rao", year: "2nd yr CSE", answers: 6, votes: 42, time: "2h ago", tags: ["algorithms", "graphs"], solved: true },
  { id: "q2", title: "Intuition for eigenvectors beyond the textbook definition?", body: "Every lecture says 'direction unchanged by the transformation'. How do people actually picture this when solving problems?", subject: "math", author: "Leo Martins", year: "1st yr Math", answers: 4, votes: 31, time: "4h ago", tags: ["linear-algebra"] },
  { id: "q3", title: "How to approach Lab 5 on projectile motion with air drag?", body: "The analytical solution gets messy. Is it acceptable to use a numerical method like Euler's for the lab report?", subject: "physics", author: "Priya Shah", year: "1st yr Physics", answers: 3, votes: 18, time: "6h ago", tags: ["mechanics", "lab"] },
  { id: "q4", title: "SN1 vs SN2 — quick way to decide in exams?", body: "Looking for a reliable checklist: substrate, nucleophile, solvent... what order do you check them in?", subject: "chem", author: "Kenji Ito", year: "2nd yr Chem", answers: 9, votes: 57, time: "1d ago", tags: ["organic"], solved: true },
  { id: "q5", title: "React useEffect runs twice in development — is my code broken?", body: "My API gets called twice on mount. I read about Strict Mode but want to understand what's really going on.", subject: "cs", author: "Sam Okafor", year: "3rd yr IT", answers: 5, votes: 26, time: "1d ago", tags: ["react", "web"] },
  { id: "q6", title: "Reading recommendations for postcolonial theory intro?", body: "Need something approachable before diving into Said and Spivak for my seminar next month.", subject: "lit", author: "Maya Cohen", year: "2nd yr English", answers: 2, votes: 12, time: "2d ago", tags: ["theory", "reading"] },
];

export const ANSWERS = [
  { author: "Rohan Mehta", year: "4th yr CSE", votes: 28, helpful: true, time: "1h ago", body: "Take nodes A→B (weight 2), A→C (weight 5), C→B (weight −4). Dijkstra finalizes B at distance 2 because it's the smallest frontier node. But the real shortest path A→C→B costs 1. Once a node is finalized, Dijkstra never revisits it — and negative edges are exactly what makes a 'later' path cheaper." },
  { author: "Elena Petrova", year: "TA, Algorithms", votes: 14, helpful: false, time: "50m ago", body: "Adding to this: the correctness proof relies on the invariant that distances only grow as you move outward. Negative edges break that invariant. Use Bellman-Ford instead — it relaxes every edge V−1 times." },
  { author: "Jae Park", year: "3rd yr CSE", votes: 5, helpful: false, time: "20m ago", body: "A trick I use: try adding a constant to all weights to make them positive. It does NOT work — it penalizes paths with more edges. Good counterexample to try yourself!" },
];

export type Project = {
  id: string; title: string; pitch: string; category: string; lead: string; members: string[];
  skills: string[]; roles: { name: string; open: number }[]; status: "Open" | "Closing soon" | "Full"; deadline: string; icon: string;
};

export const PROJECTS: Project[] = [
  { id: "p1", title: "StudyBuddy AI", pitch: "An AI tutor that turns lecture slides into spaced-repetition flashcards. Building for HackCampus 2026.", category: "Hackathon", lead: "Aanya Rao", members: ["Aanya Rao", "Leo Martins"], skills: ["React", "Python", "LLMs", "Figma"], roles: [{ name: "Frontend Dev", open: 1 }, { name: "UI Designer", open: 1 }], status: "Open", deadline: "Nov 12", icon: "rocket" },
  { id: "p2", title: "GreenRoute Campus", pitch: "Mapping the lowest-carbon walking and cycling routes across campus with live sensor data.", category: "Research", lead: "Priya Shah", members: ["Priya Shah", "Kenji Ito", "Sam Okafor"], skills: ["GIS", "Data Viz", "Node.js"], roles: [{ name: "Data Analyst", open: 1 }], status: "Closing soon", deadline: "Nov 3", icon: "home" },
  { id: "p3", title: "Pixel Quest Robotics", pitch: "A line-following robot for the inter-college robotics league. Need hardware hands!", category: "Competition", lead: "Kenji Ito", members: ["Kenji Ito"], skills: ["Arduino", "C++", "CAD"], roles: [{ name: "Embedded Dev", open: 2 }, { name: "Mech Designer", open: 1 }], status: "Open", deadline: "Nov 20", icon: "computer" },
  { id: "p4", title: "The Quad Zine", pitch: "Monthly student-run literary zine. Looking for writers and layout people.", category: "Creative", lead: "Maya Cohen", members: ["Maya Cohen", "Jae Park"], skills: ["Writing", "InDesign", "Illustration"], roles: [{ name: "Editor", open: 1 }, { name: "Illustrator", open: 2 }], status: "Open", deadline: "Dec 1", icon: "book" },
  { id: "p5", title: "Quantum Sim Club", pitch: "Course project simulating qubit circuits in the browser.", category: "Course Project", lead: "Leo Martins", members: ["Leo Martins", "Elena Petrova", "Rohan Mehta", "Jae Park"], skills: ["TypeScript", "Linear Algebra"], roles: [{ name: "Physics Lead", open: 0 }], status: "Full", deadline: "—", icon: "atom" },
];

export const subjectOf = (id: string) => SUBJECTS.find((s) => s.id === id) ?? SUBJECTS[0];
