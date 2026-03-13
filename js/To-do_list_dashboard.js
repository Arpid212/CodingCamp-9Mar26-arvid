// Lokal
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let links = JSON.parse(localStorage.getItem('links')) || [];
let currentFilter = 'all';

// jam
function updateClock() {
    const now = new Date();
    
    document.getElementById('clock').textContent = now.toLocaleTimeString('en-US', { hour12: false });
    
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('date').textContent = now.toLocaleDateString('en-US', options);

    const hour = now.getHours();
    let greeting = 'Good Evening';
    if (hour >= 5 && hour < 12) greeting = 'Good Morning';
    else if (hour >= 12 && hour < 18) greeting = 'Good Afternoon';
    
    document.getElementById('time-greeting').textContent = greeting;
}
setInterval(updateClock, 1000);
updateClock();


// Custom nama & Pop up
const nameEl = document.getElementById('user-name');
const editNameBtn = document.getElementById('btn-edit-name');
const nameModal = document.getElementById('name-modal');
const modalNameInput = document.getElementById('modal-name-input');
const saveNameBtn = document.getElementById('btn-save-name');

function checkAndLoadName() {
    const savedName = localStorage.getItem('userName');
    if (savedName) {
        // Jika nama sudah ada di Local Storage, tampilkan
        nameEl.textContent = savedName;
        nameModal.classList.add('hidden');
    } else {
        // Jika belum ada nama, munculkan pop-up form
        nameEl.textContent = '...';
        nameModal.classList.remove('hidden');
        modalNameInput.focus();
    }
}

editNameBtn.addEventListener('click', () => {
    modalNameInput.value = localStorage.getItem('userName') || '';
    nameModal.classList.remove('hidden');
    modalNameInput.focus();
});

// Tombol Save di Pop-up diklik
saveNameBtn.addEventListener('click', () => {
    const newName = modalNameInput.value.trim();
    if (newName) {
        localStorage.setItem('userName', newName);
        nameEl.textContent = newName;
        nameModal.classList.add('hidden'); // Tutup pop-up
    } else {
        alert("Please enter a valid name."); // Validasi jika kosong
    }
});

// Jalankan pengecekan nama saat aplikasi pertama kali dimuat
checkAndLoadName();

// timer
let timerInterval;

let defaultTime = parseInt(localStorage.getItem('pomodoroTime')) || (25 * 60);
let timeLeft = defaultTime; 

const timerDisplay = document.getElementById('timer-display');
const timeInput = document.getElementById('time-input'); // Menangkap elemen input
const btnSetTime = document.getElementById('btn-set'); // Menangkap tombol set

function formatTime(seconds) {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
}

function updateTimerDisplay() {
    timerDisplay.textContent = formatTime(timeLeft);
}

updateTimerDisplay();

btnSetTime.addEventListener('click', () => {
    const inputMinutes = parseInt(timeInput.value);
    
    if (!isNaN(inputMinutes) && inputMinutes > 0 && inputMinutes <= 120) {
        defaultTime = inputMinutes * 60;
        timeLeft = defaultTime;

        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
        
        localStorage.setItem('pomodoroTime', defaultTime.toString());
      
        updateTimerDisplay();
        timeInput.value = ''; 
    } else {
        alert("Please enter a valid time between 1 and 120 minutes.");
    }
});

document.getElementById('btn-start').addEventListener('click', () => {
    if (timerInterval) return; // Mencegah interval ganda jika tombol start diklik berkali-kali
    timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimerDisplay();
        } else {
            clearInterval(timerInterval);
            timerInterval = null;
            alert("Focus time is over! Take a break.");
        }
    }, 1000);
});


document.getElementById('btn-stop').addEventListener('click', () => {
    clearInterval(timerInterval);
    timerInterval = null;
});

document.getElementById('btn-reset').addEventListener('click', () => {
    clearInterval(timerInterval);
    timerInterval = null;
    timeLeft = defaultTime; // Mengembalikan ke waktu default yang sudah diset, BUKAN 25 menit mutlak
    updateTimerDisplay();
});

// to do list
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const taskSort = document.getElementById('task-sort');

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = '';
    
    // Sorting logic
    const filteredTasks = tasks.filter(task => {
        if (currentFilter === 'active') return !task.completed;
        if (currentFilter === 'completed') return task.completed;
        return true; // 'all'
    });

    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        if (task.completed) li.classList.add('completed');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => toggleTask(task.id));

        const span = document.createElement('span');
        span.textContent = task.text;

        // Edit button
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.className = 'btn-edit';
        editBtn.addEventListener('click', () => editTask(task.id));

        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'btn-danger';
        deleteBtn.addEventListener('click', () => deleteTask(task.id));

        li.append(checkbox, span, editBtn, deleteBtn);
        taskList.appendChild(li);
    });
}

document.getElementById('btn-add-task').addEventListener('click', () => {
    const text = taskInput.value.trim();
    if (text) {
        tasks.push({ id: Date.now(), text: text, completed: false });
        taskInput.value = '';
        saveTasks();
        renderTasks();
    }
});

function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
    }
}

function editTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        const newText = prompt("Edit task:", task.text);
        if (newText !== null && newText.trim() !== '') {
            task.text = newText.trim();
            saveTasks();
            renderTasks();
        }
    }
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    renderTasks();
}

taskSort.addEventListener('change', (e) => {
    currentFilter = e.target.value;
    renderTasks();
});

renderTasks();

// link
const linkNameInput = document.getElementById('link-name');
const linkUrlInput = document.getElementById('link-url');
const linksContainer = document.getElementById('links-container');

function saveLinks() {
    localStorage.setItem('links', JSON.stringify(links));
}

function renderLinks() {
    linksContainer.innerHTML = '';
    links.forEach(link => {
        const div = document.createElement('div');
        div.className = 'link-item';

        const a = document.createElement('a');
        a.href = link.url;
        a.textContent = link.name;
        a.target = '_blank'; // Open in new tab

        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '&times;';
        deleteBtn.title = "Delete Link";
        deleteBtn.addEventListener('click', () => deleteLink(link.id));

        div.append(a, deleteBtn);
        linksContainer.appendChild(div);
    });
}

document.getElementById('btn-add-link').addEventListener('click', () => {
    const name = linkNameInput.value.trim();
    let url = linkUrlInput.value.trim();
    
    if (name && url) {
        // Ensure valid URL format
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
        }
        
        links.push({ id: Date.now(), name: name, url: url });
        linkNameInput.value = '';
        linkUrlInput.value = '';
        saveLinks();
        renderLinks();
    } else {
        alert("Please enter both link name and URL.");
    }
});

function deleteLink(id) {
    links = links.filter(l => l.id !== id);
    saveLinks();
    renderLinks();
}

renderLinks();

// light/dark mode
const themeToggleBtn = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme') || 'light';

if (currentTheme === 'dark') {
    document.body.setAttribute('data-theme', 'dark');
}

themeToggleBtn.addEventListener('click', () => {
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    if (isDark) {
        document.body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
    } else {
        document.body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
});