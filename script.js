const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
const paymentModal = document.getElementById('payment-modal');
const openPaymentButtons = document.querySelectorAll('.open-payment');
const closeModalButton = document.querySelector('.close-modal');
const paymentForm = document.getElementById('payment-form');
const contactForm = document.getElementById('contact-form');
const selectedPlanText = document.getElementById('selected-plan');

function setMessage(element, text, type = '') {
  element.textContent = text;
  element.className = `form-msg ${type}`.trim();
}

function validateForm(form) {
  const fields = [...form.querySelectorAll('input, textarea, select')];
  for (const field of fields) {
    if (!field.checkValidity()) {
      field.focus();
      return field.validationMessage || 'Please complete all required fields correctly.';
    }
  }
  return null;
}

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('show');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.addEventListener('click', (event) => {
    if (event.target.tagName === 'A') {
      nav.classList.remove('show');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

function openPayment(planName = 'Professional') {
  selectedPlanText.textContent = `Plan: ${planName}`;
  paymentModal.classList.add('show');
  paymentModal.setAttribute('aria-hidden', 'false');
}

function closePayment() {
  paymentModal.classList.remove('show');
  paymentModal.setAttribute('aria-hidden', 'true');
}

openPaymentButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const plan = button.dataset.plan || 'Professional';
    openPayment(plan);
  });
});

closeModalButton.addEventListener('click', closePayment);

paymentModal.addEventListener('click', (event) => {
  if (event.target === paymentModal) closePayment();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && paymentModal.classList.contains('show')) {
    closePayment();
  }
});

paymentForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const messageElement = paymentForm.querySelector('.form-msg');
  const validationError = validateForm(paymentForm);

  if (validationError) {
    setMessage(messageElement, validationError, 'error');
    return;
  }

  setMessage(messageElement, 'Payment request submitted successfully. We will confirm by email.', 'success');
  paymentForm.reset();
});

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const messageElement = contactForm.querySelector('.form-msg');
  const validationError = validateForm(contactForm);

  if (validationError) {
    setMessage(messageElement, validationError, 'error');
    return;
  }

  setMessage(messageElement, 'Thank you. Your message has been sent successfully.', 'success');
  contactForm.reset();
});
