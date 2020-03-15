const slider = document.querySelector(".slider");
const leftArrow = document.querySelector(".left");
const rightArrow = document.querySelector(".right");
let sectionIndex = 0;
const indicators = document.querySelectorAll(".controls ul li");

// The Arrow Event
leftArrow.addEventListener("click", function() {
  sectionIndex = sectionIndex > 0 ? sectionIndex - 1 : 0;
  slider.style.transform = "translateX(" + sectionIndex * -20 + "%)";
  document.querySelector("li.selected").classList.remove("selected");
  indicators[sectionIndex].classList.add("selected");
});
rightArrow.addEventListener("click", function() {
  sectionIndex = sectionIndex < 4 ? sectionIndex + 1 : 4;
  slider.style.transform = "translateX(" + sectionIndex * -20 + "%)";
  document.querySelector("li.selected").classList.remove("selected");
  indicators[sectionIndex].classList.add("selected");
});

// The Indicators Event
indicators.forEach((item, index) => {
  item.addEventListener("click", () => {
    sectionIndex = index;
    slider.style.transform = "translateX(" + sectionIndex * -20 + "%)";
    document.querySelector("li.selected").classList.remove("selected");
    item.classList.add("selected");
  });
});
