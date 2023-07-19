
const signupFormFunction = async (event) => {
    event.preventDefault();
    
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
     const email=document.querySelectorAll('#email-signup').value;
    const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({
            
            username, 
            email,
            password,
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