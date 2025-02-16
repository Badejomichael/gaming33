// import { rpgGameNews } from "../data/games-data.js";

const apiKey = '55d51ca43af04d0b93df26dcad8f1205';

// shooter game

// Function to fetch and store category data
async function getsportsAndRacingGames() {
  // Check localStorage first
  const sportsAndRacingGames = localStorage.getItem("sports-and-racing-games");
  if (sportsAndRacingGames) {
      displayGames(JSON.parse(sportsAndRacingGames));
      console.log(JSON.parse(sportsAndRacingGames));
      console.log("Loaded from localStorage");
      return;
  }

  else {
    try {
      const response = await fetch(`https://api.rawg.io/api/games?genres=sports,racing&page_size=100&ordering=-released&key=${apiKey}`);
      const data = await response.json();

      // const validGames = data.results.filter(game => game.background_image && game.ratings_count > 0);

      // Save to localStorage
      localStorage.setItem("sports-and-racing-games", JSON.stringify(data.results));

      // Display on page
      displayGames(data.results);
      console.log("Fetched from API and saved to localStorage");

    } catch (error) {
          console.error("Error fetching categories:", error);
    }
  }
} 

// Function to display categories
function displayGames(games) {
  let sportsAndRacingGames = '';
  // Clear previous content

  games.forEach(game => {
    sportsAndRacingGames += `
        <div class="card" style="width: 16rem">
          <img src="${game.background_image}" class="card-img-top" alt="..." height="150px"/>
          <div class="card-body">
            <h5 class="card-title">${game.name}</h5>
            <p class="card-text">
              A highly rated Shooter with immersive gameplay and great storytelling.
            </p>
          </div>

          <a href="https://rawg.io/games/${game.slug}" target="_blank" class="btn btn-outline-light">🔗 Read More...</a>
        </div>
      `
  });

  document.querySelector('.js-s-p-games-row').innerHTML = sportsAndRacingGames;
}




// featured rpg game of the week

async function getRandomSportsAndRacingGame() {
  // Check localStorage first to avoid excessive API calls
  const cachedSportsAndRacingGame = localStorage.getItem("featuredSportsAndRacingGame");
  if (cachedSportsAndRacingGame) {
    displayFeaturedGame(JSON.parse(cachedSportsAndRacingGame));
      console.log("Loaded from localStorage");
      return;
  }

  else {
    try {
      const response = await fetch(`https://api.rawg.io/api/games?genres=sports,racing&page_size=100&ordering=-released&key=${apiKey}`);
      const data = await response.json();

      if (!data.results || data.results.length === 0) {
        console.error("No games found!");
        return;
    }
      // Pick a random game
      const randomGame = data.results[4];

      console.log(randomGame)
      // Construct game object
      const featuredSportsAndRacingGame = {
          name: randomGame.name,
          rating: randomGame.rating || "N/A",
          description: randomGame.description_raw || '', // RAWG API doesn't have short descriptions
          image: randomGame.background_image || "https://via.placeholder.com/300",
          release_date: randomGame.released || "Unknown",
          platforms: randomGame.platforms ? randomGame.platforms.map(p => p.platform.name).join(", ") : "N/A",
          metacritic: randomGame.metacritic || "N/A",
          website: randomGame.website || "#"

      };
      // Save to localStorage
      localStorage.setItem("featuredShooterGame", JSON.stringify(featuredSportsAndRacingGame));

      // Display the game
      displayFeaturedGame(featuredSportsAndRacingGame);
      console.log("Fetched from API and saved to localStorage");
      console.log(featuredSportsAndRacingGame)
  } catch (error) {
      console.error("Error fetching game data:", error);
  }
  }
}

// Function to display the game on the webpage
function displayFeaturedGame(game) {
  document.querySelector('.js-featured-game-row').innerHTML =
  `
  <div class="game-info col-lg-6">
    <h3 class="featured-game-hero-text">${game.name}</h3>
    <p>${game.description}</p>
    <p>⭐ <span class="bt">Rating:</span> 4.26</p>
    <p>🎮 <span class="bt">Platforms:</span> ${game.platforms}</p>
    <p>📅 <span class="bt">Release Date:</span> ${game.release_date}</p>
    <p>🏆 <span class="bt">Metacritic Score:</span> ${game.metacritic}</p>
    <a href="${game.website}" class="btn btn-outline-light">🔗 Official Website</a>
  </div>

  <div class="game-image col-lg-6">
  <img src="${game.image}" class="card-img-top" alt="..."/>
  </div>
  `
}



// latest sportsAndRacingGameNews
/*function displayLatestSportsAndRacingGamesNews() {
  let newsHTML = '';

  sportsAndRacingGameNews.forEach((news) => {
    newsHTML+=
    `
      <div class="row latest-news-row js-latest-news-row">

          <div class="game-info col-lg-6">
            <h3 class="featured-game-hero-text">${news.name}</h3>
            <p class="fp">${news.publishedDate}</p>
            <p class="lp">${news.briefNews}</p>
          </div>

          <div class="game-image col-lg-6">
            <img src="${news.image}" class="card-img-top" alt="..."/>
          </div>

        </div>
    `
  });

document.querySelector('.js-latest-news-container').innerHTML = newsHTML;
}*/




document.addEventListener("DOMContentLoaded",  () => {
  getsportsAndRacingGames();
  getRandomSportsAndRacingGame();
  // displayLatestSportsAndRacingGamesNews();
});