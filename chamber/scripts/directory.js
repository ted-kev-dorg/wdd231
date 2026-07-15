// Complete dynamic fetch and view switcher setup
const jsonSourceUrl = "data/members.json";

document.addEventListener('DOMContentLoaded', () => {
    // Adding Dynamic Footer Timestamps
    document.getElementById('current-year').textContent = new Date().getFullYear();
    document.getElementById('last-modified').textContent = `Last Modification: ${document.lastModified}`;

    const container = document.getElementById('directory-container');
    const gridBtn = document.getElementById('grid-view-btn');
    const listBtn = document.getElementById('list-view-btn');

    // Async Fetch  
    async function getMemberData() {
        try {
            const response = await fetch(jsonSourceUrl);
            if (!response.ok) {
                throw new Error(`HTTP network fault response: ${response.status}`);
            }
            const data = await response.json();
            renderMembers(data);
        } catch (error) {
            console.error("Critical error downloading directory dataset:", error);
            container.innerHTML = `<p style="color:red; padding:1rem;">Failed to safely compile local chamber records.</p>`;
        }
    }

    function renderMembers(membersList) {
        container.innerHTML = ""; // Clear loader state placeholders
        
        membersList.forEach(member => {
            const card = document.createElement('section');
            card.className = "member-card";
            
            // Generate customized visual indicators matching membership status
            let levelLabel = "Regular";
            if (member.level === 2) levelLabel = "Silver";
            if (member.level === 3) levelLabel = "Gold ";

            card.innerHTML = `
                <h4>${member.name}</h4>
                <p class="tagline">${member.tagline}</p>
                <!-- Hardcoded display sizes optimized using fallback strategies -->
                <img src="images/${member.image}" alt="${member.name} branding thumbnail" width="150" height="120" loading="lazy">
                <p><strong>Address:</strong> ${member.address}</p>
                <p><strong>Phone:</strong> ${member.phone}</p>
                <p><strong>Status:</strong> ${levelLabel}</p>
                <p><a href="${member.url}" target="_blank" rel="noopener">${member.url}</a></p>
            `;
            container.appendChild(card);
        });
    }

    // Toggle Event Management
    gridBtn.addEventListener('click', () => {
        container.className = "grid-layout";
        gridBtn.classList.add('active-toggle');
        listBtn.classList.remove('active-toggle');
    });

    listBtn.addEventListener('click', () => {
        container.className = "list-layout";
        listBtn.classList.add('active-toggle');
        gridBtn.classList.remove('active-toggle');
    });

    // Final execution
    getMemberData();
});