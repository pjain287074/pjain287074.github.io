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
const resultsPerPage = 40; // Adjust this as needed
let loading = false;

async function fetchMoreResults() {
    if (loading) return;

    loading = true;
    document.getElementById('loading-indicator').style.display = 'block';

    const searchInput = document.getElementById("shoptop-product-search-field-0");
    const searchQuery = searchInput.value.replace(/ /g, '+');
    const apiUrl = `https://flipkart-api.pjain287074.workers.dev/search/${searchQuery}`;

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

// Add a scroll event listener to trigger loading more results
window.addEventListener('scroll', () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
        fetchMoreResults();
    }
});

// Initial fetch
// fetchMoreResults();
