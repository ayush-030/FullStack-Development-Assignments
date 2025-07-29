const counter = document.getElementById('counter');
const incrementBtn = document.getElementById('increment');
const decrementBtn = document.getElementById('decrement');
const resetBtn = document.getElementById('reset');

let count = 0;

function updateCounter() {
  counter.textContent = count.toString();
  // Optional: add a subtle scale animation on update
  counter.style.transform = 'scale(1.2)';
  setTimeout(() => {
    counter.style.transform = 'scale(1)';
  }, 150);
}

incrementBtn.addEventListener('click', () => {
  count++;
  updateCounter();
});

decrementBtn.addEventListener('click', () => {
  if (count > 0) {
    count--;
    updateCounter();
  }
});

resetBtn.addEventListener('click', () => {
  count = 0;
  updateCounter();
});
