import "./style.css";

const TaskManager = (() => {
    //let categories = new Map();
    //categories.set("default", {id: 0, tasks: []});
    let categories = {};
    let priorities = {
        none: [],
        low: [],
        medium: [],
        high: []
    };

    function createTask(title, description, category, priority, notes){
        let task = {
            title: title,
            description: description,
            category: category,
            priority: priority,
            notes: notes,
        }

        return {
            task
        };
    }
    function modifyTask(task){

    }
    function addTaskToLists(task){
        addToCategory(task.task.category, task);
        addToPriority(task.task.priority, task);
    }
    function getCategory(categoryName){
        return categories[categoryName];
        //console.log(categories.get(category).tasks);
    }
    function getAllCategories(){
        for(let c in categories){
            console.log(c)
        }
    }
    function addToCategory(categoryName, task){
        if(!categories[categoryName]) {
            createNewCategory(categoryName);
        }
        categories[categoryName].tasks.push(task);
        // if(!categories.has(categoryName)){
        //     createNewCategory(categoryName);
        // }
        // categories.get(categoryName).tasks.push(task);
    }
    function createNewCategory(categoryName){
        categories[categoryName] = {id: Object.keys(categories).length, tasks: []};
    }
    function addToPriority(priorityName, task){
        priorities[priorityName].push(task);
    }
    function getPriority(priorityName){
        return priorities[priorityName];
    }
    function isEmpty(){
        return Object.keys(categories).length === 0;
    }

    return {
        createTask,
        addTaskToLists,
        getCategory,
        getAllCategories,
        getPriority,
        isEmpty
    };
})();

const DOMManager = (() => {
    buildDom();

    function buildDom(){
        //buildFormDom();
        buildElement("main", "main");
        buildElement("form", "task", "main");
        buildElement("input", "Title", "text");
        buildElement("input", "Due", "datetime-local");
        buildElement("input", "Description", "text");
        buildElement("input", "Notes", "text");
        buildElement("select", "Priority", "priority-label", "None", "Low", "Medium", "High");
        buildElement("select", "Category", "category-label", "Default");
        buildElement("input", "submit", "submit");
    }
    // function buildFormDom(){
    //     const form = document.createElement("form");
    //     form.id = "task";
    //     document.body.append(form);
    //     return{
    //         form
    //     }
    // }
    //input, title, text
    function buildElement(element, label, type, ...options){
        const form = document.getElementById("task");

        if(element === "input") {
            const input = document.createElement(element);
            input.id = `${label.toLowerCase()}-id`;
            input.setAttribute("type", type);

            const inputLabel = document.createElement("label");
            inputLabel.setAttribute("for", label);
            inputLabel.append(document.createTextNode(label));

            form.append(inputLabel);
            form.append(input);
            return input;
        }else if (element === "select"){
            const select = document.createElement(element);
            select.setAttribute("id", type);

            const inputLabel = document.createElement("label");
            inputLabel.setAttribute("for", label);
            inputLabel.append(document.createTextNode(label));

            options.forEach((o) => {
                let option = document.createElement("option");
                option.setAttribute("value", `${o}`);
                option.append(document.createTextNode(o));
                select.appendChild(option);
            })

            form.append(inputLabel);
            form.append(select);
            return select;
        }else{
            const el = document.createElement(element);
            el.id = label;
            if(type){
                const parent = document.getElementById(type);
                parent.appendChild(el);
                return el;
            }
            document.body.append(el);
            return el;
        }
    }
    function buildTaskContainer(){
        let taskContainer = buildElement("div", "task-container", "main");
        if(TaskManager.isEmpty()){
            taskContainer.textContent = "No tasks today! Go take a break";
        }
    }
    function clearTaskContainer(){
        let taskContainer = document.getElementById("task-container");
        taskContainer.textContent = "";
    }
    function buildTask(task){
        clearTaskContainer();
        let category = buildElement("h2", "category-h2", "task-container");
        let taskTitle = buildElement("h3", "task-h3", "task-container");
        //category.textContent = `${TaskManager.getCategory(task.task.category).toString()}`;
        category.textContent = task.task.category;
        taskTitle.textContent = task.task.title;

        if(task.task.description !== "" || task.task.notes !== ""){
            let description = buildElement("p", "desc-p", "task-container");
            let notes = buildElement("p", "notes-p", "task-container");
            description.textContent = task.task.description;
            notes.textContent = task.task.notes;
        }
    }
    function getForm(){
        return document.getElementById("task");
    }

//do: checklist, category, due date

    return{
        getForm,
        buildTask,
        buildTaskArea: buildTaskContainer
    }
})();

const DataManager = (() => {
    submitForm();
    DOMManager.buildTaskArea();

    function submitForm(){
        let form = DOMManager.getForm();
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            let task = TaskManager.createTask(form.elements["title-id"].value, form.elements["description-id"].value,
                form.elements["category-label"].value, form.elements["priority-label"].value.toLowerCase(), form.elements["notes-id"].value);
            TaskManager.addTaskToLists(task);
            DOMManager.buildTask(task);
            console.log(task);
        })
    }
    return {
        submitForm
    }
})();

//let newTask = Task.createTask("Buy Milk", "", "Home", "Low", "");
//Task.addToCategory(newTask.task.category)

console.log("hello world!");