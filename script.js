const checkbox = document.getElementById('bot-verification');
const submitBtn = document.getElementById('submit-btn');
const modal = document.getElementById('confirmation-modal');

// Enable submit when checked
checkbox.addEventListener('change', function() {
  submitBtn.disabled = !checkbox.checked;
  if (checkbox.checked) {
    submitBtn.classList.remove('disabled:opacity-50');
  } else {
    submitBtn.classList.add('disabled:opacity-50');
  }
});

// Form submission
document.getElementById('verification-form').addEventListener('submit', function(e) {
  e.preventDefault();
  if (checkbox.checked) {
    modal.style.display = "flex";
    submitBtn.innerText = "Confirmed!";
    submitBtn.classList.add('bg-green-500', 'hover:bg-green-600');
    submitBtn.disabled = true;

    setTimeout(function() {
      modal.style.display = "none";
    }, 5000);
  }
});
