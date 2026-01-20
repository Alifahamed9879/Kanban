let tasksData = {}

const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");
const columns = [todo, progress, done];
let dragElement = null;

function addTask(tittle, desc, column) {
    const div = document.createElement("div");

    div.classList.add("task");
    div.setAttribute("draggable", "true");
    div.innerHTML = `
        <h1>${tittle}</h1>
        <p>${desc}</p>
        <button>Delete</button>
    `

    column.appendChild(div)


    div.addEventListener("drag", function (params) {
        dragElement = div;
    })


    // delete btn
    const deleteButton = div.querySelector("button");

    deleteButton.addEventListener("click", function (params) {
        div.remove();

        updateTaskCount()
    })




    return div
};

function updateTaskCount(params) {
    columns.forEach(col => {
        const tasks = col.querySelectorAll(".task");
        const count = col.querySelector(".right");

        tasksData[col.id] = Array.from(tasks).map(t => {
            return {
                tittle: t.querySelector("h1").textContent,
                desc: t.querySelector("p").textContent,
            }
        })



        localStorage.setItem("tasks", JSON.stringify(tasksData));


        count.textContent = tasks.length;
    });
}




if (localStorage.getItem("tasks")) {
    const data = JSON.parse(localStorage.getItem("tasks"));


    for (const col in data) {
        const column = document.querySelector(`#${col}`);

        data[col].forEach(task => {
            addTask(task.tittle, task.desc, column);
        });

        updateTaskCount()

    }
}


const tasks = document.querySelectorAll(".task");

tasks.forEach(task => {
    task.addEventListener("drag", function (e) {
        dragElement = task
        // console.log("dragging" , e)
    })
});

function ondrageventonelemn(column) {
    column.addEventListener("dragenter", function (e) {
        e.preventDefault();
        column.classList.add("hover-over");
    })


    column.addEventListener("dragleave", function (e) {
        e.preventDefault();
        column.classList.remove("hover-over");

    })


    column.addEventListener("dragover", function (e) {
        e.preventDefault()
    })


    column.addEventListener("drop", function (e) {
        e.preventDefault();
        column.appendChild(dragElement);
        column.classList.remove("hover-over");

        updateTaskCount()


    })
};

ondrageventonelemn(todo)
ondrageventonelemn(progress)
ondrageventonelemn(done)




// modal releted logic
const togglemodalbutton = document.querySelector("#toggle-modal");
const modal = document.querySelector(".modal");
const modalBg = document.querySelector(".modal .bg");
const addTaskButton = document.querySelector("#add-new-task");




togglemodalbutton.addEventListener("click", function (params) {
    modal.classList.toggle("active");
})

modalBg.addEventListener("click", function (params) {
    modal.classList.remove("active")
})


addTaskButton.addEventListener("click", function (params) {
    const taskTittle = document.querySelector("#task-tittle-input").value
    const taskDesc = document.querySelector("#task-desc-input").value
    addTask(taskTittle, taskDesc, todo);

    updateTaskCount()

    modal.classList.remove("active")

    document.querySelector("#task-tittle-input").value = "";
    document.querySelector("#task-desc-input").value = "";
})


// modal releted logic