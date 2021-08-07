'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////
// Button scrolling
btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect());

  console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);

  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // Scrolling
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////
// Page navigation

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// 1. Add event listener to common parent element
// 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

///////////////////////////////////////
// Tabbed component

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  // Guard clause
  if (!clicked) return;

  // Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // Activate tab
  clicked.classList.add('operations__tab--active');

  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});


  // const nav = document.querySelector('.nav')
  nav.addEventListener('mouseover',function(e){
    if(e.target.classList.contains('nav__link')){
 const link = e.target
 const siblings = link.closest('.nav').querySelectorAll('.nav__link')
 const logo = link.closest('.nav').querySelector('img')

   siblings.forEach(el=> {
     if(el !==link ){
   el.style.opacity = 0.5
     logo.style.opacity = 0.5
     }
   })
 }
 })




  nav.addEventListener('mouseout',function(e){
    if(e.target.classList.contains('nav__link')){
 const link = e.target
 const siblings = link.closest('.nav').querySelectorAll('.nav__link')
 const logo = link.closest('.nav').querySelector('img')

   siblings.forEach(el=> {
     if(el !==link ){
   el.style.opacity = 1
     logo.style.opacity = 1
     }
   })
 }
 })


// sticky navbar


// window.addEventListener('scroll',function(){
//   console.log(this.scrollY);
//   console.log(this.innerHeight);

// if(this.scrollY>this.innerHeight){
//   nav.classList.add('sticky')
// }
// else  nav.classList.remove('sticky')


// })


// intersection observer api

// const obsCallback = function(entries,observer){
//   entries.forEach(entry =>{
//     console.log(entries);
//   })
// }
// const obsOptions = {
//   threshold:[0,0.1],
//   root:null
// }
// const observer = new IntersectionObserver(obsCallback,obsOptions)
// observer.observe(section1)



// sticky nav by intersection observer api


const header = document.querySelector('.header')
const navHeight = nav.getBoundingClientRect().height
  // console.log(navHeight);
const stickyNav = function(entries){
 const [entry] = entries
  // console.log(entry);
 
   if(!entry.isIntersecting)   nav.classList.add('sticky')
   else      nav.classList.remove('sticky')  
}
const headerObserver = new IntersectionObserver(stickyNav,
{
  root:null,
  threshold:0,
  rootMargin:`-${navHeight}px`
})

headerObserver.observe(header)

// section revealing

const allSections = document.querySelectorAll('.section')

const revealSection = function(entries,sectionObserver){
  const [entry] = entries
  // console.log(entry);
  if(!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden'); 
  Observer.unobserve(entry.target);
}
const sectionObserver = new IntersectionObserver(revealSection,{
root:null,
threshold:0.15
})
allSections.forEach(function(section){
  sectionObserver.observe(section)
  // section.classList.add('section--hidden')
})

// slider section

const slides = document.querySelectorAll('.slide')
const slider = document.querySelector('.slider')
const btnRight = document.querySelector('.slider__btn--right')
const btnleft = document.querySelector('.slider__btn--left')
let curSlide = 0
let maxSlide = slides.length


slider.style.transform ='scale(0.2)' 
slider.style.overflow ='visible' 

slides.forEach((s,i) => {
  s.style.transform = `translateX(${100*i}%)`
})

btnRight.addEventListener('click',function(){


if(curSlide===maxSlide-1){
  curSlide=0
}
else{
  curSlide++;
}
slides.forEach((s,i) => {
  s.style.transform = `translateX(${100*(i-curSlide)}%)`
})

})