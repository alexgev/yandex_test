import './styles/index.scss';

var inputValue = document.getElementsByClassName("switch-state__input_text")[0];
var progressBar = document.getElementsByClassName("progressBar")[0];

var progressBarBefore = document.getElementsByClassName("progress-bar-before")[0];
var progressBarAfter = document.getElementsByClassName("progress-bar-after")[0];

inputValue.oninput = () => {
	console.log(inputValue.value);
	if (inputValue.value[inputValue.value.length - 1] < '0' || inputValue.value[inputValue.value.length - 1] > '9') {
		inputValue.value = '';
	}
	var progressValue = inputValue.value / 100 * 360;
	console.log(progressValue);
	if (inputValue.value <= 0 && inputValue.value != '') {
		inputValue.value = 0;
		progressValue = 0;
	} else if (inputValue.value >= 100) {
		inputValue.value = 100;
		progressValue = 360;
	}
	if (progressValue <= 180) {
		// progressBarBefore.style.transform = "";
		progressBarBefore.style.transform = `rotate(${180 + +(progressValue)}deg)`;
		progressBarBefore.style.backgroundColor = "#eeeeeb";
		console.log(inputValue);
		console.log(progressBarBefore.style.transform);
	}
	if (progressValue > 180) {
		// progressBarBefore.style.transform = "";
		progressBarBefore.style.backgroundColor = "#fdd94c";
		progressBarBefore.style.transform = `rotate(${180 + +(progressValue) - 180}deg)`;
	}
};

// inputValue.oninput = function() {
// 	console.log(inputValue.value);
// }

console.log("hello");

console.log(inputValue);