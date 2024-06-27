// scripts.js

document.addEventListener('DOMContentLoaded', () => {
    const assistanceForm = document.getElementById('assistanceForm');
    const assistanceList = document.getElementById('assistanceList');

    // Function to fetch and display assistance requests
    const fetchAssistanceRequests = async () => {
        try {
            const response = await fetch('/api/requests');
            if (!response.ok) {
                throw new Error('Failed to fetch assistance requests');
            }
            const requests = await response.json();
            assistanceList.innerHTML = '';
            requests.forEach(request => {
                const li = document.createElement('li');
                li.textContent = `${request.name} - ${request.vehicleDetails} (${request.status})`;
                assistanceList.appendChild(li);
            });
        } catch (error) {
            console.error('Error fetching assistance requests:', error.message);
        }
    };

    // Fetch initial list of assistance requests
    fetchAssistanceRequests();

    // Submit assistance request form handler
    assistanceForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(assistanceForm);
        const requestBody = {};
        formData.forEach((value, key) => {
            requestBody[key] = value;
        });

        try {
            const response = await fetch('/api/request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                throw new Error('Failed to submit assistance request');
            }

            // Clear form fields after successful submission
            assistanceForm.reset();

            // Fetch updated list of assistance requests
            fetchAssistanceRequests();
        } catch (error) {
            console.error('Error submitting assistance request:', error.message);
        }
    });
});
