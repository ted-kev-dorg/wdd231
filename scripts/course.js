// Course Directory & Processing Logic
const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to programming through basic concepts, variables, conditions, loops, and functions.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: ['HTML', 'CSS'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 3,
        certificate: 'Web and Computer Programming',
        description: 'Students write code using functions, parameters, and return values to design structured, reusable software solutions.',
        technology: ['Python'],
        completed: false
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 3,
        certificate: 'Web and Computer Programming',
        description: 'Introduces object-oriented programming concepts including classes, objects, encapsulation, inheritance, and polymorphism.',
        technology: ['C#'],
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 3,
        certificate: 'Web and Computer Programming',
        description: 'Focuses on creating dynamic web applications using JavaScript DOM manipulation, events, local storage, and responsive web design.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Web Frontend Development I',
        credits: 3,
        certificate: 'Web and Computer Programming',
        description: 'Advanced frontend web design with API data fetching, web components, asynchronous JavaScript, and site optimization.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const courseContainer = document.getElementById('course-container');
    const totalCreditsSpan = document.getElementById('total-credits');
    const courseDetails = document.getElementById('course-details');
    
    // Filter Elements
    const btnAll = document.getElementById('btn-all');
    const btnCse = document.getElementById('btn-cse');
    const btnWdd = document.getElementById('btn-wdd');

    // ----------------------------------------------------
    // Function to render and open modal dialog
    // ----------------------------------------------------
    function displayCourseDetails(course) {
        courseDetails.innerHTML = `
            <div class="modal-header">
                <h2>${course.subject} ${course.number}</h2>
                <button id="closeModal" aria-label="Close dialog">❌</button>
            </div>
            <div class="modal-body">
                <h3>${course.title}</h3>
                <p><strong>${course.credits} credits</strong></p>
                <p><strong>Certificate:</strong> ${course.certificate}</p>
                <p>${course.description}</p>
                <p><strong>Technology:</strong> ${course.technology.join(', ')}</p>
            </div>
        `;

        // Display modal box
        courseDetails.showModal();

        // Close when clicking the X button
        const closeModal = document.getElementById('closeModal');
        closeModal.addEventListener('click', () => {
            courseDetails.close();
        });

        // Close when clicking outside the dialog window
        courseDetails.addEventListener('click', (event) => {
            const rect = courseDetails.getBoundingClientRect();
            if (
                event.clientX < rect.left ||
                event.clientX > rect.right ||
                event.clientY < rect.top ||
                event.clientY > rect.bottom
            ) {
                courseDetails.close();
            }
        });
    }

    // ----------------------------------------------------
    // Function to render course cards
    // ----------------------------------------------------
    function displayCourses(filteredCourses) {
        courseContainer.innerHTML = '';

        filteredCourses.forEach(course => {
            const courseCard = document.createElement('div');
            courseCard.className = `course-item ${course.completed ? 'completed' : 'incomplete'}`;
            courseCard.innerHTML = `<span>${course.subject} ${course.number}</span>`;
            
            // Attach Click Listener to open dynamic modal
            courseCard.addEventListener('click', () => {
                displayCourseDetails(course);
            });

            courseContainer.appendChild(courseCard);
        });

        // Compute total credits dynamically
        const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
        totalCreditsSpan.textContent = totalCredits;
    }

    function setActiveButton(activeButton) {
        [btnAll, btnCse, btnWdd].forEach(btn => btn.classList.remove('active'));
        activeButton.classList.add('active');
    }

    // Interactive Filters
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

    // Initial render
    displayCourses(courses);
});