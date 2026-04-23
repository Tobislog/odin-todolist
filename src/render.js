import { getCategories } from "./categories";
import { getCurrentCategory, setCurrentCategory } from ".";
//DOM Variables
const $categoryList = document.querySelector(".categoryList");
const $taskList = document.querySelector(".taskList");
const $modalWrapper = document.querySelector(".modalWrapper");



export function renderCategories () {
    $categoryList.innerHTML = "";
    const categories = getCategories();

    categories.forEach(cat => {
        const $categoryElement = document.createElement("div");
        $categoryElement.classList.add("sidebarCategory");
        $categoryElement.dataset.id = cat.id;
        if (getCurrentCategory() === cat.name) {
            $categoryElement.classList.add("current");
        }
        const $categoryElementName = document.createElement("div");
        $categoryElementName.classList.add("sidebarCategoryName");
        $categoryElementName.textContent = cat.name;
        $categoryElement.appendChild($categoryElementName);
        $categoryList.appendChild($categoryElement);
        

    });
    renderCurrentCategoryOptions();
}

export function renderNewCategoryInput () {
    const $newCategoryWrapper = document.createElement("div");
    $newCategoryWrapper.classList = "sidebarCategory";
    const $newCategoryInput = document.createElement("input");
    $newCategoryInput.type = "text";
    $newCategoryInput.classList.add("newCategoryInput");
    $newCategoryWrapper.appendChild($newCategoryInput);

    $categoryList.appendChild($newCategoryWrapper);
    
}

export function renderCurrentCategoryOptions () {
    //remove all previous option-Divs
    document.querySelector(".categoryList").querySelectorAll(".sidebarCategoryOptions").forEach(el => el.remove());
    //get html-Element of current Category
    const $sidebarElement = Array.from(document.querySelectorAll(".sidebarCategoryName")).find(el => el.textContent.trim() === getCurrentCategory())?.parentElement;
    if (!$sidebarElement) {
        console.error("Sidebar Element nicht gefunden!");
        return;
    }
    //create Option-Div if not created yet
    if (!$sidebarElement.querySelector(".sidebarCategoryOptions")) {
        //Div-Wrapper
        const $categoryOptions = document.createElement("div");
        $categoryOptions.classList.add("sidebarCategoryOptions");
        
        //remove Button, except for "Standard"-Category
        if ($sidebarElement.querySelector(".sidebarCategoryName").textContent !== "Standard") {
            const $removeCategoryButton = document.createElement("div");
            $removeCategoryButton.classList.add("removeCategoryButton");
            $removeCategoryButton.textContent = "\u{00D7}";
            $categoryOptions.appendChild($removeCategoryButton);
        }
        //optionsButton
        const $optionButton = document.createElement("div");
        $optionButton.classList.add("categoryOptionButton");
        $optionButton.textContent = "\u{22EF}";
        $categoryOptions.appendChild($optionButton);
        
        
        $sidebarElement.appendChild($categoryOptions);
    }

}

export function renderTasks (category) {
    $taskList.innerHTML = "";

    //Find targeted Category

    const categories = getCategories();
    const targetedCategory = categories.find(cat => cat.name === category);

    //Render Category Name as Headline

    const headline = document.createElement("div");
    headline.textContent = category;
    headline.classList = "categoryHeadline";
    $taskList.appendChild(headline);
    
    //Render tasks

    targetedCategory.tasks.forEach( task => {

        //new Task Wrapper
        const $newTaskLine = document.createElement("div");
        $newTaskLine.setAttribute("class", "taskLine");
        
        //adding Checkbox
        const $checkBox = document.createElement("input");
        $checkBox.type = "radio";
        $checkBox.id = task.id;
        $checkBox.classList = "taskCheckbox"

        //adding Title
        const $taskTitle = document.createElement("div");
        $taskTitle.setAttribute("class", "taskTitle");
        $taskTitle.textContent = task.title;

        //add Elements to DOM
        $newTaskLine.appendChild($checkBox);
        $newTaskLine.appendChild($taskTitle);
        $taskList.appendChild($newTaskLine);


    });

    //Render new Task Input

    const $newInputLine = document.createElement("div");
    $newInputLine.classList = "inputLine";

    const $newCheckbox = document.createElement("input");
    $newCheckbox.type = "radio";
    $newCheckbox.classList = "taskCheckbox";

    const $newInput = document.createElement("input");
    $newInput.type = "text";
    $newInput.id = "newTaskInput"
    $newInput.classList = "newTaskInput";

    $newInputLine.appendChild($newCheckbox);
    $newInputLine.appendChild($newInput);
    $taskList.appendChild($newInputLine);
    
}

export function renderCategoryDetailsModal () {
    const categories = getCategories();
    const targetedCategory = categories.find(cat => cat.name === getCurrentCategory());
    $modalWrapper.innerHTML = "";

    const $newModalTitle = document.createElement("h2");
    $newModalTitle.textContent = getCurrentCategory() + " Details";

    const $newModalDescription = document.createElement("textarea");
    $newModalDescription.classList.add("categoryDescription");
    $newModalDescription.textContent = targetedCategory.description;



    $modalWrapper.appendChild($newModalTitle);
    $modalWrapper.appendChild($newModalDescription);
}

