function getDate() {
  let currentDate = new Date();
  let day = (currentDate.getDate() < 10) ? '0' + currentDate.getDate() : currentDate.getDate();
  
  // Создаем массив с названиями месяцев
  let monthNames = [
    "января", "февраля", "марта",
    "апреля", "мая", "июня", "июля",
    "августа", "сентября", "октября",
    "ноября", "декабря"
  ];

  // Получаем название месяца
  let monthName = monthNames[currentDate.getMonth()];

  let year = currentDate.getFullYear();
  return day + ' ' + monthName + ' ' + year + ' ' + 'г.';
}

document.getElementById('date').innerHTML = getDate();