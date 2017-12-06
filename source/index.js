import './styles/index.scss';

document.addEventListener("DOMContentLoaded", document.body.style.visibility = "visible");


var inputValue = document.getElementsByClassName("switch-state__input_text")[0];
var progressBar = document.getElementsByClassName("progress-bar")[0];
var progressBarPlace = document.getElementsByClassName("progress-bar-place")[0];

var progressBarBefore = document.getElementsByClassName("progress-bar-before")[0];
var progressBarAfter = document.getElementsByClassName("progress-bar-after")[0];

var stateAnimated = document.getElementById("state-animated");

var stateHidden = document.getElementById("state-hidden");

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

let animateProgressBar = new AnimateBlock(baseValueAnimated, progressBar);

var baseValueAnimated = stateAnimated.hasAttribute("checked");


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


let progressApi = document.getElementsByClassName("progress-api")[0];
let progressApiPadding = getComputedStyle(progressApi).padding.replace(/[^0-9]/g,"");
let progressApiWidth = getComputedStyle(progressApi).width.replace(/[^0-9]/g,"");
let progressApiHeight = getComputedStyle(progressApi).height.replace(/[^0-9]/g,"");

console.log(progressApiWidth);
console.log(progressApiHeight);

// window.onload = () => {
// 	if (window.innerWidth <= 568) {
// 		let a = progressApiHeight;
// 		progressApiHeight = progressApiWidth;
// 		progressApiWidth = a;
// 	}
// }

(function() {
	var throttle = function(type, name, obj) {
		obj = obj || window;
		var running = false;
		var func = function() {
			if (running) { return; }
			running = true;
			requestAnimationFrame(function() {
				obj.dispatchEvent(new CustomEvent(name));
				running = false;
			});
		};
		obj.addEventListener(type, func);
	};

	/* init - you can init any event */
	throttle("resize", "optimizedResize");
})();


let typeOfChange = false;
if (window.innerWidth <= 584) {
	typeOfChange = "lastChangeOnSmallSceen";
} else {
	typeOfChange = "lastChangeOnLargeScreen";
}
// handle event
window.addEventListener("optimizedResize", function() {
	// progressApiWidth = getComputedStyle(progressApi).width.replace(/[^0-9]/g,"");
	if (window.innerWidth <= 584 && typeOfChange == "lastChangeOnLargeScreen") {
		let a = progressApiHeight;
		progressApiHeight = progressApiWidth;
		progressApiWidth = a;
		progressApi.style.height = `${progressApiHeight}px`;
		progressApi.style.width = `${progressApiWidth}px`;
		typeOfChange = "lastChangeOnSmallSceen";
	} else if (window.innerWidth > 584 && typeOfChange == "lastChangeOnSmallSceen") {
		let a = progressApiHeight;
		progressApiHeight = progressApiWidth;
		progressApiWidth = a;
		progressApi.style.height = `${progressApiHeight}px`;
		progressApi.style.width = `${progressApiWidth}px`;
		typeOfChange = "lastChangeOnLargeScreen";
	}
	
});

stateHidden.onchange = () => {
	if (countOfChangeHidden == 0) {
		valueHidden = !baseValueHidden;
	}
	countOfChangeHidden++;

	if (valueHidden == true) {
		console.log(progressApiWidth);
		console.log(progressApiHeight);
		if (progressApiHeight >= progressApiWidth) {
			progressApi.style.height = `${progressApiHeight / 2 + +(progressApiPadding)}px`;
		} else {
			progressApi.style.width = `${progressApiWidth / 2 + +(progressApiPadding)}px`;
		}
		progressBarPlace.style.display = "none";
		valueHidden = !valueHidden;
	} else {
		if (progressApiHeight >= progressApiWidth) {
			progressApi.style.height = `${progressApiHeight}px`;
		} else {
			progressApi.style.width = `${progressApiWidth}px`;
		}
		console.log(progressApiWidth);
		console.log(progressApiHeight);
		progressBarPlace.style.display = "block";
		valueHidden = !valueHidden;
	}
}
