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

document.querySelector("#inStockBtn").addEventListener("click", (event) => {
    updateIngredients(event, false, true);
});

document.querySelector("#shoppingListBtn").addEventListener("click", (event) => {
    updateIngredients(event, true, false);
});

document.querySelector("#defaultBtn").addEventListener("click", (event) => {
    updateIngredients(event, false, false);
});
