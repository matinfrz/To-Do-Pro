"use strict";


// projects calousel 
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const btnContainer = document.getElementById("navigation-btn")
const tracker = document.querySelector(".track");
const projectSection = document.querySelector(".projects")


let trackerPosition = 0;
let totalScroll;
let totalScrollPercent;
let step = 33.7;
let intervalId;



// Pages 
const overallPage = document.getElementById("overall-page");
const addProjectPage = document.getElementById("add-project-page");
const addTaskPage = document.getElementById("add-task-page");
const projectPage = document.getElementById("project-page");
const allTasksPage = document.getElementById("all-task-page");
const taskCompleatedPage = document.getElementById("task-compleated-page");
const pages = [overallPage, addProjectPage, addTaskPage, projectPage, allTasksPage, taskCompleatedPage];
let activePage;

const openPage = function(page) {
    pages.forEach(p => p.classList.add("display-none")); 
    page.classList.remove("display-none"); 
    activePage = page;

    fadeEffect(page);
    
    let pageId = page.id;
    menuBackgroundReset()
    if(page !== projectPage)
    document.getElementById(`${pageId.replace("-page", "")}`).style.background = "black";

}


const fadeEffect = function (page) {

    const elements = Array.from(page.querySelectorAll("*")).filter(el => {
        return !el.closest(".table-container table, .section-title ") 
    });

    elements.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = "translateY(20px)";
        el.style.transition = "0.3s ease";
    });
    
    elements.forEach((el, i) => {
        setTimeout(() => {
            el.style.opacity = 1;
            el.style.transform = "translateY(0)";
        }, i * 1);
    });
}


const showMessage = function(messageText) {
    const message = document.getElementById("message");
    message.textContent = `${messageText}`;
    message.style.top = "20px"
    message.style.transition = "0.2s ease"
    
    setTimeout(() => {
        message.style.top = "-100px";
    }, 3000)
}

function limitTwoLines(element, maxCharsPerLine = 30) {
    const maxChars = maxCharsPerLine * 2; // دو خط
    if (element.textContent.length > maxChars) {
        element.textContent = element.textContent.slice(0, maxChars) + '…';
    }
}

function updateCarouselMetrics() {
        totalScroll = tracker.scrollWidth - tracker.parentElement.clientWidth;
        totalScrollPercent = 100 * (totalScroll / tracker.parentElement.clientWidth) + 1;

    console.log(`Update Worked ✅
        total scroll : ${totalScrollPercent}
        `)
}

function initializeCarousel() {
    updateCarouselMetrics();

    if (tracker.scrollWidth > tracker.parentElement.clientWidth) {
        console.log(`tracker scroll is noew bigger`);
        btnContainer.style.display = "flex";
        clearInterval(intervalId); // از قبل هر intervalی پاک بشه
        intervalId = setInterval(() => {
            next();
        }, 3000);

        projectSection.removeEventListener("mouseenter", stopInterval);
        projectSection.removeEventListener("mouseleave", startInterval);
        nextBtn.removeEventListener("mouseenter", stopInterval);
        nextBtn.removeEventListener("mouseleave", startInterval);
        prevBtn.removeEventListener("mouseenter", stopInterval);
        prevBtn.removeEventListener("mouseleave", startInterval);

        projectSection.addEventListener("mouseenter", stopInterval);
        projectSection.addEventListener("mouseleave", startInterval);
        nextBtn.addEventListener("mouseenter", stopInterval);
        nextBtn.addEventListener("mouseleave", startInterval);
        prevBtn.addEventListener("mouseenter", stopInterval);
        prevBtn.addEventListener("mouseleave", startInterval);
    } else {
        btnContainer.style.display = "none";
        console.log("traker is not big enough");
    }
}




// menu items
const menuItems = document.querySelectorAll(".menu-item");

function menuBackgroundReset() {
    menuItems.forEach(item => {
        item.style.background = "#282828";
    })
}
menuItems.forEach(item => {
    let itemId = item.id;

    item.addEventListener("click", () => {
        menuBackgroundReset();
        item.style.background = "black";
        const currentPage = document.getElementById(`${itemId}-page`);
        openPage(currentPage);
        fadeEffect(currentPage);
        addProjectForm.reset();
        addTaskForm.reset();
        selectedIconView.src = "icons/select.tr.gif";
        selectedIconView.style.filter = "invert(1)";
        const sectionTitle = document.getElementById("add-task-page-title").textContent = "Add New Task"
    });
    
})



// tasks
let tasks = [];

// unfinished Tasks
let unfinishedTasks = [];

// tasks Done 
let tasksDone = [];

// projects 
let projects = [
    {
        projectTitle: "General",
        projectColor: "#5c5c5cff",
        projectTask: []
    }
];




// overall Page 
const addProjectBtnInOverallPage = document.getElementById("add-project-in-overall-page");
const addTaskBtnInOverallPage = document.getElementById("add-task-in-overall-page");
const taskTableInOverallPage = document.getElementById("overall-page-task-table");
const projectCardDemo = document.querySelector(".project-demo-view");
const addProjectBtnInOverallPageText = document.querySelector(`#${addProjectBtnInOverallPage.id} span`)

addProjectBtnInOverallPage.addEventListener("click", () => {
    openPage(addProjectPage);
    formReset(addProjectForm, true);
    selectedIconView.src = "icons/select.tr.gif";
    selectedIconView.style.filter = "invert(1)";
});
addTaskBtnInOverallPage.addEventListener("click", () => {
    openPage(addTaskPage);
    formReset(addTaskForm, true);
})





// forms
const addProjectForm = document.getElementById("add-project-form");
const addTaskForm = document.getElementById("add-task-form");
function formReset(form, reset) {
    if (reset) {
        form.reset();
    }
}



// project Page 
const projectPageBanner = document.querySelector(".project-page-banner");
const projectPageIcon = document.querySelector(".project-page-icon img");
const projectPageTitle = document.getElementById("project-page-title");
const projectPageDescription = document.getElementById("project-page-des");
const taskTableInProjectPage = document.getElementById("project-page-task-table");
const projectPagePrevPageBtn = document.getElementById("prev-page");
const deleteProject1 = document.getElementById("delete-project-1");
const deleteProjectContainer = document.querySelector(".delete-project-container");
const deleteProject2 = document.getElementById("delete-project-2");
const cancelDelete = document.getElementById("cancel-delete");

projectPagePrevPageBtn.addEventListener("click", () => {
    if(unfinishedTasks.length > 0) {
        clearTableBody(taskTableInOverallPage);
        CreateTaskUi(unfinishedTasks, overallPage);
    }
   
    openPage(overallPage);
    clearTableBody(taskTableInProjectPage);
    createDemoMessageRow(taskTableInProjectPage);
});


deleteProject1.addEventListener("click", () => {
    deleteProject1.style.transition = "0.1s";
    projectPagePrevPageBtn.style.transition = "0.1s"
    deleteProject1.style.scale = 0;
    projectPagePrevPageBtn.style.scale = 0;
    deleteProjectContainer.style.transform = "translateY(-192px)";
})

cancelDelete.addEventListener("click", () => {
    deleteProjectContainer.style.transform = "translateX(0%)";
    setTimeout(() => {
        deleteProject1.style.scale = 1;
        projectPagePrevPageBtn.style.scale = 1;
    }, 300)
})

deleteProject2.addEventListener("click", () => {
    deleteProject();
    deleteProject1.style.scale = 1;
    projectPagePrevPageBtn.style.scale = 1;
})



function deleteProject() {
    const projectTitle = projectPage.querySelector("#project-page-title").textContent;

    const project = projects.find((proj) => proj.projectTitle === projectTitle);
    project.projectTask.forEach((projTask) => {
        tasks = tasks.filter((task) => task.taskTitle !== projTask.taskTitle);
        unfinishedTasks = unfinishedTasks.filter((task) => task.taskTitle !== projTask.taskTitle);
        tasksDone = tasksDone.filter((task) => task.taskTitle !== projTask.taskTitle);
    })

    projects = projects.filter((proj) => proj.projectTitle !== projectTitle);

    const projectCard = document.getElementById(projectTitle.replace(/\s+/g, "-"));
    projectCard.remove();

    if (projects.length < 3) {
        addProjectBtnInOverallPage.style.display ="flex";
    };
    if (projects.length === 1) {
        addProjectBtnInOverallPageText.innerHTML = `There Is No Project<br>Added Yet`;
        projectCardDemo.style.display = "inline-block";
        addTaskBtnInOverallPage.classList.remove("add-task-btn-change-color");
    }
    
    updateTable(tasks, taskTableInAllTaskPage);
    updateTable(unfinishedTasks, taskTableInOverallPage);
    updateTable(tasksDone, taskTableInTaskCompleatedPage);
    addProject.projectCount -= 1;

    openPage(overallPage)
}








// Add Project Page 
const icons = document.querySelectorAll('input[name="projectIcon"]');
const selectedIcon = document.querySelector('input[name="projectIcon"]:checked');
const selectedIconView = document.getElementById('selected-icon');
const projectTitle = document.getElementById("project-title-input");
const projectDisription = document.getElementById("project-dis-input");
const taskTableInAddProjectPage = document.getElementById("add-project-page-task-table");
const projectColor = document.querySelectorAll('input[name="projectColor"]');
const addTaskBtnInAddProjectPage = document.getElementById("add-task-in-add-project-page");
const addProjectBtn = document.getElementById("add-project-btn");

let prevPage;

icons.forEach(icons => {
    icons.addEventListener("change", () => {
        selectedIconView.src = icons.value;
        selectedIconView.style.filter = "invert(0)";
    })
})


class addProject {                                              // add Project Object
    static projectCount = 0;

    constructor(projectTitle, projectDescription, projectColor, projectIcon, projectTask) {
        this.projectTitle = projectTitle;
        this.projectDescription = projectDescription;
        this.projectColor = projectColor;
        this.projectIcon = projectIcon;
        this.projectTask = projectTask;

        addProject.projectCount += 1;

        
        this.hideAddProjectBtnInOverallPage();
        updateCarouselMetrics();
    }

    createProjectCard() {
        const project = document.createElement("div");
        project.className = "project";
        project.id = `${this.projectTitle.replace(/\s+/g, "-")}`;
        tracker.prepend(project);


        const theme = document.createElement("div");
        theme.className = "theme";
        theme.style.background = this.projectColor; 
        project.appendChild(theme);

        const icon = document.createElement("div");
        icon.className = "icon flex-row";
        const iconImg = document.createElement("img");
        iconImg.src = this.projectIcon;
        icon.appendChild(iconImg);
        project.appendChild(icon);

        const contentContainer = document.createElement("div");
        contentContainer.className = "project-card-content";
        project.appendChild(contentContainer);

        const div1 = document.createElement("div");
        div1.className = "div1";
        contentContainer.appendChild(div1);
        const title = document.createElement("h4");
        title.className = "project-title";
        title.textContent = this.projectTitle;
        div1.appendChild(title);

        const description = document.createElement("p");
        description.className = "project-des";
        description.textContent = this.projectDescription;
        div1.appendChild(description);

        limitTwoLines(description, 20); 

        const div2 = document.createElement("div");
        div2.className = "div2"
        contentContainer.appendChild(div2);

        const tasksH = document.createElement("h5");
        tasksH.textContent = "Tasks";
        div2.appendChild(tasksH);

        const taskContainer = document.createElement("div");
        taskContainer.className = "tasks-carousel flex-row";
        div2.appendChild(taskContainer);

        const taskCarousel = document.createElement("div");
        taskCarousel.className = "task-title-carousel";
        taskContainer.appendChild(taskCarousel);

        const tasks = this.projectTask;
        if (tasks.length === 0) {
            const taskTitle = document.createElement("span");
            taskTitle.textContent = "No Task For This Project";
            taskCarousel.appendChild(taskTitle);
        }
        tasks.forEach((task) => {
            if (!task.done) {
                const taskTitle = document.createElement("span");
                taskTitle.textContent = task.taskTitle;
                taskCarousel.appendChild(taskTitle);
                const overlay = document.createElement("div");
                overlay.className = "overlay";
                taskCarousel.appendChild(overlay);
            }
        })
    }

    hideAddProjectBtnInOverallPage() {
        if (addProject.projectCount > 0) {
            projectCardDemo.style.display = "none";
            addProjectBtnInOverallPageText.textContent = "Add Project";
            addTaskBtnInOverallPage.classList.add("add-task-btn-change-color");
        }
         if(addProject.projectCount > 2) {
            addProjectBtnInOverallPage.style.display = "none";
            tracker.classList.add("hover-scale-effect")
        }
    }      

   
}

function updateCard(project) {
    const projectCard = document.getElementById(`${project.projectTitle.replace(/\s+/g, "-")}`);
    const projectTasksSection = document.querySelector(`#${projectCard.id} .project-card-content .div2 .tasks-carousel .task-title-carousel`);
    projectTasksSection.innerHTML = "";
    let taskCount = 0;
    tasks.forEach((task) => {
            if (!task.done && task.relatedProject === project.projectTitle) {
                taskCount += 1;
                // projectTasksSection.innerHTML = "";
                const taskTitle = document.createElement("span");
                taskTitle.textContent = task.taskTitle;
                projectTasksSection.appendChild(taskTitle);
                if(taskCount === 2) {
                    const overlay = document.createElement("div");
                    overlay.className = "overlay";
                    projectTasksSection.appendChild(overlay);
                }
                
            } 
    })
    if(taskCount === 0) {
      projectTasksSection.innerHTML = "";
      const taskTitle = document.createElement("span");
      taskTitle.textContent = "No Active Task For This Project";
      projectTasksSection.appendChild(taskTitle);
    }
}

function openProjectPage(projectCard) {
    openPage(projectPage);
    document.getElementById("overall").style.background = "black";
    
    const cardTitle = projectCard.querySelector(".project-card-content .div1 .project-title");
    const matchedProject = projects.find(
        (proj) => proj.projectTitle === cardTitle.textContent
    );
    projectPageBanner.style.background = matchedProject.projectColor;
    projectPageIcon.src = matchedProject.projectIcon;
    projectPageTitle.textContent = matchedProject.projectTitle;
    projectPageDescription.textContent = matchedProject.projectDescription;

    if(matchedProject.projectTask.length > 0) {
        clearTableBody(taskTableInProjectPage);
        CreateTaskUi(matchedProject.projectTask, taskTableInProjectPage);
    }
        
    const sectionTitle = projectPage.querySelector(".section-title #page-title");
    sectionTitle.textContent = `Overall ➢ ${matchedProject.projectTitle}`

}


addProjectBtn.addEventListener("click", () => {
     const projectTitleValue = projectTitle.value.trim();
    const projectDescriptionValue = projectDisription.value.trim();
    const selectedColor = document.querySelector('input[name="projectColor"]:checked');
    const selectedIcon = document.querySelector('input[name="projectIcon"]:checked');
    const projectTasks = [];

    if (projectTitleValue && projectDescriptionValue && selectedColor && selectedIcon ) {
    
        const projectColor = selectedColor.value;
        const selectedIcon = document.querySelector('input[name="projectIcon"]:checked').value;
        const newProject = new addProject(projectTitleValue, projectDescriptionValue, projectColor, selectedIcon , projectTasks);

        const relatedProjectSelect = document.createElement("option");
        relatedProjectSelect.value = projectTitleValue;
        relatedProjectSelect.textContent = projectTitleValue;
        relatedProject.appendChild(relatedProjectSelect);
        projects.push(newProject);
        newProject.createProjectCard();    
        openPage(overallPage);

        initializeCarousel();

        const projectCards = document.querySelectorAll(".project");
        projectCards.forEach((projCard) => {
            projCard.addEventListener("click", () => {
            openProjectPage(projCard);
        })
        })
        
        showMessage("Project Added Successfully ✅")
        
    } else {
        showMessage("Please Fill All Inputs ")
    }
})




// add task
const taskTitle = document.getElementById("task-title-input");
const relatedProject = document.getElementById("relatedProject");
const taskDescription = document.getElementById("task-des-input");
const startDate = document.getElementById("start-date");
const endDate = document.getElementById("end-date");
const importance = document.getElementById("Importance-input");
const tableDemoMessage = document.querySelectorAll(".message-demo");
const addTaskBtn = document.getElementById("add-task-btn");

class addTask {
    static taskCount = 0;

    constructor(taskTitle, taskDescription, relatedProject, startDate, endDate, importance) {
        this.taskTitle = taskTitle;
        this.taskDescription = taskDescription;
        this.relatedProject = relatedProject;
        this.startDate = startDate;
        this.endDate = endDate;
        this.importance = importance;
        this.done = false;

        addTask.taskCount += 1;
    }
}

addTaskBtn.addEventListener("click", () => {
    const taskTitleValue = taskTitle.value;
    const relatedProjectValue = relatedProject.value;
    const taskDesValue = taskDescription.value;
    const startDateValue = startDate.value;
    const endDateValue = endDate.value;
    const importanceValue = importance.value;
    
    
    let matchedProject;
   if (taskTitleValue  && relatedProjectValue !== "demo" && taskDesValue && startDateValue && endDateValue && importanceValue !== "demo") {
        const newTask = new addTask(taskTitleValue, taskDesValue, relatedProjectValue, startDateValue, endDateValue, importanceValue);
        
        projects.forEach((proj) => {
            if (proj.projectTitle === newTask.relatedProject) {
                matchedProject = proj;
                matchedProject.projectTask.push(newTask);
            }
        });
        tasks.push(newTask);
        unfinishedTasks.push(newTask);
        if(newTask.relatedProject !== "General") {
            updateCard(matchedProject);
        }
        clearTableBody(taskTableInOverallPage);
        CreateTaskUi(unfinishedTasks, overallPage);
        clearTableBody(taskTableInAllTaskPage);
        CreateTaskUi(tasks, taskTableInAllTaskPage);
        openPage(overallPage);
    }
    else {
        showMessage("Please Fill All Inputs ")
    }

    

})


function CreateTaskUi(projectTasks, placement) {

    const table = document.querySelector(`#${placement.id} table tbody`);

    projectTasks.forEach((task) => {
        const row = document.createElement("tr");
        table.appendChild(row);
       
        let relatedProject = projects.find(proj => proj.projectTitle.toLowerCase().trim() === (task.relatedProject || "").toLowerCase().trim());

        if (!relatedProject) {
            relatedProject = { projectTitle: "General", projectColor: "#5c5c5cff", done: false };
        }

        const td1 = document.createElement("td");
        td1.className = "task-title-td"
        const taskColor = document.createElement("span");
        taskColor.className = "task-dot";
        taskColor.style.background = relatedProject.projectColor;
        td1.appendChild(taskColor);

        const taskTitle = document.createElement("span");
        taskTitle.className = "task-title-table";
        taskTitle.textContent = task.taskTitle;
        td1.appendChild(taskTitle);
        row.appendChild(td1);

        const td2 = document.createElement("td");
        const projectTitle = document.createElement("span");
        projectTitle.className = "project-title-table";
        projectTitle.textContent = relatedProject.projectTitle;
        td2.appendChild(projectTitle);
        row.appendChild(td2);

        const td3 = document.createElement("td");
        const startDate = document.createElement("span");
        startDate.className = "start-date-table";
        startDate.textContent = task.startDate || "-"; 
        td3.appendChild(startDate);
        row.appendChild(td3);

        const td4 = document.createElement("td");
        const endDate = document.createElement("span");
        endDate.className = "end-date-table";
        endDate.textContent = task.endDate || "-";
        td4.appendChild(endDate);
        row.appendChild(td4);

        const td5 = document.createElement("td");
        td5.className = "importantcy";
        const importance = document.createElement("span");
        importance.className = "task-importance-table";
        importance.textContent = task.importance;
        row.appendChild(td5);
        td5.appendChild(importance);

        const td6 = document.createElement("td");
        td6.className = "table-row-done-btn";
        const checkmark = document.createElement("span");
        checkmark.className = "checkmark";
        checkmark.textContent = "✔";

        if(task.done) {
            checkmark.style.background = relatedProject.projectColor;
            checkmark.style.borderColor = relatedProject.projectColor;
        }
        if (!task.done) {
            checkmark.addEventListener("mouseover", () => {
            checkmark.style.background = relatedProject.projectColor;
            checkmark.style.borderColor = relatedProject.projectColor;
            });

            checkmark.addEventListener("mouseout", () => {
            checkmark.style.background = "";
            checkmark.style.borderColor = "";
            });
        }
        
        row.appendChild(td6);
        td6.appendChild(checkmark)
    });
}

function clearTableBody(table) {
    const tableId = table.id;
    const tableBody = document.querySelector(`#${tableId} tbody`);
    tableBody.innerHTML = "";
}
function createDemoMessageRow(table) {
    const tableId = table.id;
    const tableBody = document.querySelector(`#${tableId} tbody`);
    const tr = document.createElement("tr");
    tr.className = "message-demo";

    const td = document.createElement("td");
    const span = document.createElement("span");
    span.textContent = "There Is No Task Added Yet";

    td.appendChild(span);
    tr.appendChild(td);

    tableBody.appendChild(tr);
}

function updateTable(taskArray, table) {
    clearTableBody(table);
    CreateTaskUi(taskArray, table);
    if(taskArray.length === 0) {
        createDemoMessageRow(table);
    }
}








// All Tasks
const taskTableInAllTaskPage = document.getElementById("all-task-page-task-table");



// tasks compleated
const taskTableInTaskCompleatedPage = document.getElementById("task-compleated-page-task-table");






// carousel 

function next() {
    if (trackerPosition + step <= totalScrollPercent) {
        trackerPosition += step;
        tracker.style.transform = `translateX(-${trackerPosition}%)`;
        console.log("next:", trackerPosition);
    }
    else {
        trackerPosition = 0;
        tracker.style.transform = `translateX(-${trackerPosition}%)`;
    }
}

function prev() {
    if (trackerPosition - step >= 0) {
        trackerPosition -= step;
        tracker.style.transform = `translateX(-${trackerPosition}%)`;
        console.log("prev:", trackerPosition);
    }
}

nextBtn.addEventListener("click", next);
prevBtn.addEventListener("click", prev);


// stop carousel on hover & interactions

function startInterval() {
    intervalId = setInterval(() => {
    next();
    }, 4000)
    console.log("mouse OUT")
}
function stopInterval() {
    clearInterval(intervalId);
    console.log("mouse IN")
}

// console.log(tracker.scrollWidth , tracker.parentElement.clientWidth)
if (tracker.scrollWidth > tracker.parentElement.clientWidth) {
    intervalId = setInterval(() => {
    next();
    }, 3000);
    projectSection.addEventListener("mouseenter", stopInterval);
    projectSection.addEventListener("mouseleave", startInterval);

    nextBtn.addEventListener("mouseleave", startInterval);
    nextBtn.addEventListener("mouseenter", stopInterval);
    prevBtn.addEventListener("mouseleave", startInterval);
    prevBtn.addEventListener("mouseenter", stopInterval);
}
else {
    btnContainer.style.display = "none"
}










document.addEventListener("click", (e) => {
    if (e.target.classList.contains("checkmark")) {
        const checkmark = e.target;
        const checkmarkRow = checkmark.closest("tr");
        const taskTitle = checkmarkRow.querySelector(".task-title-table");
        if (!taskTitle) return;

        let relatedProject;
        projects.forEach((proj) => {
            proj.projectTask.forEach((task) => {
                if (task.taskTitle === taskTitle.textContent) {
                    relatedProject = proj;
                }
            });
        });

        let taskInProject;
        for (const project of projects) {
            for (const task of project.projectTask) {
                if (task.taskTitle === taskTitle.textContent) {
                    taskInProject = task;
                    break;
                }
            }
            if (taskInProject) break;
        }

        let taskInTaskArray;
        for (const task of tasks) {
            if (task.taskTitle === taskTitle.textContent) {
                taskInTaskArray = task;
                break;
            }
        }

        // ✅ عملیات toggle done / undone
        if (taskInProject && taskInTaskArray) {
            const newDoneState = !taskInTaskArray.done; // برعکس کردن حالت فعلی
            taskInProject.done = newDoneState;
            taskInTaskArray.done = newDoneState;

            // بروزرسانی آرایه‌ها
            unfinishedTasks = tasks.filter(task => !task.done);
            tasksDone = tasks.filter(task => task.done);

            // آپدیت جدول‌ها
            updateTable(unfinishedTasks, taskTableInOverallPage);
            updateTable(relatedProject.projectTask, taskTableInProjectPage);
            updateTable(tasks, taskTableInAllTaskPage);
            updateTable(tasksDone, taskTableInTaskCompleatedPage);

            // if (unfinishedTasks.length === 0) {
            //     createDemoMessageRow(taskTableInOverallPage);
            // }

            // آپدیت کارت پروژه
            if(taskInTaskArray.relatedProject !== "General") {
                updateCard(relatedProject);
            }
            

            // تغییر استایل چک‌مارک (اختیاری)
            checkmark.classList.toggle("checked", newDoneState);
        }
    }
});
