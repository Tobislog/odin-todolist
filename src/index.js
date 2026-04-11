import './style.css';
import { createTask, storeTaskToDB } from "./task";
import { renderCategories } from './render';
import { createCategory, storeCategoryToDB, getCategories } from './categories';


//Testing and Debugging

const categoryStandard = createCategory("Standard", "");
const neueKat = createCategory("Arbeit", "Alles was Arbeit angeht.")
// storeCategoryToDB(categoryStandard);
// storeCategoryToDB(neueKat);

const testTask = createTask("Einkaufen gehen", "Meine Beschreibung", Date("2026-06-11T11:29:00"), 2);

// storeTaskToDB(testTask, "Standard");
renderCategories();

