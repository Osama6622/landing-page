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
const navList = document.getElementById('navbar__list');
const sections = Array.from(document.querySelectorAll('section'));
const domFragment = document.createDocumentFragment();

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// Function To Create Links 
function createNavLinks() {
    for(const section of sections) {
        linkName = section.getAttribute('data-nav');
        linkHref = section.getAttribute('id');
        // Create Li Element For Each Link
        let liItem = document.createElement('li');
        // Put an anchor tag in each link
        liItem.innerHTML = `<a href='#${linkHref}' class='menu__link'>${linkName}</a> `;
        // Append Li In Virtual Dom
        domFragment.appendChild(liItem);
    }
    navList.appendChild(domFragment);
}

// Function To Find Which Elemnt In Viewport
function whichSectionInViewport(element) {
    const clientHeight = document.documentElement.clientHeight;
    const sectionPositionTop = element.getBoundingClientRect().top;
    const sectionPositionHeight = element.getBoundingClientRect().height;
    // Return True if Element Inter The Viewport
    if (clientHeight > sectionPositionTop + sectionPositionHeight * 2/3) {
        return true ;
    } else {
        return false;
    }
}

// Function To Create Sceoll To Top Button 

function scrollToTopBtn () {
    const body = document.body ;
    const span = document.createElement('span');
    span.classList.add('scroll-top-btn');
    span.innerHTML = `<i class="fas fa-arrow-circle-up"></i>`;
    body.appendChild(span);
}
scrollToTopBtn();
/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
createNavLinks();
// Add class 'active' to section when near top of viewport
function toggleActiveClass() {
    for(const section of sections) {
        // Toggle Class 'your-active-class' To The Section Which In Viewport
        if (whichSectionInViewport(section)) {
            if (!(section.classList.contains("your-active-class"))) {
                section.classList.add('your-active-class');
            } else {
                section.classList.remove('your-active-class');
            }
        }
    }
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Scroll to section on link click
navList.addEventListener('click', (event) => {
    // Remove Active Class From All Links
    const links = document.querySelectorAll('.menu__link');
    links.forEach((element) => {
        element.classList.remove('active')
    })
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

// Listen To Window Scroll Event
const scrollTopBtn = document.querySelector('.scroll-top-btn');
window.addEventListener('scroll', () => {
    // Set sections as active
    toggleActiveClass();
    // Show Scroll Top Btn
    if (window.pageYOffset >= 300) {
        scrollTopBtn.style.display = "block";
    } else {
        scrollTopBtn.style.display = "none";
    }
});

//Scroll To Top Behavior
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
})


