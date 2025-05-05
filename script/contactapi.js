document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.contact-form');
    const formMessage = form.querySelector('.form-message');
    const submitBtn = form.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnSpinner = submitBtn.querySelector('.btn-spinner');
    const [nameInput, emailInput, phoneInput, messageInput] = form.querySelectorAll('.input-field');

    function validateForm() {
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const phone = phoneInput.value.trim();
        const message = messageInput.value.trim();
        let valid = true;

        if (!isValidEmail(email)) {
            emailInput.classList.add('border-red-500');
            valid = false;
        } else {
            emailInput.classList.remove('border-red-500');
        }

        if (!isValidPhone(phone)) {
            phoneInput.classList.add('border-red-500');
            valid = false;
        } else {
            phoneInput.classList.remove('border-red-500');
        }

        if (name && email && phone && message && valid) {
            submitBtn.disabled = false;
        } else {
            submitBtn.disabled = true;
        }
    }

    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    function isValidPhone(phone) {
        const regex = /^[0-9]+$/;
        return regex.test(phone);
    }

    [nameInput, emailInput, phoneInput, messageInput].forEach(input => {
        input.addEventListener('input', validateForm);
    });

    submitBtn.disabled = true;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        resetMessage();
        showLoading(true);

        const formData = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            phone: phoneInput.value.trim(),
            message: messageInput.value.trim(),
        };

        try {
            const response = await fetch('http://localhost:5000/api/contact/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error('Server error');

            form.reset();
            validateForm();
            showMessage('Your message has been sent successfully!', 'success');
        } catch (error) {
            console.error('Error:', error);
            showMessage('An error occurred. Please try again.', 'error');
        } finally {
            showLoading(false);
        }
    });

    function resetMessage() {
        formMessage.className = 'form-message hidden mt-4 text-center p-3 rounded';
        formMessage.textContent = '';
    }

    function showMessage(text, type) {
        formMessage.textContent = text;
        formMessage.classList.remove('hidden');

        if (type === 'success') {
            formMessage.classList.add('bg-green-100', 'text-green-700');
        } else {
            formMessage.classList.add('bg-red-100', 'text-red-700');
        }

        setTimeout(() => {
            formMessage.classList.add('hidden');
        }, 5000);
    }


    function showLoading(isLoading) {
        btnText.classList.toggle('hidden', isLoading);
        btnSpinner.classList.toggle('hidden', !isLoading);
        submitBtn.disabled = true;
    }
});