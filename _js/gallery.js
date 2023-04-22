"use strict";




/**
 * Selects a random full image at the start and displays it.
 */
function showRandomImageAtStart() {
    const imageUrls = ['images/yellowstone_national_park.webp', 'images/crater_lake_national_park.webp', 'images/acadia_national_park.webp','images/arches_national_park.webp','images/sequoia_national_park.webp', 'images/yosemite_national_park.webp'  ];
    
    // TODO: Select all 6 links (<a>) in the thumbnail section. They contain the URLs to the full images.
    const thumbnailLinks = document.querySelectorAll('#thumbnails a');
    // TODO: Select a random entry out of these 6.
    
    const randomIndex = Math.floor(Math.random() * thumbnailLinks.length);
    const randomThumbnailLink = thumbnailLinks[randomIndex];

    
    const fullImage = document.querySelector('#fullImage img');
    fullImage.src = randomThumbnailLink.href;
    fullImage.alt = randomThumbnailLink.querySelector('img').getAttribute('alt');
    
    const caption = document.querySelector('#fullImage figcaption');
    caption.textContent = fullImage.alt;



    // TODO: Implement switchFullImage() below.
    function switchFullImage(imageUrl, imageDescription) {
        const fullImage = document.querySelector('#fullImage img');
        const caption = document.querySelector('#fullImage figcaption');
        
        //Neues Bild
        fullImage.src = imageUrl;
        fullImage.alt = imageDescription;
        
        // Neue Caption
        caption.textContent = imageDescription;



      }
      
    
    // TODO: Set a background color (classes .bg-dark and .text-white) to the card-body of your random image (hint: it's the sibling element of your link).
    const cardBody = randomThumbnailLink.nextElementSibling;
    cardBody.classList.add('bg-dark', 'text-white');
    // TODO: Call switchFullImage() with the URL of the random image and the alt attribute of the thumbnail (it contains the description).
      switchFullImage(fullImage.src, fullImage.alt)
}


/**
 * Stores or deletes the updated notes of an image after they have been changed.
 */
function storeNotes() {
  const notesField = document.getElementById('notes');
  const fullImage = document.querySelector('#fullImage img');
   // TODO: Choose an appropriate key (hint: the full image's URL makes an easy and unique key).
   const key = fullImage.src ;
  // TODO: Select the notes field and add a blur listener.
    // TODO: When the notes field loses focus, store the notes for the current image in the local storage.
    notesField.addEventListener("blur", () => {
      const notes = notesField.value;
      
      // TODO: If the notes field is empty, remove the local storage entry.
      if (notes === "") {
        localStorage.removeItem(key);
      }
      else {
        localStorage.setItem(key, notes);
      }
    });
    //Debugging
    loadNotes(key);
}




/**
 * Loads the notes from local storage for a given key and sets the contents in the notes field with the ID notes.
 * @param {string} key The key in local storage where the entry is found.
 */
function loadNotes(key) {
  // TODO: Select the notes field.
  const notesField = document.getElementById('notes');
  const notesContent = localStorage.getItem(key);
  // TODO: Check the local storage at the provided key.
  if (notesContent) {
    //  - If there's an entry, set the notes field's value to the local storage's content.
    notesField.value = notesContent;
  }
  //  - If there's no entry, set the default text "Enter your notes here!".
  else {
    notesField.value = "Enter your notes here!";
  }
}

/**
 * Switches the full image in the <figure> element to the one specified in the parameter. Also updates the image's alt
 * attribute and the figure's caption.
 * @param {string} imageUrl The URL to the new image (the image's src attribute value).
 * @param {string} imageDescription The image's description (used for the alt attribute and the figure's caption).
 */

function switchFullImage(imageUrl, imageDescription) {
  console.log('imageUrl:', imageUrl);
  console.log('imageDescription:', imageDescription);
  // TODO: Get the <img> element for the full image. Select it by its class or tag name.
  const fullImage = document.querySelector('figure img');
  // TODO: Set its src and alt attributes with the values from the parameters (imageUrl, imageDescription).
  fullImage.src = imageUrl;
  fullImage.alt = imageDescription;
  // TODO: Select the <figcaption> element.
  const caption = document.querySelector('figcaption');
  // TODO: Set the description (the one you used for the alt attribute) as its text content.
  caption.textContent = imageDescription;
  //Debugging: add loadnotes und storenotes
  const key = fullImage.src
  loadNotes(key);
  storeNotes();
}


/**
 * Prepare the links on the full images so that they execute the following tasks:
 * - Switch the full image to the one that has been clicked on.
 * - Set the highlight under the current thumbnail.
 * - Load the notes for the current image.
 */

function prepareLinks() {
  // Select all the 6 links (<a>) in the thumbnail section.
  const thumbnailLinks = document.querySelectorAll('#thumbnails a');

  // Set an event listener for the click event on every <a> element.
  thumbnailLinks.forEach(link => {
    link.addEventListener('click', event => {
      // Prevent the default action for the link (we don't want to follow it).
      event.preventDefault();
      // Remove the .bg-dark and .text-white classes from the card where it's currently set.
      const cardBody = event.target.closest('.card').querySelector('.card-body');
      const activeCard = document.querySelector('.bg-dark.text-white');
      if (activeCard) {
        activeCard.classList.remove('bg-dark', 'text-white');
      }
      // Add both classes again to the card where the click happened.
      cardBody.classList.add('bg-dark', 'text-white');
      // Call switchFullImage() with the URL clicked link and the alt attribute of the thumbnail.
      const imageUrl = event.currentTarget.href;
      const imageDescription = event.currentTarget.querySelector('img').getAttribute('alt');

      switchFullImage(imageUrl, imageDescription);
      // Implement and then call loadNotes() with the key for the current image.
      const key = fullImage;
      loadNotes(key);
      storeNotes();
    });
  });
}






/**
 * Returns a random integer value between min (included) and max (excluded).
 * @param {number} min The minimum value (included).
 * @param {number} max The maximum value (excluded).
 * @returns {number} A random integer value between min (included) and max (excluded).
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Gets the whole thing started.
 */

showRandomImageAtStart();
prepareLinks();
storeNotes(); 
