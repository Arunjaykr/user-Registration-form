document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const studentList = document.getElementById('studentList');
    let students = JSON.parse(localStorage.getItem('students')) || [];

    // Save students to localStorage
    const saveToLocalStorage = () => {
        localStorage.setItem('students', JSON.stringify(students));
    };

    // Render students in the table
    const renderStudents = () => {
        studentList.innerHTML = '';
        students.forEach((student, index) => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.id}</td>
                <td>${student.email}</td>
                <td>${student.contact}</td>
                <td>
                    <button class="edit-btn" onclick="editStudent(${index})">Edit</button>
                    <button class="delete-btn" onclick="deleteStudent(${index})">Delete</button>
                </td>
            `;

            studentList.appendChild(row);
        });
    };

    // Validate form input
    const validateForm = (name, id, email, contact) => {
        const namePattern = /^[A-Za-z\s]+$/;
        const idPattern = /^\d+$/;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const contactPattern = /^\d+$/;

        if (!namePattern.test(name)) {
            alert('Name should contain only letters and spaces.');
            return false;
        }
        if (!idPattern.test(id)) {
            alert('Student ID should contain only numbers.');
            return false;
        }
        if (!emailPattern.test(email)) {
            alert('Please enter a valid email address.');
            return false;
        }
        if (!contactPattern.test(contact)) {
            alert('Contact number should contain only numbers.');
            return false;
        }

        return true;
    };

    // Add new student
    const addStudent = (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const id = document.getElementById('studentId').value.trim();
        const email = document.getElementById('email').value.trim();
        const contact = document.getElementById('contact').value.trim();

        if (validateForm(name, id, email, contact)) {
            students.push({ name, id, email, contact });
            saveToLocalStorage();
            renderStudents();

            form.reset();
        }
    };

    form.addEventListener('submit', addStudent);

    // Edit student
    window.editStudent = (index) => {
        const student = students[index];

        document.getElementById('name').value = student.name;
        document.getElementById('studentId').value = student.id;
        document.getElementById('email').value = student.email;
        document.getElementById('contact').value = student.contact;

        form.onsubmit = (event) => {
            event.preventDefault();

            const name = document.getElementById('name').value.trim();
            const id = document.getElementById('studentId').value.trim();
            const email = document.getElementById('email').value.trim();
            const contact = document.getElementById('contact').value.trim();

            if (validateForm(name, id, email, contact)) {
                // Remove the old student data
                students.splice(index, 1);
                // Add the updated student data
                students.push({ name, id, email, contact });
                saveToLocalStorage();
                renderStudents();

                form.reset();
                form.onsubmit = addStudent;
            }
        };
    };

    // Delete student
    window.deleteStudent = (index) => {
        students.splice(index, 1);
        saveToLocalStorage();
        renderStudents();
    };

    // Initial render
    renderStudents();
});
