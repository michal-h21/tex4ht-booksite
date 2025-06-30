// This script handles the Table of Contents (TOC) functionality for the documentation pages.
  
// hide sectionTocs by default
document.write('<style>nav.TOC span.sectionToc {display: none;}</style>');

document.addEventListener('DOMContentLoaded', function() {
  const chapterTocs = document.querySelectorAll('nav.TOC span.chapterToc');

  
  function handleChapterTocClick(event) {
    const nextElement = this.nextElementSibling;
    if (nextElement && nextElement.classList.contains('sectionToc')) {
      event.preventDefault(); 
    }
    
    const chapterTocs = this.parentNode.querySelectorAll('span.chapterToc');
    chapterTocs.forEach(function(otherChapterToc) {
      if (otherChapterToc !== this) {
        otherChapterToc.classList.remove('clicked');
      }
    }.bind(this));
    
    this.classList.toggle('clicked');
  }
  
  chapterTocs.forEach(function(chapterToc) {
    chapterToc.addEventListener('click', handleChapterTocClick);
  });

  // Check current page on load
  const currentPage = window.location.pathname.split('/').pop();
  const navLinks = document.querySelectorAll('nav.TOC a[href]');
  let foundLink = false;
  
  navLinks.forEach(function(link) {
    let linkPage = link.getAttribute('href').split('/').pop();
    linkPage = linkPage.split('#')[0]; // Remove hash and everything after it
    
    // If linkPage is empty (just #id) or matches current page
    if (linkPage === '' || linkPage === currentPage) {
      foundLink = true;
      let prevElement = link.closest('.sectionToc')?.previousElementSibling;
      while (prevElement) {
        if (prevElement.classList.contains('chapterToc')) {
          prevElement.classList.add('clicked');
          break;
        }
        prevElement = prevElement.previousElementSibling;
      }
    }
  });
  
  if (!foundLink && chapterTocs.length > 0) {
    chapterTocs[0].classList.add('clicked');
  }
  const menuToggle = document.querySelector('button.hamburger');
  // const menuToggle = document.getElementById('menu-toggle');
  const toc = document.querySelector('nav.TOC');

  menuToggle?.addEventListener('click', function (event) {
    event.stopPropagation(); // will prevent the click from bubbling up to the document
    toc.classList.toggle('open');

    if (toc.classList.contains('open')) {
      toc.style.transform = "translateX(0)";
      document.body.classList.add('no-scroll');
    } else {
      toc.style.transform = "translateX(-100%)";
      document.body.classList.remove('no-scroll');
    }
  });

  // close menu on outside click
  document.addEventListener('click', function (event) {
    const isClickInsideMenu = toc.contains(event.target);
    const isClickOnToggle = menuToggle.contains(event.target);

    if (!isClickInsideMenu && !isClickOnToggle && toc.classList.contains('open')) {
      toc.classList.remove('open');
      toc.style.transform = "translateX(-100%)";
      document.body.classList.remove('no-scroll');
    }
  });
  // close menu on Escape key
  document.addEventListener('keydown', function (event) {
    console.log(`key down: ${event.key}`);
    if (event.key === 'Escape' && toc.classList.contains('open')) {
      toc.classList.remove('open');
      toc.style.transform = "translateX(-100%)";
      document.body.classList.remove('no-scroll');
    }
  });
  // hide menu on small screens
  function updateMenuVisibility() {
    const isToggleVisible = window.getComputedStyle(menuToggle).display !== 'none';

    if (!isToggleVisible) {
      // always show menu if the hamburger menu is not visible
      toc.style.transform = "translateX(0)";
      document.body.classList.remove('no-scroll'); // 
    } else if (!toc.classList.contains('open')) {
      // hide menu if the hamburger menu is visible and doesn't have the open class
      toc.style.transform = "translateX(-100%)";
      document.body.classList.remove('no-scroll');
    }
  }

  // check if menu should be visible on load
  updateMenuVisibility();

  // check if menu should be visible on window resize
  window.addEventListener('resize', updateMenuVisibility);
});


