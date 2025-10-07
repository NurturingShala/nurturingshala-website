let slideIndex = 0;
showSlides();

function showSlides() {
    let i;
    let slides = document.getElementsByClassName("workshop-slide");
    if (slides.length === 0) return;
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 4000); // Change image every 4 seconds
}

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
