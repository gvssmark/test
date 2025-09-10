function createDatePicker(container) {
  const id = container.dataset.id;
  const labelText = container.dataset.label || "Select Date";
  const minDate = new Date(container.dataset.min || "1900-01-01");
  const maxDate = new Date(container.dataset.max || "2100-12-31");

  // Create label & selects
  container.innerHTML = `<label>${labelText}</label>`;
  const day = document.createElement("select");
  const month = document.createElement("select");
  const year = document.createElement("select");
  [day, month, year].forEach(sel => sel.className = "picker");

  container.append(day, month, year);

  // Month names
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  months.forEach((m, i) => month.append(new Option(m, i + 1)));

  function updateYears() {
    year.innerHTML = "";
    for (let y = minDate.getFullYear(); y <= maxDate.getFullYear(); y++) {
      year.append(new Option(y, y));
    }
  }

  function updateMonths() {
    month.innerHTML = "";
    let start = 1, end = 12;
    const selectedYear = +year.value;

    if (selectedYear === minDate.getFullYear()) start = minDate.getMonth() + 1;
    if (selectedYear === maxDate.getFullYear()) end = maxDate.getMonth() + 1;

    for (let m = start; m <= end; m++) {
      month.append(new Option(months[m - 1], m));
    }
  }

  function updateDays() {
    day.innerHTML = "";
    const y = +year.value;
    const m = +month.value;

    let start = 1, end = new Date(y, m, 0).getDate();
    const selectedYear = y;
    const selectedMonth = m;

    if (selectedYear === minDate.getFullYear() && selectedMonth === minDate.getMonth() + 1) {
      start = minDate.getDate();
    }
    if (selectedYear === maxDate.getFullYear() && selectedMonth === maxDate.getMonth() + 1) {
      end = maxDate.getDate();
    }

    for (let d = start; d <= end; d++) {
      day.append(new Option(d, d));
    }
  }

  // Handle cascading updates
  year.onchange = () => {
    updateMonths();
    updateDays();
  };
  month.onchange = updateDays;

  // Initialize with today's date OR minDate if today < min OR maxDate if today > max
  const today = new Date();
  const initDate = today < minDate ? minDate : today > maxDate ? maxDate : today;

  updateYears();
  year.value = initDate.getFullYear();
  updateMonths();
  month.value = initDate.getMonth() + 1;
  updateDays();
  day.value = initDate.getDate();
}

// Initialize all pickers
document.querySelectorAll(".scroll-date-picker").forEach(createDatePicker);

// ✅ Utility: Get selected date
function getSelectedDate(containerId) {
  const container = document.querySelector(`[data-id="${containerId}"]`);
  if (!container) return null;

  const selects = container.querySelectorAll("select");
  const day = +selects[0].value;
  const month = +selects[1].value;
  const year = +selects[2].value;

  return new Date(year, month - 1, day);
}

// ✅ Utility: Validate selected date
function isDateValid(containerId) {
  const container = document.querySelector(`[data-id="${containerId}"]`);
  if (!container) return false;

  const selected = getSelectedDate(containerId);
  const min = new Date(container.dataset.min);
  const max = new Date(container.dataset.max);

  return selected >= min && selected <= max;
}

// ✅ Function to get selected date from any scroll-date-picker
function getSelectedDate(pickerId) {
  const picker = document.querySelector(`.scroll-date-picker[data-id="${pickerId}"]`);
  if (!picker) {
    console.error(`Picker with ID "${pickerId}" not found.`);
    return null;
  }

  // Get all 3 <select> elements inside the picker
  const selects = picker.querySelectorAll('select');
  if (selects.length !== 3) {
    console.error(`Picker "${pickerId}" doesn't have all selects.`);
    return null;
  }

  const [daySelect, monthSelect, yearSelect] = selects;

  // Fetch values
  const day = daySelect.value;
  const month = monthSelect.value;
  const year = yearSelect.value;

  // Validate values
  if (!day || !month || !year) {
    console.warn(`Date not fully selected in "${pickerId}"`);
    return null;
  }

  // Return formatted value YYYY-MM-DD
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}

