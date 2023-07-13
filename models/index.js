const User = require('./User');
const Recipe=require('/Recipe');
const Ingredients =require('/Ingredients');
const SelectedRecipe = require('./SelectedRecipe');
const ShoppingList = require('./ShoppingList');
//relationships User-Recipe
User.belongsToMany(Recipe, {
    through: {
        model: SelectedRecipes,
        unique: false
      },
      
      as: 'user_id'
});

Recipe.belongsToMany(User, {
    through: {
        model: SelectedRecipe,
        unique: false
      },
      
      as: 'recipe_id'
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
    through: {
        model: ShoppingList,
        unique: false
      },
      
      as: 'ingredient_name',
});

Recipe.belongsToMany(Ingredients, {
    through: {
        model: ShoppingList,
        unique: false
      },
      
      as: 'recipe_id',
})



module.exports = { 
    User,
    Recipe,
    Ingredients,
    ShoppingList,
    SelectedRecipe};
