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

        //new Task Wrapper
        const $newTaskLine = document.createElement("div");
        $newTaskLine.setAttribute("class", "taskLine");
        
        //adding Checkbox
        const $checkBox = document.createElement("input");
        $checkBox.type = "checkbox";
        $checkBox.classList = "taskCheckbox"

        //adding Title
        const $taskTitle = document.createElement("div");
        $taskTitle.setAttribute("class", "taskTitle");
        $taskTitle.textContent = task.title;

        //add Elements to DOM
        $newTaskLine.appendChild($checkBox);
        $newTaskLine.appendChild($taskTitle);
        $taskList.appendChild($newTaskLine);
    });
    
}