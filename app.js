// Simulating residents and washing machine slots data
let residents = [];
let slots = [
    { time: '9:00 AM - 10:00 AM', available: true, bookedBy: null },
    { time: '10:00 AM - 11:00 AM', available: true, bookedBy: null },
    { time: '11:00 AM - 12:00 PM', available: true, bookedBy: null },
    { time: '12:00 PM - 1:00 PM', available: true, bookedBy: null },
];

let currentUser = null;

// Register or login the resident
document.getElementById('registration-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const room = document.getElementById('room').value;

    // Validate inputs
    if (!username || !room) {
        alert('Please enter both username and room number.');
        return;
    }

    currentUser = { username, room };
    if (!residents.some(resident => resident.username === username)) {
        residents.push(currentUser);
    }

    alert(`Welcome ${username}! You can now book a slot.`);
    updateSlotOptions();
    updateUserSchedule();
});

// Populate available time slots
function updateSlotOptions() {
    const slotSelect = document.getElementById('slot');
    slotSelect.innerHTML = ''; // Clear options

    slots.forEach((slot, index) => {
        if (slot.available) {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = slot.time;
            slotSelect.appendChild(option);
        }
    });

    // If no slots are available
    if (slotSelect.options.length === 0) {
        const noSlotsOption = document.createElement('option');
        noSlotsOption.textContent = 'No slots available';
        slotSelect.appendChild(noSlotsOption);
    }
}

// Display the user's current schedule
function updateUserSchedule() {
    const userScheduleList = document.getElementById('user-schedule');
    userScheduleList.innerHTML = ''; // Clear the list

    const userSlot = slots.find(slot => slot.bookedBy && slot.bookedBy.username === currentUser.username);
    if (userSlot) {
        const listItem = document.createElement('li');
        listItem.textContent = `Your booking: ${userSlot.time}`;
        userScheduleList.appendChild(listItem);
    }
}

// Book a time slot
document.getElementById('schedule-form').addEventListener('submit', function(event) {
    event.preventDefault();

    if (!currentUser) {
        alert('Please log in first.');
        return;
    }

    const slotIndex = document.getElementById('slot').value;

    // Check if slotIndex is valid
    if (isNaN(slotIndex) || !slots[slotIndex] || !slots[slotIndex].available) {
        alert('Please choose a valid and available time slot.');
        return;
    }

    const selectedSlot = slots[slotIndex];
    selectedSlot.available = false;
    selectedSlot.bookedBy = currentUser;

    alert(`You have successfully booked the slot: ${selectedSlot.time}`);
    updateSlotOptions();
    updateUserSchedule();
});

// Delete the user's schedule
document.getElementById('delete-schedule').addEventListener('click', function() {
    if (!currentUser) {
        alert('Please log in first.');
        return;
    }

    const userSlot = slots.find(slot => slot.bookedBy && slot.bookedBy.username === currentUser.username);
    if (userSlot) {
        userSlot.available = true;
        userSlot.bookedBy = null;
        alert('Your schedule has been deleted.');
        updateSlotOptions();
        updateUserSchedule();
    } else {
        alert('You have no scheduled slots to delete.');
    }
});

// Request a user to free their slot
document.getElementById('request-free-slot').addEventListener('click', function() {
    const busySlot = slots.find(slot => !slot.available);
    if (busySlot) {
        alert(`A request has been sent to ${busySlot.bookedBy.username} to free the slot: ${busySlot.time}`);
    } else {
        alert('All slots are available.');
    }
});

// Handle issue reporting
document.getElementById('issue-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const issue = document.getElementById('issue').value;
    if (!issue) {
        alert('Please describe the issue.');
        return;
    }

    alert(`Issue reported: ${issue}. We'll look into it!`);
    document.getElementById('issue-form').reset();
});

// Initial load of available slots
updateSlotOptions();
