/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
const sections = document.querySelectorAll('section');
const navbarMenu = document.getElementById('navbar__list');
const domFragment = document.createDocumentFragment();
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
// Create Menu Link Function
function createMenuLink() {
    for(let i= 0; i <sections.length; i++) {
        const linkName = sections[i].getAttribute('data-nav');
        const linkHref = sections[i].getAttribute('id');
        let linkItem = document.createElement('li');

        linkItem.innerHTML = `<a href='#${linkHref}' class='menu__link'>${linkName}</a> `;
        // append links to dom fragment
        domFragment.appendChild(linkItem);
    }
    navbarMenu.appendChild(domFragment)
}
// create Scroll To Top button
function scrollToTopBtn () {
    const body = document.body ;
    const span = document.createElement('span');
    span.classList.add('scroll-top-btn');
    span.innerHTML = `<i class="fas fa-arrow-circle-up"></i>`;
    body.appendChild(span);
}
scrollToTopBtn();

//Add Active Class To Section In Viewport
function addActiveClassToSection() {
    for(let section of sections) {
        if (
            section.getBoundingClientRect().top < document.documentElement.clientHeight && 
            section.getBoundingClientRect().bottom > 0
            ) {
                section.classList.add('your-active-class');
            } else {
                section.classList.remove('your-active-class');
            }
    }
}
/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
createMenuLink();

// Add class 'active' to section when near top of viewport
document.addEventListener('scroll', addActiveClassToSection);

//Function To Remove Active Class From Anchors 
const anchors = document.querySelectorAll('.menu__link');
function removeActiveClassToAnchors() {
   anchors.forEach((link) => {
       link.classList.remove('active')
   })
} 


// Scroll to anchor ID using scrollTO event
navbarMenu.addEventListener('click', (event) => {
    removeActiveClassToAnchors();
    if (event.target.nodeName === 'A') {
        event.preventDefault();
        // Put Active Class To The Clicked Link
        event.target.classList.add('active');
        for (const section of sections) {
            // Scorll To The Desired Section Depend On Id Of The Clicked Link
            if (event.target.getAttribute('href').slice(1) === section.id) {
                section.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    }
})
/**
 * End Main Functions
 * Begin Events
 * 
*/
// Listen To Window Scroll Event
const scrollTop = document.querySelector('.scroll-top-btn');
window.addEventListener('scroll', () => {
    // Show Scroll Top Btn
    if (window.pageYOffset >= 300) {
        scrollTop.style.display = "block";
    } else {
        scrollTop.style.display = "none";
    }
});

//Scroll To Top Behavior
scrollTop.addEventListener('click', () => {
    removeActiveClassToAnchors();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
})