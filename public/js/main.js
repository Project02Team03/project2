const recipeModal = async (event) => {
    event.preventDefault();
  
    const recipe_id = document
      .querySelector('.recipe-id')
      .value.trim();
      
    console.log('==========================================================');
  
    /* const recipe_id = window.location.toString().split("/")[
      window.location.toString().split("/").length - 1
    ]; */
   console.log(recipe_id);
    if (recipe_id) {
      const response = await fetch(`/api/recipes/${recipe_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        document.location.replace(`api/recipes/${recipe_id}`);
      } else {
        alert(response.statusText);
      }
    }
    console.log(recipe);
    
  };

// const recipe_id = document
//         .querySelector('.recipe-id')
//         .value.trim();
//  const recipeModal=function(recipe_id){
  
//   fetch(`/api/recipes/${recipe_id}`, {
//     method: 'GET',
//     headers: {"Content-Type": "application/json", }
//   })
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     console.log(data);
//   })
//   .catch(error => {
//     //handle error
//   });
// };
  document
    .querySelector("#recipeModal")
    .addEventListener("click", recipeModal);