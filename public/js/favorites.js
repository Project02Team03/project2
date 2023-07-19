var loggedInUserId=

const displayFavRecipes=async(event)=>{
    event.preventDefault();
    // Assuming you have the logged-in user's ID stored in a variable called loggedInUserId

        fetch(`api/users/${loggedInUserId}`)
        .then(response => response.json())
        .then(data => {
        // Handle the response data here
        console.log(data);
        })
        .catch(error => {
        // Handle any errors that occur during the fetch request
        console.error('Error:', error);
        });

}