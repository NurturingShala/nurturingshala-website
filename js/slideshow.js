let slideIndex = 0;
const slides = document.querySelector('.slideshow-wrapper');
const totalSlides = document.querySelectorAll('.workshop-slide').length;

function showSlides() {
    slideIndex++;
    if (slideIndex >= totalSlides) {
        slideIndex = 0;
    }
    updateSlidePosition();
}

function updateSlidePosition() {
    const offset = -slideIndex * 100;
    slides.style.transform = `translateX(${offset}%)`;
}

setInterval(showSlides, 4000); // Change image every 4 seconds

document.addEventListener('DOMContentLoaded', (event) => {
    // Get the modal
    var modal = document.getElementById("imageModal");

    // Get the image and insert it inside the modal
    var modalImg = document.getElementById("modalImage");
    var images = document.querySelectorAll('.workshop-slide img');
    images.forEach(img => {
        img.onclick = function () {
            modal.style.display = "block";
            modalImg.src = this.src;
        }
    });

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close-modal")[0];

    // When the user clicks on <span> (x), close the modal
    if(span) {
        span.onclick = function () {
            modal.style.display = "none";
        }
    }
});
