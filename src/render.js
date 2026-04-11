import { getCategories } from "./categories";
//DOM Variables
const $sidebar = document.querySelector(".sidebar");




export function renderCategories () {
    $sidebar.innerHTML = "";
    const categories = getCategories();

    categories.forEach(cat => {
        const $categoryElement = document.createElement("div");
        $categoryElement.setAttribute("class", "sidebarCategory");
        $categoryElement.textContent = cat.name;
        $sidebar.appendChild($categoryElement);
    });
}