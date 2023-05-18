const signupFormHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#signup-email').value.trim();
    const username = document.querySelector('#signup-username').value.trim();
    const password = document.querySelector('#signup-password').value.trim();

    // user must signup with email username and password
    if (email && username && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ email, username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            // if the user signs up correctly they will be dirceted to profile page
            document.location.replace('/profile');
        } else {
            // if sign up fails they will get a alert
            alert(response.statusText);
        }
    }
};

document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);
