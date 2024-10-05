(function () {
    console.log('SDK loaded successfully');

    // Function to log 404 error data
    function log404Data(siteUrl, currentUrl, referrerUrl, userAgent, screenWidth, screenHeight, deviceType, timestamp) {
        console.log("Base Website URL:", siteUrl);
        console.log("URL that caused 404 error:", currentUrl);
        console.log("Previous page URL (referrer):", referrerUrl);
        console.log("User Agent (Browser Info):", userAgent);
        console.log("Screen Width:", screenWidth);
        console.log("Screen Height:", screenHeight);
        console.log("Device Type:", deviceType);
        console.log("Timestamp of Error:", timestamp);
    }

    document.addEventListener('DOMContentLoaded', () => {
        const siteUrl = window.location.origin;  // Base site URL
        const currentUrl = window.location.href; // Current URL (404 URL)
        
        // Use sessionStorage to get the previous page if available
        const storedReferrer = sessionStorage.getItem('lastPage') || 'No referrer';
        const userAgent = navigator.userAgent;   // Browser information
        const screenWidth = window.screen.width;  // Screen width
        const screenHeight = window.screen.height; // Screen height
        const deviceType = /Mobi|Android/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop'; // Detect if Mobile or Desktop
        const timestamp = new Date().toISOString();  // Current timestamp

        // Check for the custom meta tag indicating a 404 page
        const is404Page = document.querySelector('meta[name="error-page"][content="404"]') !== null;

        if (is404Page) {
            log404Data(siteUrl, currentUrl, storedReferrer, userAgent, screenWidth, screenHeight, deviceType, timestamp);
        } else {
            console.log("This is not a 404 page. No data logged.");
        }

        // Store the current URL in sessionStorage for the next page visit
        sessionStorage.setItem('lastPage', currentUrl);
    });
})();

