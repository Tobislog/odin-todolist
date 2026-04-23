import './style.css';
import { createTask, storeTaskToDB, removeTaskFromDB } from "./task";
import { renderCategories, renderTasks, renderNewCategoryInput, renderCurrentCategoryOptions, renderCategoryDetailsModal } from './render';
import { createCategory, storeCategoryToDB, getCategories , removeCategoryFromDB, updateCategoryDescription} from './categories';

//HTML-Variables
const $appWrapper = document.querySelector(".app");
const $categoryDetailsModal = document.querySelector("#categoryDetailsModal");


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
