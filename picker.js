function createDatePicker(container, config = {}) {
  const containerId = config.id || container.dataset.id;
  const labelText = config.label || container.dataset.label || 'Select Date';
  const minDate = new Date(config.min || container.dataset.min || '1900-01-01');
  const maxDate = new Date(config.max || container.dataset.max || '2100-12-31');

  const label = document.createElement('label');
  label.textContent = labelText;
  container.appendChild(label);

  const daySelect = document.createElement('select');
  const monthSelect = document.createElement('select');
  const yearSelect = document.createElement('select');

  daySelect.className = monthSelect.className = yearSelect.className = 'picker';
  daySelect.name = `${containerId}_day`;
  monthSelect.name = `${containerId}_month`;
  yearSelect.name = `${containerId}_year`;

  container.append(daySelect, monthSelect, yearSelect);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  months.forEach((month, i) => {
    const opt = document.createElement('option');
    opt.value = i + 1;
    opt.textContent = month;
    monthSelect.appendChild(opt);
  });

  for (let y = minDate.getFullYear(); y <= maxDate.getFullYear(); y++) {
    const opt = document.createElement('option');
    opt.value = y;
    opt.textContent = y;
    yearSelect.appendChild(opt);
  }

  function updateDays() {
    const month = parseInt(monthSelect.value);
    const year = parseInt(yearSelect.value);
    const daysInMonth = new Date(year, month, 0).getDate();

    daySelect.innerHTML = '';
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(year, month - 1, d);
      const opt = document.createElement('option');
      opt.value = d;
      opt.textContent = d;
      if (date < minDate || date > maxDate) {
        opt.disabled = true;
      }
      daySelect.appendChild(opt);
    }
  }

  monthSelect.addEventListener('change', updateDays);
  yearSelect.addEventListener('change', updateDays);

  // Initialize with today's date
  const today = new Date();
  monthSelect.value = today.getMonth() + 1;
  yearSelect.value = today.getFullYear();
  updateDays();
  daySelect.value = today.getDate();
}

// Initialize all pickers on page
document.querySelectorAll('.scroll-date-picker').forEach(container => {
  createDatePicker(container);
});

// Example form validation
document.getElementById('demoForm').addEventListener('submit', function(e) {
  e.preventDefault();
  let isValid = true;

  document.querySelectorAll('.scroll-date-picker').forEach(container => {
    const id = container.dataset.id;
    const day = parseInt(container.querySelector(`select[name="${id}_day"]`).value);
    const month = parseInt(container.querySelector(`select[name="${id}_month"]`).value);
    const year = parseInt(container.querySelector(`select[name="${id}_year"]`).value);
    const selectedDate = new Date(year, month - 1, day);
    const min = new Date(container.dataset.min);
    const max = new Date(container.dataset.max);

    if (selectedDate < min || selectedDate > max) {
      alert(`Date in ${id} is outside allowed range.`);
      isValid = false;
    }
  });

  if (isValid) {
    alert('Form submitted successfully!');
  }
});