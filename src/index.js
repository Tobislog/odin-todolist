import './style.css';
import { createTask, storeTaskToDB, getTasks, debugTasks } from "./task";
import { renderCategories } from './render';


//Testing and Debugging

const testTask = createTask("standard", "Einkaufen gehen", "Meine Beschreibung", Date("2026-06-11T11:29:00"), 2);
const testTask2 = createTask("standard", "Code Schreiben", "Eine To-Do-App schreiben", Date("2026-06-11T08:48:00"), 1);
const specialTask = createTask("special", "SpezialTask", "keine Ahnung", Date("2026-06-11T23:11:00", 2))

// storeTaskToDB(testTask);
// storeTaskToDB(testTask2);
// storeTaskToDB(specialTask);

debugTasks();

tasks.forEach(task => {
    if (task.category === "standard") {
        console.log("Standard-tasks: " + task.title);
    }
    else if (task.category === "special") {
        console.log("Spezial-Task: " + task.title);
    }
});
