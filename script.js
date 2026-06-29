// ============================================================
// Data
// ============================================================

const compliments = [
  "You have an incredible ability to make everyone around you feel valued and seen.",
  "Your creativity is a spark that lights up every room you walk into.",
  "The way you approach challenges with grace and determination is truly inspiring.",
  "You bring a unique and wonderful perspective to everything you do.",
  "Your kindness is a superpower — and the world is a better place because of it.",
  "You have this rare gift of making complex things feel simple and approachable.",
  "Your enthusiasm is absolutely contagious, and people love being around you for it.",
  "You are far more capable than you give yourself credit for — your potential is limitless.",
  "The thoughtfulness you put into the little things shows what a remarkable person you are.",
  "Your smile has the power to turn someone's entire day around.",
  "You handle everything with such poise — even under pressure you make it look effortless.",
  "Spending time with you always feels like exactly what was needed.",
  "You have an extraordinary talent for finding the silver lining in any situation.",
  "The passion you bring to your work is nothing short of contagious.",
  "You make a lasting impression — in the very best way.",
];

const jokes = [
  { setup: "Why don't scientists trust atoms?",         punchline: "Because they make up everything!" },
  { setup: "What do you call a fake noodle?",           punchline: "An impasta!" },
  { setup: "Why did the scarecrow win an award?",       punchline: "He was outstanding in his field!" },
  { setup: "I told my wife she was drawing her eyebrows too high.", punchline: "She looked surprised." },
  { setup: "How do you organize a space party?",        punchline: "You planet!" },
  { setup: "What do you call cheese that isn't yours?", punchline: "Nacho cheese!" },
  { setup: "Why did the bicycle fall over?",            punchline: "Because it was two-tired!" },
  { setup: "Why don't eggs tell jokes?",                punchline: "They'd crack each other up!" },
  { setup: "What do you call a sleeping dinosaur?",     punchline: "A dino-snore!" },
  { setup: "Why did the math book look so sad?",        punchline: "It had too many problems." },
  { setup: "What do you call a fish without eyes?",     punchline: "A fsh." },
  { setup: "Why did the golfer bring extra pants?",     punchline: "In case he got a hole in one!" },
  { setup: "What do you call a bear with no teeth?",    punchline: "A gummy bear!" },
  { setup: "Why can't a nose be 12 inches long?",       punchline: "Because then it would be a foot!" },
  { setup: "What's a skeleton's least favourite room?", punchline: "The living room." },
];

// ============================================================
// State & DOM references
// ============================================================

let isFlipped          = false;
let lastComplimentIdx  = -1;
let lastJokeIdx        = -1;

const card          = document.getElementById("playing-card");
const complimentEl  = document.getElementById("compliment-text");
const jokeSetupEl   = document.getElementById("joke-setup");
const jokePunchEl   = document.getElementById("joke-punchline");
const complimentBtn = document.getElementById("compliment-btn");
const jokeBtn       = document.getElementById("joke-btn");

// Must match the CSS transition on .playing-card (0.7s)
const FLIP_MS          = 700;
// How long after the back face is fully visible before the punchline appears
const PUNCHLINE_DELAY  = 1300;

// ============================================================
// Helpers
// ============================================================

function randomIndex(length, exclude) {
  let idx;
  do { idx = Math.floor(Math.random() * length); }
  while (idx === exclude && length > 1);
  return idx;
}

function lockButtons()   { complimentBtn.disabled = jokeBtn.disabled = true;  }
function unlockButtons() { complimentBtn.disabled = jokeBtn.disabled = false; }

// ============================================================
// Compliment button
// ============================================================

function showCompliment() {
  lockButtons();

  const idx = randomIndex(compliments.length, lastComplimentIdx);
  lastComplimentIdx = idx;

  if (isFlipped) {
    // Flip back to the front face
    jokePunchEl.classList.remove("is-visible"); // reset punchline for next joke
    card.classList.remove("is-flipped");
    isFlipped = false;

    // Update the compliment text at the midpoint of the flip, when the card
    // is edge-on and the content swap is invisible to the viewer.
    setTimeout(() => {
      complimentEl.textContent = compliments[idx];
    }, FLIP_MS / 2);

    setTimeout(unlockButtons, FLIP_MS);
  } else {
    // Already on the front — fade the text out, swap, fade back in
    complimentEl.classList.add("fade-out");
    setTimeout(() => {
      complimentEl.textContent = compliments[idx];
      complimentEl.classList.remove("fade-out");
      unlockButtons();
    }, 250);
  }
}

// ============================================================
// Joke button
// ============================================================

function showJoke() {
  lockButtons();

  const idx = randomIndex(jokes.length, lastJokeIdx);
  lastJokeIdx = idx;
  const { setup, punchline } = jokes[idx];

  if (!isFlipped) {
    // Flip to the back face.
    // Set the content at the flip midpoint so the swap is invisible.
    card.classList.add("is-flipped");
    isFlipped = true;

    setTimeout(() => {
      jokeSetupEl.textContent  = setup;
      jokePunchEl.textContent  = punchline;
      jokePunchEl.classList.remove("is-visible"); // ensure it's hidden before reveal
    }, FLIP_MS / 2);

    // Reveal the punchline after the flip finishes + a comedic pause
    setTimeout(() => {
      jokePunchEl.classList.add("is-visible");
      unlockButtons();
    }, FLIP_MS + PUNCHLINE_DELAY);

  } else {
    // Already on the back — fade the setup out, swap content, fade back in,
    // then reveal the punchline after the same comedic pause.
    jokePunchEl.classList.remove("is-visible");
    jokeSetupEl.classList.add("fade-out");

    setTimeout(() => {
      jokeSetupEl.textContent = setup;
      jokePunchEl.textContent = punchline;
      jokeSetupEl.classList.remove("fade-out");
    }, 250);

    setTimeout(() => {
      jokePunchEl.classList.add("is-visible");
      unlockButtons();
    }, 250 + PUNCHLINE_DELAY);
  }
}

// ============================================================
// Event listeners
// ============================================================

complimentBtn.addEventListener("click", showCompliment);
jokeBtn.addEventListener("click", showJoke);
