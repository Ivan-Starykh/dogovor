// валидация и помощь в наборе телефонного номера
document.addEventListener("DOMContentLoaded", function () {
  const today = new Date();

  document.getElementById(`date`).textContent = today.toLocaleDateString(
    `ru-RU`,
    {
      day: `2-digit`,
      month: `long`,
      year: `numeric`,
    }
  );

  let year = today.getFullYear();
  let month = today.getMonth() + 1;
  let day = today.getDate();

  if (month < 10) {
    month = "0" + month;
  }

  if (day < 10) {
    day = "0" + day;
  }

  const date = `${year}-${month}-${day}`;

  const phoneInput = document.getElementById("telephone_number");
  phoneInput.addEventListener("input", function (event) {
    const inputValue = event.target.value.replace(/\D/g, ""); // Оставляем только цифры
    const formattedValue = formatPhoneNumber(inputValue);
    phoneInput.value = formattedValue;
  });

  function formatPhoneNumber(value) {
    const cleaned = ("" + value).replace(/\D/g, "");
    const match = cleaned.match(
      /^(\d{1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})$/
    );
    if (match) {
      const intlCode = match[1] ? `+${match[1]}` : "";
      const firstGroup = match[2] ? `(${match[2]}` : "";
      const secondGroup = match[3] ? `)${match[3]}` : "";
      const thirdGroup = match[4] ? `-${match[4]}` : "";
      const forthGroup = match[5] ? `-${match[5]}` : "";
      return `${intlCode}${firstGroup}${secondGroup}${thirdGroup}${forthGroup}`;
    }
    return value;
  }
});

// Проверяем, есть ли уже массив уникальных номеров в Local Storage
let uniqueNumbers = JSON.parse(localStorage.getItem("uniqueNumbers")) || [];

// Генерация массива уникальных номеров
function generateUniqueNumbers(count) {
  let numbers = [];
  for (let i = 1; i <= count; i++) {
    numbers.push(i);
  }
  return numbers;
}

// Функция для получения следующего уникального номера
function getNextUniqueNumber() {
  if (uniqueNumbers.length === 0) {
    uniqueNumbers = generateUniqueNumbers(30000); // Используйте вашу реальную длину массива
  }
  return uniqueNumbers.shift();
}

// Функция для сохранения массива уникальных номеров в Local Storage
function saveUniqueNumbers() {
  localStorage.setItem("uniqueNumbers", JSON.stringify(uniqueNumbers));
}

let uniqueNumber = getNextUniqueNumber();
if (uniqueNumber !== null) {
  // Ваш код обработки
  console.log(uniqueNumber);

  // Сохраняем обновленный массив уникальных номеров в Local Storage
  saveUniqueNumbers();
}

function loadFile(inputFilePath, callback) {
  PizZipUtils.getBinaryContent(inputFilePath, callback);
}
// Обработчик кнопки "ОТПРАВИТЬ"
window.generate = function generate() {
  // Получаем следующий уникальный номер
  let uniqueNumber = getNextUniqueNumber();

  if (uniqueNumber !== null) {
    // const inputFilePath = "/input.docx";
    const inputFilePath =
      document.querySelector(".form__button").dataset.inputFilePath;
    loadFile(inputFilePath, function (error, content) {
      if (error) {
        throw error;
      }
      const zip = new PizZip(content);
      const doc = new window.docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
      });

      // Присваиваем значения переменным из значений полей формы
      let firmName = document.getElementById("firm_name").value;
      let firstName = document.getElementById("first_name").value;
      let lastName = document.getElementById("last_name").value;
      let city = document.getElementById("city").value;
      let street = document.getElementById("street").value;
      let houseNumber = document.getElementById("house_number").value;
      let telephoneNumber = document.getElementById("telephone_number").value;
      let ogrnipNumber = document.getElementById("ogrnip_number").value;
      let innNumber = document.getElementById("inn_number").value;
      let bankName = document.getElementById("bank_name").value;
      let bikNumber = document.getElementById("bik_number").value;
      let checkingAccountNumber = document.getElementById(
        "checking_account_number"
      ).value;
      let correspondentCheckNumber = document.getElementById(
        "correspondent_check_number"
      ).value;
      // mail = document.getElementById("mail").value;
      let currentDate = document.getElementById("date").textContent;
      let currentYear = new Date().getFullYear();

      // Render the document (Replace {first_name} by John, {last_name} by Doe, ...)
      doc.render({
        order_number: uniqueNumber,
        full_current_date: `${currentDate}`,
        current_year: currentYear,
        firm_name: `${firmName}`,
        first_name: `${firstName}`,
        last_name: `${lastName}`,
        city: `${city}`,
        street: `${street}`,
        house_number: `${houseNumber}`,
        telephone_number: `${telephoneNumber}`,
        ogrnip_number: `${ogrnipNumber}`,
        inn_number: `${innNumber}`,
        bank_name: `${bankName}`,
        bik_number: `${bikNumber}`,
        checking_account_number: `${checkingAccountNumber}`,
        correspondent_check_number: `${correspondentCheckNumber}`,
        // mail: `${mail}`,
      });

      // Удаление использованного номера из массива
      removeUsedNumber(uniqueNumber);

      // Генерация и сохранение документа
      const blob = doc.getZip().generate({
        type: "blob",
        mimeType:
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        // compression: DEFLATE adds a compression step.
        // For a 50MB output document, expect 500ms additional CPU time
        compression: "DEFLATE",
      });
      // Output the document using Data-URI
      saveAs(blob, "output.docx");
    });
  }
};

function removeUsedNumber(number) {
  const index = uniqueNumbers.indexOf(number);
  if (index !== -1) {
    uniqueNumbers.splice(index, 1);
  }
}
