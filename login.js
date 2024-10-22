// Check if user is already logged in
if (localStorage.getItem('resident')) {
    window.location.href = 'scheduler.html'; // Redirect to scheduler page if logged in
}

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const room = document.getElementById('room').value;

    // Simple validation
    if (username && room) {
        // Save the user in localStorage
        const resident = { username, room };
        localStorage.setItem('resident', JSON.stringify(resident));

        // Redirect to scheduler page
        window.location.href = 'scheduler.html';
    } else {
        alert('Please fill in both fields.');
    }
});
