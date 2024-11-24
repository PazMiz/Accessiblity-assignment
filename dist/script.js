function showContent(sectionId, element) {
  const navItems = document.querySelectorAll('.nav-item span');
  navItems.forEach(item => item.classList.remove('active'));
  element.classList.add('active');

  const contentSections = document.querySelectorAll('.content');
  contentSections.forEach(section => section.classList.remove('active'));
  document.getElementById(sectionId).classList.add('active');

  const sectionHeading = document.querySelector(`#${sectionId} h3`);
  if (sectionHeading) sectionHeading.focus();
}

function showSubContent(subSectionId, element) {
  const subNavItems = document.querySelectorAll('.sub-nav-item span');
  subNavItems.forEach(item => item.classList.remove('active'));
  element.classList.add('active');

  const subContentSections = document.querySelectorAll('.sub-content');
  subContentSections.forEach(section => section.classList.remove('active'));
  document.getElementById(subSectionId).classList.add('active');

  const subSectionHeading = document.querySelector(`#${subSectionId} h4`);
  if (subSectionHeading) subSectionHeading.focus();
}

const modal = document.getElementById('modal');

function openModal() {
  modal.setAttribute('aria-hidden', 'false');
  modal.style.display = 'block';

  const modalHeading = document.getElementById('modal-heading');
  if (modalHeading) modalHeading.focus();

  document.addEventListener('keydown', handleModalKeyboard);
}

function closeModal() {
  modal.setAttribute('aria-hidden', 'true');
  modal.style.display = 'none';

  const saveButton = document.querySelector('.submit-btn');
  if (saveButton) saveButton.focus();

  document.removeEventListener('keydown', handleModalKeyboard);
}

function handleModalKeyboard(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
}

document.addEventListener('keydown', function (event) {
  const activeElement = document.activeElement;

  // Handle navigation between sections and sub-sections
  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    const navItems = [...document.querySelectorAll('.nav-item span, .sub-nav-item span')];
    const currentIndex = navItems.indexOf(activeElement);
    let nextIndex;

    if (event.key === 'ArrowDown') {
      nextIndex = (currentIndex + 1) % navItems.length;
    } else if (event.key === 'ArrowUp') {
      nextIndex = (currentIndex - 1 + navItems.length) % navItems.length;
    }

    const nextItem = navItems[nextIndex];
    if (nextItem) {
      nextItem.focus();
      event.preventDefault();
    }
  }

  // Handle activation of nav items on Enter or Space key press
  if ((event.key === 'Enter' || event.key === ' ') && activeElement.getAttribute('role') === 'link') {
    activeElement.click();
    event.preventDefault();
  }
});

let isBlackBackground = false; // Tracks if the black background mode is enabled
let fontSize = 16; // Default font size for buttons
let showAccessibilityOptions = false; // Determines if the accessibility options toolbar is visible

let firstButton = document.getElementById('toggleButton');
let lastButton = document.getElementById('resetButton');

document.getElementById('toggleButton').addEventListener('click', toggleAccessibilitySettings);

document.getElementById('blackBackgroundButton').addEventListener('click', toggleBlackBackground);
document.getElementById('increaseFontSizeButton').addEventListener('click', increaseFontSize);
document.getElementById('decreaseFontSizeButton').addEventListener('click', decreaseFontSize);
document.getElementById('resetButton').addEventListener('click', resetSettings);

function toggleAccessibilitySettings() {
  showAccessibilityOptions = !showAccessibilityOptions;
  document.getElementById('accessibilityOptions').style.display = showAccessibilityOptions ? 'block' : 'none';

  if (showAccessibilityOptions) {
    setFocusToFirstButton();
    lockTabNavigation();
  } else {
    unlockTabNavigation();
  }
}

function toggleBlackBackground() {
  isBlackBackground = !isBlackBackground;
  if (isBlackBackground) {
    document.body.style.backgroundColor = 'black';
    document.body.style.color = 'white';
  } else {
    document.body.style.backgroundColor = '';
    document.body.style.color = '';
  }
}

function increaseFontSize() {
  fontSize += 2;
  updateFontSize();
}

function decreaseFontSize() {
  if (fontSize > 10) {
    fontSize -= 2;
    updateFontSize();
  }
}

function updateFontSize() {
  // Apply the font size to the entire body and all text elements
  document.body.style.fontSize = `${fontSize}px`;

  // Also update the font size for buttons and any other text-based elements
  const buttons = document.querySelectorAll('button, .accessibility-toolbar button');
  buttons.forEach((button) => {
    button.style.fontSize = `${fontSize}px`;
  });

  // If you want to target specific sections, you can add more selectors here
  const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, li');
  textElements.forEach((element) => {
    element.style.fontSize = `${fontSize}px`;
  });
}

function resetSettings() {
  isBlackBackground = false;
  fontSize = 16;
  document.body.style.backgroundColor = '';
  document.body.style.color = '';
  updateFontSize();
}

function setFocusToFirstButton() {
  setTimeout(() => {
    firstButton.focus();
  }, 0); // Ensure focus is set after rendering the toolbar
}

function lockTabNavigation() {
  const elements = document.querySelectorAll('body *');
  elements.forEach((element) => {
    if (!element.closest('.accessibility-toolbar') && element instanceof HTMLElement) {
      element.setAttribute('tabindex', '-1');
    }
  });
  if (firstButton) firstButton.tabIndex = 0;
  if (lastButton) lastButton.tabIndex = 4;
}

function unlockTabNavigation() {
  const elements = document.querySelectorAll('body *');
  elements.forEach((element) => {
    if (element instanceof HTMLElement) {
      element.setAttribute('tabindex', '');
    }
  });
}

function showContent(contentId, element) {
  document.querySelectorAll('.content').forEach(function(content) {
    content.classList.remove('active');
  });
  document.getElementById(contentId).classList.add('active');

  document.querySelectorAll('.nav-menu span').forEach(function(navLink) {
    navLink.classList.remove('active');
  });
  element.classList.add('active');
}

function showSubContent(subContentId, element) {
  // Ensure the main "Bookings" content is shown
  showContent('bookings', document.querySelector('.nav-menu span[onclick*="showContent(\'bookings\', this)"]'));

  document.querySelectorAll('.sub-content').forEach(function(subContent) {
    subContent.classList.remove('active');
  });
  document.getElementById(subContentId).classList.add('active');

  document.querySelectorAll('.sub-nav span').forEach(function(subNavLink) {
    subNavLink.classList.remove('active');
  });
  element.classList.add('active');
}

function openModal() {
  // Show the modal
  const modal = document.getElementById('modal');
  modal.style.display = 'block';

  // Focus on the "Close" button inside the modal
  const closeButton = document.getElementById('closeButton');
  closeButton.focus();  // Focus on the "Close" button
}

function closeModal() {
  // Hide the modal
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
}

// Ensure keyboard navigation for closing modal
document.getElementById('closeButton').addEventListener('keydown', function(event) {
  if (event.key === 'Enter' || event.key === ' ') {
    closeModal();  // Close modal if Enter or Space is pressed
  }
});

// Close modal when Escape key is pressed anywhere on the page
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeModal();  // Close modal if Escape key is pressed
  }
});