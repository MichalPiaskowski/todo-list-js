/*jshint esversion: 6 */
const toDoList = [];

const tasksList = document.querySelector('.tasks-list');
const listElements = document.getElementsByClassName('task');
const addTaskForm = document.querySelector('form');
const addTaskInput = document.querySelector('.add-task');
const searchTaskInput = document.querySelector('.search-task');
const taskCount = document.querySelector('.task-count span');

const removeTask = (e) => {
	console.log(e.target);
	e.target.parentNode.remove();
	const index = e.target.parentNode.dataset.key;
	toDoList.splice(index, 1);
	taskCount.textContent = toDoList.length;
	renderList();
};

const taskIsDone = (e) => {
	e.target.classList.toggle('checked');
};

const addNewTask = (e) => {
	e.preventDefault();
	taskTitle = addTaskInput.value;
	if(taskTitle === '') return;
	const task = document.createElement('li');
	task.className = 'task';
	task.innerHTML = taskTitle + '<i class="fas fa-trash-alt">';
	toDoList.push(task);
	renderList();
	addTaskInput.value = '';
	taskCount.textContent = toDoList.length;
	task.querySelector('.fas').addEventListener('click', removeTask);
	task.addEventListener('click', taskIsDone);
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
