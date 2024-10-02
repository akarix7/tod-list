import "./style.css";

const Task = (() => {
    let categories = new Map();
    categories.set("default", {id: 0, tasks: []});

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
    function getCategories(){
        categories.forEach((c) => {
            console.log(c);
        })
    }
    function addToCategory(categoryName, task){
        if(!categories.has(categoryName)){
            createNewCategory(categoryName);
        }
        categories.get(categoryName).tasks.push(task);
    }
    function createNewCategory(categoryName){
        categories.set(categoryName, {id: categories.size, tasks: []});
    }

    return {
        createTask,
        addToCategory,
        getCategories
    };
})();

const dom = (() => {
    buildDom();

    function buildDom(){
        //buildFormDom();
        buildElement("main", "main");
        buildElement("form", "task", "main");
        buildElement("input", "Title", "text");
        buildElement("input", "Due Date", "datetime-local");
        buildElement("input", "Description", "text");
        buildElement("input", "Notes", "text");
        buildElement("select", "Priority", "priority-label", "None", "Low", "Medium", "High");
        buildElement("select", "Category", "category-label", "Default");
        buildElement("input", "submit", "submit");
    }
    function buildFormDom(){
        const form = document.createElement("form");
        form.id = "task";
        document.body.append(form);
        return{
            form
        }
    }
    //input, title, text
    function buildElement(element, label, type, ...options){
        const form = document.getElementById("task");

        if(element === "input") {
            const input = document.createElement(element);
            input.setAttribute("type", type);

            const inputLabel = document.createElement("label");
            inputLabel.setAttribute("for", label);
            inputLabel.append(document.createTextNode(label));

            form.append(inputLabel);
            form.append(input);
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

        }else{
            const el = document.createElement(element);
            el.id = label;
            if(type){
                const parent = document.getElementById(type);
                parent.appendChild(el);
                return;
            }
            document.body.append(el);
        }
    }

    const setPriority = Object.freeze({
        None: 0,
        Low: 1,
        Medium: 2,
        High: 3
    });

//do: checklist, category, due date

    return{
        buildElement
    }
})();

//let newTask = Task.createTask("Buy Milk", "", "Home", "Low", "");
//Task.addToCategory(newTask.task.category)

console.log("hello world!");