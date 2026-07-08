// Course Directory & Total Processing Logic
const courses = [
    { subject: 'CSE', number: 110, title: 'Introduction to Programming', credits: 2, completed: true },
    { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 2, completed: true },
    { subject: 'CSE', number: 111, title: 'Programming with Functions', credits: 3, completed: false },
    { subject: 'CSE', number: 210, title: 'Programming with Classes', credits: 3, completed: false },
    { subject: 'WDD', number: 131, title: 'Dynamic Web Fundamentals', credits: 3, completed: true },
    { subject: 'WDD', number: 231, title: 'Web Frontend Development I', credits: 3, completed: false }
];

document.addEventListener('DOMContentLoaded', () => {
    const courseContainer = document.getElementById('course-container');
    const totalCreditsSpan = document.getElementById('total-credits');
    
    // Filter Elements
    const btnAll = document.getElementById('btn-all');
    const btnCse = document.getElementById('btn-cse');
    const btnWdd = document.getElementById('btn-wdd');

    function displayCourses(filteredCourses) {
        // Clear previous view items
        courseContainer.innerHTML = '';

        filteredCourses.forEach(course => {
            const courseCard = document.createElement('div');
            courseCard.className = `course-item ${course.completed ? 'completed' : 'incomplete'}`;
            courseCard.innerHTML = `<span>${course.subject} ${course.number}</span>`;
            courseContainer.appendChild(courseCard);
        });

        // Use Array.prototype.reduce to compute dynamic content metrics
        const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
        totalCreditsSpan.textContent = totalCredits;
    }

    function setActiveButton(activeButton) {
        [btnAll, btnCse, btnWdd].forEach(btn => btn.classList.remove('active'));
        activeButton.classList.add('active');
    }

    // Interactive Button 
    btnAll.addEventListener('click', () => {
        displayCourses(courses);
        setActiveButton(btnAll);
    });

    btnCse.addEventListener('click', () => {
        const cseCourses = courses.filter(course => course.subject === 'CSE');
        displayCourses(cseCourses);
        setActiveButton(btnCse);
    });

    btnWdd.addEventListener('click', () => {
        const wddCourses = courses.filter(course => course.subject === 'WDD');
        displayCourses(wddCourses);
        setActiveButton(btnWdd);
    });

    // Initial load view render
    displayCourses(courses);
});