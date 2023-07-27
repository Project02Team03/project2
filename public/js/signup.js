
const signupFormFunction = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    const response = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({
            name: name, 
            email: email,
            password: password,
        }),
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        document.location.replace('/');
    } else {
        alert('error!');
    }
};

document.querySelector('#signup-form').addEventListener('submit', signupFormFunction);