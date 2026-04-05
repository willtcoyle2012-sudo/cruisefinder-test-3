// =========================
// GLOBAL STATE
// =========================
let currentResults = [];

// =========================
// SHIP DATA (CONSISTENT FORMAT)
// =========================
const ships = [
  {
    name: "Celebrity Millennium",
    budget: "Luxury",
    vibes: ["Relaxation", "Adventure"],
    size: "Medium",
    amenities: ["Pools", "Spa", "Shows", "Bars"],
    image: "https://www.cruisemapper.com/images/ships/584-large-f5deaeeae1538fb6c45901d524ee2f98.jpg",
    attractions: [
      "Celebrity Theater",
      "Solarium",
      "Spa & Fitness Center"
    ]
  },
  {
    name: "Nieuw Statendam",
    budget: "Luxury",
    vibes: ["Relaxation", "Adventure"],
    size: "Medium",
    amenities: ["Bars", "Spa", "Shows"],
    image: "",
    attractions: [
      "Music Hall",
      "Retreat Spa",
      "Main Dining Room"
    ]
  },
  {
    name: "MSC Divina",
    budget: "Mid",
    vibes: ["Family", "Relaxation"],
    size: "Large",
    amenities: ["Pools", "Shows", "Kids Club", "Bars"],
    image: "",
    attractions: [
      "MSC Theater",
      "Aurea Spa",
      "Kids Club Aqua Park"
    ]
  },
  {
    name: "Mariner of the Seas",
    budget: "Mid",
    vibes: ["Adventure", "Family"],
    size: "Large",
    amenities: ["Pools", "Adventure Park", "Shows", "Bars", "Kids Club"],
    image: "",
    attractions: [
      "FlowRider Surf Simulator",
      "Adventure Ocean Kids Club",
      "Broadway Shows"
    ]
  },
  {
    name: "Carnival Vista",
    budget: "Budget",
    vibes: ["Adventure", "Party"],
    size: "Large",
    amenities: ["Pools", "Bars", "Shows"],
    image: "",
    attractions: [
      "SkyRide",
      "WaterWorks Park",
      "IMAX Theater"
    ]
  },
  {
    name: "Norwegian Breakaway",
    budget: "Mid",
    vibes: ["Party", "Adventure"],
    size: "Large",
    amenities: ["Pools", "Bars", "Shows", "Adventure Park"],
    image: "",
    attractions: [
      "The Waterfront Promenade",
      "Ropes Course & Zipline",
      "Burn the Floor Show",
      "Aqua Park Water Slides"
    ]
  },
  {
    name: "Royal Caribbean Harmony of the Seas",
    budget: "Mid",
    vibes: ["Adventure", "Family"],
    size: "Mega",
    amenities: ["Pools", "Spa", "Shows", "Adventure Park", "Bars"],
    image: "",
    attractions: [
      "Ultimate Abyss Slide",
      "FlowRider",
      "Central Park Promenade"
    ]
  }
];

// =========================
// HELPERS
// =========================
function getSelectedOptions(id) {
  return Array.from(document.getElementById(id).selectedOptions).map(o => o.value);
}

// =========================
// SCORING SYSTEM
// =========================
function scoreShip(ship, budget, vibes, size, amenities) {
  let score = 0;
  let maxScore = 0;

  // Budget
  maxScore++;
  if (ship.budget === budget) score++;

  // Size
  maxScore++;
  if (ship.size === size) score++;

  // Vibes
  if (vibes.length) {
    maxScore++;
    score += ship.vibes.filter(v => vibes.includes(v)).length / vibes.length;
  }

  // Amenities
  if (amenities.length) {
    maxScore++;
    score += ship.amenities.filter(a => amenities.includes(a)).length / amenities.length;
  }

  return (score / maxScore) * 100;
}

// =========================
// RENDER RESULTS
// =========================
function calculateScores() {
  const budget = document.getElementById("budget").value;
  const size = document.getElementById("size").value;
  const vibes = getSelectedOptions("vibes");
  const amenities = getSelectedOptions("amenities");

  const scoredShips = ships.map(ship => ({
    ...ship,
    score: scoreShip(ship, budget, vibes, size, amenities)
  }));

  // Sort best first
  scoredShips.sort((a, b) => b.score - a.score);

  // Store globally for modal
  currentResults = scoredShips;

  const results = document.getElementById("results");

  results.innerHTML = scoredShips.map((ship, index) => {
    let level = "low";
    if (ship.score >= 75) level = "high";
    else if (ship.score >= 50) level = "medium";

    return `
      <div class="ship bg-white rounded-xl shadow-lg p-4 transition hover:shadow-2xl">

        ${index === 0 ? `<div class="text-green-600 font-bold mb-2">BEST MATCH</div>` : ""}

        ${ship.image
          ? `<img src="${ship.image}" alt="${ship.name}" class="w-full h-40 object-cover rounded-lg mb-2">`
          : `<div class="w-full h-40 bg-gray-300 rounded-lg mb-2 flex items-center justify-center text-gray-600">Image here</div>`
        }

        <strong class="text-lg">${ship.name}</strong>

        <div class="h-2 rounded mt-2 ${
          level === 'high'
            ? 'bg-green-500'
            : level === 'medium'
            ? 'bg-orange-400'
            : 'bg-red-500'
        }"></div>

        <button onclick="openModal(${index})"
          class="mt-3 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
          type="button">
          View More
        </button>
      </div>
    `;
  }).join("");
}

// =========================
// MODAL
// =========================
function openModal(index) {
  const ship = currentResults[index]; // 🔥 ALWAYS correct now

  const modal = document.getElementById("shipModal");
  const modalContent = document.getElementById("shipModalContent");
  const content = document.getElementById("modalContent");

  content.innerHTML = `
    ${ship.image
      ? `<img src="${ship.image}" alt="${ship.name}" class="w-full h-64 object-cover rounded-lg mb-6">`
      : ""
    }

    <h2 class="text-2xl font-bold mb-4 text-center">${ship.name}</h2>

    <p class="mb-2"><strong>Vibes:</strong> ${ship.vibes.join(", ")}</p>
    <p class="mb-2"><strong>Size:</strong> ${ship.size}</p>
    <p class="mb-2"><strong>Amenities:</strong> ${ship.amenities.join(", ")}</p>

    <p class="mb-2"><strong>Top Attractions:</strong></p>
    <p class="mb-4">${ship.attractions.join(", ")}</p>

    <div class="mt-6 text-center">
      <a href="#" class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition inline-block">
        Book Now
      </a>
    </div>
  `;

  modal.classList.remove("opacity-0", "pointer-events-none");
  modalContent.classList.remove("translate-y-12");
  modalContent.classList.add("translate-y-0");
}

function closeModal() {
  const modal = document.getElementById("shipModal");
  const modalContent = document.getElementById("shipModalContent");

  modalContent.classList.remove("translate-y-0");
  modalContent.classList.add("translate-y-12");

  modal.classList.add("opacity-0", "pointer-events-none");
}
