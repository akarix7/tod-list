import "./style.css";

const task = (() => {
    buildDom();

    function buildDom(){
        buildFormDom();
        buildElement("input", "Title", "text");
        buildElement("input", "Due Date", "datetime-local");
        buildElement("input", "Description", "text");
        buildElement("input", "Notes", "text");
        buildElement("select", "Priority", "priority-label", "None", "Low", "Medium", "High");
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

        }
    }

    const setPriority = Object.freeze({
        None: 0,
        Low: 1,
        Medium: 2,
        High: 3
    });

//do: checklist, category, due date
    function createTask(title, description, priority, notes){
        //arguments.length === 1

        return {
            title: title,
            description: description,
            priority: priority,
            notes: notes
        }
    }
    return{
        createTask:createTask
    }
})();

console.log("hello world!");