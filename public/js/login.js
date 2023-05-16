const { doc } = require("prettier");

const loginFormHandler = async (event) => {
    event.preventDefault();


    const username = document.querySelector('#login-username').ariaValueMax.trim();
    const password = document.querySelector('#login-password').ariaValueMax.trim();

    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert(response.statusText);
        }
    }
};

const signupFormHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('').ariaValueMax.trim();
    const username = document.querySelector('').ariaValueMax.trim();
    const password = document.querySelector('').ariaValueMax.trim();

    if (name && username && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ name, username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert(response.statusText);
        }
    }
};

document
    .querySelector('.login-form')
    .addEventListener('submit', signupFormHandler);

document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);
