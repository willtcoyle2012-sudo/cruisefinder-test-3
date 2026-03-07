# Perfect Ship Matcher - Test 3 (Single File)

# Ship database
ships = [
    {
        "name": "Celebrity Millennium",
        "budget": "Luxury",
        "vibes": ["Relaxation", "Adventure"],
        "size": "Large",
        "amenities": ["Pools", "Spa", "Shows", "Bars"]
    },
    {
        "name": "MSC Divina",
        "budget": "Mid",
        "vibes": ["Family", "Relaxation"],
        "size": "Large",
        "amenities": ["Pools", "Shows", "Kids Club", "Bars"]
    },
    {
        "name": "Mariner of the Seas",
        "budget": "Mid",
        "vibes": ["Adventure", "Family"],
        "size": "Large",
        "amenities": ["Pools", "Adventure Park", "Shows", "Bars", "Kids Club"]
    }
]

# Helper functions for asking questions
def ask_single_choice(question, options):
    print(f"\n{question}")
    for i, opt in enumerate(options, 1):
        print(f"{i}. {opt}")
    while True:
        choice = input("Enter number: ").strip()
        if choice.isdigit() and 1 <= int(choice) <= len(options):
            return options[int(choice)-1]
        print("Invalid choice, try again.")

def ask_multiple_choice(question, options):
    print(f"\n{question} (select multiple separated by commas)")
    for i, opt in enumerate(options, 1):
        print(f"{i}. {opt}")
    while True:
        choice = input("Enter numbers: ").strip()
        nums = choice.split(",")
        selected = []
        valid = True
        for n in nums:
            n = n.strip()
            if n.isdigit() and 1 <= int(n) <= len(options):
                selected.append(options[int(n)-1])
            else:
                valid = False
                break
        if valid and selected:
            return selected
        print("Invalid choice, try again.")

# Ask the 4 questions
budget = ask_single_choice("1. What is your budget?", ["Budget", "Mid", "Luxury"])
vibes = ask_multiple_choice("2. What type/vibe of holiday do you want?", ["Family", "Adventure", "Relaxation", "Party"])
size = ask_single_choice("3. What ship size do you prefer?", ["Small", "Medium", "Large", "Mega"])
amenities = ask_multiple_choice("4. What matters most on board?", ["Pools", "Spa", "Shows", "Bars", "Adventure Park", "Kids Club"])

# Scoring function
def score_ship(ship):
    total = 0
    # Single-choice questions
    total += 1 if ship["budget"] == budget else 0
    total += 1 if ship["size"] == size else 0
    # Multiple-choice questions (fractional match)
    total += len(set(ship["vibes"]) & set(vibes)) / len(vibes)
    total += len(set(ship["amenities"]) & set(amenities)) / len(amenities)
    return total

# Compute scores
scored_ships = [(ship, score_ship(ship)) for ship in ships]
scored_ships.sort(key=lambda x: x[1], reverse=True)

# Output results
print("\nTop Ships:\n")
for ship, score in scored_ships:
    print(f"{ship['name']} – Score: {score:.2f}/4")
