import './style.css';
import { createTask, storeTaskToDB, getTasks, debugTasks } from "./task";
import { renderCategories } from './render';


//Testing and Debugging

const testTask = createTask("Einkaufen gehen", "Meine Beschreibung", Date("2026-06-11T11:29:00"), 2);
const testTask2 = createTask("Code Schreiben", "Eine To-Do-App schreiben", Date("2026-06-11T08:48:00"), 1);
const specialTask = createTask("SpezialTask", "keine Ahnung", Date("2026-06-11T23:11:00", 2))

storeTaskToDB(testTask);
storeTaskToDB(testTask2);
storeTaskToDB(specialTask);

debugTasks();

