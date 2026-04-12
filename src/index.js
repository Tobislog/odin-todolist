import './style.css';
import { createTask, storeTaskToDB } from "./task";
import { renderCategories, renderTasks } from './render';
import { createCategory, storeCategoryToDB, getCategories } from './categories';

const $appWrapper = document.querySelector(".app");
const currentCategory = "Standard";

//Eventlistener

$appWrapper.addEventListener("click", (event) => {

});

$appWrapper.addEventListener("keydown", (event) => {
    if (event.target.matches(".newTaskInput") && event.key === "Enter") {
            const neuerTask = createTask(event.target.value, "", "", 1);
            storeTaskToDB(neuerTask, currentCategory);
            renderTasks(currentCategory);
            document.querySelector(".newTaskInput").focus();
        
    }
});



//Testing and Debugging

const categoryStandard = createCategory("Standard", "Defaultbeschreibung");
const categories = getCategories();

if (!categories.find(cat => cat.name === "Standard")) {
    storeCategoryToDB(categoryStandard);
};



const testTask = createTask("Einkaufen gehen", "Meine Beschreibung", Date("2026-06-11T11:29:00"), 2);
const neuerTask = createTask("Fernsehen", "Netflix schauen", Date("2026-04-11T20:57:00", 1));

// storeTaskToDB(neuerTask, "Standard");
// storeTaskToDB(testTask, "Standard");
renderCategories();
renderTasks("Standard");

