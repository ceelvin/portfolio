const FORTUNES = [
  "A bug in production is just a surprise feature.",
  "There are only two hard things: cache invalidation and naming things.",
  "It works on my machine — shipping my machine next sprint.",
  "First, solve the problem. Then, write the code.",
  "Any sufficiently advanced CSS is indistinguishable from magic.",
  "The best error message is the one that never shows up.",
  "Weeks of coding can save you hours of planning.",
  "A ship in harbor is safe, but that's not what ships are built for.",
  "Make it work, make it right, make it fast — in that order.",
  "The terminal is willing, but the API is 503.",
  "Documentation is a love letter to your future self.",
  "Deleted code is debugged code.",
];

export function randomFortune(): string[] {
  const quote = FORTUNES[Math.floor(Math.random() * FORTUNES.length)];
  return [quote];
}