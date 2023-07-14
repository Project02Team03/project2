
const router = require('express').Router();

const { Recipe, 
    SelectedRecipe,
    Ingredients, 
    ShoppingList, 
    User } = require('../../models');

const withAuth = require('../../utils/auth');

//get all ingredients
router.get("/", (req, res) => {
    Ingredients.findAll({
            attributes: ["id", "ingredient_name", "amount", "in_stock"],
            include: [
                {
                  model: SelectedRecipe,
                  attributes: ['id', 'recipe_name', 'description', 'is_favorite'],
                  include: {
                    model: User,
                    attributes: ['username'],
                  },
                },
              ],
            })
        .then((IngredientsData) => res.json(IngredientsData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});
//get all ingredients from one recipe?
router.get("/recipe/:id", (req, res) => {
    const { id } = req.params;
    Ingredients.findAll({ where: { id } })
      .then((ingredientsData) => {
        if (ingredientsData.length === 0) {
          res.status(404).json({ message: `No ingredients found` });
          return;
        }
        res.status(200).json(ingredientsData);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });
  
  module.exports = router;