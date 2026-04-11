import { createCategory, storeCategoryToDB } from "./categories";

export function createTask(title, description, dueDate, priority) {
    return {
        id: crypto.randomUUID(),
        title: title, 
        description: description, 
        dueDate: dueDate, 
        priority: priority
    }
};

export function storeTaskToDB(task, category) {
    //Storing to LocalStorage for Development
    const categories = JSON.parse(sessionStorage.getItem("categories")) || [];
    categories.forEach(cat => {
        if (cat.name == category) {
            cat.tasks.push(task);
            sessionStorage.setItem("categories", JSON.stringify(categories))
        }

        else {
            console.log("no Category found with this name!");
        }
    });

}
