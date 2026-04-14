import { getCategories } from "./categories";
import { getCurrentCategory, setCurrentCategory } from ".";
//DOM Variables
const $categoryList = document.querySelector(".categoryList");
const $taskList = document.querySelector(".taskList");



export function renderCategories () {
    $categoryList.innerHTML = "";
    const categories = getCategories();

    categories.forEach(cat => {
        const $categoryElement = document.createElement("div");
        $categoryElement.classList.add("sidebarCategory");
        if (getCurrentCategory() === cat.name) {
            $categoryElement.classList.add("current")
        }
        $categoryElement.textContent = cat.name;
        $categoryList.appendChild($categoryElement);
    });
}

export function renderNewCategoryInput () {
    const $newCategoryWrapper = document.createElement("div");
    $newCategoryWrapper.classList = "sidebarCategory";
    const $newCategoryInput = document.createElement("input");
    $newCategoryInput.type = "text";
    $newCategoryInput.classList.add("newCategoryInput");
    $newCategoryWrapper.appendChild($newCategoryInput);

    $categoryList.appendChild($newCategoryWrapper);
    
}

export function renderTasks (category) {
    $taskList.innerHTML = "";

    //Find targeted Category

    const categories = getCategories();
    const targetedCategory = categories.find(cat => cat.name === category);

    //Render Category Name as Headline

    const headline = document.createElement("div");
    headline.textContent = category;
    headline.classList = "categoryHeadline";
    $taskList.appendChild(headline);
    
    //Render tasks

    targetedCategory.tasks.forEach( task => {

        //new Task Wrapper
        const $newTaskLine = document.createElement("div");
        $newTaskLine.setAttribute("class", "taskLine");
        
        //adding Checkbox
        const $checkBox = document.createElement("input");
        $checkBox.type = "checkbox";
        $checkBox.id = task.id;
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

    //Render new Task Input

    const $newInputLine = document.createElement("div");
    $newInputLine.classList = "inputLine";

    const $newCheckbox = document.createElement("input");
    $newCheckbox.type = "checkbox";
    $newCheckbox.classList = "taskCheckbox";

    const $newInput = document.createElement("input");
    $newInput.type = "text";
    $newInput.id = "newTaskInput"
    $newInput.classList = "newTaskInput";

    $newInputLine.appendChild($newCheckbox);
    $newInputLine.appendChild($newInput);
    $taskList.appendChild($newInputLine);
    
}

