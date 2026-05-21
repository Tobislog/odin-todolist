import { createCategory, getCategories, storeCategoryToDB } from "./categories";
import { getCurrentCategory } from ".";

export function createTask(title, description, dueDate, priority) {
    return {
        id: crypto.randomUUID(),
        title: title, 
        description: description, 
        dueDate: dueDate, 
        priority: priority
    }
};

export function updateTask (taskId, newDescription, newDate) {
    const categories = getCategories();
    for (const cat of categories) {
        const task = cat.tasks.find(task => task.id === taskId);
        if (task) {
            if (newDescription != "") {
                task.description = newDescription;
            }
            if (newDate != "") {
                task.dueDate = newDate;
            }
            sessionStorage.setItem("categories", JSON.stringify(categories));
            return true;
        }
    }
    return false;
}



export function storeTaskToDB(task, category) {
    //Storing to SessionStorage for Development
    const categories = JSON.parse(sessionStorage.getItem("categories")) || [];
    categories.forEach(cat => {
        if (cat.name === category) {
            cat.tasks.push(task);
            sessionStorage.setItem("categories", JSON.stringify(categories));
        }
    });
};

export function removeTaskFromDB (taskId) {
    //removing Task from SessionStorage
    const categories = JSON.parse(sessionStorage.getItem("categories")) || [];
    categories.forEach(cat => {
        cat.tasks = cat.tasks.filter(task => task.id !== taskId);
    });
    sessionStorage.setItem("categories", JSON.stringify(categories));
}
