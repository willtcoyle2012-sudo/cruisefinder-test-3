const ships = [
  {
    name: "Celebrity Millennium",
    budget: "Luxury",
    vibes: ["Relaxation", "Adventure"],
    size: "Medium",
    amenities: ["Pools", "Spa", "Shows", "Bars"]
  },
  {
    name: "Nieuw Statendam",
    budget: "Luxury",
    vibes: ["Relaxation", "Adventure"],
    size: "Medium",
    amenities: ["Bars", "Spa", "Shows", "Bars"]
  },
  {
    name: "MSC Divina",
    budget: "Mid",
    vibes: ["Family", "Relaxation"],
    size: "Large",
    amenities: ["Pools", "Shows", "Kids Club", "Bars"]
  },
  {
    name: "Mariner of the Seas",
    budget: "Mid",
    vibes: ["Adventure", "Family"],
    size: "Large",
    amenities: ["Pools", "Adventure Park", "Shows", "Bars", "Kids Club"]
  },
  {
    name: "Carnival Vista",
    budget: "Budget",
    vibes: ["Adventure", "Party"],
    size: "Large",
    amenities: ["Pools", "Bars", "Shows"]
  },
  {
    name: "Norwegian Epic",
    budget: "Mid",
    vibes: ["Party", "Adventure"],
    size: "Large",
    amenities: ["Pools", "Bars", "Shows", "Adventure Park"]
  },
  {
    name: "Royal Caribbean Harmony of the Seas",
    budget: "Mid",
    vibes: ["Adventure", "Family"],
    size: "Mega",
    amenities: ["Pools", "Spa", "Shows", "Adventure Park", "Bars"]
  }
];

// Multi-select helper
function getSelectedOptions(id) {
  return Array.from(document.getElementById(id).selectedOptions).map(o => o.value);
}

// Scoring system
function scoreShip(ship, budget, vibes, size, amenities) {
  let score = 0;
  let maxScore = 0;

  maxScore++;
  if (ship.budget === budget) score++;

  maxScore++;
  if (ship.size === size) score++;

  if (vibes.length) {
    maxScore++;
    score += ship.vibes.filter(v => vibes.includes(v)).length / vibes.length;
  }

  if (amenities.length) {
    maxScore++;
    score += ship.amenities.filter(a => amenities.includes(a)).length / amenities.length;
  }

  return (score / maxScore) * 100;
}

// Main function
function calculateScores() {
  const budget = document.getElementById("budget").value;
  const size = document.getElementById("size").value;
  const vibes = getSelectedOptions("vibes");
  const amenities = getSelectedOptions("amenities");

  const scoredShips = ships.map(ship => ({
    name: ship.name,
    score: scoreShip(ship, budget, vibes, size, amenities)
  }));

  scoredShips.sort((a, b) => b.score - a.score);

  const results = document.getElementById("results");
  results.innerHTML = "<h2>Results</h2>";

  scoredShips.forEach((ship, index) => {

    let level = "low";
    if (ship.score >= 75) level = "high";
    else if (ship.score >= 50) level = "medium";

    results.innerHTML += `
      <div class="ship ${level}">
        ${index === 0 ? "<div class='top'>⭐ BEST MATCH</div>" : ""}
        <strong>${ship.name}</strong><br>
        ${ship.score.toFixed(0)}% Match
      </div>
    `;
  });
}
