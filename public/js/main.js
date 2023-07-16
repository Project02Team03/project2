//fetch the recipe from home page for details
const recipeCards=document.querySelectorAll('.recipe_card');
console.log(recipeCards);

fetch('api/recipes/1', {
    method: 'GET',
    redirect: '/recipe/1'
})
 .then(function(response){
    return response.json()})
 .then(function(data){
        console.log(data);
        
    });
      

// const viewRecipeCard= async(event ) => {
//     event.preventDefault();
//     for (var i=0; i< recipeCards.length; i++){
//         const id=i+1;
//         const response= await fetch('api/recipes/2', {
//             method: 'GET',
//             body: JSON.stringify({
                
                
//             })
//         });
           
//         if(response.ok) {
//         document.location.replace('/recipe/1');

//          } else {
//            alert('Recipe not found')
//         }
//     }
// };
recipeCards.addEventListener('click', viewRecipeCard);  