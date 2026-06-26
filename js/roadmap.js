document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('.task-toggle');
    const progressBarFill = document.querySelector('.progress-bar-fill');
    const progressText = document.querySelector('.progress-percentage');
    
    // Simulate updating the progress bar when a task is checked
    let currentProgress = 32;

    checkboxes.forEach(box => {
        box.addEventListener('change', (e) => {
            const taskItem = e.target.closest('.task-item');
            
            if (e.target.checked) {
                // Strike through text
                taskItem.classList.add('completed');
                currentProgress += 8; // Arbitrary increment
            } else {
                // Remove strike through
                taskItem.classList.remove('completed');
                currentProgress -= 8;
            }

            // Cap at 100
            currentProgress = Math.min(currentProgress, 100);
            
            // Update UI
            progressBarFill.style.width = `${currentProgress}%`;
            progressText.textContent = `${currentProgress}%`;
        });
    });
});