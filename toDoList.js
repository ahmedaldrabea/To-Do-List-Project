let tasks = [
    {
        "needTask":"Task Is Here",
        "currentDate":"current date",
        "isDone":false
    }
];

function getData(){
    let finalTaskData = JSON.parse(localStorage.getItem("tasks"))
    
    if(finalTaskData == null){
        tasks = [];
    }else{
        tasks = finalTaskData
    }
}

getData(); 

function addTaskFunction() {    
    let mainTasks = document.getElementById("mainTasks");
    mainTasks.innerHTML = "";
    let currentTask = 0;

    for(task of tasks){
        let newContent =
        
        `
            <div class="content ${task.isDone ? 'doneColor':''}" >

                <div class="needed-work">
                    <p>${task.needTask}</p>
                    <p>
                        <i class="fa-solid fa-calendar-days"></i>
                        <span> ${task.currentDate} </span>
                    </p>

                </div>

                <div class="work-icon">
                    <i title="When you want to do editing to the title" onclick="updateTaskName(${currentTask})" class="fa-solid fa-pen-to-square"></i> 

                    ${task.isDone ? `
                        <i title="When you completed the task" onclick="completedTask(${currentTask})" class="fa-solid fa-check"></i>
                    ` : `
                        <i title="When you completed the task" onclick="completedTask(${currentTask})" class="fa-solid fa-x"></i>
                    ` }
                    
                    <i title="When you want to remove task" onclick="deleteTask(${currentTask})" class="fa-solid fa-trash"></i>
                </div>
            </div>
        `;

        mainTasks.innerHTML += newContent
        currentTask+=1;
    }
}

addTaskFunction()

function getFullDate(){
    let currentDateInfo = new Date();

    let currentDay   = currentDateInfo.getDay();
    let currentYear  = currentDateInfo.getFullYear();
    let currentMonth = currentDateInfo.getMonth();            

    let currentHour    = currentDateInfo.getHours();
    let currentMinute  = currentDateInfo.getMinutes();
    let amPMFormatting = currentHour >= 12 ? 'PM' : 'AM';

    let result = (currentHour) + ":" + (currentMinute) + " " + (amPMFormatting.toLowerCase()) + " | ";
    result     += (currentDay)     + "/"   + (currentMonth)  + "/"   + (currentYear);
    
    return (result);
}

function newAddTask(){
    document.getElementById("addTask").addEventListener("click",function(){
    
    let addTaskMessage = prompt("Enter needed task here: ")
    

    let newTaskToList = {
        "needTask":addTaskMessage,
        "currentDate":getFullDate()
    }

    tasks.push(newTaskToList);
    storeTaskLocally()
    addTaskFunction();
})
}

newAddTask();

function deleteTask(indexOFCurrentTask){
    
    let confirmationDelete = confirm("Are Your Want To Delete " + (tasks[indexOFCurrentTask].needTask)+ " task ?")
    
    if(confirmationDelete){
        tasks.splice(indexOFCurrentTask,1);
        storeTaskLocally()
        addTaskFunction();
    
    }else{
        alert("Okay No Problem!");
    }
}

function updateTaskName(indexOFCurrentTask){
    let newTaskName = prompt("Enter new task name here: ")
    tasks[indexOFCurrentTask].needTask = newTaskName;
    
    addTaskFunction();//to do updates into new content
    alert("New Updates Done!")
    storeTaskLocally()
}

function completedTask(indexOFCurrentTask){            
    tasks[indexOFCurrentTask].isDone = !tasks[indexOFCurrentTask].isDone;
    addTaskFunction();
    storeTaskLocally();
}

// storage functions 

function storeTaskLocally(){
    let arrTOString = JSON.stringify(tasks);
    localStorage.setItem("tasks",arrTOString);
    // tasks you can called any think but tasks to be closed about main array!
}
