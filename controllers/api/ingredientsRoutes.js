
const router = require('express').Router();

const {
    Recipe,
    SelectedRecipe,
    Ingredients,
    ShoppingList
} = require('../../models');

const withAuth = require('../../utils/auth');

//get all ingredients
router.get("/", (req, res) => {
    Ingredients.findAll({
            attributes: ["", "", "" ]
            include: [{
                    model: User,
                    attributes: ["username"],
                },
                {
                    model: Recipe,
                    attributes: ["id", "recipe_name", "description", "is-favorite"],
                    include: {
                        model: User,
                        attributes: ["username"],
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
router.get("/", (req, res) => {
    const { id } = req.query;
   Ingredients.findAll({ where: { id } })
      .then((IngredientsData) => {
        if (IngredientsData.length === 0) {
          res.status(404).json({ message: `No comment` });
          return;
        }
        res.status(200).json(IngredientsData);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });
  