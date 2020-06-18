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
const sections = document.querySelectorAll('section'); 
const navList = document.querySelector('#navbar__list');


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
// Optional: Function for adding li elements from sectionHeaders to a navList 

// This function is screwy. 
const isInViewport = function (elem) {
    const bounding = elem.getBoundingClientRect();
    return (
         // Active means very top of section is anywhere in viewport, so could be towards the bottom.
        bounding.top >= bottomOfNav &&
        bounding.top <= (window.innerHeight || document.documentElement.clientHeight) 
    );
};
const inViewportActive = function(elem,elemHead) {
    // we actually care about the landing container being visible
    elemToLand = elem.querySelector(".landing__container");
    // previously active class remains active
     if(isInViewport(elemToLand) && 
     elem.classList.contains('your-active-class'))
     { 
         return; 
     }
     // new active class, remove from previously active 
     else if (isInViewport(elemToLand)) 
     { 
         const prevActive = document.querySelector('section.your-active-class');
         // remove from previously active 
         prevActive.classList.remove('your-active-class');
         elem.classList.add('your-active-class');
         // repeat re-assignment steps for the Nav Items 
         const prevActiveHead = navList.querySelector('.your-active-class');
         prevActiveHead.classList.remove('your-active-class');
         elemHead.classList.add('your-active-class');
     } 
     return;
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// ¯\_(ツ)_/¯  

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
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
// in the start, set the first section header to have active class
const navListItems = navList.childNodes;
navListItems[1].classList.add('your-active-class');
// now that the menu is built, let's see where it ends. It will define our viewport
let bottomOfNav = document.querySelector('.page__header').getBoundingClientRect().bottom;

// Add class 'active' to section when near top of viewport. 
// also remove from the inactive one

window.addEventListener('scroll',function(event){
    // loop through all sections and re-assign active class
    let sect_i = 1; 
    for(const sect of sections){
       // i should run this on the landing__container (child)
       inViewportActive(sect,navListItems[sect_i]);
       sect_i++;
    } 
})

// Scroll to section on link click
// remove default behavior from clicking on a link. 

// Scroll to anchor ID using scrollTO event
navList.addEventListener('click',function(event){
    // only do this for link clicks and not clicks anywhere in the nav
    if(event.target.tagName=="A") {
        event.preventDefault();
        // get some id for the section to scroll to
        linkValue = event.target.getAttribute("href");
        // pull the section to scroll to
        const sectToScroll=document.querySelector(`${linkValue}`);
        sectToScroll.scrollIntoView({behavior: "smooth"});
    }
})