const router = require('express').Router();
const { Recipe, Ingredients, ShoppingList} = require('../models');
//const withAuth = require('../utils/auth');

// Prevent non logged in users from viewing the homepage
router.get('/', async (req, res) => {
  console.log('HI THERE! ');
  
  try {
    console.log('TRYING');
    
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

module.exports = router;
