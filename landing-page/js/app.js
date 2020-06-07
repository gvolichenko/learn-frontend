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
 * Define Global Variables
 * 
*/
// Is there a better way to pull all sections headers? 
// What if some of them are not h2? 
const sections = document.querySelectorAll('section'); 
const navList = document.querySelector('#navbar__list');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
// Optional: Function for adding li elements from sectionHeaders to a navList 

const isInViewport = function (elem) {
    const bounding = elem.getBoundingClientRect();
    return (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav: loop through section headers, create an li and append 

for(const sect of sections) {
    
    // create an empty list item
    const newLi = document.createElement('li');
    // set the item's text content to section's data-nav attribute, make it a link
    newLi.innerHTML = `<a href="#${sect.id}"> ${sect.dataset.nav} </a>`
    // make sure it's using the menu link CSS class
    newLi.classList.add('menu__link');
    // add to navList
    navList.appendChild(newLi);
}


// Add class 'active' to section when near top of viewport. 
// also remove from the inactive one

window.addEventListener('scroll',function(event){
    // loop through all sections and re-assign active class
    let passiveSections=0;
    for(sect of sections){
        // previously active class remains active
        if(isInViewport(sect) && sect.classList.contains('active-class'))
        { 
            break; 
        }
        // new active class, remove from previously active 
        else if (isInViewport(sect)) 
        { 
            const prevActive = document.querySelector('.active-class');
            // remove from previously active 
            prevActive.classList.remove('active-class');
            sect.classList.add('active-class');
        }   
    }    
})

// when a class is active, but it's header is above the fold. We want to fix it at the top.

window.addEventListener('scroll',function(event){
    const activeSect = document.querySelector('.active-class');
    const sectHead = activeSect.querySelector('h2');
    // if the active's section header is not in viewport, fix it at the top
    if(!isInViewport(sectHead)){
       /*
       fixedHeader = document.createElement('h2');
       fixedHeader.classList.add('fixed__header');
       fixedHeader.textContent = sectHead.textContent;
       activeSect.querySelector('.landing__container').prepend(fixedHeader);
       //console.log(fixedHeader); */
        const fixedHeader = document.querySelector('.active__section');
        fixedHeader.querySelector('h2').textContent = sectHead.textContent;
        }
})


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click

// Set sections as active


