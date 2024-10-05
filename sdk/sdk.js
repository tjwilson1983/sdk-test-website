(function () {
    function log404Data(siteUrl, currentUrl, referrerUrl) {
        console.log("Base Website URL:", siteUrl);
        console.log("URL that caused 404 error:", currentUrl);
        console.log("Previous page URL (referrer):", referrerUrl);
    }

    document.addEventListener('DOMContentLoaded', () => {
        const siteUrl = window.location.origin;  // Base site URL
        const currentUrl = window.location.href; // Current URL (404 URL)
        const referrerUrl = document.referrer || 'No referrer'; // Previous page or 'No referrer'

        // Log the 404 data to the console
        log404Data(siteUrl, currentUrl, referrerUrl);
    });
})();
