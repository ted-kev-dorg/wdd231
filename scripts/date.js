// Footer Dynamic Metadata Processing
document.addEventListener('DOMContentLoaded', () => {
    // Inject Year
    const currentYearSpan = document.getElementById('currentyear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Inject Last Modified Date State
    const lastModifiedPara = document.getElementById('lastModified');
    if (lastModifiedPara) {
        lastModifiedPara.textContent = `Last Modification: ${document.lastModified}`;
    }
});