"use strict";

// projects calousel 
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const btnContainer = document.getElementById("navigation-btn")
const tracker = document.querySelector(".track");
const projectSection = document.querySelector(".projects")


let trackerPosition = 0;
let totalScroll = tracker.scrollWidth - tracker.parentElement.clientWidth;
let totalScrollPercent = 100 * ((tracker.scrollWidth - tracker.parentElement.clientWidth) /  tracker.parentElement.clientWidth) + 1;
let step = 33.7;



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

let intervalId

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





