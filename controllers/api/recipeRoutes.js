
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
        // const recipeIngredients = JSON.parse(ingredients);

        console.log("Recipe:", label, image_link, url);
        console.log("Ingredients:", ingredients);

        const createdRecipe = await Recipe.create({ 
            recipe_name: label, 
            image_link, 
            recipe_url: url,
            ingredients, 
        });

        for (const recipeIngredient of ingredients) {
            const { quantity, measure, food, image: ingredient_img } = recipeIngredient;
            console.log("Ingredient:", food, quantity, measure, ingredient_img);

            const ingredientsData = {
                ingredient_img: ingredients.image || "",
                ingredient_name: ingredients.food || "",
                amount: ingredients.quantity || 0,
                units: ingredients.measure || "",
                in_stock: false,
                in_list: false,
            };

            const createdIngredient = await Ingredients.create(ingredientsData);

            /*
            await Ingredients.create({ 
                ingredient_img, 
                ingredient_name: food, 
                amount: quantity, 
                units: measure, 
                recipe_id: createdRecipe.id 
            });
            */
        }
      }
  
      res.status(200).json({ message: "Recipe stored!" });
    } catch (err) {
        console.error(err);
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




