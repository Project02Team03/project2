const sequelize = require('../config/connection');
const { Recipe, User, Ingredients, SelectedRecipe, ShoppingList}=require('../models');
//const rawRecipesData = require('./recipesData.json');
const recipeData=require('./recipes.json');
const userData = require('./userData.json');
const ingredientsData=require('./ingredientsData.json');
const selectedData=require('./selectedData.json');
const shoppingListData=require('./shoppingData.json');
//let recipes=[];
// const pickData=()=>{
//    for (var i=0; i<rawRecipesData.length; i++){
//     //let ingredients=[];
//     console.log('HI THERE!!!-----------------');
    
//     recipes[i].image_link = rawRecipesData[i].hits.recipe.image
//     recipes[i].title=rawRecipesData[i].hits.recipe.label;
//     recipes[i].ingredients=rawRecipesData[i].hits.recipe.ingredientLines;
//    };
// };

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
  
    await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });
    
  /*
    await Recipe.bulkCreate(recipeData, {
        individualHooks: true,
        returning: true,
      });
  
      await Ingredients.bulkCreate(ingredientsData, {
        individualHooks: true,
        returning: true,
      });
*/
    
      await SelectedRecipe.bulkCreate(selectedData, {
        individualHooks: true,
        returning: true,
      });
      await ShoppingList.bulkCreate(shoppingListData, {
        individualHooks: true,
        returning: true,
      });
    process.exit(0);
  };
  
  seedDatabase();
  

// const seedUser = async () => {
//     await sequelize.sync({ force: true });
  
//     await User.bulkCreate(userData, {
//       individualHooks: true,
//       returning: true,
//     });
  
//     process.exit(0);
//   };





// console.log(recipesData);
// const seedRecipes = async () => {
//     await sequelize.sync({ force: true });
  
//     await Recipe.bulkCreate(recipesData, {
//       individualHooks: true,
//       returning: true,
//     });
  
//     process.exit(0);
//   };
//   seedRecipes(recipesData);
//   seedUser(userData);