import Notiflix from 'notiflix';

const form = document.querySelector('.form');
form.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {

  evt.preventDefault();
  
  const { delay, step, amount } = evt.currentTarget;
  let delayValue = Number(delay.value);
  let stepValue = Number(step.value);
  let amountValue = Number(amount.value);

  for (let position = 1; position <= amountValue; position += 1) {
    createPromise(position, delayValue);
    delayValue += stepValue;
    console.log(position, delayValue);
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });

  promise
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`Done! Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`Error! Rejected promise ${position} in ${delay}ms`);
    });
}