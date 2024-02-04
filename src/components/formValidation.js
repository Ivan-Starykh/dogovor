document.addEventListener('DOMContentLoaded', function () {
	const phoneInput = document.getElementById('telephone_number');

	phoneInput.addEventListener('input', function (event) {
		const inputValue = event.target.value.replace(/\D/g, ''); // Оставляем только цифры
		const formattedValue = formatPhoneNumber(inputValue);
		phoneInput.value = formattedValue;
	});

	function formatPhoneNumber(value) {
		const cleaned = ('' + value).replace(/\D/g, '');
		const match = cleaned.match(/^(\d{1,3})(\d{0,3})(\d{0,2})(\d{0,2})$/);
		if (match) {
			const intlCode = match[1] ? `+${match[1]}` : '';
			const firstGroup = match[2] ? `(${match[2]}` : '';
			const secondGroup = match[3] ? `)${match[3]}` : '';
			const thirdGroup = match[4] ? `-${match[4]}` : '';
			return `${intlCode}${firstGroup}${secondGroup}${thirdGroup}`;
		}
		return value;
	}
});