const scrollers = document.querySelectorAll(".scroller");  

// Check if the user has opted for reduced motion  
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {  
  addAnimation();  
}  

function addAnimation() {  
  scrollers.forEach((scroller) => {  
    // Set data-animated attribute only once  
    if (!scroller.hasAttribute("data-animated")) {  
      scroller.setAttribute("data-animated", true);  
      
      const scrollerInner = scroller.querySelector(".scroller__inner");  
      const scrollerContent = Array.from(scrollerInner.children);  
      const fragment = document.createDocumentFragment(); // Use a document fragment for batch insertion  

      // Clone items and modify attributes in a single loop  
      scrollerContent.forEach((item) => {  
        const duplicatedItem = item.cloneNode(true);  
        duplicatedItem.setAttribute("aria-hidden", true);  
        fragment.appendChild(duplicatedItem); // Append to fragment instead of directly to the DOM  
      });  

      // Insert all duplicates at once, minimizing DOM manipulation  
      scrollerInner.appendChild(fragment);  
    }  
  });  
}

// nav bar
const menuIcon = document.querySelector(".icon-menu");
const menu = document.querySelector(".menu-navbar");
const close = document.querySelector(".close");
const body = document.querySelector("body");
const overlay = document.createElement("div");
overlay.classList.add("overlay");
const overlay2 = document.createElement("div");
overlay2.classList.add("overlay-2");

menuIcon.addEventListener("click", () => {
  menuIcon.classList.remove("fade-in");
  menu.classList.remove("slide-out");
  menu.classList.remove("menu-navbar");
  menu.classList.add("menu-navbar-active");
  menu.classList.add("slide-in");
  menuIcon.classList.add("fade-out");
  body.classList.add("menu-open");
  body.appendChild(overlay);
});

close.addEventListener("click", () => {
  menu.classList.remove("slide-in");
  menu.classList.add("slide-out");
  menuIcon.classList.add("fade-in");
  body.classList.remove("menu-open");
  body.removeChild(overlay);
  body.classList.add("menu-open");
  body.appendChild(overlay2);
  setTimeout(function () {
    body.classList.remove("menu-open");
    body.removeChild(overlay2);
  }, 1300);
});
document.addEventListener("click", (event) => {
  if (!menu.contains(event.target) && !menuIcon.contains(event.target)) {
    menu.classList.remove("slide-in");
    menu.classList.add("slide-out");
    menuIcon.classList.add("fade-in");
    body.classList.remove("menu-open");
    // body.classList.add("menu-open");
    // body.appendChild(overlay2);
    if (body.contains(overlay)) {
      body.removeChild(overlay);
    }
  }
});

// set time out overlay-2

const searchInput = document.querySelector("#search-input");

searchInput.addEventListener("input", () => {
  if (searchInput.value) {
    searchInput.classList.add("active");
  } else {
    searchInput.classList.remove("active");
  }
});
// Function to check if the current viewport is mobile  
function isMobile() {  
  return window.innerWidth < 768;  
}  

// Selecting all account containers  
const accounts = document.querySelectorAll('.bank-accounts');  

// Only set up scroll functionality if not on mobile  
if (!isMobile()) {  
  // Adding scroll functionality to left and right buttons  
  const scrollLeftButtons = Array.from(document.querySelectorAll(".action-button--horizontal-scroll"));  
  const scrollRightButtons = Array.from(document.querySelectorAll(".action-button--horizontal-scroll2"));  

  function handleScrollButtons(buttons, distance) {  
    buttons.forEach((button, index) => {  
      button.addEventListener('click', () => {  
        // Ensure the account container exists for this button  
        if (accounts[index]) {  
          accounts[index].scrollBy({ top: 0, left: distance, behavior: 'smooth' });  
          updateButtonStates(); // Update button states after scrolling  
        }  
      });  
    });  
  }  

  // Setup button scroll functionality  
  handleScrollButtons(scrollLeftButtons, -800);  
  handleScrollButtons(scrollRightButtons, 800);  

  // Update button states to enable/disable buttons  
  function updateButtonStates() {  
    accounts.forEach((account, index) => {  
      const position = account.scrollLeft;  
      const scrollWidth = account.scrollWidth;  
      const clientWidth = account.clientWidth;  

      // Disable left button if at the start  
      if (scrollLeftButtons[index]) {  
        scrollLeftButtons[index].disabled = position === 0;  
      }  
      // Disable right button if at the end  
      if (scrollRightButtons[index]) {  
        scrollRightButtons[index].disabled = Math.round(position) === scrollWidth - clientWidth;  
      }  
    });  
  }  

  // Attach scroll event listener to update button states when scrolled  
  accounts.forEach((account) => {  
    account.addEventListener('scroll', updateButtonStates);  
  });  

  // Initial button state update  
  updateButtonStates();  
}