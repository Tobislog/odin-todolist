import { createTask, storeTaskToDB, getTasks, debugTasks } from "./task";

const testTask = createTask("standard", "Einkaufen gehen", "Meine Beschreibung", Date("2026-06-11T11:29:00"), 2);
const testTask2 = createTask("standard", "Code Schreiben", "Eine To-Do-App schreiben", Date("2026-06-11T08:48:00"), 1);

storeTaskToDB(testTask);
storeTaskToDB(testTask2);

debugTasks();