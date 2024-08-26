document.addEventListener('DOMContentLoaded', () => {
  const mainContent = document.querySelector('.main-content');
  const sidebarLinks = document.querySelectorAll('.sidebar a');

  // Load initial content
  loadPage('home.html');

  sidebarLinks.forEach(link => {
      link.addEventListener('click', (event) => {
          event.preventDefault();
          const page = event.target.closest('a').getAttribute('href');
          loadPage(page);
      });
  });

  function loadPage(page) {
      fetch(page)
          .then(response => {
              if (!response.ok) {
                  throw new Error('Page not found');
              }
              return response.text();
          })
          .then(html => {
              // Extract the content of the page
              const tempDiv = document.createElement('div');
              tempDiv.innerHTML = html;
              const newContent = tempDiv.querySelector('.main-content').innerHTML;

              // Replace main content
              mainContent.innerHTML = newContent;

              // If you want to preserve scripts and styles from the loaded content
              // you can append them to the document
              const scripts = tempDiv.querySelectorAll('script');
              scripts.forEach(script => {
                  const newScript = document.createElement('script');
                  newScript.src = script.src;
                  document.body.appendChild(newScript);
              });
          })
          .catch(error => {
              console.error('Error loading page:', error);
          });
  }
});





document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.task-button');
  const activityDisplay = document.getElementById('activity-display');

  // Function to update the activity display with the next incomplete task
  function updateActivityDisplay() {
      // Clear current activity display
      activityDisplay.innerHTML = '';

      // Find the next task that is not completed
      let found = false;
      buttons.forEach((button, index) => {
          if (!button.classList.contains('done') && !found) {
              found = true; // We have found the next incomplete task

              const taskName = button.textContent;
              const activityItem = document.createElement('p');
              activityItem.textContent = `Next Task: ${taskName}`;
              activityItem.className = 'current-task';

              activityDisplay.appendChild(activityItem);
          }
      });

      // If all tasks are completed, show a completion message
      if (!found) {
          activityDisplay.innerHTML = '<p>All tasks are completed!</p>';
      }
  }

  // Initial call to set the display of the first task
  updateActivityDisplay();

  buttons.forEach(button => {
      button.addEventListener('click', function() {
          // Toggle the 'done' class on click
          if (this.classList.contains('done')) {
              this.classList.remove('done');
          } else {
              this.classList.add('done');
          }

          // Update the activity display to show the next task
          updateActivityDisplay();
      });
  });
});





// script.js

function updateDateTime() {
  const now = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
  const dateTimeString = now.toLocaleDateString('en-US', options);
  document.getElementById('currentDateTime').textContent = dateTimeString;
}

// Update date and time every second
setInterval(updateDateTime, 1000);

// Initial call to display date and time immediately
updateDateTime();




document.addEventListener('DOMContentLoaded', () => {
  let slideIndex = 0;

  function generateSlides() {
      const slideshowContainer = document.querySelector('.slideshow-container');
      const cards = document.querySelectorAll('.card.views');

      // Clear existing slides
      slideshowContainer.innerHTML = '';

      // Create slides based on cards
      cards.forEach(card => {
          const slide = document.createElement('div');
          slide.className = 'slide fade';

          const cardTitle = card.querySelector('h2').innerText;
          const cardNumber = card.querySelector('.number').innerText;

          slide.innerHTML = `
              <h2>${cardTitle}</h2>
              <p>${cardNumber}</p>
          `;

          slideshowContainer.appendChild(slide);
      });

      // Add controls to slideshow
      const prevButton = document.createElement('a');
      prevButton.className = 'prev';
      prevButton.innerHTML = '&#10094;';
      prevButton.onclick = () => plusSlides(-1);
      slideshowContainer.appendChild(prevButton);

      const nextButton = document.createElement('a');
      nextButton.className = 'next';
      nextButton.innerHTML = '&#10095;';
      nextButton.onclick = () => plusSlides(1);
      slideshowContainer.appendChild(nextButton);
  }

  function showSlides() {
      const slides = document.getElementsByClassName('slide');
      for (let i = 0; i < slides.length; i++) {
          slides[i].style.display = 'none';  // Hide all slides
      }
      slideIndex++;
      if (slideIndex > slides.length) { slideIndex = 1 }  // Loop back to the first slide
      slides[slideIndex - 1].style.display = 'block';  // Show the current slide
      setTimeout(showSlides, 3000); // Change slide every 3 seconds
  }

  function plusSlides(n) {
      const slides = document.getElementsByClassName('slide');
      slideIndex += n;
      if (slideIndex > slides.length) { slideIndex = 1 }
      if (slideIndex < 1) { slideIndex = slides.length }
      for (let i = 0; i < slides.length; i++) {
          slides[i].style.display = 'none';  // Hide all slides
      }
      slides[slideIndex - 1].style.display = 'block';  // Show the current slide
  }

  generateSlides();  // Generate slides dynamically
  showSlides();  // Initialize the slideshow
});
