document.addEventListener('DOMContentLoaded', () => {
    const routineForm = document.getElementById('routine-form');
    const routineInput = document.getElementById('routine-input');
    const routineList = document.getElementById('routine-list');

    routineForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const routineText = routineInput.value.trim();
        if (routineText === '') return;

        const li = document.createElement('li');
        li.textContent = routineText;
        routineList.appendChild(li);

        const completeButton = document.createElement('button');
        completeButton.textContent = 'Erledigt';
        li.appendChild(completeButton);

        completeButton.addEventListener('click', () => {
            li.classList.toggle('completed');
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Löschen';
        li.appendChild(deleteButton);

        deleteButton.addEventListener('click', () => {
            routineList.removeChild(li);
        });

        routineInput.value = '';
    });
});
