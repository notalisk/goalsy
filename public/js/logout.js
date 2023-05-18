// async function for logout
const logout = async () => {
    const response = await fetch ('api/users/logout', {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        // if logout response 200 send user to the homepage
        document.location.replace('/');
    } else {
        // send alert if log out not successful
        alert(response.statusText);
    }
};

// making logout button clickable
document.querySelector('#logout').addEventListener('click', logout);