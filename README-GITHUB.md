# QR Attendance System

A simple and efficient way to track student attendance using QR codes. This is a static HTML version of the QR Attendance System, designed to be hosted on GitHub Pages.

## Live Demo

You can view the live demo at: [https://yourusername.github.io/qr-attendance-system](https://yourusername.github.io/qr-attendance-system)

## Features

### Admin/Teacher Features
- **Class Management**: View and manage classes
- **Student Management**: View and manage student accounts
- **QR Code Generation**: Create QR codes for attendance sessions
- **Attendance Reports**: View attendance records

### Student Features
- **Class Enrollment**: View enrolled classes
- **QR Code Viewing**: See QR codes for enrolled classes
- **Attendance Marking**: Scan or enter QR codes to mark attendance
- **Status Indicators**: Clear indicators for expired sessions

## Technology Stack

- **Frontend**: HTML, CSS, JavaScript, Bootstrap 5
- **QR Code Generation**: qrcodejs library
- **QR Code Scanning**: HTML5 QR Code Scanner library
- **Data Storage**: Client-side storage (localStorage)

## Demo Accounts

- **Admin**: username: `admin`, password: `admin123`
- **Teacher**: username: `teacher1`, password: `admin123`
- **Student**: student_id: `20-1001`, password: `admin123`

## How It Works

1. **Admin/Teacher**:
   - Login with admin or teacher credentials
   - Create classes and manage students
   - Generate QR codes for attendance sessions
   - View attendance reports

2. **Student**:
   - Login with student credentials
   - View enrolled classes
   - Scan QR codes or enter session codes to mark attendance
   - View attendance history

## Important Notes

This is a static HTML version of the QR Attendance System, designed for demonstration purposes. In a real-world scenario, you would need:

1. A backend server (PHP, Node.js, etc.)
2. A database (MySQL, MongoDB, etc.)
3. Server-side authentication
4. Secure data storage

## Local Development

To run this project locally:

1. Clone the repository
   ```
   git clone https://github.com/yourusername/qr-attendance-system.git
   ```

2. Open the `index.html` file in your browser
   
   OR
   
   Use a local development server like Live Server in VS Code

## Hosting on GitHub Pages

1. Create a new repository on GitHub
2. Push your code to the repository
3. Go to repository settings
4. Navigate to "Pages" section
5. Select the branch you want to deploy (usually `main`)
6. Save the settings

GitHub will provide you with a URL where your site is published.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Bootstrap for the responsive UI components
- qrcodejs for QR code generation
- HTML5 QR Code Scanner for QR code scanning
- Font Awesome for icons
