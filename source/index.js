import './styles/index.scss';
require('./favicon16.png');

document.addEventListener("DOMContentLoaded", document.body.style.visibility = "visible");


const inputValue = document.getElementsByClassName("switch-state__input_text")[0];
const progressBar = document.getElementsByClassName("progress-bar")[0];
const progressBarPlace = document.getElementsByClassName("progress-bar-place")[0];

const progressBarBefore = document.getElementsByClassName("progress-bar-before")[0];
const progressBarAfter = document.getElementsByClassName("progress-bar-after")[0];

const stateAnimated = document.getElementById("state-animated");

const stateHidden = document.getElementById("state-hidden");

let setVendor = (elem, prop, value) => {
	elem.style["-webkit-tranform"] = value;
	elem.style["-moz-tranform"] = value;
	elem.style["-ms-tranform"] = value;
	elem.style["-o-tranform"] = value;
}

inputValue.oninput = () => {
	console.log(inputValue.value);
	if (inputValue.value[inputValue.value.length - 1] < '0' || inputValue.value[inputValue.value.length - 1] > '9') {
		inputValue.value = '';
	}
	let progressValue = Math.round(inputValue.value / 100 * 360);
	console.log(progressValue);
	if (inputValue.value <= 0 && inputValue.value != '') {
		inputValue.value = 0;
		progressValue = 0;
	} else if (inputValue.value >= 100) {
		inputValue.value = 100;
		progressValue = 360;
	}
	if (progressValue <= 180) {
		progressBarBefore.style.transform = `rotate(${180 + +(progressValue)}deg)`;
		setVendor(progressBarBefore, "transform", `rotate(${180 + +(progressValue)}deg)`);
		progressBarBefore.style.backgroundColor = "#eeeeeb";
	}
	if (progressValue > 180) {
		progressBarBefore.style.backgroundColor = "#fdd94c";
		progressBarBefore.style.transform = `rotate(${180 + +(progressValue) - 180}deg)`;
		setVendor(progressBarBefore, "transform", `rotate(${180 + +(progressValue) - 180}deg)`);
	}
};




class AnimateBlock {
	constructor(value, elem) {
		this.baseValue = value;
		this.elem = elem; 
		this.transformDeg = 0;
	}

	startAnimate() {
		this.timerId = setInterval(() => {
			this.transformDeg += 5;
			if (this.transformDeg >= 360) {
				this.transformDeg = this.transformDeg - 360;
			}
			this.elem.style.transform = `rotate(${this.transformDeg}deg)`;
			setVendor(this.elem, "transform", `rotate(${this.transformDeg}deg)`);
		}, 10);
	}

	stopAnimation() {
		clearInterval(this.timerId);
	}
}

let baseValueAnimated = stateAnimated.hasAttribute("checked");

let animateProgressBar = new AnimateBlock(baseValueAnimated, progressBar);




if (baseValueAnimated == true) {
	animateProgressBar.startAnimate();
}



let countOfChangeAnimation = 0;
let valueAnimated = false;

stateAnimated.onchange = () => {
	if (countOfChangeAnimation == 0) {
		valueAnimated = !baseValueAnimated;
	}
	countOfChangeAnimation++;

	if (valueAnimated == true) {
		animateProgressBar.startAnimate();
		valueAnimated = !valueAnimated;
	} else {
		animateProgressBar.stopAnimation();
		valueAnimated = !valueAnimated;
	}
}


let baseValueHidden = stateHidden.hasAttribute("checked");
let valueHidden = false;
let countOfChangeHidden = 0;

if (baseValueHidden == true) {
	progressBarPlace.style.display = "none";
}

stateHidden.onchange = () => {
	if (countOfChangeHidden == 0) {
		valueHidden = !baseValueHidden;
	}
	countOfChangeHidden++;

	if (valueHidden == true) {
		progressBarPlace.style.display = "none";
		valueHidden = !valueHidden;
	} else {
		progressBarPlace.style.display = "block";
		valueHidden = !valueHidden;
	}
}
