const apiUrl = "https://api.edamam.com/api/recipes/v2";
const app_id = process.env.VITE_API_ID;
const app_key = process.env.VITE_API_KEY;

// const app_id = `9b79a237`; 
// const app_key = `150185214857b1583f258fc60e628a04`;

var recipeCardGrid = document.querySelector("#recipeCardGrid");
var recipeIngredientsUl = document.querySelector("#recipeIngredientsList")

/* This function loads a random selection of recipes on page load
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch(`${apiUrl}?&q=chicken&app_id=${app_id}&app_key=${app_key}&random=true&_cont=CHcVQBtNNQphDmgVQntAEX4BYldtBAYEQ21GBWQaaldyDAQCUXlSB2ZCNl17BgcESmVBAjAaZ1RyUFFUEmAWB2tFMVQiBwUVLnlSVSBMPkd5BgMbUSYRVTdgMgksRlpSAAcRXTVGcV84SU4%3D&type=public&app_id=9b79a237"`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {

      const data = await response.json();
      const recipes = data.hits.map((recipe) => recipe.recipe);
  
      function clearRecipeCardGrid() {
        recipeCardGrid.innerHTML = ``;
      };
      clearRecipeCardGrid();
  
      for (var i = 0; i < recipes.length; i++) {
        
        console.log(recipes[i].label);
  
        let ingredientsArr = recipes[i].ingredients
        
        function createIngredientList(ingredients) {
          return new Promise((resolve) => {
            var ingredientsList = [];
        
            for (var j = 0; j < ingredients.length; j++) {
  
              var ingredientHTML = `
              <li class="list-group-item text-dark">
              <div class="d-flex flex-wrap flex-row justify-content-between align-content-center">
              <p class="m-0">${ingredients[j].quantity} ${ingredients[j].measure} ${ingredients[j].food}</p>
              </div>
          </li>  
             `;
        
              ingredientsList.push(ingredientHTML);
            }
        
            resolve(ingredientsList.join(''));
          });
        }
  
        function createRecipeCard(recipe, ingredientsList) {
          var recipeCard = document.createElement("div");
          
          recipeCard.className = "card m-4 border-info border-3 recipe_card";
          recipeCard.innerHTML = `
          <div class="position-relative">
          <div class="gradient-overlay"></div>
          <h5 class="card-title position-absolute start-0 bottom-0 text-white p-3">${recipe.label}</h5>
          <div class="d-flex img-container-card">
            <div class="bg-image" style="background-image: url('${recipe.image}');"></div>
          </div>
        </div>
        <div class="card-body">
          <h6 class="border-bottom pb-3">Ingredients</h6>
          <div class="overflow-auto inset-list">
            <ul class="list-group list-group-flush" id="recipeIngredientsList">
              ${ingredientsList}
            </ul>
          </div>
          <div class="d-flex flex-wrap justify-content-center mt-3">
            <!-- This button opens the recipe-detail page -->
            <a href="/api/recipes/${recipe.id}" type="button" class="btn btn-info w-100 m-2">
              View Recipe
            </a>
          </div>
        </div>
        <!-- Only authorized users can add to saved-recipes -->
        
        <div class="card-footer bg-light-subtle d-flex flex-wrap justify-content-between align-items-center">
          <!-- This button sets is_favorite: true -->
          <button type="submit" class="btn btn-sm btn-outline-primary w-100" id="saveRecipe" data-recipe="${recipe.id}">
            Add to your favorites?
            <i class="far fa-star text-primary ps-5"></i>
          </button>
        </div>
        
          `;
          return recipeCard;
        }
  
        var ingredientListHTML = await createIngredientList(ingredientsArr);
        var recipeCard = createRecipeCard(recipes[i], ingredientListHTML);
        recipeCardGrid.appendChild(recipeCard);
      }
  
        return recipeCardGrid;
    } else {
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.error(error);
  }
});
 */

/* This function uses the serach term from the nav to get a response from the API */
const searchRecipes = async (event) => {
  event.preventDefault();

  const searchTerms = document.querySelector('input[name="search-terms"]').value;

  const response = await fetch(`${apiUrl}?q=${searchTerms}&app_id=${app_id}&app_key=${app_key}&_cont=CHcVQBtNNQphDmgVQntAEX4BYldtBAYEQ21GBWQaaldyDAQCUXlSB2ZCNl17BgcESmVBAjAaZ1RyUFFUEmAWB2tFMVQiBwUVLnlSVSBMPkd5BgMbUSYRVTdgMgksRlpSAAcRXTVGcV84SU4%3D&type=public&app_id=9b79a237"`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {

    const data = await response.json();
    const recipes = data.hits.map((recipe, index) => {
      const { label, image, url } = recipe.recipe;
      const ingredients = recipe.recipe.ingredients.map((ingredient) => {
        const { quantity, measure, food, image } = ingredient;
        return { quantity, measure, food, image };
      });
    return { id: index + 1, label, image, url, ingredients };
});

    /* This posts the returned Recipes and their associated Ingredients to the local db */
    fetch("/api/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ recipes: recipes.map(({ label, image, url, ingredients }) => ({ label, image, url, ingredients })) }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (Array.isArray(data)) {
          const recipeIds = data.map((recipe) => recipe.id);
          updateRecipeCards(recipeIds);
        } else {
          console.error('Data is not an array.');
        }
      })      
      .catch((error) => console.error(error));

    /* This function clears the recipe card div of previously rendered cards */
    function clearRecipeCardGrid() {
      recipeCardGrid.innerHTML = ``;
    };
    clearRecipeCardGrid();

    /* for loop for creating values for each recipe */
    for (var i = 0; i < recipes.length; i++) {
      
      let ingredientsArr = recipes[i].ingredients
      
      function createIngredientList(ingredients) {
        return new Promise((resolve) => {
          var ingredientsList = [];
          /* for loop for creating ingredient value for each ingredient */
          for (var j = 0; j < ingredients.length; j++) {
            /* this creates the ingredient list item HTML */
            var ingredientHTML = `
            <li class="list-group-item text-dark">
            <div class="d-flex flex-wrap flex-row justify-content-between align-content-center">
            <p class="m-0">${ingredients[j].quantity} ${ingredients[j].measure} ${ingredients[j].food}</p>
            </div>
        </li>  
           `;
      
            ingredientsList.push(ingredientHTML);
          }
      
          resolve(ingredientsList.join(''));
        });
      }

      /* this function uses the returned recipe and created ingredientsList to create a recipe card for each Recipe */
      function createRecipeCard(recipe, ingredientsList) {
        var recipeCard = document.createElement("div");
        /* classes for the container div */
        recipeCard.className = "card m-4 border-info border-3 recipe_card";
        /* full HTML for the recipe card */
        recipeCard.innerHTML = `
        <div class="position-relative">
        <div class="gradient-overlay"></div>
        <h5 class="card-title position-absolute start-0 bottom-0 text-white p-3">${recipe.label}</h5>
        <div class="d-flex img-container-card">
          <div class="bg-image" style="background-image: url('${recipe.image}');"></div>
        </div>
      </div>
      <div class="card-body">
        <h6 class="border-bottom pb-3">Ingredients</h6>
        <div class="overflow-auto inset-list">
          <ul class="list-group list-group-flush" id="recipeIngredientsList">
            ${ingredientsList}
          </ul>
        </div>
        <div class="d-flex flex-wrap justify-content-center mt-3">
          <!-- This button opens the recipe-detail page -->
          <a href="/api/recipes/${recipe.id}" type="button" class="btn btn-info w-100 m-2">
            View Recipe
          </a>
        </div>
      </div>
      <!-- Only authorized users can add to saved-recipes -->
      
      <div class="card-footer bg-light-subtle d-flex flex-wrap justify-content-between align-items-center">
        <!-- This button sets is_favorite: true -->
        <button type="submit" class="btn btn-sm btn-outline-primary w-100" id="saveRecipe" data-recipe="${recipe.id}">
          Add to your favorites?
          <i class="far fa-star text-primary ps-5"></i>
        </button>
      </div>
      
        `;
        return recipeCard;
      }

      var ingredientListHTML = await createIngredientList(ingredientsArr);
      var recipeCard = createRecipeCard(recipes[i], ingredientListHTML);
      recipeCardGrid.appendChild(recipeCard);
    } 

      return recipeCardGrid;
    
  } else {
    alert(response.statusText);
  }
};

document.querySelector("#recipeSearch").addEventListener("submit", searchRecipes);
