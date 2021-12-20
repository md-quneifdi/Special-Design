
// check if there's a color stored in the local storage 
let mainColors = localStorage.getItem("color_option");
// console.log(mainColors);
if (mainColors !== null) {

    // console.log("the local storage has item you can set it to root element now");
    // console.log(localStorage.getItem("color_option"));

    document.documentElement.style.setProperty('--main-color', mainColors);

    // remove active class from all colors list items
    document.querySelectorAll(".colors-list").forEach((element) => {
        element.classList.remove("active");

        // // add active class on element if data-color === local storage item
        if (element.dataset.color === mainColors) {

            // add active class 
            element.classList.add("active");
        }

    });


}

// random bg option 
let bgOption = true;

// var to controle the bg interval
let bginterval;

// check if there's local storage random bg item
let bgLocalItem = localStorage.getItem("bg_option");

// check if random bg local storage is not empty 
if (bgLocalItem !== null) {

    // console.log("local storage is not empty");
    // console.log(typeof (bgLocalItem));

    if (bgLocalItem === 'true') {

        bgOption = true;

    } else {

        bgOption = false;
    }

    // console.log(bgLocalItem);

    // remove active class from all spans
    document.querySelectorAll('.random-bg span').forEach(element => {
        element.classList.remove('active');
    });

    if (bgLocalItem === 'true') {

        document.querySelector('.random-bg .yes').classList.add('active');

    } else {

        document.querySelector('.random-bg .no').classList.add('active');

    }

}

// toggle spin class icon 
document.querySelector(".toggle-settings .icon").onclick = function () {

    // toggle class fa-spin for rotation on self 
    this.classList.toggle("fa-spin");

    // toggle open class on the main settings box 
    document.querySelector(".settings-box").classList.toggle("open");
};

// switch colors 
const colorsLi = document.querySelectorAll(".colors-list li");
// console.log(colorsLi);

// loop on all list items
colorsLi.forEach(li => {

    // console.log(li)

    // click on every list items
    li.addEventListener("click", (e) => {

        // console.log(e.target.dataset.color);

        // set color on root 
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color);

        // store the selected color in the local storage 
        localStorage.setItem("color_option", e.target.dataset.color);

        ////////// -- handle active functions --//////////
        handleActive(e);

    });

});


// random backgrounds option  
const random_bg = document.querySelectorAll(".random-bg span");
// console.log(random_bg);

// loop on all Spans
random_bg.forEach(span => {

    // console.log(span)

    // click on every span
    span.addEventListener("click", (e) => {

        // // remove active class from all li items
        // e.target.parentElement.querySelectorAll(".active").forEach((element) => {
        //     element.classList.remove("active");
        // }); // replaced the handle function here

        // // add active class to the clicked item 
        // e.target.classList.add("active");

        ////////// -- handle active functions --//////////
        handleActive(e);

        if (e.target.dataset.bg === 'yes') {

            // console.log('yes');

            bgOption = true;
            // console.log(bgOption)

            randomizeImages();

            localStorage.setItem("bg_option", true);

        } else {

            // console.log('no');

            bgOption = false;
            // console.log(bgOption)

            clearInterval(bginterval);

            localStorage.setItem("bg_option", false);

        }

    });

});


// select landing page element 

let landingPage = document.querySelector(".landing-page");

// let imagesArray = ["images/department.jpg", "images/man.jpg",
//     "images/zetong.jpg", "images/zongnan.jpg", "images/yang-song.jpg"];

let imagesArray = ["department.jpg", "zetong.jpg", "zongnan.jpg", "yang-song.jpg"];

// console.log(imagesArray);

// function to randomize images 
function randomizeImages() {

    if (bgOption === true) {

        bginterval = setInterval(() => {

            // get random number
            let randomNumber = Math.floor(Math.random() * imagesArray.length);
            // console.log(randomNumber);

            // change bg image url
            landingPage.style.backgroundImage = 'url("../images/' + imagesArray[randomNumber] + ' ")';

        }, 10000);

    }
}

// you can set the current image as a fixed bg and add it to the local storage
randomizeImages();


// animate skills 

// this code is old a little bit i have to improve it 

// select skills section 
let ourSkills = document.querySelector(".skills");

window.onscroll = () => {

    // window.scrollY >= section.offsetTop + 50

    if (window.scrollY >= ourSkills.offsetTop) {
        // console.log("Reached our skills section");
        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");

        allSkills.forEach(skill => {

            skill.style.width = skill.dataset.progress;
        });
    }
}


// window.onscroll = function () {
//     // this is the old way to reach a section and animate it
//     // get skills of set top 
//     let skillsOffsetTop = ourSkills.offsetTop;
//     // console.log(skillsOffsetTop);

//     // get the outer height [ search for ]
//     let skillsOuterHeight = ourSkills.offsetHeight;
//     // console.log(skillsOuterHeight);

//     // get the window height [ search for ]
//     let windowHeight = this.innerHeight;
//     // console.log(windowHeight);

//     // window scroll top [ search for ]
//     let windowScrollTop = this.pageYOffset;
//     // console.log(windowScrollTop);

//     if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {

//         // console.log("skills section reached ");
//         // console.log(skillsOffsetTop + skillsOuterHeight - windowHeight);

//         let allSkills = document.querySelectorAll(".skill-box .skill-progress span");

//         allSkills.forEach(skill => {

//             skill.style.width = skill.dataset.progress;

//         });

//     }

// };


/** create popup with the image  */
let ourGalery = document.querySelectorAll(".galery img");

ourGalery.forEach(img => {

    img.addEventListener("click", (e) => {

        // create overlay element 
        let overlay = document.createElement("div");

        // add a class to the overlay div
        overlay.className = 'popup-overlay';

        // append overlay to the body 
        document.body.appendChild(overlay);

        // create the popup box 
        let popupbBox = document.createElement('div');

        // add a class to the popup box
        popupbBox.className = 'popup-box';

        if (img.alt !== null) {

            // create the heading  
            let imgHeading = document.createElement('h3');

            // create the heading text 
            let imgText = document.createTextNode(img.alt);

            // append the img text to the heading 
            imgHeading.appendChild(imgText);

            // append the heading to the popup box
            popupbBox.appendChild(imgHeading);

        }

        // create the image
        let popupImage = document.createElement('img');

        // console.log(img.src);

        // set the source of the image 
        popupImage.src = img.src;

        // add the image to the popup box 
        popupbBox.appendChild(popupImage);

        // append the popup box to the body
        document.body.appendChild(popupbBox);

        // create the close span 
        let closeButton = document.createElement('span');

        // create the close button text
        let closeButtonText = document.createTextNode('+');

        // append the close button text to the button 
        closeButton.appendChild(closeButtonText);

        // add class to the close button 
        closeButton.className = 'close-button';

        // add the close button to the popup box
        popupbBox.appendChild(closeButton);

    });

});

// close the popup 
document.addEventListener('click', function (e) {

    if (e.target.className === 'close-button') {

        // remove the current popup
        e.target.parentNode.remove();

        // document.querySelector('.popup-box').remove();

        // remove overlay layer 
        document.querySelector('.popup-overlay').remove();

    }

});

// select all bullets 
// const allBullets = document.querySelectorAll(".nav-bullets .bullet");

// // console.log(allBullets);

// allBullets.forEach(bullet => {

//     bullet.addEventListener('click', (e) => {

//         // [ scrollIntoView() ] read about it
//         document.querySelector(e.target.dataset.section).scrollIntoView({

//             behavior: 'smooth'

//         });

//     });

// });

// select all bullets 
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

// select all links
const allLinks = document.querySelectorAll(".links a");

function scrollbtwSections(elements) {
    elements.forEach(element => {

        element.addEventListener('click', (e) => {

            e.preventDefault();

            // [ scrollIntoView() ] read about it
            document.querySelector(e.target.dataset.section).scrollIntoView({

                behavior: 'smooth'

            });

        });

    });
}

scrollbtwSections(allBullets);
scrollbtwSections(allLinks);

/**
 * Assignment
 * getting all sections automaticly in an array and their classes and generate
 * them by using DOM manibulation [ creating element contains the count of the
 *  bullets of your page sections and for each bullet you should put on it class and dataset
 * that comming from the class name that you get it from the array and make it dynamic ]
 * 
 *  create fixed header option 
 *  improve the code and make it esaier and
 */


// handle active state 
function handleActive(ev) {

    // remove active class from all items
    ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
        element.classList.remove("active");
    });

    // add active class to the clicked item 
    ev.target.classList.add("active");

}

let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem('bullets_options');

if (bulletLocalItem !== null) {

    // console.log('not empty');
    bulletsSpan.forEach(span => {

        span.classList.remove('active');

    });

    if (bulletLocalItem === 'block') {

        bulletsContainer.style.display = 'block';

        document.querySelector('.bullets-option .yes').classList.add("active");

    } else {

        bulletsContainer.style.display = 'none';
        document.querySelector('.bullets-option .no').classList.add("active");

    }

}

bulletsSpan.forEach(span => {

    span.addEventListener('click', (e) => {

        if (span.dataset.display === 'show') {

            localStorage.setItem('bullets_options', 'block');

            bulletsContainer.style.display = 'block';

        } else {

            bulletsContainer.style.display = 'none';

            localStorage.setItem('bullets_options', 'none');

        }

        handleActive(e);

    });

});

// reset options button 
document.querySelector('.reset-options').onclick = function () {

    // localStorage.clear(); // its clear all info in the local storage
    localStorage.removeItem('color_option');
    localStorage.removeItem('bg_option');
    localStorage.removeItem('bullets_options');

    // reload the window
    window.location.reload();
};

// toggle menu 
let toggleBtn = document.querySelector('.toggle-menu');
let tLinks = document.querySelector('.links');

toggleBtn.onclick = function (e) {

    // stop propagation
    e.stopPropagation();

    // toggle class "menu-active" on button 
    this.classList.toggle("menu-active");

    // toggle class "open" on links
    tLinks.classList.toggle("open");

};

// click on anywhere outside menu and toggle button 
document.addEventListener("click", (e) => {

    // console.log(e.target);

    if (e.target !== toggleBtn && e.target !== tLinks) {
        // console.log("this is not the button & not the list ");

        // check if menu is open 
        if (tLinks.classList.contains('open')) {

            // console.log(" menu is open ");

            // toggle class "menu-active" on button 
            toggleBtn.classList.toggle("menu-active");

            // toggle class "open" on links
            tLinks.classList.toggle("open");
        }

    }

});

// stop propagation on menu 
tLinks.onclick = function (e) {
    e.stopPropagation();
};