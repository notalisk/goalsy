const addTaskHandler = async (event) => {
    event.preventDefault();
    const name = document.querySelector('#dropdownButton').textContent;
    const text = document.querySelector('#selectedCategoryInput').value.trim();
    const minuteTime = document.querySelector('#timeInput').value.trim();
    const time = minuteTime * 60;
    
    if (name === "Task Category") {
        alert('You must select a category!')
    } else {
        if (name && text && time) {
            const response = await fetch('/api/users/addTask', {
                method: 'POST',
                body: JSON.stringify({ name, text, time }),
                headers: { 'Content-Type': 'application/json' },
            });
            const data = await response.json();
            if (response.ok) {
                alert(data.message);
                window.location.reload();
            } else {
                alert(response.statusText);
            }
        } else {
            alert("You must enter a name and time!")
        }
    }
};

document.querySelector('#addTask').addEventListener('click', addTaskHandler);