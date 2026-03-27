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
  amenities: ["Bars", "Spa", "Shows"]
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

// helper function for multi-select fields
function getSelectedOptions(id) {
  const select = document.getElementById(id);
  return Array.from(select.selectedOptions).map(o => o.value);
}

// scoring logic
function scoreShip(ship, budget, vibes, size, amenities) {

  let score = 0;

  if (ship.budget === budget) score += 1;
  if (ship.size === size) score += 1;

  if (vibes.length > 0) {
    let vibeMatches = ship.vibes.filter(v => vibes.includes(v)).length;
    score += vibeMatches / vibes.length;
  }

  if (amenities.length > 0) {
    let amenityMatches = ship.amenities.filter(a => amenities.includes(a)).length;
    score += amenityMatches / amenities.length;
  }

  return score;
}

// main quiz function
function calculateScores() {

  const budget = document.getElementById("budget").value;
  const size = document.getElementById("size").value;

  const vibes = getSelectedOptions("vibes");
  const amenities = getSelectedOptions("amenities");

  const scoredShips = ships.map(ship => {
    return {
      name: ship.name,
      score: scoreShip(ship, budget, vibes, size, amenities)
    };
  });

  scoredShips.sort((a,b) => b.score - a.score);

  const results = document.getElementById("results");

  results.innerHTML = "<h2>Top Matches</h2>";

  scoredShips.forEach(ship => {
    results.innerHTML += `<p>${ship.name} — Score: ${ship.score.toFixed(2)}</p>`;
  });

}
