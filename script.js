const completedEl = document.querySelector('.completed');
const form = document.querySelector('form');
const nameInput = document.querySelector('form .name');
const numberInput = document.querySelector('form .number');
const expMonthInput = document.querySelector('form .exp-month');
const expYearInput = document.querySelector('form .exp-year');
const cvcInput = document.querySelector('form .cvc');
const cardNumber = document.querySelector('.card-number');
const cardName = document.querySelector('.card-name');
const cardExpMonth = document.querySelector('.mm');
const cardExpYear = document.querySelector('.yy');
const cardCVC = document.querySelector('.cvc');

const letters = 'ABCDEFGHIJKLNMOPQRSTUVWXYZ';

form.addEventListener('submit', e => {
    e.preventDefault();
    checkFields();
});

function checkFields() {
    let validName = false;
    let validnumber = false;
    let validExp = false;
    let validCVC = false;
    if(nameInput.value.trim() != '') {
        nameInput.classList.remove('err');
        nameInput.nextElementSibling.innerHTML = '';
        validName = true;
    } else {
        nameInput.classList.add('err');
        nameInput.nextElementSibling.innerHTML = 'Can\'t be blank';
        validName = false;
    }
    if(numberInput.value.trim().length == 19) {
        numberInput.classList.remove('err');
        numberInput.nextElementSibling.innerHTML = '';
        validnumber = true;
    } else {
        numberInput.classList.add('err');
        numberInput.nextElementSibling.innerHTML = 'you must enter 16 characters';
        validnumber = false;
    }
    if(expMonthInput.value.trim().length == 2 && expYearInput.value.trim().length == 2) {
        expMonthInput.classList.remove('err');
        expYearInput.classList.remove('err');
        expYearInput.parentElement.parentElement.querySelector('small').innerHTML = '';
        validExp = true;
    } else {
        expMonthInput.classList.add('err');
        expYearInput.classList.add('err');
        expYearInput.parentElement.parentElement.querySelector('small').innerHTML = 'you must enter 2 characters';
        validExp = false;
    }
    if(cvcInput.value.trim().length == 3) {
        cvcInput.classList.remove('err');
        cvcInput.nextElementSibling.innerHTML = '';
        validCVC = true;
    } else {
        cvcInput.classList.add('err');
        cvcInput.nextElementSibling.innerHTML = 'you must enter 3 characters';
        validCVC = false;
    }

    if(validName && validnumber && validExp && validCVC) {
        completedEl.classList.remove('hide');
        form.classList.add('hide');
        nameInput.value = '';
        numberInput.value = '';
        expMonthInput.value = '';
        expYearInput.value = '';
        cvcInput.value = '';
    }

}

completedEl.querySelector('button').addEventListener('click', () => {
    completedEl.classList.add('hide');
    form.classList.remove('hide');
});

function setValueInCard(e, cardArea) {
    cardArea.innerHTML = e.target.value;
}

nameInput.addEventListener('keyup', e => {
    setValueInCard(e, cardName)
});


numberInput.addEventListener('keydown', e => {
    if(e.key != 'Backspace' && (e.target.value.length == 4 || e.target.value.length == 9 || e.target.value.length == 14)) {
        e.target.value += ' '
    }
})

const pattern = /[A-Za-z]/;

numberInput.addEventListener('keyup', e => {
    setValueInCard(e, cardNumber)
    if(pattern.test(e.target.value)) {
        numberInput.classList.add('err');
        numberInput.nextElementSibling.innerHTML = 'Wrong format, numbers only';
    } else {
        numberInput.classList.remove('err');
        numberInput.nextElementSibling.innerHTML = '';
    }
});

expMonthInput.addEventListener('keyup', e => {
    if(e.target.value.length == 2) expYearInput.focus();
    setValueInCard(e, cardExpMonth);
    if(pattern.test(e.target.value)) {
        expMonthInput.classList.add('err');
        expMonthInput.parentElement.parentElement.querySelector('small').innerHTML = 'Wrong format, numbers only';
    } else {
        expMonthInput.classList.remove('err');
        expMonthInput.parentElement.parentElement.querySelector('small').innerHTML = '';
    }
});

expYearInput.addEventListener('keyup', e => {
    if(e.target.value.length == 2) cvcInput.focus();
    setValueInCard(e, cardExpYear);
    if(pattern.test(e.target.value)) {
        expYearInput.classList.add('err');
        expYearInput.parentElement.parentElement.querySelector('small').innerHTML = 'Wrong format, numbers only';
    } else {
        expYearInput.classList.remove('err');
        expYearInput.parentElement.parentElement.querySelector('small').innerHTML = '';
    }
});

cvcInput.addEventListener('keyup', e => {
    setValueInCard(e, cardCVC)
    if(pattern.test(e.target.value)) {
        cvcInput.classList.add('err');
        cvcInput.nextElementSibling.innerHTML = 'Wrong format, numbers only';
    } else {
        cvcInput.classList.remove('err');
        cvcInput.nextElementSibling.innerHTML = '';
    }
});