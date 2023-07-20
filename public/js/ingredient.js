document.querySelector("#recipeDetailContainer").addEventListener("click", (event) => {
    const clickedElement = event.target;
    const buttonId = clickedElement.id;
  
    if (buttonId.startsWith("inStockBtn")) {
        const index = buttonId.split("-")[1];
        const inStockBtn = document.querySelector(`#inStockBtn-${index}`);
        const shoppingListBtn = document.querySelector(`#shoppingListBtn-${index}`);
        toggleStockBtn(inStockBtn, shoppingListBtn);
    }
  
    if (buttonId.startsWith("shoppingListBtn")) {
        const index = buttonId.split("-")[1];
        const shoppingListBtn = document.querySelector(`#shoppingListBtn-${index}`);
        const inStockBtn = document.querySelector(`#inStockBtn-${index}`);
        toggleListBtn(shoppingListBtn, inStockBtn);
    }
  });




function toggleStockBtn(event) {
    event.preventDefault();
    const inStockBtn = event.target;
    if (inStockBtn.classList.contains("btn-outline-success")) {
        inStockBtn.classList.remove("btn-outline-success");
        inStockBtn.classList.add("btn-success");
    } else if (inStockBtn.classList.contains("btn-success")) {
        inStockBtn.classList.remove("btn-success");
        inStockBtn.classList.add("btn-outline-success");
    }
}

function toggleListBtn(event) {
    event.preventDefault();
    const shoppingListBtn = event.target;
    if (shoppingListBtn.classList.contains("btn-outline-primary")) {
        shoppingListBtn.classList.remove("btn-outline-primary");
        shoppingListBtn.classList.add("btn-primary");
    } else if (shoppingListBtn.classList.contains("btn-primary")) {
        shoppingListBtn.classList.remove("btn-primary");
        shoppingListBtn.classList.add("btn-outline-primary");
    }
}

/*
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
*/

document.querySelector("#recipeDetailContainer").addEventListener("click", (event) => {
    const clickedElement = event.target;

    if (clickedElement.classList.contains("inStockBtn")) {
        toggleStockBtn(event);
    }

    if (clickedElement.classList.contains("shoppingListBtn")) {
        toggleListBtn(event);
    }
});

// document.querySelector("#inStockBtn").addEventListener("click", (event) => {
//     updateIngredients(event, false, true);
// });

// document.querySelector("#shoppingListBtn").addEventListener("click", (event) => {
//     updateIngredients(event, true, false);
// });

// document.querySelector("#defaultBtn").addEventListener("click", (event) => {
//     updateIngredients(event, false, false);
// });
