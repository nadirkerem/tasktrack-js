const newTaskToggleButton = document.getElementById('new-task-toggle-button');
const newTaskSection = document.querySelector('.add-new-task');

newTaskToggleButton.addEventListener('click', () => {
  newTaskSection.classList.toggle('hidden');
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
