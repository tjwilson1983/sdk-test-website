(function () {
    const sdkVersion = "1.0.1";  // Change the version number as needed
    console.log(`SDK version ${sdkVersion} loaded successfully`);

    // Function to send 404 data to the backend server
    function send404DataToServer(data) {
        fetch('https://burly-tundra-raclette.glitch.me/log-404', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            console.log('404 data sent successfully:', result);
        })
        .catch(error => {
            console.error('Error sending 404 data:', error);
        });
    }

    // Function to log and send 404 error data
    function log404Data(siteUrl, currentUrl, referrerUrl, userAgent, screenWidth, screenHeight, deviceType, timestamp) {
        const data = {
            site_url: siteUrl,
            current_url: currentUrl,
            referrer_url: referrerUrl,
            user_agent: userAgent,
            screen_width: screenWidth,
            screen_height: screenHeight,
            device_type: deviceType,
            timestamp: timestamp
        };

        console.log("Logging 404 data:", data);
        send404DataToServer(data);
    }

    document.addEventListener('DOMContentLoaded', () => {
        const siteUrl = window.location.origin;  // Base site URL
        const currentUrl = window.location.href; // Current URL (404 URL)
        
        // Retrieve the previous page from sessionStorage
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
        }

        // Store the current URL in sessionStorage for the next page visit
        sessionStorage.setItem('lastPage', currentUrl);
    });
})();


