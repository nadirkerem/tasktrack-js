const newTaskToggleButton = document.getElementById('new-task-toggle-button');
const newTaskSection = document.querySelector('.add-new-task');
const newTaskForm = document.querySelector('.add-new-task-form');

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
    dueDate: newTaskDueDate.value,
    category: newTaskCategory.value,
    status: 'pending',
  };

  console.log(task);

  let existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];

  existingTasks = [...existingTasks, task];

  localStorage.setItem('tasks', JSON.stringify(existingTasks));

  newTaskForm.reset();
}
