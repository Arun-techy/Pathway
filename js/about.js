document.addEventListener('DOMContentLoaded', () => {
    // We rely on the global scroll-reveal from main.js
    // Adding slight delays to tech stack items for a cascading effect
    const stackItems = document.querySelectorAll('.stack-item');
    stackItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
    });

    const archNodes = document.querySelectorAll('.arch-node');
    archNodes.forEach((node, index) => {
        node.style.transitionDelay = `${index * 0.15}s`;
    });
});