/*
document.querySelector("#recipeDetailContainer").addEventListener("click", async (event) => {
    const clickedElement = event.target;
  
    if (clickedElement.classList.contains("shoppingListBtn")) {
      try {
        const ingredientImg = clickedElement.getAttribute("data-ingredient-img");
        const ingredientName = clickedElement.getAttribute("data-ingredient-name");
        const ingredientAmount = clickedElement.getAttribute("data-ingredient-amount");
        const ingredientUnits = clickedElement.getAttribute("data-ingredient-units");
        const recipeId = clickedElement.getAttribute("data-recipe-id");
  
        const response = await fetch("/api/ingredients/list", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ingredient_img: ingredientImg,
            ingredient_name: ingredientName,
            amount: ingredientAmount,
            units: ingredientUnits,
            recipeId: recipeId,
          }),
        });
  
        if (response.ok) {
          document.location.reload();
        } else {
          alert(response.statusText);
        }
      } catch (error) {
        // Handle any other errors
        console.error(error);
      }
    }
  });
  
  */


const updateIngredients = async (event, shoppingList, inStock) => {
    event.preventDefault();
    console.log(event, shoppingList, inStock);
    const id = event.target.getAttribute("data-button");
    console.log(id);

    const response = await fetch(`/api/ingredients/${id}`, {
        method: "PUT",
        body: JSON.stringify({
            ingredient_id: id,
            shopping_list: shoppingList,
            in_stock: inStock,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (response.ok) {
        console.log(response);
        document.location.reload();
    } else {
        alert(response.statusText);
    }
};




// document.querySelector("#inStockBtn").addEventListener("click", (event) => {
//     updateIngredients(event, false, true);
// });

document.querySelector("#shoppingListBtn").addEventListener("click", (event) => {
     updateIngredients(event, true, false);
 });

 document.querySelector("#defaultBtn").addEventListener("click", (event) => {
     updateIngredients(event, false, false);
 });
