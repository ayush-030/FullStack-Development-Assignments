(function(){
  const display = document.getElementById('display');
  const clearBtn = document.getElementById('clear');
  const equalsBtn = document.getElementById('equals');
  const decimalBtn = document.getElementById('decimal');
  const buttons = document.querySelectorAll('button');

  let currentInput = '0';
  let resultDisplayed = false;


  function updateDisplay(value) {
    display.textContent = value;
  }

  function addInput(value) {
    if (resultDisplayed) {
   
      if (/[0-9.]/.test(value)) {
        currentInput = (value === '.') ? '0.' : value;
      } else {
        currentInput += value;
      }
      resultDisplayed = false;
      updateDisplay(currentInput);
      return;
    }

    if(currentInput === '0' && value !== '.' && !/[+\-*/]/.test(value)) {
      currentInput = value;
    } else if (value === '.') {
    
      const parts = currentInput.split(/[+\-*/]/);
      const lastNumber = parts[parts.length -1];
      if (!lastNumber.includes('.')) {
        currentInput += value;
      }
    } else {
      currentInput += value;
    }
    updateDisplay(currentInput);
  }


  function clearInput() {
    currentInput = '0';
    updateDisplay(currentInput);
    resultDisplayed = false;
  }
  clearBtn.addEventListener('click', clearInput);

  buttons.forEach(btn => {
    if (btn.hasAttribute('data-number')) {
      btn.addEventListener('click', () => {
        addInput(btn.getAttribute('data-number'));
      });
    } else if (btn.classList.contains('operator')) {
      btn.addEventListener('click', () => {
        if (resultDisplayed) {
          resultDisplayed = false;
        }
  
        if(/[+\-*/]$/.test(currentInput)) {
          currentInput = currentInput.slice(0, -1) + btn.getAttribute('data-operator');
        } else {
          currentInput += btn.getAttribute('data-operator');
        }
        updateDisplay(currentInput);
      });
    } 
  });


  decimalBtn.addEventListener('click', () => {
    addInput('.');
  });

 
  function calculateResult() {
    try {
     
      if(/[+\-*/.]$/.test(currentInput)) {
        currentInput = currentInput.slice(0, -1);
      }
    
      const sanitizedInput = currentInput.replace(/×/g, '*').replace(/÷/g, '/');
      const answer = eval(sanitizedInput);
      updateDisplay(answer);
      currentInput = String(answer);
      resultDisplayed = true;
    } catch (e) {
      updateDisplay('Error');
      currentInput = '0';
      resultDisplayed = false;
    }
  }
  equalsBtn.addEventListener('click', calculateResult);

  window.addEventListener('keydown', (e) => {
    const key = e.key;

    if ((key >= '0' && key <= '9') || ['+', '-', '*', '/'].includes(key)) {
      e.preventDefault();
      if(resultDisplayed && (key >= '0' && key <= '9' || key === '.')) {
        currentInput = key === '.' ? '0.' : key;
        resultDisplayed = false;
        updateDisplay(currentInput);
        return;
      }
      if(/[+\-*/]$/.test(currentInput) && ['+', '-', '*', '/'].includes(key)) {
        currentInput = currentInput.slice(0, -1) + key;
      } else {
        currentInput += key;
      }
      updateDisplay(currentInput);
    }
    else if(key === '.') {
      e.preventDefault();
      addInput('.');
    }
    else if(key === 'Enter' || key === '=') {
      e.preventDefault();
      calculateResult();
    }
    else if(key === 'Backspace') {
      e.preventDefault();
      if(resultDisplayed || currentInput.length === 1) {
        clearInput();
      } else {
        currentInput = currentInput.slice(0, -1);
        updateDisplay(currentInput || '0');
      }
    }
    else if(key === 'Escape' || key.toLowerCase() === 'c') {
      e.preventDefault();
      clearInput();
    }
  });

})();
