// Simulate the washing machine data
let machineStatus = "Available";
let currentUser = null;
let completionTime = null;

// Function to update the machine status
function updateMachineStatus() {
    const statusText = document.getElementById('machine-status-text');
    const currentUserText = document.getElementById('current-user');
    const timeEstimateText = document.getElementById('time-estimate');

    statusText.textContent = machineStatus;
    if (currentUser) {
        currentUserText.textContent = `Currently used by: ${currentUser.name} (Room ${currentUser.room})`;
        timeEstimateText.textContent = `Estimated completion time: ${completionTime} minutes`;
    } else {
        currentUserText.textContent = '';
        timeEstimateText.textContent = '';
    }
}

// Handle the schedule form submission
document.getElementById('schedule-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const room = document.getElementById('room').value;
    const time = document.getElementById('time').value;

    if (machineStatus === "Available") {
        machineStatus = "In Use";
        currentUser = { name, room };
        completionTime = time;

        alert(`Washing machine scheduled for ${name} (Room ${room}) for ${time} minutes.`);

        // Update the machine status
        updateMachineStatus();
    } else {
        alert('The washing machine is currently in use. Please wait until it is available.');
    }
});

// Handle the issue reporting form
document.getElementById('issue-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const issue = document.getElementById('issue').value;

    alert(`Issue reported: ${issue}. We'll look into it!`);

    // Clear the form after submission
    document.getElementById('issue-form').reset();
});

// Initial update of machine status
updateMachineStatus();
