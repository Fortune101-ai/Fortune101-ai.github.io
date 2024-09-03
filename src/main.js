document.addEventListener('DOMContentLoaded', function () {
  const hamburgerIcon = document.getElementById('hamburger-icon');
  const navLinks = document.querySelector('.nav-links');

  hamburgerIcon.addEventListener('click', function () {
    navLinks.classList.toggle('active');
  });

});

function displayAboutMe() {
  let elem = document.getElementById('more-about-me');

  if (elem.style.display === '') {
    elem.style.display = 'block';
    document.getElementById('view-button').innerText = 'Read less';
  } else if (elem.style.display === 'block') {
    document.getElementById('more-about-me').style.display = '';
    document.getElementById('view-button').innerText = 'Find our more';
  }
}
