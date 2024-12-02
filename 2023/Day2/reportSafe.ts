const fs = require('fs');

let safeReport = 0;

fs.readFile('./data.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  const dataTab = data.split('\n');

  dataTab.forEach((line) => {
    const numbers = line.split(' ').map(Number); 

    if (numbers[1] > numbers[0]) {
      safeReport += checkSafeIncr(numbers);
    } else {
      safeReport += checkSafeDec(numbers);
    }
  });

  // Vérifie l'ordre croissant
  function checkSafeIncr(numbers) {
    let result = 1;
    for (let i = 1; i < numbers.length; i++) {
      const diff = numbers[i] - numbers[i - 1];
      if (diff < 1 || diff >= 4) {
        result = 0;
        break;
      }
    }
    return result;
  }

  // Vérifie l'ordre décroissant
  function checkSafeDec(numbers) {
    let result = 1;
    for (let i = 1; i < numbers.length; i++) {
      const diff = numbers[i - 1] - numbers[i];
      if (diff < 1 || diff >= 4) {
        result = 0;
        break;
      }
    }
    return result;
  }

  console.log('Safe Report:', safeReport);
});