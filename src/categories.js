export function createCategory (name, description) {
    return {
        id: crypto.randomUUID(),
        name: name,
        description: description,
    }
}

export function storeCategoryToDB (category){
    //Storing to LocalStorage for Development
    const categories = JSON.parse(sessionStorage.getItem("categories"));
    categories.push(category);
    sessionStorage.setItem("categories", JSON.stringify(categories));
}