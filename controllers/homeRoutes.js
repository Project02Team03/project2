const router = require('express').Router();
const { Recipe, Ingredients, ShoppingList} = require('../models');
const withAuth = require('../utils/auth');

// homepage
router.get('/', async (req, res) => {
  
  
  try {
   
    
    const allRecipesData = await Recipe.findAll({
      attributes: ["id", "image_link", "recipe_name", "recipe_url", "ingredients"],
     
      include: [{model: Ingredients, through: ShoppingList, as: 'ingredientList'}]
    });

    const recipes = allRecipesData.map((recipes) => recipes.get({ plain: true }));

    res.render('homepage', {
      recipes,
      
     
    });
  } catch (err) {
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
