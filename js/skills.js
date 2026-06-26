document.addEventListener('DOMContentLoaded', () => {
    
    // Animate Circular Progress Chart
    const circularProgress = document.querySelector('.circular-progress');
    const progressValue = document.querySelector('.progress-value');
    
    if (circularProgress) {
        // Get target value from data attribute
        const targetValue = parseInt(circularProgress.getAttribute('data-progress'));
        let currentValue = 0;
        
        // Duration of animation in ms
        const duration = 1500; 
        const interval = duration / targetValue;

        const timer = setInterval(() => {
            currentValue++;
            
            // Update Text
            progressValue.textContent = `${currentValue}%`;
            
            // Update CSS conic-gradient
            // 3.6 degrees = 1% (360 / 100)
            circularProgress.style.background = `conic-gradient(
                var(--clr-primary) ${currentValue * 3.6}deg, 
                var(--clr-border) 0deg
            )`;

            if (currentValue === targetValue) {
                clearInterval(timer);
            }
        }, interval);
    }
});