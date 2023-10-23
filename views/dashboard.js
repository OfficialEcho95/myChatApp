document.addEventListener('DOMContentLoaded', function () {
    // This function runs when the DOM is fully loaded

    fetch('/user-info')
        .then(response => response.json())
        .then(data => {
            // Update the User Information section with data from the server
            const userInfoSection = document.querySelector('#user-info-section');
            userInfoSection.innerHTML = `<p>User ID: ${data.user._id}</p>`;
        })
        .catch(error => {
            console.error('Error fetching user information:', error);
        });
});
