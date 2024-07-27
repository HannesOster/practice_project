document.addEventListener('DOMContentLoaded', () => {
    const routineForm = document.getElementById('routine-form');
    const routineInput = document.getElementById('routine-input');
    const reminderTimeInput = document.getElementById('reminder-time');
    const prioritySelect = document.getElementById('priority');
    const routineList = document.getElementById('routine-list');
    const allBtn = document.getElementById('all-btn');
    const completedBtn = document.getElementById('completed-btn');
    const pendingBtn = document.getElementById('pending-btn');
    let editMode = false;
    let editLi = null;

    function saveRoutines() {
        const routines = [];
        routineList.querySelectorAll('li').forEach(li => {
            routines.push({
                text: li.childNodes[0].nodeValue,
                completed: li.classList.contains('completed'),
                reminderTime: li.dataset.reminderTime,
                priority: li.dataset.priority
            });
        });
        localStorage.setItem('routines', JSON.stringify(routines));
    }

    function loadRoutines() {
        const routines = JSON.parse(localStorage.getItem('routines')) || [];
        routineList.innerHTML = '';
        routines.forEach(routine => {
            const li = document.createElement('li');
            li.textContent = routine.text;
            li.dataset.reminderTime = routine.reminderTime;
            li.dataset.priority = routine.priority;
            li.classList.add(routine.priority);
            if (routine.completed) {
                li.classList.add('completed');
            }

            li.setAttribute('draggable', true);

            const completeButton = document.createElement('button');
            completeButton.textContent = 'Erledigt';
            completeButton.classList.add('complete-btn');
            li.appendChild(completeButton);

            completeButton.addEventListener('click', () => {
                li.classList.toggle('completed');
                saveRoutines();
            });

            const editButton = document.createElement('button');
            editButton.textContent = 'Bearbeiten';
            li.appendChild(editButton);

            editButton.addEventListener('click', () => {
                routineInput.value = li.childNodes[0].nodeValue;
                reminderTimeInput.value = li.dataset.reminderTime;
                prioritySelect.value = li.dataset.priority;
                editMode = true;
                editLi = li;
            });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Löschen';
            li.appendChild(deleteButton);

            deleteButton.addEventListener('click', () => {
                routineList.removeChild(li);
                saveRoutines();
            });

            routineList.appendChild(li);

            // Set reminder
            if (routine.reminderTime) {
                const now = new Date();
                const reminderTime = new Date();
                const [hours, minutes] = routine.reminderTime.split(':');
                reminderTime.setHours(hours, minutes, 0);

                if (reminderTime > now) {
                    const timeout = reminderTime - now;
                    setTimeout(() => {
                        alert(`Erinnerung: ${routine.text}`);
                    }, timeout);
                }
            }
        });
    }

    function filterRoutines(status) {
        const routines = JSON.parse(localStorage.getItem('routines')) || [];
        routineList.innerHTML = '';

        routines.forEach(routine => {
            if (status === 'all' || (status === 'completed' && routine.completed) || (status === 'pending' && !routine.completed)) {
                const li = document.createElement('li');
                li.textContent = routine.text;
                li.dataset.reminderTime = routine.reminderTime;
                li.dataset.priority = routine.priority;
                li.classList.add(routine.priority);
                if (routine.completed) {
                    li.classList.add('completed');
                }

                const completeButton = document.createElement('button');
                completeButton.textContent = 'Erledigt';
                completeButton.classList.add('complete-btn');
                li.appendChild(completeButton);

                completeButton.addEventListener('click', () => {
                    li.classList.toggle('completed');
                    saveRoutines();
                });

                const editButton = document.createElement('button');
                editButton.textContent = 'Bearbeiten';
                li.appendChild(editButton);

                editButton.addEventListener('click', () => {
                    routineInput.value = li.childNodes[0].nodeValue;
                    reminderTimeInput.value = li.dataset.reminderTime;
                    prioritySelect.value = li.dataset.priority;
                    editMode = true;
                    editLi = li;
                });

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Löschen';
                li.appendChild(deleteButton);

                deleteButton.addEventListener('click', () => {
                    routineList.removeChild(li);
                    saveRoutines();
                });

                routineList.appendChild(li);
            }
        });
    }

    routineForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const routineText = routineInput.value.trim();
        const reminderTime = reminderTimeInput.value;
        const priority = prioritySelect.value;
        if (routineText === '') return;

        if (editMode) {
            editLi.childNodes[0].nodeValue = routineText;
            editLi.dataset.reminderTime = reminderTime;
            editLi.dataset.priority = priority;
            editLi.classList.add(priority);
            editMode = false;
            editLi = null;
        } else {
            const li = document.createElement('li');
            li.textContent = routineText;
            li.dataset.reminderTime = reminderTime;
            li.dataset.priority = priority;
            li.classList.add(priority);
            routineList.appendChild(li);

            const completeButton = document.createElement('button');
            completeButton.textContent = 'Erledigt';
            completeButton.classList.add('complete-btn');
            li.appendChild(completeButton);

            completeButton.addEventListener('click', () => {
                li.classList.toggle('completed');
                saveRoutines();
            });

            const editButton = document.createElement('button');
            editButton.textContent = 'Bearbeiten';
            li.appendChild(editButton);

            editButton.addEventListener('click', () => {
                routineInput.value = li.childNodes[0].nodeValue;
                reminderTimeInput.value = li.dataset.reminderTime;
                prioritySelect.value = li.dataset.priority;
                editMode = true;
                editLi = li;
            });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Löschen';
            li.appendChild(deleteButton);

            deleteButton.addEventListener('click', () => {
                routineList.removeChild(li);
                saveRoutines();
            });

            routineList.appendChild(li);
        }

        routineInput.value = '';
        reminderTimeInput.value = '';
        saveRoutines();
    });

    allBtn.addEventListener('click', () => filterRoutines('all'));
    completedBtn.addEventListener('click', () => filterRoutines('completed'));
    pendingBtn.addEventListener('click', () => filterRoutines('pending'));

    loadRoutines();
});
