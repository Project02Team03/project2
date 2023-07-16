const ingredientInStock = async (event) => {
    event.preventDefault();

    const id = event.target.getAttribute("data-button");
    console.log(id);
    const response = await fetch(`/api/ingredients/${id}`, {
        method: "PUT",
        body: JSON.stringify({
            ingredient_id: id,
            in_stock: true,
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

const ingredientInShoppingList = async (event) => {
    event.preventDefault();

    const id = event.target.getAttribute("data-button");
    console.log(id);
    const response = await fetch(`/api/ingredients/${id}`, {
        method: "PUT",
        body: JSON.stringify({
            ingredient_id: id,
            shopping_list: true,
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

const ingredientGrabbed = async (event) => {
    event.preventDefault();

    const id = event.target.getAttribute("data-button");
    console.log(id);
    const response = await fetch(`/api/ingredients/${id}`, {
        method: "PUT",
        body: JSON.stringify({
            ingredient_id: id,
            shopping_list: false,
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

const ingredientDefault = async (event) => {
    event.preventDefault();

    const id = event.target.getAttribute("data-button");
    console.log(id);
    const response = await fetch(`/api/ingredients/${id}`, {
        method: "PUT",
        body: JSON.stringify({
            ingredient_id: id,
            shopping_list: false,
            in_stock: false,
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

document.querySelector("#inStockBtn").addEventListener("click", ingredientInStock);

document.querySelector("#shoppingListBtn").addEventListener("click", ingredientInShoppingList);

document.querySelector("#grabbedBtn").addEventListener("click", ingredientGrabbed);

document.querySelector("#defaultBtn").addEventListener("click", ingredientDefault);