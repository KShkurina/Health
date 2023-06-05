const mobileMenu = document.querySelector('.header__nav');
const logo = document.querySelector('.header__logo');
logo.addEventListener('click', () => {
  const mobile = document.querySelector('.header__logo-title-mobile');
  mobileMenu.classList.toggle('header__nav--active');
});

export default null;