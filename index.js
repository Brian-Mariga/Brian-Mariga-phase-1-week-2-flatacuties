document.addEventListener("DOMContentLoaded", function () {
  const appContainer = document.getElementById("app");

  // Fetch data from the local server
  fetch("http://localhost:3000/characters")
    .then((response) => response.json())
    .then((characters) => {
      characters.forEach((character) => {
        // Create a card for each character on the home page
        const card = createCharacterCard(character);
        card.addEventListener("click", () =>
          showCharacterDetails(character.id)
        );
        appContainer.appendChild(card);
      });
    });

  // Reset button for resetting votes to zero
  const resetBtn = document.createElement("button");
  resetBtn.className = "reset-btn";
  resetBtn.textContent = "Reset Votes";
  resetBtn.addEventListener("click", resetVotes);
  appContainer.appendChild(resetBtn);

  // Function to create a card for a character
  function createCharacterCard(character) {
    const card = document.createElement("div");
    card.className = "card";

    const img = document.createElement("img");
    img.src = character.image;
    img.alt = character.name;

    const cardInfo = document.createElement("div");
    cardInfo.className = "card-info";

    const name = document.createElement("h2");
    name.textContent = character.name;

    const votes = document.createElement("p");
    votes.textContent = `Votes: ${character.votes}`;

    cardInfo.appendChild(name);
    cardInfo.appendChild(votes);

    card.appendChild(img);
    card.appendChild(cardInfo);

    return card;
  }

  // Function to show details of a character
  function showCharacterDetails(characterId) {
    // Clear existing content
    appContainer.innerHTML = "";

    // Fetch details of the selected character
    fetch(`http://localhost:3000/characters/${characterId}`)
      .then((response) => response.json())
      .then((character) => {
        // Display details of the selected character
        const detailCard = createCharacterCard(character);
        appContainer.appendChild(detailCard);

        // Input and buttons for voting on the details page
        const inputContainer = document.createElement("div");
        inputContainer.className = "input-container";

        const voteInput = document.createElement("input");
        voteInput.type = "number";
        voteInput.placeholder = "Enter Votes";
        voteInput.className = "vote-input";
        inputContainer.appendChild(voteInput);

        const voteBtn = document.createElement("button");
        voteBtn.className = "vote-btn";
        voteBtn.textContent = "Vote";
        voteBtn.addEventListener("click", () =>
          voteForCharacter(character.id, voteInput.value)
        );
        inputContainer.appendChild(voteBtn);

        // Back button to return to the home page
        const backBtn = document.createElement("button");
        backBtn.className = "back-btn";
        backBtn.textContent = "Back";
        backBtn.addEventListener("click", () => {
          showHome();
          // Update votes on the home page
          updateVotesOnHomePage();
        });
        inputContainer.appendChild(backBtn);

        appContainer.appendChild(inputContainer);
      });
  }

  // Function to vote for a character
  function voteForCharacter(characterId, votes) {
    const votesElement = appContainer.querySelector(".card-info p");
    const currentVotes = parseInt(votesElement.textContent.split(" ")[1], 10);
    votesElement.textContent = `Votes: ${currentVotes + parseInt(votes, 10)}`;
  }

  // Function to reset votes
  function resetVotes() {
    // Reset votes to 0 for all characters
    const votesElements = document.querySelectorAll(".card-info p");
    votesElements.forEach((votesElement) => {
      votesElement.textContent = "Votes: 0";
    });
  }

  // Function to show the home page
  function showHome() {
    // Clear existing content
    appContainer.innerHTML = "";

    // Fetch data from the local server
    fetch("http://localhost:3000/characters")
      .then((response) => response.json())
      .then((characters) => {
        characters.forEach((character) => {
          // Create a card for each character on the home page
          const card = createCharacterCard(character);
          card.addEventListener("click", () =>
            showCharacterDetails(character.id)
          );
          appContainer.appendChild(card);
        });
      });

    // Reset button for resetting votes to zero
    const resetBtn = document.createElement("button");
    resetBtn.className = "reset-btn";
    resetBtn.textContent = "Reset Votes";
    resetBtn.addEventListener("click", resetVotes);
    appContainer.appendChild(resetBtn);
  }
});
