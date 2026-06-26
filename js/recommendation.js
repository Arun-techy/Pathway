document.addEventListener('DOMContentLoaded', () => {
    const nextBtns = document.querySelectorAll('.next-btn');
    const prevBtns = document.querySelectorAll('.prev-btn');
    const steps = document.querySelectorAll('.form-step');
    const progressIndicators = document.querySelectorAll('.wizard-progress .step');
    const form = document.getElementById('ai-form');
    
    const wizardContainer = document.getElementById('assessment-wizard');
    const loadingState = document.getElementById('loading-state');
    const resultsState = document.getElementById('results-state');
    const retakeBtn = document.getElementById('retake-btn');
    const loadingText = document.querySelector('.loading-text');

    let currentStep = 0;

    // Handle Wizard Navigation
    function updateStep(newStep) {
        // Hide all steps
        steps.forEach(step => step.classList.remove('active'));
        progressIndicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Show current step
        steps[newStep].classList.add('active');
        
        // Update progress bar
        for(let i = 0; i <= newStep; i++) {
            progressIndicators[i].classList.add('active');
        }
        
        currentStep = newStep;
    }

    nextBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Basic validation check before proceeding
            const inputs = steps[currentStep].querySelectorAll('input[required], select[required]');
            let isValid = true;
            inputs.forEach(input => {
                if (!input.value) {
                    isValid = false;
                    input.style.borderColor = 'red';
                } else {
                    input.style.borderColor = 'var(--clr-border)';
                }
            });

            if (isValid && currentStep < steps.length - 1) {
                updateStep(currentStep + 1);
            }
        });
    });

    prevBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (currentStep > 0) {
                updateStep(currentStep - 1);
            }
        });
    });

    // Handle Form Submission & Loading Simulation
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // 1. Hide Form, Show Loader
        wizardContainer.classList.add('hidden');
        loadingState.classList.remove('hidden');

        // 2. Simulate AI Processing steps
        const loadingPhrases = [
            "Parsing semantic skills...",
            "Querying market demands...",
            "Calculating compatibility scores...",
            "Generating optimal pathways..."
        ];
        
        let phraseIndex = 0;
        const phraseInterval = setInterval(() => {
            if (phraseIndex < loadingPhrases.length) {
                loadingText.innerText = loadingPhrases[phraseIndex];
                phraseIndex++;
            }
        }, 800);

        // 3. Show Results after delay
        setTimeout(() => {
            clearInterval(phraseInterval);
            loadingState.classList.add('hidden');
            resultsState.classList.remove('hidden');
            
            // Trigger scroll reveal animations for cards
            const resultCards = document.querySelectorAll('.result-card');
            resultCards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'all 0.5s ease ' + (index * 0.1) + 's';
                
                // Force reflow
                void card.offsetWidth;
                
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            });

            // Re-initialize icons for newly revealed elements
            lucide.createIcons();

        }, 3500); // 3.5 seconds of "processing"
    });

    // Handle Retake
    retakeBtn.addEventListener('click', () => {
        resultsState.classList.add('hidden');
        wizardContainer.classList.remove('hidden');
        updateStep(0);
        form.reset();
    });
});