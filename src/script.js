const newTaskToggleButton = document.getElementById('new-task-toggle-button');
const newTaskSection = document.querySelector('.add-new-task');
const newTaskForm = document.querySelector('.add-new-task-form');
const currentCategory = document.querySelector('#filter-category');
const currentStatus = document.querySelector('#filter-status');
const taskList = document.querySelector('.task-list');

const newTaskName = newTaskForm.elements['task-name'];
const newTaskDueDate = newTaskForm.elements['task-due-date'];
const newTaskCategory = newTaskForm.elements['task-category'];

newTaskToggleButton.addEventListener('click', () => {
  newTaskSection.classList.toggle('hidden');
});

newTaskForm.addEventListener('submit', (event) => {
  event.preventDefault();
  addNewTask();
});

const exampleTasks = [
  {
    name: 'Task Name 1',
    dueDate: '06/11/2024',
    category: 'work',
    status: 'done',
  },
  {
    name: 'Task Name 2',
    dueDate: '06/12/2024',
    category: 'personal',
    status: 'pending',
  },
  {
    name: 'Task Name 3',
    dueDate: '06/13/2024',
    category: 'shopping',
    status: 'pending',
  },
  {
    name: 'Task Name 4',
    dueDate: '06/14/2024',
    category: 'others',
    status: 'done',
  },
];

const tasks = localStorage.getItem('tasks') || exampleTasks;

// ADD NEW TASK (ALSO ADD TO LOCAL STORAGE)
// MARK TASK AS DONE
// DELETE TASK (ALSO DELETE FROM LOCAL STORAGE)
// CLEAR ALL TASKS (ALSO CLEAR LOCAL STORAGE)
// FILTER TASKS BY STATUS
// FILTER TASKS BY CATEGORY

function addNewTask() {
  if (newTaskName.value === '' || newTaskDueDate.value === '') {
    alert('Please fill in all fields');
    return;
  }

  if (newTaskCategory.value === '') {
    alert('Please select a category');
    return;
  }

  if (newTaskDueDate.value < new Date().toISOString().split('T')[0]) {
    alert('Due date cannot be in the past');
    return;
  }

  const task = {
    name: newTaskName.value,
    dueDate: new Date(newTaskDueDate.value).toLocaleDateString('en-US', {
      timeZone: 'UTC',
    }),
    category: newTaskCategory.value,
    status: 'pending',
  };

  console.log(task);

  let existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];

  existingTasks = [...existingTasks, task];

  localStorage.setItem('tasks', JSON.stringify(existingTasks));

  newTaskForm.reset();
}

function getTasks() {
  const existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];

  const filteredTasks = existingTasks
    .filter((task) =>
      task.category === currentCategory.value
        ? currentCategory.value
        : task.category
    )
    .filter((task) =>
      task.status === currentStatus.value ? currentStatus.value : task.status
    );

  const fragment = new DocumentFragment();

  filteredTasks.forEach((task) => {
    const taskContainer = document.createElement('div');
    const taskName = document.createElement('p');
    const taskDueDate = document.createElement('p');
    const taskCompleteButton = document.createElement('button');
    const taskDeleteButton = document.createElement('button');

    taskContainer.classList.add('task-container');
    taskName.classList.add('task-name');
    taskDueDate.classList.add('task-due-date');
    taskCompleteButton.classList.add('task-complete-button');
    taskDeleteButton.classList.add('task-delete-button');

    taskName.textContent = task.name;
    taskDueDate.textContent = task.dueDate;
    taskCompleteButton.innerHTML = `<i class="fa-solid fa-${
      task.status === 'done' ? 'x' : 'check'
    }"></i>`;
    taskDeleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';

    taskContainer.appendChild(taskName);
    taskContainer.appendChild(taskDueDate);
    taskContainer.appendChild(taskCompleteButton);
    taskContainer.appendChild(taskDeleteButton);

    fragment.appendChild(taskContainer);
  });

  taskList.innerHTML = '';
  taskList.appendChild(fragment);
}

document.addEventListener('DOMContentLoaded', getTasks);
