// Simulating API data for washing machines
let machinesData = [
    { id: 1, status: 'available', user: null, room: null },
    { id: 2, status: 'in use', user: 'John Doe', room: '202' },
    { id: 3, status: 'available', user: null, room: null }
];

// Simulate updating machine data (In real use, this would be from an API)
function updateMachineStatus() {
    const machinesDiv = document.getElementById('machines');
    machinesDiv.innerHTML = '';
    machinesData.forEach(machine => {
        machinesDiv.innerHTML += `
            <div class="machine">
                <h3>Washing Machine ${machine.id}</h3>
                <p>Status: ${machine.status}</p>
                ${machine.status === 'in use' ? `<p>By: ${machine.user} (Room ${machine.room})</p>` : ''}
            </div>
        `;
    });
}

// Poll every 5 seconds for status updates
setInterval(updateMachineStatus, 5000);

// Handle scheduling a machine
document.getElementById('schedule-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const room = document.getElementById('room').value;
    const time = document.getElementById('time').value;

    // Schedule the first available machine (for demonstration)
    const availableMachine = machinesData.find(machine => machine.status === 'available');
    if (availableMachine) {
        availableMachine.status = 'in use';
        availableMachine.user = name;
        availableMachine.room = room;
        alert(`Washing machine ${availableMachine.id} scheduled at ${time}`);
    } else {
        alert('No available machines. Please try again later.');
    }
    updateMachineStatus();
});

// Handle issue reporting
document.getElementById('report-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('report-name').value;
    const room = document.getElementById('report-room').value;
    const issue = document.getElementById('issue').value;

    // Simulating report submission (In real use, you would send this to a backend)
    alert(`Issue reported by ${name} (Room ${room}): ${issue}`);
    document.getElementById('report-form').reset();
});
