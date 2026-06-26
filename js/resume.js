document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const browseBtn = document.getElementById('browse-btn');
    
    const uploadState = document.getElementById('upload-state');
    const scanningState = document.getElementById('scanning-state');
    const resultsState = document.getElementById('results-state');
    const reuploadBtn = document.getElementById('reupload-btn');
    
    const scanText = document.getElementById('scan-text');
    const scanProgress = document.getElementById('scan-progress');

    // Handle Drag & Drop
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('drag-active');
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('drag-active');
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('drag-active');
        if (e.dataTransfer.files.length) {
            handleFileUpload(e.dataTransfer.files[0]);
        }
    });

    // Handle Click to Browse
    browseBtn.addEventListener('click', () => fileInput.click());
    
    fileInput.addEventListener('change', function() {
        if (this.files.length) {
            handleFileUpload(this.files[0]);
        }
    });

    // The Upload & AI Simulation Logic
    function handleFileUpload(file) {
        // 1. Hide Upload, Show Scanner
        uploadState.classList.add('hidden');
        scanningState.classList.remove('hidden');

        // 2. Simulate the AI Pipeline Steps
        const steps = [
            { text: "Extracting semantic text blocks...", progress: 20, time: 800 },
            { text: "Tokenizing and filtering stop words...", progress: 45, time: 1600 },
            { text: "Cross-referencing against industry vectors...", progress: 75, time: 2400 },
            { text: "Calculating overall ATS probability...", progress: 100, time: 3200 }
        ];

        steps.forEach(step => {
            setTimeout(() => {
                scanText.innerText = step.text;
                scanProgress.style.width = step.progress + '%';
            }, step.time);
        });

        // 3. Show Results
        setTimeout(() => {
            scanningState.classList.add('hidden');
            resultsState.classList.remove('hidden');
            
            // Trigger Circular Progress Animation
            animateATSScore();
            
            // Re-initialize icons
            lucide.createIcons();
        }, 4000);
    }

    // Circular Progress Animation (Modified for ATS Score)
    function animateATSScore() {
        const atsProgress = document.querySelector('.ats-circular-progress');
        const atsValue = document.querySelector('.ats-progress-value');
        
        if (atsProgress) {
            const targetValue = parseInt(atsProgress.getAttribute('data-progress'));
            let currentValue = 0;
            const duration = 1500; 
            const interval = duration / targetValue;

            const timer = setInterval(() => {
                currentValue++;
                atsValue.textContent = currentValue;
                
                let color = 'var(--clr-primary)'; // Default Blue
                if(currentValue > 80) color = '#10B981'; // Green for high scores
                
                atsProgress.style.background = `conic-gradient(
                    ${color} ${currentValue * 3.6}deg, 
                    var(--clr-border) 0deg
                )`;

                if (currentValue === targetValue) {
                    clearInterval(timer);
                    // Add text gradient based on score
                    atsValue.style.background = `linear-gradient(135deg, ${color}, #059669)`;
                    atsValue.style.webkitBackgroundClip = 'text';
                }
            }, interval);
        }
    }

    // Reset Flow
    reuploadBtn.addEventListener('click', () => {
        resultsState.classList.add('hidden');
        uploadState.classList.remove('hidden');
        fileInput.value = ''; // Clear input
        
        // Reset scanner UI
        scanProgress.style.width = '0%';
        scanText.innerText = "Extracting semantic text blocks.";
    });
});