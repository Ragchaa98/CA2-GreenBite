/*
    GreenBite contact form validation
    1. No field can be empty.
    2. Phone number must contain only digits and must be 9 or 10 digits long.
    3. Name must contain alphabetic characters only, with spaces allowed.
    4. Clear error messages must be shown when validation fails.
*/

// Wait until the page is fully loaded before trying to access form elements.
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');

    // Exit safely if the current page does not contain the contact form.
    if (!form) {
        return;
    }

    const fullName = document.getElementById('fullName');
    const phone = document.getElementById('phone');
    const email = document.getElementById('email');
    const query = document.getElementById('query');
    const formStatus = document.getElementById('formStatus');

    // Helper function to show a field-specific error message.
    function setError(inputElement, errorElementId, message) {
        document.getElementById(errorElementId).textContent = message;
        inputElement.classList.add('input-error');
    }

    // Helper function to clear a field-specific error message.
    function clearError(inputElement, errorElementId) {
        document.getElementById(errorElementId).textContent = '';
        inputElement.classList.remove('input-error');
    }

    // Check whether a text field is empty after trimming spaces.
    function isEmpty(value) {
        return value.trim() === '';
    }

    // Validate name: letters and spaces only.
    function isValidName(nameValue) {
        const namePattern = /^[A-Za-z\s]+$/;
        return namePattern.test(nameValue.trim());
    }

    // Validate phone: digits only and exactly 9 or 10 digits.
    function isValidPhone(phoneValue) {
        const phonePattern = /^\d{9,10}$/;
        return phonePattern.test(phoneValue.trim());
    }

    // Basic email pattern check.
    function isValidEmail(emailValue) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(emailValue.trim());
    }

    // Main validation function runs when the user submits the form.
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        let isFormValid = true;
        formStatus.textContent = '';
        formStatus.className = 'form-status';

        // Name validation block.
        if (isEmpty(fullName.value)) {
            setError(fullName, 'nameError', 'Please enter your full name.');
            isFormValid = false;
        } else if (!isValidName(fullName.value)) {
            setError(fullName, 'nameError', 'Name must contain letters and spaces only.');
            isFormValid = false;
        } else {
            clearError(fullName, 'nameError');
        }

        // Phone validation block.
        if (isEmpty(phone.value)) {
            setError(phone, 'phoneError', 'Please enter your phone number.');
            isFormValid = false;
        } else if (!isValidPhone(phone.value)) {
            setError(phone, 'phoneError', 'Phone number must be numeric and 9 or 10 digits long.');
            isFormValid = false;
        } else {
            clearError(phone, 'phoneError');
        }

        // Email validation block.
        if (isEmpty(email.value)) {
            setError(email, 'emailError', 'Please enter your email address.');
            isFormValid = false;
        } else if (!isValidEmail(email.value)) {
            setError(email, 'emailError', 'Please enter a valid email address.');
            isFormValid = false;
        } else {
            clearError(email, 'emailError');
        }

        // Query validation block.
        if (isEmpty(query.value)) {
            setError(query, 'queryError', 'Please enter the nature of your query.');
            isFormValid = false;
        } else {
            clearError(query, 'queryError');
        }

        // If everything passes, show a clear success message.
        if (isFormValid) {
            formStatus.textContent = 'Thank you. Your enquiry has been validated successfully.';
            formStatus.classList.add('success-text');
            form.reset();
        } else {
            formStatus.textContent = 'Please correct the highlighted fields before submitting.';
            formStatus.classList.add('error-text');
        }
    });
});
