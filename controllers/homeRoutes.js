const router = require('express').Router();
const { Recipe, Ingredients, ShoppingList} = require('../models');
const withAuth = require('../utils/auth');


// homepage
router.get('/', async (req, res) => {
  console.log('HI THERE! ');
  
  try {
    console.log('TRYING');
    
    const allRecipesData = await Recipe.findAll({
      include: {
        model: Ingredients,
        through: ShoppingList,
        as: 'ingredientList'
      }
    });

    const recipes = allRecipesData.map((recipe) => {
      const plainRecipe = recipe.get({ plain: true });
      plainRecipe.ingredients = plainRecipe.ingredientList.map((ingredient) => ({
        quantity: ingredient.amount,
        measure: ingredient.units,
        food: ingredient.ingredient_name,
        image: ingredient.ingredient_img
      }));
      delete plainRecipe.ingredientList;
      return plainRecipe;
    });

    res.render('homepage', {
      recipes,
      
     
    });
  } catch (err) {
    console.error(err)
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

//signup route
router.get('/signup', (req,res) => {
  if(req.session.logged_in){
    res.redirect('/');
    return;
  };
  res.render('signup');
})



//all recipes, favorited by logged in user
router.get('/favorites', withAuth, async(req,res) => {
  try {
    const myRecipes=await User.findOne({
      where: {id: req.session.user_id},
      include: {model: Recipe, through: SelectedRecipes, as: 'recipes'},
    })
    res.status(200).json(myRecipes)
  } catch (err){
    res.status(500).json(err);
  }
});





module.exports = router;
