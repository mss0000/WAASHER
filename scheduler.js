let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
const resident = JSON.parse(localStorage.getItem('resident'));

document.addEventListener('DOMContentLoaded', function() {
    if (!resident) {
        window.location.href = 'login.html'; // If no user is logged in, redirect to login
    }

    updateCurrentBookings();
    updateUserBooking();
});

// Handle scheduling
document.getElementById('schedule-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const time = document.getElementById('time').value;
    const duration = document.getElementById('duration').value;

    const newBooking = {
        time,
        duration,
        username: resident.username,
        room: resident.room
    };

    bookings.push(newBooking);
    localStorage.setItem('bookings', JSON.stringify(bookings));

    alert('Slot booked successfully!');
    updateCurrentBookings();
    updateUserBooking();
});

// Update the list of current bookings
function updateCurrentBookings() {
    const bookingsList = document.getElementById('bookings-list');
    bookingsList.innerHTML = '';

    bookings.forEach((booking, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${booking.username} (Room ${booking.room}) - ${booking.time} for ${booking.duration} minutes`;
        bookingsList.appendChild(listItem);
    });
}

// Update user's booking
function updateUserBooking() {
    const userBookingList = document.getElementById('user-booking');
    userBookingList.innerHTML = '';

    const userBooking = bookings.find(booking => booking.username === resident.username && booking.room === resident.room);
    if (userBooking) {
        const listItem = document.createElement('li');
        listItem.textContent = `Your booking: ${userBooking.time} for ${userBooking.duration} minutes`;
        userBookingList.appendChild(listItem);
    }
}

// Handle deleting booking
document.getElementById('delete-booking').addEventListener('click', function() {
    bookings = bookings.filter(booking => booking.username !== resident.username || booking.room !== resident.room);
    localStorage.setItem('bookings', JSON.stringify(bookings));

    alert('Your booking has been deleted.');
    updateCurrentBookings();
    updateUserBooking();
});

// Handle issue reporting
document.getElementById('issue-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const issue = document.getElementById('issue').value;
    alert(`Issue reported: ${issue}. We will investigate.`);
    document.getElementById('issue-form').reset();
});
