// Custom JavaScript for QR Attendance System

// Initialize QR code generator if element exists
document.addEventListener('DOMContentLoaded', function() {
    // Generate QR code if the element exists
    const qrCodeElement = document.getElementById('qrcode');
    const qrDataElement = document.getElementById('qr-data');
    
    if (qrCodeElement && qrDataElement) {
        const qrData = qrDataElement.value;
        
        // Create QR code
        new QRCode(qrCodeElement, {
            text: qrData,
            width: 200,
            height: 200,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
    }
    
    // Enable Bootstrap form validation
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
});
