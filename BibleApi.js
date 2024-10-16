// Debounce function
function debounce(func, delay) {
  let debounceTimer;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
}

const input = document.getElementById('txtVerse');
const txtreference = document.getElementById('reference');
const textpreview = document.getElementById('preview');
const BASE_POINT = 'https://bible-api.com/';

// Preloader logic
window.addEventListener('load', function() {
  setTimeout(function() {
    document.getElementById('preloader').style.display = 'none';
  }, 2000); // Hide preloader after 2 seconds
});

// Bible API Request
function getBibleRequest() {
  let verse = input.value.trim();

  if (!verse) {
    txtreference.innerHTML = '';
    textpreview.innerHTML = '';
    return; // Don't do anything if the input is empty
  }

  fetch(`${BASE_POINT}${verse}`)
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
      txtreference.innerHTML = data.reference;
      textpreview.innerHTML = data.text;
    })
    .catch(function(err) {
      console.error('Error fetching Bible verse:', err);
      alert('Error fetching the verse. Please try again.');
    });
}

// Attach the debounced version of the getBibleRequest to the input event
input.addEventListener('input', debounce(getBibleRequest, 300)); // 300ms delay

// Array of background images
const images = [
  'images/Bible.jpeg',
  'images/god.jpg',
  'images/pray.jpg',
  'images/god.jpg',
  'images/bi.jpg',
  'images/img.jpeg',
  'images/ne.jpeg',
  'images/nw.jpeg'
];

// Function to change background every 3 seconds
let currentImageIndex = 0;
setInterval(function() {
  document.body.style.backgroundImage = `url(${images[currentImageIndex]})`;
  currentImageIndex = (currentImageIndex + 1) % images.length; // Loop through the images
}, 3000); // 3000 milliseconds = 3 seconds
