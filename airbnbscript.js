async function loadListings() {
    const response = await fetch('airbnb_sf_listings_500.json');
    const data = await response.json();
    const first_50 = data.slice(0, 50);
    displayListings(first_50);
}

function displayListings(listings) {
    const container = document.getElementById('listings-container');
    
    listings.forEach((listing, index) => {
        const card = document.createElement('div');
        card.className = 'listing-card';
        let amenitiesList = 'Not available';
        try {
            const amenities = JSON.parse(listing.amenities.replace(/'/g, '"'));
            amenitiesList = amenities.slice(0, 5).join(', ');
        } catch (e) {
        }
        
        const price = listing.price.replace('$', '').replace('.00', '');
        
        card.innerHTML = `
            <img src="${listing.picture_url}" alt="${listing.name}">
            <h2>${listing.name}</h2>
            <p class="description">${listing.description ? listing.description.substring(0, 150) + '...' : 'No description available'}</p>
            <p class="price"><strong>Price:</strong> $${price} per night</p>
            <div class="host">
                <img src="${listing.host_picture_url}" alt="${listing.host_name}">
                <span><strong>Host:</strong> ${listing.host_name}</span>
            </div>
            <p class="amenities"><strong>Amenities:</strong> ${amenitiesList}</p>
            <p class="rating"><strong>Rating:</strong> ⭐ ${listing.review_scores_rating || 'N/A'} (${listing.number_of_reviews} reviews)</p>
        `;
        
        container.appendChild(card);
    });
}

loadListings();