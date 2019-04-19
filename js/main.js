/*jshint esversion: 6 */
const toDoList = [];

const tasksList = document.querySelector('.tasks-list');
const listElements = document.getElementsByClassName('task');
const addTaskForm = document.querySelector('form');
const addTaskInput = document.querySelector('.add-task');
const searchTaskInput = document.querySelector('.search-task');
const taskCount = document.querySelector('.task-count span');

const removeTask = (e) => {
	console.log('click');
	e.target.parentNode.remove();
	const index = e.target.parentNode.dataset.key;
	toDoList.splice(index, 1);
	taskCount.textContent = listElements.length;
	renderList();
};

const addNewTask = (e) => {
	e.preventDefault();
	taskTitle = addTaskInput.value;
	if(taskTitle === '') return;
	const task = document.createElement('li');
	task.className = 'task';
	task.innerHTML = taskTitle + '<button>Usuń</button>';
	toDoList.push(task);

	renderList();
	addTaskInput.value = '';
	taskCount.textContent = listElements.length;
	task.querySelector('.task button').addEventListener('click', removeTask);
};

const renderList = () => {
	tasksList.textContent = '';
	toDoList.forEach((toDoElement, key) => {
		toDoElement.dataset.key = key;
		tasksList.appendChild(toDoElement);
	});
};

addTaskForm.addEventListener('submit', addNewTask);

const searchTask = (e) => {
	searchText = e.target.value.toLowerCase();
	let tasks = toDoList;
	tasks = tasks.filter(listElement => listElement.textContent.toLowerCase().includes(searchText));
	tasksList.textContent = '';
	tasks.forEach(listElement => tasksList.appendChild(listElement));
};

searchTaskInput.addEventListener('input', searchTask);