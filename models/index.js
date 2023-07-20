const sequelize = require('../config/connection');

const User = require('./User');
const Recipe=require('./Recipe');
const Ingredients =require('./Ingredients');
const SelectedRecipe = require('./SelectedRecipe');
const ShoppingList = require('./ShoppingList');
//relationships User-Recipe
User.belongsToMany(Recipe, {
    through: {
        model: SelectedRecipe,
        unique: false
      },
      
      as: 'recipes'
});

Recipe.belongsToMany(User, {
    through: {
        model: SelectedRecipe,
        unique: false
      },
      
      as: 'users'
});

//relationships User-Ingredients
User.hasOne(Ingredients, {
    foreign_key: 'user_id',
    onDelete: 'CASCADE',
});

Ingredients.belongsTo(User, {
    foreign_key: 'user_id',
} );

//relationships Recipe-Ingredients
Ingredients.belongsToMany(Recipe, {
    through: ShoppingList,
    as: 'recipeList',
    // foreignKey: 'recipeId',
});

Recipe.belongsToMany(Ingredients, {
    through: ShoppingList,
    as: 'ingredientList',
    // foreignKey: 'recipeId',
  });



sequelize.sync();

module.exports = { 
    User,
    Recipe,
    Ingredients,
    ShoppingList,
    SelectedRecipe};
