document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('taskInput');
  const addTaskBtn = document.getElementById('addTaskBtn');
  const pendingList = document.getElementById('pendingList');
  const completedList = document.getElementById('completedList');
  const dateInput = document.getElementById('date');

  // Load saved tasks from local storage
  loadTasks();

  addTaskBtn.addEventListener('click', addTask);
  taskInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') addTask();
  });

  function addTask() {
      const taskText = taskInput.value.trim();
      const date = dateInput.value;

      if (taskText === '' || date === '') {
          alert('Please enter a task and select a date!');
          return;
      }

      const task = {
          text: taskText,
          date: date,
          completed: false
      };

      saveTask(task);
      renderTask(task);
      taskInput.value = '';
  }

  function renderTask(task) {
      const li = document.createElement('li');
      li.innerHTML = `
          <span><i class="fas fa-tasks"></i> ${task.text} (${task.date})</span>
          <button onclick="toggleTask(this)"><i class="fas fa-check"></i></button>
      `;

      if (task.completed) {
          li.classList.add('completed');
          completedList.appendChild(li);
      } else {
          pendingList.appendChild(li);
      }
  }

  function toggleTask(button) {
      const li = button.parentElement;
      li.classList.toggle('completed');

      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      const taskText = li.querySelector('span').innerText.split(' (')[0];
      const task = tasks.find(t => t.text === taskText);

      if (task) {
          task.completed = !task.completed;
          localStorage.setItem('tasks', JSON.stringify(tasks));
      }

      if (li.classList.contains('completed')) {
          completedList.appendChild(li);
      } else {
          pendingList.appendChild(li);
      }
  }

  function saveTask(task) {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.push(task);
      localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function loadTasks() {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.forEach(task => renderTask(task));
  }
});

window.toggleTask = function(button) {
  const li = button.parentElement;
  li.classList.toggle('completed');

  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const taskText = li.querySelector('span').innerText.split(' (')[0];
  const task = tasks.find(t => t.text === taskText);

  if (task) {
      task.completed = !task.completed;
      localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  if (li.classList.contains('completed')) {
      document.getElementById('completedList').appendChild(li);
  } else {
      document.getElementById('pendingList').appendChild(li);
  }
};