const sequelize = require('../config/connection');
const { Recipe, User, Ingredients, SelectedRecipe, ShoppingList}=require('../models');
//const rawRecipesData = require('./recipesData.json');
const recipeData=require('./recipes.json');
const userData = require('./userData.json');
const ingredientsData=require('./ingredientsData.json');
const selectedData=require('./selectedData.json');
const shoppingListData=require('./shoppingData.json');


const seedDatabase = async () => {
    await sequelize.sync({ force: false });
  
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

    
      await SelectedRecipe.bulkCreate(selectedData, {
        individualHooks: true,
        returning: true,
      });
      await ShoppingList.bulkCreate(shoppingListData, {
        individualHooks: true,
        returning: true,
      });*/
      
    process.exit(0);
  };
  
  seedDatabase();
  

