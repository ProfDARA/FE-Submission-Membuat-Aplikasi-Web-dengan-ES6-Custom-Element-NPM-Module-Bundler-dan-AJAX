//impor style
import './style/style.css';
import './style/searchbutton.css';

//impor script custom header footer
import './script/component/custom-header-bar.js';
import './script/component/custom-footer.js';

//impor axios
import axios from 'axios';


//kumpulan const
const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');


// mencari makanan yang match dengan axios ke mealdb
const getMealList = async () => {
  const searchInputTxt = document.getElementById('search-input').value.trim();
  try {
    const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`);
    let html = "";
    if (response.data.meals) {
      response.data.meals.forEach(meal => {
        html += `
          <div class="meal-item" data-id="${meal.idMeal}">
            <div class="meal-img">
              <img src="${meal.strMealThumb}" alt="food">
            </div>
            <div class="meal-name">
              <h3>${meal.strMeal}</h3>
              <a href="#" class="recipe-btn">Lihat Resep</a>
            </div>
          </div>
        `;
      });
      mealList.classList.remove('notFound');
    } else {
      html = "mohon maaf, makanan tidak ditemukan, coba cek keyword";
      mealList.classList.add('notFound');
    }
    mealList.innerHTML = html;
  } catch (error) {
    console.log(error);
  }
};


// untuk kolom resep
const getMealRecipe = (e) => {
  e.preventDefault();
  if (e.target.classList.contains('recipe-btn')) {
    const mealItem = e.target.parentElement.parentElement;
    axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
      .then(response => mealRecipeModal(response.data.meals))
      .catch(error => console.log(error));
  }
};

// isi konten
const mealRecipeModal = (meal) => {
  console.log(meal);
  meal = meal[0];
  let html = `
    <h2 class="recipe-title">${meal.strMeal}</h2>
    <p class="recipe-category">${meal.strCategory}</p>
    <div class="recipe-instruct">
      <h3>Instruksi:</h3>
      <p>${meal.strInstructions}</p>
    </div>
    <div class="recipe-meal-img">
      <img src="${meal.strMealThumb}" alt="">
    </div>
    <div class="recipe-link">
      <a href="${meal.strYoutube}" target="_blank">Tonton Video Youtube</a>
    </div>
  `;
  mealDetailsContent.innerHTML = html;
  mealDetailsContent.parentElement.classList.add('showRecipe');
};

//kode event listener
mealList.addEventListener('click', (e) => getMealRecipe(e));
recipeCloseBtn.addEventListener('click', () => mealDetailsContent.parentElement.classList.remove('showRecipe'));
searchBtn.addEventListener('click', () => getMealList());