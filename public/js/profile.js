const addTaskHandler = async (event) => {
    event.preventDefault();
    const name = document.querySelector('#dropdownButton').textContent;
    const text = document.querySelector('#selectedCategoryInput').value.trim();
    const time = document.querySelector('#timeInput').value.trim();

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

const deleteTaskHandler = async (event) => {
    let id = event;
    if (id === '[object PointerEvent]') {
        return;
    }
    
    document.querySelector('.delete-button').removeEventListener('click', deleteTaskHandler);

    const response = await fetch(`/api/users/tasks/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({
            blog: id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        window.location.reload();
    } else {
        alert(response.statusText);
    }
};

const startTaskHandler = async (event) => {

};
document.querySelector('.delete-button').addEventListener('click', deleteTaskHandler);

document.querySelector('#addTask').addEventListener('click', addTaskHandler);