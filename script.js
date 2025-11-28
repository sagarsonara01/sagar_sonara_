// script.js – Full validation including checkbox logic
document.getElementById('bookingForm').addEventListener('submit', function(e) {
    let valid = true;
    const errors = document.querySelectorAll('.error');
    errors.forEach(err => err.textContent = '');
    document.getElementById('patientError').textContent = '';

    // Name
    if (!document.getElementById('name').value.trim()) {
        showError('name', 'Please enter your full name');
        valid = false;
    }

    // Email
    const email = document.getElementById('email').value.trim();
    if (!email) {
        showError('email', 'Please enter your email');
        valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
        showError('email', 'Please enter a valid email');
        valid = false;
    }

    // Phone
    const phone = document.getElementById('phone').value.trim();
    if (!phone) {
        showError('phone', 'Please enter your phone number');
        valid = false;
    } else if (!/^04\d{8}$|^\d{10}$/.test(phone.replace(/\s/g,''))) {
        showError('phone', 'Please enter a valid Australian number');
        valid = false;
    }

    // Date
    if (!document.getElementById('date').value) {
        showError('date', 'Please select a date');
        valid = false;
    }

    // Service
    if (!document.getElementById('service').value) {
        showError('service', 'Please select a service');
        valid = false;
    }

    // Patient Status – CHECKBOX VALIDATION
    const newPatient = document.getElementById('newPatient');
    const returningPatient = document.getElementById('returningPatient');
    const checkedCount = (newPatient.checked ? 1 : 0) + (returningPatient.checked ? 1 : 0);

    if (checkedCount === 0) {
        document.getElementById('patientError').textContent = 'Please select whether you are a new or returning patient';
        valid = false;
    } else if (checkedCount > 1) {
        document.getElementById('patientError').textContent = 'Please select only one option';
        valid = false;
    }

    if (!valid) {
        e.preventDefault();
    } else {
        e.preventDefault();
        const status = newPatient.checked ? 'New Patient (25% OFF applied!)' : 'Returning Patient';
        alert(`Thank you! Your appointment has been booked successfully.\n\nStatus: ${status}\n\nWe'll send a confirmation to ${email} and an SMS to ${phone}.\n\nSee you soon at 100SMILES!`);
    }
});

function showError(fieldId, message) {
    const errorSpan = document.querySelector(`#${fieldId} + .error`) || 
                     document.querySelector(`#${fieldId}`).parentElement.querySelector('.error');
    if (errorSpan) errorSpan.textContent = message;
}