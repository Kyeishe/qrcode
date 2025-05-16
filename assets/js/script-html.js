// QR Attendance System JavaScript for HTML version

// Sample data for demonstration
const sampleData = {
    users: [
        { id: 1, username: 'admin', password: 'admin123', role: 'admin' },
        { id: 2, username: 'teacher1', password: 'admin123', role: 'teacher' }
    ],
    students: [
        { id: 1, student_id: '20-1001', password: 'admin123' },
        { id: 2, student_id: '20-1002', password: 'admin123' },
        { id: 3, student_id: '20-1003', password: 'admin123' }
    ],
    classes: [
        { id: 1, name: 'Mathematics 101', teacher_id: 2 },
        { id: 2, name: 'Science 101', teacher_id: 2 },
        { id: 3, name: 'History 101', teacher_id: 2 }
    ],
    class_students: [
        { id: 1, class_id: 1, student_id: 1 },
        { id: 2, class_id: 1, student_id: 2 },
        { id: 3, class_id: 2, student_id: 1 },
        { id: 4, class_id: 3, student_id: 3 }
    ],
    attendance_sessions: [
        { 
            id: 1, 
            class_id: 1, 
            session_date: '2023-06-15', 
            session_time: '09:00:00', 
            qr_code_data: 'MATH101-20230615-0900',
            created_at: '2023-06-14 15:00:00'
        },
        { 
            id: 2, 
            class_id: 2, 
            session_date: '2023-06-16', 
            session_time: '10:30:00', 
            qr_code_data: 'SCI101-20230616-1030',
            created_at: '2023-06-15 16:00:00'
        }
    ],
    attendance_records: [
        { id: 1, session_id: 1, student_id: 1, timestamp: '2023-06-15 09:05:00' },
        { id: 2, session_id: 1, student_id: 2, timestamp: '2023-06-15 09:10:00' }
    ]
};

// Initialize localStorage with sample data if not already set
function initializeData() {
    if (!localStorage.getItem('qr_attendance_data')) {
        localStorage.setItem('qr_attendance_data', JSON.stringify(sampleData));
    }
}

// Get data from localStorage
function getData() {
    return JSON.parse(localStorage.getItem('qr_attendance_data'));
}

// Save data to localStorage
function saveData(data) {
    localStorage.setItem('qr_attendance_data', JSON.stringify(data));
}

// User authentication
function authenticateUser(username, password, role = null) {
    const data = getData();
    
    if (role === 'student') {
        const student = data.students.find(s => s.student_id === username);
        if (student && student.password === password) {
            return {
                id: student.id,
                username: student.student_id,
                role: 'student'
            };
        }
    } else {
        const user = data.users.find(u => u.username === username);
        if (user && user.password === password) {
            return {
                id: user.id,
                username: user.username,
                role: user.role
            };
        }
    }
    
    return null;
}

// Set current user in session
function setCurrentUser(user) {
    sessionStorage.setItem('current_user', JSON.stringify(user));
}

// Get current user from session
function getCurrentUser() {
    return JSON.parse(sessionStorage.getItem('current_user'));
}

// Check if user is logged in
function isLoggedIn() {
    return sessionStorage.getItem('current_user') !== null;
}

// Logout user
function logoutUser() {
    sessionStorage.removeItem('current_user');
    window.location.href = '../index.html';
}

// Generate QR code
function generateQRCode(data, elementId) {
    if (document.getElementById(elementId)) {
        new QRCode(document.getElementById(elementId), {
            text: data,
            width: 200,
            height: 200,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
    }
}

// Initialize QR scanner
function initQRScanner() {
    if (document.getElementById('reader')) {
        // Using HTML5 QR Code Scanner library
        const html5QrCode = new Html5Qrcode("reader");
        const qrCodeSuccessCallback = (decodedText, decodedResult) => {
            // Handle the scanned code
            document.getElementById('qr-result').value = decodedText;
            document.getElementById('scan-form').submit();
            html5QrCode.stop();
        };
        const config = { fps: 10, qrbox: { width: 250, height: 250 } };

        // Start scanning
        html5QrCode.start({ facingMode: "environment" }, config, qrCodeSuccessCallback);
    }
}

// Initialize components when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize data
    initializeData();
    
    // Check login status and update UI accordingly
    updateNavigation();
    
    // Initialize QR scanner if on scanning page
    if (document.getElementById('reader')) {
        initQRScanner();
    }
    
    // Initialize QR code generation if on attendance session page
    if (document.getElementById('qrcode') && document.getElementById('qr-data')) {
        const qrData = document.getElementById('qr-data').value;
        generateQRCode(qrData, 'qrcode');
    }
    
    // Initialize form validation
    const forms = document.querySelectorAll('.needs-validation');
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });
    
    // Handle login form submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const role = document.querySelector('input[name="role"]:checked').value;
            
            const user = authenticateUser(username, password, role);
            
            if (user) {
                setCurrentUser(user);
                if (user.role === 'student') {
                    window.location.href = 'student_dashboard.html';
                } else {
                    window.location.href = 'dashboard.html';
                }
            } else {
                document.getElementById('login-error').textContent = 'Invalid username or password';
                document.getElementById('login-error').style.display = 'block';
            }
        });
    }
});

// Update navigation based on login status
function updateNavigation() {
    const user = getCurrentUser();
    const navbarNav = document.getElementById('navbarNav');
    
    if (navbarNav) {
        const navList = navbarNav.querySelector('ul');
        
        if (user) {
            // User is logged in
            navList.innerHTML = '';
            
            if (user.role === 'student') {
                // Student navigation
                navList.innerHTML += `
                    <li class="nav-item">
                        <a class="nav-link" href="student_dashboard.html">Dashboard</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="student_mark_attendance.html">Mark Attendance</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="student_qr_codes.html">QR Codes</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" onclick="logoutUser()">Logout</a>
                    </li>
                `;
            } else {
                // Admin/Teacher navigation
                navList.innerHTML += `
                    <li class="nav-item">
                        <a class="nav-link" href="dashboard.html">Dashboard</a>
                    </li>
                `;
                
                if (user.role === 'admin') {
                    navList.innerHTML += `
                        <li class="nav-item">
                            <a class="nav-link" href="manage_users.html">Manage Users</a>
                        </li>
                    `;
                }
                
                navList.innerHTML += `
                    <li class="nav-item">
                        <a class="nav-link" href="manage_students.html">Manage Students</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="manage_classes.html">Manage Classes</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="attendance.html">Attendance</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="qr_code_list.html">QR Codes</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="reports.html">Reports</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" onclick="logoutUser()">Logout</a>
                    </li>
                `;
            }
        }
    }
}
