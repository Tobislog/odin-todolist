import './style.css';
import { createTask, storeTaskToDB, removeTaskFromDB } from "./task";
import { renderCategories, renderTasks, renderNewCategoryInput, renderCurrentCategoryOptions } from './render';
import { createCategory, storeCategoryToDB, getCategories } from './categories';

//HTML-Variables
const $appWrapper = document.querySelector(".app");


//Variables
let currentCategory = "Standard";




//Eventlistener
$appWrapper.addEventListener("change", (event) => {

    //Ticking the Checkbox of Task removes it
    let deleteTimeout = null;
    if (event.target.matches(".taskCheckbox")) {
        deleteTimeout = setTimeout(() => {
            removeTaskFromDB(event.target.id); 
            renderTasks(currentCategory);
        }, 1000);
    };    
});

$appWrapper.addEventListener("click", (event) => {

   //New Category Button
    if (event.target.matches(".addCategoryButton")) {
        renderNewCategoryInput();
        document.querySelector(".newCategoryInput").focus();
    };

    //Change current Category
    if((event.target.matches(".sidebarCategory") || event.target.matches(".sidebarCategoryName") ) && !event.target.matches(".current")) {
        currentCategory = event.target.textContent;
        renderCategories();
        renderTasks(currentCategory);
    }

});

$appWrapper.addEventListener("keydown", (event) => {

    //Press Enter to store new Task
    if (event.target.matches(".newTaskInput") && event.key === "Enter") {
        const neuerTask = createTask(event.target.value, "", "", 1);
        storeTaskToDB(neuerTask, currentCategory);
        renderTasks(currentCategory);
        document.querySelector(".newTaskInput").focus(); 
    };

    //Press Enter to store new Category
    if (event.target.matches(".newCategoryInput") && event.key === "Enter") {
        const newCategory = createCategory(event.target.value, "");
        storeCategoryToDB(newCategory);
        renderCategories();
    }
});

//Functions

export function getCurrentCategory() {
    return currentCategory;
}

export function setCurrentCategory(category) {
    currentCategory = categoryStandard;
}

//Create and store default-Category and make it active
const categoryStandard = createCategory("Standard", "Defaultbeschreibung");

if (!getCategories().find(cat => cat.name === "Standard")) {
    storeCategoryToDB(categoryStandard);
};

//Rendering Page

renderCategories();
renderTasks(currentCategory);
