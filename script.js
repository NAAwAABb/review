document.addEventListener('DOMContentLoaded', () => {
    const stars = document.querySelectorAll('.star');
    const nameInput = document.getElementById('name');
    const reviewText = document.getElementById('review-text');
    const submitButton = document.getElementById('submit-review');
    const reviewsContainer = document.getElementById('reviews-container');
    
    let currentRating = 0;

    // Handle star rating
    stars.forEach(star => {
        star.addEventListener('mouseover', function() {
            const rating = this.getAttribute('data-rating');
            highlightStars(rating);
        });

        star.addEventListener('mouseout', function() {
            highlightStars(currentRating);
        });

        star.addEventListener('click', function() {
            currentRating = this.getAttribute('data-rating');
            highlightStars(currentRating);
        });
    });

    function highlightStars(rating) {
        stars.forEach(star => {
            const starRating = star.getAttribute('data-rating');
            if (starRating <= rating) {
                star.querySelector('i').style.color = '#ffd700';
            } else {
                star.querySelector('i').style.color = '#ddd';
            }
        });
    }

    // Handle review submission
    submitButton.addEventListener('click', () => {
        if (validateForm()) {
            addReview();
            resetForm();
        }
    });

    function validateForm() {
        if (currentRating === 0) {
            alert('Please select a rating');
            return false;
        }
        if (!nameInput.value.trim()) {
            alert('Please enter your name');
            return false;
        }
        if (!reviewText.value.trim()) {
            alert('Please enter your review');
            return false;
        }
        return true;
    }

    function addReview() {
        const reviewCard = document.createElement('div');
        reviewCard.className = 'review-card';

        const currentDate = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });

        reviewCard.innerHTML = `
            <div class="review-header">
                <span class="review-author">${nameInput.value}</span>
                <span class="review-date">${currentDate}</span>
            </div>
            <div class="review-stars">
                ${getStarHTML(currentRating)}
            </div>
            <p class="review-content">${reviewText.value}</p>
        `;

        // Add new review at the top
        reviewsContainer.insertBefore(reviewCard, reviewsContainer.firstChild);
    }

    function getStarHTML(rating) {
        return '★'.repeat(rating) + '☆'.repeat(5 - rating);
    }

    function resetForm() {
        currentRating = 0;
        highlightStars(0);
        nameInput.value = '';
        reviewText.value = '';
    }
});
