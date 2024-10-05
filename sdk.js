(function () {
    const sdkVersion = "1.1.0";
    console.log(`SDK version ${sdkVersion} loaded successfully`);

    // Function to send 404 data to the backend server
    function send404DataToServer(data) {
        fetch('https://burly-tundra-raclette.glitch.me/log-404', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((result) => {
                console.log('404 data sent successfully:', result);
            })
            .catch((error) => {
                console.error('Error sending 404 data:', error);
            });
    }

    // Function to get geo-location based on IP using a third-party API
    function getGeoLocation(callback) {
        fetch('https://ipapi.co/json/')
            .then((response) => response.json())
            .then((data) => {
                callback({
                    country: data.country_name,
                    region: data.region,
                    city: data.city,
                    ip: data.ip,
                });
            })
            .catch(() => {
                callback({
                    country: 'Unknown',
                    region: 'Unknown',
                    city: 'Unknown',
                    ip: 'Unknown',
                });
            });
    }

    // Function to log and send 404 error data
    function log404Data(siteUrl, currentUrl, referrerUrl, userAgent, screenWidth, screenHeight, deviceType, timestamp, geoLocation) {
        const data = {
            site_url: siteUrl,
            current_url: currentUrl,
            referrer_url: referrerUrl,
            user_agent: userAgent,
            screen_width: screenWidth,
            screen_height: screenHeight,
            device_type: deviceType,
            timestamp: timestamp,
            geo_location: geoLocation, // Add geo-location data
        };

        console.log('Logging 404 data:', data);
        send404DataToServer(data);
    }

    document.addEventListener('DOMContentLoaded', () => {
        const siteUrl = window.location.origin;
        const currentUrl = window.location.href;
        const storedReferrer = sessionStorage.getItem('lastPage') || 'No referrer';
        const userAgent = navigator.userAgent;
        const screenWidth = window.screen.width;
        const screenHeight = window.screen.height;
        const deviceType = /Mobi|Android/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop';
        const timestamp = new Date().toISOString();

        const is404Page = document.querySelector('meta[name="error-page"][content="404"]') !== null;

        if (is404Page) {
            // Fetch geo-location and log 404 data
            getGeoLocation((geoLocation) => {
                log404Data(siteUrl, currentUrl, storedReferrer, userAgent, screenWidth, screenHeight, deviceType, timestamp, geoLocation);
            });
        }

        sessionStorage.setItem('lastPage', currentUrl);
    });
})();



