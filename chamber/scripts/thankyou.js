document.addEventListener('DOMContentLoaded', () => {
    const currentUrl = window.location.search;
    const params = new URLSearchParams(currentUrl);
    const resultsContainer = document.getElementById('results');

    if (!params.toString()) {
        resultsContainer.innerHTML = '<p>No application submission data found.</p>';
        return;
    }

    // Format ISO timestamp string into a readable date/time
    const rawTimestamp = params.get('timestamp');
    let formattedDate = 'N/A';
    if (rawTimestamp) {
        formattedDate = new Date(rawTimestamp).toLocaleString();
    }

    // Map membership option codes to friendly readable display names
    const membershipMap = {
        'np': 'NP Membership (Non-Profit)',
        'bronze': 'Bronze Membership',
        'silver': 'Silver Membership',
        'gold': 'Gold Membership'
    };
    const memberLevel = params.get('membership');

    resultsContainer.innerHTML = `
        <p><strong>First Name:</strong> ${params.get('fname') || 'N/A'}</p>
        <p><strong>Last Name:</strong> ${params.get('lname') || 'N/A'}</p>
        <p><strong>Email:</strong> ${params.get('email') || 'N/A'}</p>
        <p><strong>Mobile Phone:</strong> ${params.get('phone') || 'N/A'}</p>
        <p><strong>Business/Organization Name:</strong> ${params.get('organization') || 'N/A'}</p>
        <p><strong>Membership Level:</strong> ${membershipMap[memberLevel] || memberLevel || 'N/A'}</p>
        <p><strong>Application Date & Time:</strong> ${formattedDate}</p>
    `;
});