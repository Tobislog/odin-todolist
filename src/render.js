//DOM Variables
const $sidebar = document.querySelector(".sidebar");


export function renderCategories () {
    $sidebar.innerHTML = "";
    const categories = JSON.parse(sessionStorage.getItem("categories")) || []

    categories.forEach(cat => {
        
    });
}