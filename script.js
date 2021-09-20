const headerBurger = document.querySelector(".header-burger");
const headerMenu = document.querySelector(".header-menu");
const body = document.querySelector("body");

headerBurger.addEventListener("click", () => {
   headerBurger.classList.toggle('active');
   headerMenu.classList.toggle('active');
   body.classList.toggle('lock');
});


const anchors = document.querySelectorAll('a[href*="#"]');

for (let anchor of anchors) {
   anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const blockID = anchor.getAttribute('href').substr(1);

      document.getElementById(blockID).scrollIntoView({
         behavior: 'smooth',
         block: 'start'
      });
   });
}