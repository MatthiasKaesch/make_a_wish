/////////// DATE OF BIRTH

export const dateValidation = (date) => {
  const monthNames = [
    'January ',
    'February ',
    'March ',
    'April ',
    'May ',
    'June ',
    'July ',
    'August ',
    'September ',
    'October ',
    'November ',
    'December ',
  ];

  let error = '';

  let currentYear = parseInt(new Date().toISOString().split('T')[0].slice(0, 4), 10);
  let currentMonth = parseInt(new Date().toISOString().split('T')[0].slice(6, 7), 10);
  let currentDay = parseInt(new Date().toISOString().split('T')[0].slice(8, 10), 10);
  let enteredYear = parseInt(date.slice(0, 4), 10);
  let enteredMonth = parseInt(date.slice(6, 7), 10);
  let enteredDay = parseInt(date.slice(8), 10);

  if (enteredYear < currentYear - 85) {
    error = 'Are you really that old? Please check your entered Year';
    return error;
  } else if (enteredYear > currentYear) {
    error = 'Year cant be ahead of ' + currentYear;
    return error;
  } else if (enteredYear > currentYear && enteredMonth > currentMonth) {
    error = 'Month cant be ahead of ' + monthNames[currentMonth - 1] + currentYear;
    return error;
  } else if (enteredYear > currentYear && enteredDay > currentDay && enteredMonth >= currentMonth) {
    error = 'Date is in the future. Please check your entered Day!';
    return error;
  } else {
    return error;
  }
};
