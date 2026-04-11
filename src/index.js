import './style.css';
import { createTask, storeTaskToDB } from "./task";
import { renderCategories } from './render';
import { createCategory, storeCategoryToDB, getCategories } from './categories';


//Testing and Debugging

const categoryStandard = createCategory("Standard", "");
// storeCategoryToDB(categoryStandard);

const testTask = createTask("Einkaufen gehen", "Meine Beschreibung", Date("2026-06-11T11:29:00"), 2);

storeTaskToDB(testTask, "Standard");
// const testTask2 = createTask("Code Schreiben", "Eine To-Do-App schreiben", Date("2026-06-11T08:48:00"), 1);
// const specialTask = createTask("SpezialTask", "keine Ahnung", Date("2026-06-11T23:11:00", 2))

// storeTaskToDB(testTask);
// storeTaskToDB(testTask2);
// storeTaskToDB(specialTask);

debugTasks();

