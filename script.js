// ============================================================
// Compliment data
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

// Tracks the last index shown so we never repeat two compliments in a row
let lastIndex = -1;

// ============================================================
// Helpers
// ============================================================

/**
 * Returns a random array index that is different from lastIndex.
 * Guarantees variety: the same compliment never appears twice in a row.
 */
function getRandomIndex(arrayLength) {
  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * arrayLength);
  } while (newIndex === lastIndex && arrayLength > 1);
  return newIndex;
}

// ============================================================
// DOM wiring
// ============================================================

const complimentText = document.getElementById("compliment-text");
const generateBtn = document.getElementById("generate-btn");

/**
 * Picks a new compliment and swaps it in with a brief fade transition:
 *  1. Fade the text out
 *  2. After the fade completes, update the text content
 *  3. Fade back in by removing the CSS class
 */
function showNewCompliment() {
  // Disable the button during the animation to prevent rapid-fire clicks
  generateBtn.disabled = true;

  // Step 1 — trigger the CSS fade-out
  complimentText.classList.add("fade-out");

  // Step 2 — swap text once the fade-out finishes (matches 0.25s CSS transition)
  setTimeout(() => {
    const index = getRandomIndex(compliments.length);
    lastIndex = index;
    complimentText.textContent = compliments[index];

    // Step 3 — fade back in
    complimentText.classList.remove("fade-out");

    generateBtn.disabled = false;
  }, 250);
}

// Attach the click handler to the button
generateBtn.addEventListener("click", showNewCompliment);
