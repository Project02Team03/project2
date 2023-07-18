
const router = require('express').Router();

const {
    Recipe,
    SelectedRecipe,
    Ingredients,
    ShoppingList,
    User
} = require('../../models');

const withAuth = require('../../utils/auth');


/* This route stores search for recipes in local database */
router.post("/", async (req, res) => {
    try {
      const { recipes } = req.body;
  
      for (const recipe of recipes) {
        const { label, image: image_link, url, ingredients } = recipe;

        const createdRecipe = await Recipe.create({ 
            recipe_name: label, 
            image_link, 
            recipe_url: url,
            ingredients: JSON.parse(ingredients), 
        });

        for (const recipeIngredients of ingredients) {
            const { quantity, measure, food, image } = recipeIngredients
            await Ingredients.create({ 
                ingredient_img: image, 
                ingredient_name: food, 
                amount: quantity, 
                units: measure, 
                recipe_id: createdRecipe.recipe_id 
            });
        }
      }
  
      res.status(200).json({ message: "Recipe stored!" });
    } catch (err) {
      res.status(500).json(err);
    }
  });


//i need to get all of the recipes
router.get("/", async (req, res) => {
        
    try {
                
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
router.get("/:id", async (req, res) => {
    try {
        const RecipeData=await Recipe.findOne({  
            where: {
                id: req.params.id,
            },
            include:{model: Ingredients, through: ShoppingList, as: 'ingredientList'}
        });  
        if (!RecipeData) {
            res.status(404).json({
                message: "Not found"
            });
            return;
        }

        const recipe = RecipeData.get({ plain: true });
        console.log("INGREDIENTS", recipe.ingredientList);
        
        
        res.render("recipe-detail", {
            recipe,
            id: req.params.id,
            
        });

    }  catch(err){
        res.status(500).json(err)
    }
});
//     Recipe.findOne({
//             where: {
//                 id: req.params.id,
//             },
//             attributes: ['id', 'recipe_name', 'description', 'ingredients', 'is_favorite'],
//             include: [
//               {
//                 model: SelectedRecipe,
//                 attributes: ['id', 'is_favorite', 'recipe_id', 'user_id'],
//                 include: {
//                   model: User,
//                   attributes: ['username'],
//                 },
//               },
//             ],
//           })
//         .then((RecipeData) => {
//             if (!RecipeData) {
//                 res.status(404).json({
//                     message: "Not found"
//                 });
//                 return;
//             }
//             res.json(RecipeData);
//         })
//         .catch((err) => {
//             console.log(err);
//             res.status(500).json(err);
//         });
// });


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




