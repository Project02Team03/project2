const { Op } = require("sequelize")
const router = require('express').Router();
const fetch = require('node-fetch');
//const withAuth=require('../../utils/auth');
/* adds middleware to use .env file */
require('dotenv').config();

const {
    Recipe,
    SelectedRecipe,
    Ingredients,
    ShoppingList,
    User
} = require('../../models');

const withAuth = require('../../utils/auth');

/* This is the route for the 3rd party API call */
router.post("/edamam", async (req, res) => {
    try {
        const { searchTerms } = req.body;

        const app_id = process.env.API_ID;
        const app_key = process.env.API_KEY;
        // const apiUrl = "https://api.edamam.com/api/recipes/v2";

        const response = await fetch(`https://api.edamam.com/api/recipes/v2?q=${searchTerms}&app_id=${app_id}&app_key=${app_key}&_cont=CHcVQBtNNQphDmgVQntAEX4BYldtBAYEQ21GBWQaaldyDAQCUXlSB2ZCNl17BgcESmVBAjAaZ1RyUFFUEmAWB2tFMVQiBwUVLnlSVSBMPkd5BgMbUSYRVTdgMgksRlpSAAcRXTVGcV84SU4%3D&type=public&app_id=${app_id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            res.status(response.status).json(response.statusText);
            return;
        }

        const data = await response.json();
        const recipes = data.hits.map((recipe, index) => {
          const { label, image, url } = recipe.recipe;
          
          const ingredients = recipe.recipe.ingredients.map((ingredient) => {
            const { quantity, measure, food, image } = ingredient;
            return { quantity, measure, food, image };
          });
          
          return { id: index + 1, label, image, url, ingredients };
        });

          res.json(recipes);
        
    } catch (err) {
        console.error(err);
        res.status(500).json(err)
    }
});


/* This route stores search for recipes in local database */
router.post("/", async (req, res) => {
    try {
      const { recipes } = req.body;
  
      for (const recipe of recipes) {
        const { label: recipe_name, image: image_link, url: recipe_url, ingredients } = recipe;
        // const recipeIngredients = JSON.parse(ingredients);

        console.log("Recipe:", recipe_name, image_link, recipe_url);
        console.log("Ingredients:", ingredients);

        const createdRecipe = await Recipe.create({ 
            recipe_name, 
            image_link, 
            recipe_url
        });

        for (const recipeIngredient of ingredients) {
            const { quantity, measure, food, image: ingredient_img } = recipeIngredient;
            console.log("Ingredient:", food, quantity, measure, ingredient_img);

            const createdIngredient = await Ingredients.create({
                ingredient_img: ingredient_img || "",
                ingredient_name: food || "",
                amount: quantity || null,
                units: measure || "",
                in_stock: false,
                in_list: false,
            });

            await ShoppingList.create({
                recipe_id: createdRecipe.id,
                ingredient_id: createdIngredient.id,
            });

        }
      }

      const allRecipes = await Recipe.findAll({
        include: {
            model: Ingredients,
            through: ShoppingList,
            as: "ingredientList",
        }
      });

      res.status(200).json(allRecipes);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
  });


//i need to get all of the recipes
router.get("/recipe", async (req, res) => {
        
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
router.get("/:id", withAuth, async (req, res) => {

    try {
        if (req.session) {
            const RecipeData = await Recipe.findOne({  
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
    
            const recipeIngredients = await Ingredients.findAll({
                where: {
                    id: { [Op.ne]: req.params.id },
                    ingredient_name: recipe.ingredientList.map((ingredient) => ingredient.ingredient_name),
                },
                /* 
                include: {
                    model: Ingredients,
                    through: ShoppingList,
                    as: 'ingredientList',
                    where: {
                        ingredient_name: recipe.ingredientList.map((ingredient) => ingredient.ingredient_name),
                    },
                },
                 */
            });
            
            
            res.render("recipe-detail", {
                recipe,
                id: req.params.id,

            },
            include: !req.session.logged_in ? {model: Ingredients, through: ShoppingList, as: 'ingredientList'} 
            :[{model: Ingredients, through: ShoppingList, as: 'ingredientList'}, {model: User, through: SelectedRecipe, as: 'users'}]
        });  

        if (!RecipeData) {
            res.status(404).json({
                message: "Not found"
            });
            return;
        }

        // // get the SavedRecipe record
        // const saved = await SavedRecipe.findOne({
        //     where: {
        //         recipe_id: req.params.id,
        //         user_id: req.session.user_id
        //     }
        // });
        

        const recipe = RecipeData.get({ plain: true });
        //console.log("RECIPE", recipe.users[0].selected_recipes);
        recipe.is_favorite=recipe.users?.filter(user =>user.id==req.session.user_id && user.selected_recipes.is_favorite).length>0;
        console.log(recipe);
        
        res.render("recipe-detail", {
            recipe,
            id: req.params.id,
            
            logged_in: req.session.logged_in
        });


    }  catch(err){
        console.log(err);
        
        res.status(500).json(err)
    }
});



//saving recipe to favorite
router.post('/:id/favorite',withAuth, async (req,res) => {
    try{
        console.log('USER', req.session.user_id, 'RECIPE',req.params.id);
        
        const recipeData=await SelectedRecipe.create({
            is_favorite: true, 
            recipe_id: req.params.id, 
            user_id: req.session.user_id
        });
        console.log(recipeData.is_favorite);
        
        if(recipeData){
            res.status(200).json({is_favorite:true});
            console.log('======================================');
           
        }  else {
            res.status(404).json.end();
        }
    }catch(err){
        res.status(500).json(err);
    }
})

//removing from favorites,
router.delete('/:id', withAuth, async(req,res) =>{
   // console.log("Req Parameter: ", req.params);   // --> { id: '1' }
  try{

    const favoriteData=await SelectedRecipe.destroy({
        where:{
            recipe_id: req.params.id,
            user_id:req.session.user_id
        }
    });
    if(!favoriteData){
        res.status(404).json({message: 'recipe not found'});
        return;
    }
    //console.log("Data from DB: ", favoriteData);


    // we w ill search for the curretUser ID (req.session.id)
    res.status(200).json(favoriteData)
  } catch(err){
    console.log("Error: ", err);
    res.status(500).json(err);
  }



})

// //then I need to delete the recipe
// router.delete("/:id", withAuth, (req, res) => {
//     Recipe.destroy({
//             where: {
//                 id: req.params.id,
//             },
//         })
//         .then((RecipeData) => {
//             if (!RecipeData) {
//                 res.status(404).json({
//                     message: "Not found!"
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

module.exports = router;




