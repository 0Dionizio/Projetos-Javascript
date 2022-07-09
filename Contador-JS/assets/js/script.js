var currentNumberWrapper = document.getElementById('currentNumber');
var currentNumber = 0;

function  increment() {
    currentNumber = currentNumber + 1;
    currentNumberWrapper.innerHTML = currentNumber;
}

function  decrement() {
    currentNumber = currentNumber - 1;
    currentNumberWrapper.innerHTML = currentNumber;
}

document.querySelector("#increment").addEventListener('click', increment)
document.querySelector("#decrement").addEventListener('click', decrement)