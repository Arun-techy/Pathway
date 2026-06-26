document.addEventListener('DOMContentLoaded', () => {
    // Initialize Chart.js for Career Growth Projection
    const ctx = document.getElementById('growthChart').getContext('2d');
    
    // Create a gradient for the chart line fill
    const gradientFill = ctx.createLinearGradient(0, 0, 0, 300);
    gradientFill.addColorStop(0, 'rgba(31, 60, 136, 0.2)'); // Secondary color with opacity
    gradientFill.addColorStop(1, 'rgba(31, 60, 136, 0)');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Month 1', 'Month 3', 'Month 6', 'Month 9', 'Month 12'],
            datasets: [{
                label: 'Projected Value / Employability',
                data: [40, 55, 72, 85, 94],
                borderColor: '#1F3C88', // Secondary color
                backgroundColor: gradientFill,
                borderWidth: 2,
                pointBackgroundColor: '#FFFFFF',
                pointBorderColor: '#123458',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6,
                fill: true,
                tension: 0.4 // Smooth curves
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#123458',
                    padding: 12,
                    titleFont: { family: '-apple-system', size: 13 },
                    bodyFont: { family: '-apple-system', size: 12 },
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            return `Employability Score: ${context.parsed.y}%`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        color: '#E8EAED',
                        drawBorder: false,
                    },
                    ticks: { color: '#5F6368', font: { size: 11 } }
                },
                x: {
                    grid: { display: false, drawBorder: false },
                    ticks: { color: '#5F6368', font: { size: 11 } }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index',
            },
        }
    });
});