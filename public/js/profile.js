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

const startTaskHandler = async (id) => {
    document.querySelector('.start-button').removeEventListener('click', startTaskHandler);

    const response = await fetch(`/api/users/tasks/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            blog: id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        alert("You completed a task!");
        window.location.reload();
    }

};

const startButton = document.querySelector('.start-button');
if (startButton) {
    startButton.addEventListener('click', startTaskHandler);
}

const deleteButton = document.querySelector('.delete-button');
if (deleteButton) {
    deleteButton.addEventListener('click', deleteTaskHandler);
}

const addTaskButton = document.querySelector('#addTask');
if (addTaskButton) {
    addTaskButton.addEventListener('click', addTaskHandler);
}
