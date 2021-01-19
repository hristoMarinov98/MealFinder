const mealInput = document.getElementById("meal-input");
const searchBtn = document.getElementById("search-button");
const searchResult = document.getElementById("search-result");
const mealsContainer = document.getElementById("meals-container");
const recipeContainer = document.getElementById("recipe-container");

function searchMeal(e) {
  e.preventDefault();

  const searchInput = mealInput.value;
  mealsContainer.innerHTML = "";
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)
    .then((res) => res.json())
    .then((data) => {
      searchResult.innerText = `Showing result for '${searchInput}'`;
      data.meals.map((meal) => {
        createMeal(meal);
      });
    });

  mealInput.value = "";
}

function createMeal(meal) {
  const imgUrl = meal.strMealThumb;
  const title = meal.strMeal;
  const mealDiv = document.createElement("div");
  mealDiv.classList.add("meal");
  mealDiv.innerHTML = `
      <button onclick ="showRecipe(${meal.idMeal})">Show Recipe</button>
        <img src="${imgUrl}" class="meal-img">
        <p>${title}</p>`;
  mealsContainer.appendChild(mealDiv);
}
function toggleHide() {
  recipeContainer.classList.add("hide");
}

function showRecipe(mealId) {
  console.log(mealId);
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.meals[0]);
      const meal = data.meals[0];
      console.log(meal["strMeal"]);
      const ingredients = [];
      for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
          ingredients.push(
            ` ${meal[`strMeasure${i}`]} - ${meal[`strIngredient${i}`]}`
          );
        } else {
          break;
        }
      }
      console.log(ingredients);
      recipeContainer.classList.remove("hide");
      recipeContainer.innerHTML = `
        <p class="meal-title">${meal.strMeal}</p>
        <button class="button-close" onClick="toggleHide()">X</button>
        
      <img src="${meal.strMealThumb}">
      <p class="recipe-description">${meal.strInstructions}</p>
      <ul>
      ${ingredients.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    `;
    });
}

searchBtn.addEventListener("click", searchMeal);
