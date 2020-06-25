const navLinks = document.querySelectorAll(".nav-ul-li-a");
const liContainer = document.querySelector(".nav-ul");
const mobileNavBar = document.querySelector(".nav-bar");
const hamburgerMenu = document.querySelector(".hamburger-menu");
const skillItems = document.querySelectorAll(".skill-item");
const headerSection = document.querySelector(".header-section");
const skillItemLeft = document.querySelector(".skill-item.left");
const skillItemCenter = document.querySelector(".skill-item.center");
const skillItemRight = document.querySelector(".skill-item.right");

window.onscroll = function () {
  docScrollTop = document.documentElement.scrollTop;

  // Header On Scroll Animation
  if (docScrollTop > 100) {
    headerSection.classList.add("active");
  } else {
    headerSection.classList.remove("active");
  }

  // About On Scroll
  if (docScrollTop > 550) {
    skillItems.forEach((item) => item.classList.add("active"));
  } else {
    skillItems.forEach((item) => item.classList.remove("active"));
  }

  if (window.innerWidth < 900) {
    if (docScrollTop > 450) {
      skillItemLeft.classList.add("active");
    } else {
      skillItemLeft.classList.remove("active");
    }
    if (docScrollTop > 800) {
      skillItemCenter.classList.add("active");
    } else {
      skillItemCenter.classList.remove("active");
    }
    if (docScrollTop > 1150) {
      skillItemRight.classList.add("active");
    } else {
      skillItemRight.classList.remove("active");
    }
  }
};

function toggleNavLinks() {
  liContainer.querySelector(".active").classList.remove("active");
  this.classList.add("active");
}

if (window.innerWidth < 900) {
  document.querySelector(".home").classList.remove("active");
}
navLinks.forEach((link) => link.addEventListener("click", toggleNavLinks));

hamburgerMenu.addEventListener("click", function () {
  mobileNavBar.classList.toggle("active");
});

// Sign Up Modal
const signUpLightBox = document.querySelector(".sign-up-modal");
const signUpButton = document.querySelector(".sign-up-btn");
const modalClose = document.querySelector(".modal-close");
const signInContainer = document.querySelector(".sign-in-container");
const signUpContainer = document.querySelector(".sign-up-container");
const overlaySignIn = document.querySelector(".overlay-sign-in");
const overlaySignUp = document.querySelector(".overlay-sign-up");
const signInOverlayBtn = document.querySelector(".sign-in-overlay-btn");
const signUpOverlayBtn = document.querySelector(".sign-up-overlay-btn");

function showSignUpLightBox() {
  signUpLightBox.style.display = "flex";
}
function hideSignUpLightBox() {
  signUpLightBox.style.display = "none";
}
function handleFormAdd() {
  signInContainer.classList.add("active");
  signUpContainer.classList.add("active");
  overlaySignIn.classList.add("active");
  overlaySignUp.classList.add("active");
  modalClose.style.color = "#ff6663";
}
function handleFormRemove() {
  signInContainer.classList.remove("active");
  signUpContainer.classList.remove("active");
  overlaySignIn.classList.remove("active");
  overlaySignUp.classList.remove("active");
  modalClose.style.color = "#fff";
}
signUpButton.addEventListener("click", showSignUpLightBox);
modalClose.addEventListener("click", hideSignUpLightBox);
signInOverlayBtn.addEventListener("click", handleFormRemove);
signUpOverlayBtn.addEventListener("click", handleFormAdd);

// Animated Background For Hero Section
const canvas = document.querySelector(".canvas");
const context = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particlesArray;
// Get Mouse Position
let mouse = {
  x: null,
  y: null,
  radius: (canvas.height / 80) * (canvas.width / 80),
};

window.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

// Create Particle
class Particle {
  constructor(x, y, directionX, directionY, size, color) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
  }
  // Method To Draw Individual Particle
  draw() {
    context.beginPath();
    context.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    context.fillStyle = "#ff6663";
    context.fill();
  }

  // Check Article Position / Check Mouse Position / Move The Particle / Draw The Particle
  update() {
    // Check If Particle Is Still Within Canvas
    if (this.x > canvas.width || this.x < 0) {
      this.directionX = -this.directionX;
    }
    if (this.y > canvas.height || this.y < 0) {
      this.directionY = -this.directionY;
    }
    // Check Collision Detection / Mouse Position / Particle Position
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < mouse.radius + this.size) {
      if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
        this.x += 10;
      }
      if (mouse.x > this.x && this.x > this.size * 10) {
        this.x -= 10;
      }
      if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
        this.y += 10;
      }
      if (mouse.y > this.y && this.y > this.size * 10) {
        this.y -= 10;
      }
    }
    // Move Particle
    this.x += this.directionX;
    this.y += this.directionY;
    // Draw Particle
    this.draw();
  }
}

// Create Particle Array

function init() {
  particlesArray = [];
  let numberOfParticles = (canvas.height * canvas.width) / 50000;
  for (let i = 0; i < numberOfParticles; i++) {
    let size = Math.random() * 5 + 1;
    let x = Math.random() * (innerWidth - size * 2 - size * 2) + size * 2;
    let y = Math.random() * (innerHeight - size * 2 - size * 2) + size * 2;
    let directionX = Math.random() * 5 - 2.5;
    let directionY = Math.random() * 5 - 2.5;
    let color = "#ff6663";
    particlesArray.push(
      new Particle(x, y, directionX, directionY, size, color)
    );
  }
}
// Check If Particles Are Close Enough To Draw A Line Between Them
function connect() {
  let opacityValue = 1;
  for (let a = 0; a < particlesArray.length; a++) {
    for (let b = a; b < particlesArray.length; b++) {
      let distance =
        (particlesArray[a].x - particlesArray[b].x) *
          (particlesArray[a].x - particlesArray[b].x) +
        (particlesArray[a].y - particlesArray[b].y) *
          (particlesArray[a].y - particlesArray[b].y);
      if (distance < (canvas.width / 7) * (canvas.height / 7)) {
        opacityValue = 1 - distance / 20000;
        context.strokeStyle = "rgba(140,85,31," + opacityValue + ")";
        context.lineWidth = 1;
        context.beginPath();
        context.moveTo(particlesArray[a].x, particlesArray[a].y);
        context.lineTo(particlesArray[b].x, particlesArray[b].y);
        context.stroke();
      }
    }
  }
}

// Animation Loop

function animate() {
  requestAnimationFrame(animate);
  context.clearRect(0, 0, innerWidth, innerHeight);
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
  }
  connect();
}
// On Window Resize
window.addEventListener("resize", function () {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  mouse.radius = (canvas.width / 80) * (canvas.height / 80);
  init();
});
// Mouse Out Event
window.addEventListener("mouseout", function () {
  mouse.x = undefined;
  mouse.y = undefined;
});
init();
animate();
// Product Section
const filterButtonsContainer = document.querySelector(".product-section-nav");
const filterButtons = document.querySelectorAll(".product-btn");
const productItemContainer = document.querySelector(".product-section-content");
const productItems = document.querySelectorAll(".product-item");

filterButtons.forEach((item) =>
  item.addEventListener("click", function () {
    // Remove/Add active class from Product-btn
    filterButtonsContainer.querySelector(".active").classList.remove("active");
    this.classList.add("active");

    // Product Items Filter
    const buttonDataFilter = this.getAttribute("data-filter");
    for (let i = 0; i < productItems.length; i++) {
      if (buttonDataFilter === productItems[i].getAttribute("data-category")) {
        productItems[i].classList.remove("hide");
        productItems[i].classList.add("show");
      } else {
        productItems[i].classList.remove("show");
        productItems[i].classList.add("hide");
      }
      if (buttonDataFilter === "all") {
        productItems[i].classList.remove("hide");
        productItems[i].classList.add("show");
      }
      if (buttonDataFilter === "marketing") {
        productItemContainer.style.justifyContent = "space-around";
      } else {
        productItemContainer.style.justifyContent = "space-between";
      }
    }
  })
);

// Show / Hide Light-Box

const lightBox = document.querySelector(".light-box");
const lightBoxImage = document.querySelector(".light-box-image img");
const lightBoxCaptionText = document.querySelector(".caption-text");
const lightBoxCaptionCounter = document.querySelector(".caption-counter");
const lightBoxClose = document.querySelector(".light-box-close-btn");

productItems.forEach((item, index) =>
  item.addEventListener("click", function () {
    handleLightBoxContent(item, index);
    openLightBox();
  })
);

function openLightBox() {
  lightBox.classList.add("open");
}
let itemIndex = 0;
let itemPro;
function handleLightBoxContent(item, index) {
  itemIndex = index;
  itemPro = item;
  const imageSource = item.querySelector("img").getAttribute("src");
  lightBoxImage.src = imageSource;
  lightBoxCaptionText.innerHTML = item.querySelector("h4").innerHTML;
  lightBoxCaptionCounter.innerHTML = `${index + 1} of ${productItems.length}`;
}

lightBoxClose.addEventListener("click", () =>
  lightBox.classList.remove("open")
);

// Light-Box Prev / Next ImageFunction
const nextArrow = document.querySelector(".prev-arrow");
const prevArrow = document.querySelector(".next-arrow");

function prevImage() {
  if (itemIndex === 0) {
    itemIndex = productItems.length - 1;
  } else {
    itemIndex--;
  }
  lightBoxImage.src = `images/portfolio/${itemIndex + 1}.jpg`;
  lightBoxCaptionText.innerHTML = itemPro.previousElementSibling.querySelector(
    "h4"
  ).innerHTML;
  lightBoxCaptionCounter.innerHTML = `${itemIndex + 1} of ${
    productItems.length
  }`;
}
function nextImage() {
  if (itemIndex === productItems.length - 1) {
    itemIndex = 0;
  } else {
    itemIndex++;
  }
  lightBoxImage.src = `images/portfolio/${itemIndex + 1}.jpg`;

  lightBoxCaptionText.innerHTML = itemPro.nextElementSibling.querySelector(
    "h4"
  ).innerHTML;

  lightBoxCaptionCounter.innerHTML = `${itemIndex + 1} of ${
    productItems.length
  }`;
}

prevArrow.addEventListener("click", prevImage);
nextArrow.addEventListener("click", nextImage);

// Start Blog Section

const blogContent = document.querySelector(".blog-content");
const blogItems = document.querySelectorAll(".blog-item");
const prevButton = document.querySelector(".blog-prev-btn");
const nextButton = document.querySelector(".blog-next-btn");
let slideIndex = 0;

function moveToLeft() {
  if (window.innerWidth > 600) {
    slideIndex =
      slideIndex < blogItems.length / 2 ? slideIndex + 1 : blogItems.length / 2;
    blogContent.style.transform = "translateX(" + slideIndex * -33.33 + "%)";
  } else {
    slideIndex =
      slideIndex < blogItems.length - 1 ? slideIndex + 1 : blogItems.length - 1;
    blogContent.style.transform = "translateX(" + slideIndex * -100 + "%)";
  }
}
function moveToRight() {
  slideIndex = slideIndex > 0 ? slideIndex - 1 : 0;

  if (window.innerWidth > 600) {
    blogContent.style.transform = "translateX(" + slideIndex * -33.33 + "%)";
  } else {
    blogContent.style.transform = "translateX(" + slideIndex * -100 + "%)";
  }
}

nextButton.addEventListener("click", moveToLeft);
prevButton.addEventListener("click", moveToRight);
