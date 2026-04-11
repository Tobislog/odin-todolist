import './style.css';
import { createTask, storeTaskToDB } from "./task";
import { renderCategories, renderTasks } from './render';
import { createCategory, storeCategoryToDB, getCategories } from './categories';


//Testing and Debugging

const categoryStandard = createCategory("Standard", "");
const neueKat = createCategory("Arbeit", "Alles was Arbeit angeht.")
// storeCategoryToDB(categoryStandard);
// storeCategoryToDB(neueKat);

const testTask = createTask("Einkaufen gehen", "Meine Beschreibung", Date("2026-06-11T11:29:00"), 2);
const neuerTask = createTask("Fernsehen", "Netflix schauen", Date("2026-04-11T20:57:00", 1));

// storeTaskToDB(neuerTask, "Standard");
// storeTaskToDB(testTask, "Standard");
renderCategories();
renderTasks("Standard");
