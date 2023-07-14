
const router = require('express').Router();

const {
    Recipe,
    SelectedRecipe,
    Ingredients,
    ShoppingList,
    User
} = require('../../models');

const withAuth = require('../../utils/auth');


//i need to get all of the recipes
router.get("/", async (req, res) => {
    console.log('---------------------------THERE-----------------');
    
    try {
        console.log('---------------------------------------------------------------------------');
        
        const allRecipesData=await Recipe.findAll
            ({         
                include: [{model: Ingredients, through: ShoppingList, as: "ingredientList"}]
              
        });
        console.log(allRecipesData);
        
       res.status(200).json(allRecipesData) ;
    } catch (err){   
        res.status(500).json(err);
    }
});
//then i need to get a single recipe
router.get("/:id", (req, res) => {
    Recipe.findOne({
            where: {
                id: req.params.id,
            },
            attributes: ['id', 'recipe_name', 'description', 'ingredients', 'is_favorite'],
            include: [
              {
                model: SelectedRecipe,
                attributes: ['id', 'is_favorite', 'recipe_id', 'user_id'],
                include: {
                  model: User,
                  attributes: ['username'],
                },
              },
            ],
          })
        .then((RecipeData) => {
            if (!RecipeData) {
                res.status(404).json({
                    message: "Not found"
                });
                return;
            }
            res.json(RecipeData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});


//then I need to delete the recipe
router.delete("/:id", withAuth, (req, res) => {
    Recipe.destroy({
            where: {
                id: req.params.id,
            },
        })
        .then((RecipeData) => {
            if (!RecipeData) {
                res.status(404).json({
                    message: "Not found!"
                });
                return;
            }
            res.json(RecipeData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;




