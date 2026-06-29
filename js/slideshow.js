// Independent auto-rotating slideshows — supports multiple on one page
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.slideshow-container').forEach(container => {
        const wrapper = container.querySelector('.slideshow-wrapper');
        const slides = container.querySelectorAll('.workshop-slide');
        if (!wrapper || slides.length <= 1) return;
        let index = 0;
        setInterval(() => {
            index = (index + 1) % slides.length;
            wrapper.style.transform = `translateX(${-index * 100}%)`;
        }, 4000); // change image every 4 seconds
    });

    // Lightbox — click any workshop photo to view it larger
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    if (modal && modalImg) {
        document.querySelectorAll('.workshop-slide img').forEach(img => {
            img.addEventListener('click', function () {
                modal.style.display = 'block';
                modalImg.src = this.src;
            });
        });
        const span = document.getElementsByClassName('close-modal')[0];
        if (span) span.onclick = () => { modal.style.display = 'none'; };
        modal.addEventListener('click', e => { if (e.target === modal) modal.style.display = 'none'; });
    }
});
