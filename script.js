
        // Получаем элементы DOM
        const form = document.getElementById('contactForm');
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');
        const messageInput = document.getElementById('message');
        const charCount = document.getElementById('charCount');
        const submitBtn = document.getElementById('submitBtn');
        const successMessage = document.getElementById('successMessage');

        // Валидация в реальном времени
        nameInput.addEventListener('input', validateName);
        emailInput.addEventListener('input', validateEmail);
        phoneInput.addEventListener('input', validatePhone);
        messageInput.addEventListener('input', validateMessage);

        // Счетчик символов для сообщения
        messageInput.addEventListener('input', function() {
            charCount.textContent = this.value.length;
        });

        // Функции валидации
        function validateName() {
            const name = nameInput.value.trim();
            const isValid = name.length >= 2;
            
            showValidation(nameInput, isValid, 'nameError');
            updateSubmitButton();
            return isValid;
        }

        function validateEmail() {
            const email = emailInput.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const isValid = emailRegex.test(email);
            
            showValidation(emailInput, isValid, 'emailError');
            updateSubmitButton();
            return isValid;
        }

        function validatePhone() {
            const phone = phoneInput.value.trim();
            // Простая валидация телефона (можно улучшить)
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
            const isValid = phone === '' || phoneRegex.test(phone);
            
            showValidation(phoneInput, isValid, 'phoneError');
            updateSubmitButton();
            return isValid;
        }

        function validateMessage() {
            const message = messageInput.value.trim();
            const isValid = message.length >= 10 && message.length <= 500;
            
            showValidation(messageInput, isValid, 'messageError');
            updateSubmitButton();
            return isValid;
        }

        // Показать/скрыть сообщения об ошибках
        function showValidation(input, isValid, errorId) {
            const errorElement = document.getElementById(errorId);
            
            if (isValid) {
                input.classList.remove('error');
                input.classList.add('success');
                errorElement.style.display = 'none';
            } else {
                input.classList.remove('success');
                input.classList.add('error');
                errorElement.style.display = 'block';
            }
        }

        // Обновить состояние кнопки отправки
        function updateSubmitButton() {
            const isFormValid = validateName() && validateEmail() && validateMessage();
            submitBtn.disabled = !isFormValid;
        }

        // Обработка отправки формы
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateName() && validateEmail() && validateMessage()) {
                // Имитация отправки (в реальном проекте здесь был бы fetch/ajax)
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';
                
                setTimeout(() => {
                    successMessage.style.display = 'block';
                    form.reset();
                    charCount.textContent = '0';
                    submitBtn.textContent = 'Send Message';
                    
                    // Сбросить стили валидации
                    document.querySelectorAll('input, textarea').forEach(input => {
                        input.classList.remove('success', 'error');
                    });
                    document.querySelectorAll('.error-message').forEach(error => {
                        error.style.display = 'none';
                    });
                    
                    // Скрыть сообщение об успехе через 5 секунд
                    setTimeout(() => {
                        successMessage.style.display = 'none';
                        updateSubmitButton();
                    }, 5000);
                    
                }, 1500);
            }
        });

        // Инициализация при загрузке
        updateSubmitButton();
