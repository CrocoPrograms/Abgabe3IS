'use strict';

/**
 * Selects a random full image at the start and displays it.
 */
function showRandomImageAtStart() {
  const imageUrls = [
    'images/yellowstone_national_park.webp',
    'images/crater_lake_national_park.webp',
    'images/acadia_national_park.webp',
    'images/arches_national_park.webp',
    'images/sequoia_national_park.webp',
    'images/yosemite_national_park.webp'
  ];
  
  // Select all 6 links (<a>) in the thumbnail section. They contain the URLs to the full images.
  let thumbnailLinks = document.querySelectorAll('#thumbnails a');
  
  // Select a random entry out of these 6.
  let  randomIndex = Math.floor(Math.random() * thumbnailLinks.length);
  let randomThumbnailLink = thumbnailLinks[randomIndex];
  
  let fullImage = document.querySelector('#fullImage img');
  fullImage.src = randomThumbnailLink.href;
  fullImage.alt = randomThumbnailLink.querySelector('img').getAttribute('alt');
  
  let caption = document.querySelector('#fullImage figcaption');
  caption.textContent = fullImage.alt;


    // TODO: Implement switchFullImage() below.
    // Debugging: implement it above and only call it here
    // TODO: Set a background color (classes .bg-dark and .text-white) to the card-body of your random image (hint: it's the sibling element of your link).
    let cardBody = randomThumbnailLink.nextElementSibling;
    cardBody.classList.add('bg-dark', 'text-white');
    // TODO: Call switchFullImage() with the URL of the random image and the alt attribute of the thumbnail (it contains the description).
      switchFullImage(fullImage.src, fullImage.alt)
}

function prepareLinks() {
  console.log("Ich befinde mich in prepare Links")
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
      let imageUrl = event.currentTarget.href;
      let imageDescription = event.currentTarget.querySelector('img').getAttribute('alt');
      let key = imageUrl;
      switchFullImage(imageUrl, imageDescription);
      // Implement and then call loadNotes() with the key for the current image.
      loadNotes(key);
    });
  });
}
/**
 * Stores or deletes the updated notes of an image after they have been changed.
 */
function storeNotes() {
  // Select the notes field and add a blur listener.
  let notesField = document.getElementById('notes');
  notesField.addEventListener('blur', () => {

    let fullImage = document.getElementById('fullImage').querySelector('figure img');
    // Choose an appropriate key (hint: the full image's URL makes an easy and unique key).
    let key = fullImage.src;
    let notes = notesField.textContent;
    
    // If the notes field is empty, remove the local storage entry.
    if (notes === "") {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, notes);
    }
  });
}
function switchFullImage(imageUrl, imageDescription) {
  console.log('imageUrl:', imageUrl);
  console.log('imageDescription:', imageDescription);
  // TODO: Get the <img> element for the full image. Select it by its class or tag name.
  let fullImage = document.querySelector('figure img');
  // TODO: Set its src and alt attributes with the values from the parameters (imageUrl, imageDescription).
  fullImage.src = imageUrl;
  fullImage.alt = imageDescription;
  // TODO: Select the <figcaption> element.
  const caption = document.querySelector('figcaption');
  // TODO: Set the description (the one you used for the alt attribute) as its text content.
  caption.textContent = imageDescription;

}

/**
 * Loads the notes from local storage for a given key and sets the contents in the notes field with the ID notes.
 * @param {string} key The key in local storage where the entry is found.
 */
function loadNotes(key) {
  console.log("Bin in loadNotes drinnen.")

  const notesField = document.getElementById('notes');
  const notesContent = localStorage.getItem(key);

  if (notesContent != null && notesContent !== "") {
    notesField.textContent = notesContent;
  } else {
    notesField.textContent = "Enter your notes here!";
  }
}


/**
 * Switches the full image in the <figure> element to the one specified in the parameter. Also updates the image's alt
 * attribute and the figure's caption.
 * @param {string} imageUrl The URL to the new image (the image's src attribute value).
 * @param {string} imageDescription The image's description (used for the alt attribute and the figure's caption).
 */




/**
 * Prepare the links on the full images so that they execute the following tasks:
 * - Switch the full image to the one that has been clicked on.
 * - Set the highlight under the current thumbnail.
 * - Load the notes for the current image.
 */
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
