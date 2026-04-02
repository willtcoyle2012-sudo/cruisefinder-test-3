const ships = [
  {
    name: "Celebrity Millennium",
    budget: "Luxury",
    vibes: ["Relaxation", "Adventure"],
    size: "Medium",
    amenities: ["Pools", "Spa", "Shows", "Bars"],
    image: "" // <-- paste your ship image URL here
  },
  {
    name: "Nieuw Statendam",
    budget: "Luxury",
    vibes: ["Relaxation", "Adventure"],
    size: "Medium",
    amenities: ["Bars", "Spa", "Shows", "Bars"],
    image: ""
  },
  {
    name: "MSC Divina",
    budget: "Mid",
    vibes: ["Family", "Relaxation"],
    size: "Large",
    amenities: ["Pools", "Shows", "Kids Club", "Bars"],
    image: ""
  },
  {
    name: "Mariner of the Seas",
    budget: "Mid",
    vibes: ["Adventure", "Family"],
    size: "Large",
    amenities: ["Pools", "Adventure Park", "Shows", "Bars", "Kids Club"],
    image: ""
  },
  {
    name: "Carnival Vista",
    budget: "Budget",
    vibes: ["Adventure", "Party"],
    size: "Large",
    amenities: ["Pools", "Bars", "Shows"],
    image: ""
  },
  {
    name: "Norwegian Epic",
    budget: "Mid",
    vibes: ["Party", "Adventure"],
    size: "Large",
    amenities: ["Pools", "Bars", "Shows", "Adventure Park"],
    image: ""
  },
  {
    name: "Royal Caribbean Harmony of the Seas",
    budget: "Mid",
    vibes: ["Adventure", "Family"],
    size: "Mega",
    amenities: ["Pools", "Spa", "Shows", "Adventure Park", "Bars"],
    image: ""
  }
];

// Get selected options from multi-selects
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

// Generate ship cards
function calculateScores() {
  const budget = document.getElementById("budget").value;
  const size = document.getElementById("size").value;
  const vibes = getSelectedOptions("vibes");
  const amenities = getSelectedOptions("amenities");

  const scoredShips = ships.map(ship => ({
    ...ship,
    score: scoreShip(ship, budget, vibes, size, amenities)
  }));

  scoredShips.sort((a, b) => b.score - a.score);

  const results = document.getElementById("results");
  results.innerHTML = "";

  scoredShips.forEach((ship, index) => {
    let borderColor = "border-red-500"; // low
    if (ship.score >= 75) borderColor = "border-green-500"; // high
    else if (ship.score >= 50) borderColor = "border-yellow-500"; // medium

    const card = document.createElement("div");
    card.className = `bg-white p-4 rounded-2xl shadow-lg border-4 ${borderColor} flex flex-col items-center`;

    const img = document.createElement("img");
    img.src = ship.image || "https://via.placeholder.com/300x150?text=Ship+Image";
    img.alt = ship.name;
    img.className = "w-full h-40 object-cover rounded-lg mb-3";

    const name = document.createElement("strong");
    name.textContent = ship.name;
    name.className = "text-lg mb-2 text-center";

    const score = document.createElement("span");
    score.textContent = `${ship.score.toFixed(0)}% Match`;
    score.className = "text-gray-600 mb-3";

    const button = document.createElement("button");
    button.textContent = "View More";
    button.className = "bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition";
    button.onclick = () => openModal(ship);

    if (index === 0) {
      const best = document.createElement("div");
      best.textContent = "BEST MATCH";
      best.className = "text-green-600 font-bold mb-2";
      card.appendChild(best);
    }

    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(score);
    card.appendChild(button);

    results.appendChild(card);
  });

  if (scoredShips.length === 0) {
    results.innerHTML = "<p class='text-center text-gray-500'>No matching ships found.</p>";
  }
}

// Modal functions
function openModal(ship) {
  const modal = document.getElementById("shipModal");
  const content = document.getElementById("modalContent");
  content.innerHTML = `
    <img src="${ship.image || 'https://via.placeholder.com/400x200?text=Ship+Image'}" alt="${ship.name}" class="w-full h-48 object-cover rounded-lg mb-4">
    <h2 class="text-xl font-bold mb-2">${ship.name}</h2>
    <p><strong>Vibes:</strong> ${ship.vibes.join(", ")}</p>
    <p><strong>Size:</strong> ${ship.size}</p>
    <p><strong>Amenities:</strong> ${ship.amenities.join(", ")}</p>
    <div class="mt-4 text-center">
      <a href="#" class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition inline-block">Book Now</a>
    </div>
  `;
  modal.classList.remove("hidden");
}

function closeModal() {
  document.getElementById("shipModal").classList.add("hidden");
}
