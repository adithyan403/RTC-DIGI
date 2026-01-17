document.addEventListener('DOMContentLoaded', () => {
    console.log('KSRTC Dashboard Initialized');

    // Update live time
    function updateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { hour12: false });
        const timeElement = document.getElementById('current-time');
        if (timeElement) {
            timeElement.textContent = timeString;
        }
    }

    setInterval(updateTime, 1000);
    updateTime();

    // Initialize EPKM Chart
    const ctx = document.getElementById('epkmChart');
    if (ctx) {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
                datasets: [{
                    label: 'EPKM Trend',
                    data: [42, 44, 30, 41, 43], // Matches the visual dip in Wed
                    borderColor: '#0d6efd',
                    backgroundColor: 'rgba(13, 110, 253, 0.05)',
                    borderWidth: 3,
                    pointBackgroundColor: '#ffffff',
                    pointBorderColor: '#0d6efd',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: '#e9ecef',
                            borderDash: [5, 5]
                        },
                        ticks: {
                            callback: function (value) {
                                return '₹' + value;
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    // Default Date Inputs to Today
    const today = new Date().toISOString().split('T')[0];
    const searchDateInput = document.getElementById('searchDate');
    if (searchDateInput) searchDateInput.value = today;

    // Update Master Log Date Label
    const masterLogDate = document.getElementById('masterLogDate');
    if (masterLogDate) {
        const dateOptions = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
        masterLogDate.textContent = new Date().toLocaleDateString('en-US', dateOptions);
    }

    // Search Form Logic
    const searchForm = document.getElementById('searchForm');
    const searchResults = document.getElementById('searchResults');

    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Simulate loading or filtering
            const btn = searchForm.querySelector('button');
            const originalText = btn.innerHTML;

            btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Searching...';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;
                if (searchResults) {
                    searchResults.classList.remove('d-none');
                }
            }, 800);
        });
    }
});
