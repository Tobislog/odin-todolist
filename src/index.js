import './style.css';
import { createTask, updateTask, storeTaskToDB, removeTaskFromDB } from "./task";
import { renderCategories, renderTasks, renderNewCategoryInput, renderCurrentCategoryOptions, renderCategoryDetailsModal, renderTaskDetailsModal } from './render';
import { createCategory, storeCategoryToDB, getCategories , removeCategoryFromDB, updateCategoryDescription} from './categories';

//HTML-Variables
const $appWrapper = document.querySelector(".app");
const $categoryDetailsModal = document.querySelector("#categoryDetailsModal");
const $taskDetailsModal = document.querySelector("#taskDetailsModal");


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
    if ((event.target.matches(".sidebarCategory") || event.target.matches(".sidebarCategoryName") ) && !event.target.matches(".current")) {
        currentCategory = event.target.textContent;
        renderCategories();
        renderTasks(currentCategory);
    }

    //Delete Category
    if (event.target.matches(".removeCategoryButton")) {
        
        removeCategoryFromDB(event.target?.parentNode?.parentNode.dataset.id);
        currentCategory = "Standard";
        renderCategories();
        renderTasks("Standard");
        console.log("EL fertig")
    }

    //Show Category Options
    if (event.target.matches(".categoryOptionButton")) {
        renderCategoryDetailsModal();
        $categoryDetailsModal.showModal();

    }

    //Show Task Options
    if (event.target.matches(".taskTitle")) {
        const TaskId = event.target.previousElementSibling.id; //proved!
        renderTaskDetailsModal(TaskId);
        $taskDetailsModal.showModal();
    }

    
});

$categoryDetailsModal.addEventListener("click", (event) => {
    //Close Category Options
    if (event.target.matches("#closeCategoryDetailsButton")) {
        $categoryDetailsModal.close();
    };

    //Save Category Options
    if (event.target.matches("#saveCategoryDetailsButton")) {
        const newDescription = $categoryDetailsModal.querySelector("textarea").value;
        updateCategoryDescription(currentCategory, newDescription);
        $categoryDetailsModal.close();

    }
});

$taskDetailsModal.addEventListener("click", (event) => {
    //Close Task Options
    if (event.target.matches("#closeTaskDetailsButton")) {
        $taskDetailsModal.close();
    }

    //Save Task Options
    if (event.target.matches("#saveTaskDetailsButton")) {
        const newDescription = $taskDetailsModal.querySelector("textarea").value;
        const taskId = $taskDetailsModal.querySelector(".taskDescription").id;
        const currentDetailsDate = $taskDetailsModal.querySelector(".taskDatePicker").value;
        let newDate = "";

        //get current Task
        const categories = getCategories().flatMap(cat => cat.tasks);
        const targetedTask = categories.find(task=> task.id === taskId);

        //Prove, if the dueDate has changed, and update newDate Variable to store new Date
        if (currentDetailsDate !== targetedTask.dueDate) {
            newDate = currentDetailsDate;
        }

        updateTask(taskId, newDescription, newDate);
        $taskDetailsModal.close();
    }
    //activate dueDate option
    if (event.target.matches(".taskDateCheckbox")){
        const newDate = $taskDetailsModal.querySelector(".taskDatePicker").value;
        const taskId = $taskDetailsModal.querySelector(".taskDescription").id;
        updateTask(taskId, "", newDate);
    }
})


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

function createStandardCategory () {
    const categoryStandard = createCategory("Standard", "Defaultbeschreibung");

    if (!getCategories().find(cat => cat.name === "Standard")) {
        storeCategoryToDB(categoryStandard);
    };
    currentCategory = "Standard";
}
//initial

createStandardCategory();


//Rendering Page

renderCategories();
renderTasks(currentCategory);
