const recipeModal = async (event) => {
    event.preventDefault();
  
    const recipe_id = document
      .querySelector('.recipe-id')
      .value.trim();
  
    /* const recipe_id = window.location.toString().split("/")[
      window.location.toString().split("/").length - 1
    ]; */
  
    if (recipe_id) {
      const response = await fetch("/api/recipes/", {
        method: "GET",
        body: JSON.stringify({
          recipe_id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        document.location.replace(`/${recipe_id}`);
      } else {
        alert(response.statusText);
      }
    }
  };
  
  document
    .querySelector("#recipeModal")
    .addEventListener("submit", recipeModal);
  