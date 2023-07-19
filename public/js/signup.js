
const signupFormFunction = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#username').value.trim();
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();

    const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({
            name: name, 
            email: email,
            password: password,
        }),
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        document.location.replace('/savedrecipes');
    } else {
        alert('error!');
    }
};

document.querySelector('#signup-form').addEventListener('submit', signupFormFunction);