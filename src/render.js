import { getCategories } from "./categories";
//DOM Variables
const $sidebar = document.querySelector(".sidebar");
const $taskList = document.querySelector(".taskList");



export function renderCategories () {
    $sidebar.innerHTML = "";
    const categories = getCategories();

    categories.forEach(cat => {
        const $categoryElement = document.createElement("div");
        $categoryElement.setAttribute("class", "sidebarCategory");
        $categoryElement.textContent = cat.name;
        $sidebar.appendChild($categoryElement);
    });
}


export function renderTasks (category) {
    $taskList.innerHTML = "";

    //Find targeted Category
    const categories = getCategories();
    const targetedCategory = categories.find(cat => cat.name === category);

    //Render Category Name as Headline

    const headline = document.createElement("div");
    headline.textContent = targetedCategory.name;
    headline.setAttribute("class", "categoryHeadline");
    $taskList.appendChild(headline);
    
    //Render tasks

    targetedCategory.tasks.forEach( task => {
        const $newTask = document.createElement("div");
        $newTask.setAttribute("class", "task");
        $newTask.textContent = task.title;
        $taskList.appendChild($newTask);
    });
    
}