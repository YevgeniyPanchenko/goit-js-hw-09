import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startBtn = document.querySelector('button[data-start]');
const fields = document.querySelectorAll('.field');
const labels = document.querySelectorAll('.label');
const valueDays = document.querySelector('.value[data-days]');
const valueHours = document.querySelector('.value[data-hours]');
const valueMinutes = document.querySelector('.value[data-minutes]');
const valueSeconds = document.querySelector('.value[data-seconds]');

startBtn.setAttribute('disabled', true);

let futureTime = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    futureTime = selectedDates[0];
    const currentTime = Date.now();
    if (currentTime >= futureTime) {
      Notiflix.Notify.failure('Please change a date');
    } else {
      startBtn.removeAttribute('disabled');
      console.log(futureTime);
    }
  },
};

flatpickr('#datetime-picker', options);

class Timer {
  constructor({ onTick }) {
    this.onTick = onTick;
  }

  start = () => {
    setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = this.convertMs(futureTime - currentTime);

      this.onTick(deltaTime);
    }, 1000);
  };

  addLeadingZero = value => {
    return String(value).padStart(2, '0');
  };
  convertMs = ms => {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = this.addLeadingZero(Math.floor(ms / day));
    const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = this.addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    const seconds = this.addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
  };
}

const timer = new Timer({ onTick: updateClockface });

startBtn.addEventListener('click', timer.start);

function updateClockface({ days, hours, minutes, seconds }) {
  valueDays.textContent = `${days}`;
  valueHours.textContent = `${hours}`;
  valueMinutes.textContent = `${minutes}`;
  valueSeconds.textContent = `${seconds}`;
}
for (let label of labels) {
  label.style.color = 'black';
  label.style.fontSize = '25px';
  label.style.fontWeight = '400';
}
for (let field of fields) {
  field.style.color = 'brown';
  field.style.marginLeft = '20px';
  field.style.marginTop = '10px';
  field.style.fontSize = '35px';
  field.style.fontWeight = '400';
}
