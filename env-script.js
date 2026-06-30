document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize the Chart.js Graph
    const ctx = document.getElementById('climateChart').getContext('2d');
    
    const climateChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', 'Now'],
            datasets: [
                {
                    label: 'Temperature (°C)',
                    data: [24.5, 23.2, 25.1, 29.5, 30.2, 28.5, 28.5],
                    borderColor: '#f44336',
                    backgroundColor: 'rgba(244, 67, 54, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Humidity (%)',
                    data: [70, 72, 68, 60, 58, 63, 65],
                    borderColor: '#2196f3',
                    backgroundColor: 'transparent',
                    borderWidth: 2,
                    borderDash: [5, 5],
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: false }
            },
            plugins: {
                legend: { position: 'top' }
            }
        }
    });

    // 2. Logic for Actuator Switches
    const fanToggle = document.getElementById("fan-toggle");
    const heatToggle = document.getElementById("heat-toggle");
    const lightToggle = document.getElementById("light-toggle");

    // Example logic: Prevent fan and heater from running simultaneously
    fanToggle.addEventListener("change", (e) => {
        if (e.target.checked && heatToggle.checked) {
            alert("Warning: Cannot run exhaust fan and heater simultaneously. Disabling heater.");
            heatToggle.checked = false;
            // Here you would trigger an MQTT/HTTP request to the ESP32 to turn off Pin 13
        }
    });

    heatToggle.addEventListener("change", (e) => {
        if (e.target.checked && fanToggle.checked) {
            alert("Warning: Cannot run heater while exhaust fan is active. Disabling fan.");
            fanToggle.checked = false;
            // Trigger ESP32 Pin 12 OFF
        }
    });
});