// require('dotenv').config();
const app_id = `9b79a237`; 
const app_key = `150185214857b1583f258fc60e628a04`;

const searchRecipes = async (event) => {
  event.preventDefault();

  const searchTerms = document.querySelector('input[name="search-terms"]').value;

  console.log(searchTerms);

  const response = await fetch(`https://api.edamam.com/api/recipes/v2?q=${searchTerms}&app_id=${app_id}&app_key=${app_key}&_cont=CHcVQBtNNQphDmgVQntAEX4BYldtBAYEQ21GBWQaaldyDAQCUXlSB2ZCNl17BgcESmVBAjAaZ1RyUFFUEmAWB2tFMVQiBwUVLnlSVSBMPkd5BgMbUSYRVTdgMgksRlpSAAcRXTVGcV84SU4%3D&type=public&app_id=9b79a237"`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const data = await response.json();
    const recipes = data.hits.map((recipe) => recipe.recipe);

    for (var i = 0; i < recipes.length; i++) {
      console.log(recipes[i].label);
    }

    

  } else {
    alert(response.statusText);
  }
};

document.querySelector("#recipeSearch").addEventListener("submit", searchRecipes);
