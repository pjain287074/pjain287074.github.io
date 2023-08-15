async function fetchSearchResults() {
    event.preventDefault(); // Prevent form submission

    const searchInput = document.getElementById("shoptop-product-search-field-0");
    const searchQuery = searchInput.value.replace(/ /g, '+');
    const apiUrl = `https://flipkart-api.pjain287074.workers.dev/search/${searchQuery}`;

    try {
        const response = await fetch(apiUrl);
        const html = await response.text(); // Get the response as HTML text
    
        // Display the HTML response
        const resultsContainer = document.getElementById("search-results");
        resultsContainer.innerHTML = html;
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    }