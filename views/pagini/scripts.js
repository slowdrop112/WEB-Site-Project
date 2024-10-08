document.addEventListener("DOMContentLoaded", function() {
    const galerie = document.getElementById('galerie-animata');
  
    // Functie pentru generare numar aleator divizibil cu 3
    function getRandomNumberDivisibleByThree(max) {
      const numbers = [3, 6, 9, 12, 15].filter(n => n < max);
      return numbers[Math.floor(Math.random() * numbers.length)];
    }
  
    // Citire imagini din JSON
    fetch('images.json')
      .then(response => response.json())
      .then(data => {
        const images = data.images;
        const numImages = getRandomNumberDivisibleByThree(16);
        const offset = Math.floor(Math.random() * (images.length - numImages));
        const selectedImages = images.slice(offset, offset + numImages);
  
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('image-container');
  
        selectedImages.forEach(imageSrc => {
          const img = document.createElement('img');
          img.src = imageSrc;
          imageContainer.appendChild(img);
        });
  
        galerie.appendChild(imageContainer);
      });
  
    // Stop animația la hover
    galerie.addEventListener('mouseover', function() {
      galerie.classList.add('hover');
    });
  
    galerie.addEventListener('mouseout', function() {
      galerie.classList.remove('hover');
    });
  });
  