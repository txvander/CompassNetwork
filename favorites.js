window.addEventListener('DOMContentLoaded', displayFavorites);

let jsonData = []; // Store fetched JSON data

// Fetch and populate dropdown
async function fetchDataAndPopulateDropdown() {
  try {
    const response = await fetch('games.json'); 
    const data = await response.json(); 
    jsonData = data;

    const dropdown = document.getElementById('favoritesDropdown');
    dropdown.innerHTML = '<option value="">--Select--</option>';

    data.forEach((item, index) => {
      const option = document.createElement('option');
      option.title = item.title;
      option.link = item.link;
      option.image = item.image;
      option.textContent = item.title;
      dropdown.appendChild(option);
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}


fetchDataAndPopulateDropdown();

// Handle confirm click
function saveFavorite() {
    const dropdown = document.getElementById('favoritesDropdown');
    const selectedIndex = dropdown.selectedIndex;
    addfavorite.classList.remove("show");
  
    if (selectedIndex > 0) {
      const selectedOption = dropdown.options[selectedIndex];
  
      const favoriteItem = {
        title: selectedOption.title,
        link: selectedOption.link,
        image: selectedOption.image
      };
      let savedFavorites = JSON.parse(localStorage.getItem("selectedFavorites")) || [];
      savedFavorites.push(favoriteItem);
      localStorage.setItem("selectedFavorites", JSON.stringify(savedFavorites));
      console.log("Saved favorite:", favoriteItem);

  
  }
} 

function addFavorite() {
  const addfavorite = document.getElementById("addfavorite");
  if (addfavorite.classList.contains("show")) {
  addfavorite.classList.remove("show");
  } else {
  addfavorite.classList.add("show");
  }
}

function toggleFavorite() {
  if (favorite.classList.contains("show")) {
  favorite.classList.remove("show");
  } else {
  favorite.classList.add("show");
  }
  }

function displayFavorites() {
  const favoritesContainer = document.getElementById('favorites-container');
  favoritesContainer.innerHTML = '<div class="favorite-blockadd" onclick="addFavorite()"><p>Add a favorite</p></div>'; // Clear existing content


  const savedFavorites = JSON.parse(localStorage.getItem('selectedFavorites')) || [];

  if (savedFavorites.length === 0) {
    document.getElementById('favp').style.display = 'block';
    return;
  }

  savedFavorites.forEach((favorite, index) => {
    const favDiv = document.createElement('div');
    favDiv.className = 'favorite-block';

    favDiv.innerHTML = `


      <a href="${favorite.link}"><img src="${favorite.image}"><p>${favorite.title}</p></a>  <button onclick="deleteFavorite(${index});">ⓧ</button>
    `;

    

    favoritesContainer.prepend(favDiv);
  });
}

function deleteFavorite(index) {
  let savedFavorites = JSON.parse(localStorage.getItem('selectedFavorites')) || [];

  // Remove the selected item
  savedFavorites.splice(index, 1);

  // Save the updated list back to localStorage
  localStorage.setItem('selectedFavorites', JSON.stringify(savedFavorites));

  // Refresh the display
  displayFavorites();
}


