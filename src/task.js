
export function createTask(category, title, description, dueDate, priority) {
    return {
        id: crypto.randomUUID(),
        category: category,
        title: title, 
        description: description, 
        dueDate: dueDate, 
        priority: priority
    }
};

export function storeTaskToDB(task) {
    //Storing to LocalStorage for Development
    const tasks = JSON.parse(sessionStorage.getItem("tasks")) || [];
    tasks.push(task);

    sessionStorage.setItem("tasks", JSON.stringify(tasks));

}

export function getTasks() {
    return JSON.parse(sessionStorage.getItem("tasks")) || [];
}

export function debugTasks() {
    console.log(getTasks());
}