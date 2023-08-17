async function fetchSearchResults() {
    event.preventDefault(); // Prevent form submission

    const searchInput = document.getElementById("shoptop-product-search-field-0");
    const searchQuery = searchInput.value.replace(/ /g, '+');
    const apiUrl = `https://flipkart-api.pjain287074.workers.dev/search/${searchQuery}`;

    try {
        const response = await fetch(apiUrl);
        const html = await response.text(); // Get the response as HTML text

        // Create a temporary div to hold the fetched HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;

        // Extract the content you want to update
        const updatedContent = tempDiv.querySelector('.products.columns-4').innerHTML;

        // Update the content inside the <ul> element
        const ulElement = document.querySelector('.products.columns-4');
        ulElement.innerHTML = updatedContent;
    } catch (error) {
        console.error("Error fetching search results:", error);
    }
}


let page = 4;
const resultsPerPage = 10; // Adjust this as needed
let loading = false;

async function fetchMoreResults(searchQuery = null) {
    if (loading) return;

    loading = true;
    document.getElementById('loading-indicator').style.display = 'block';

    let apiUrl;
    if (searchQuery) {
        apiUrl = `https://flipkart-api.pjain287074.workers.dev/search/${searchQuery}`;
    } else {
        const currentCategory = // Get the current navigation category
        apiUrl = `https://flipkart-api.pjain287074.workers.dev//search/tv`;
    }

    try {
        const response = await fetch(apiUrl);
        const html = await response.text();

        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;

        const newResults = tempDiv.querySelector('.products.columns-4').innerHTML;
        const ulElement = document.querySelector('.products.columns-4');
        ulElement.innerHTML += newResults;

        page++;
        loading = false;
        document.getElementById('loading-indicator').style.display = 'none';
    } catch (error) {
        console.error("Error fetching more results:", error);
        loading = false;
        document.getElementById('loading-indicator').style.display = 'none';
    }
}

// Assuming you have a search form with id "search-form"
document.getElementById('search-box').addEventListener('submit', function(event) {
    event.preventDefault();
    const searchInput = document.getElementById("shoptop-product-search-field-0");
    const searchQuery = searchInput.value.replace(/ /g, '+');
    fetchMoreResults(searchQuery);
});

// Assuming you have navigation links with class "nav-link"
document.querySelectorAll('.menu-item').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        const category = this.querySelector('a').getAttribute('href'); // Get the category from the href attribute
        fetchMoreResults(null, category);
    });
});
In 