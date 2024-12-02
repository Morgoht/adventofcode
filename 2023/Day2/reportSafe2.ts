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

    if (checkSafeIncr([...numbers]) || checkSafeDec([...numbers])) {
      safeReport++;
    }
  });

  // Vérifie si une combinaison est possible en croissant
  function checkSafeIncr(numbers) {
    return check(numbers, (a, b) => b - a, true);
  }

  // Vérifie si une combinaison est possible en décroissant
  function checkSafeDec(numbers) {
    return check(numbers, (a, b) => a - b, true);
  }

  // Fonction générique qui contient le tableau original
  function check(numbers, compare, tryAgain) {
    for (let i = 1; i < numbers.length; i++) {
      const diff = compare(numbers[i - 1], numbers[i]);
      if (diff < 1 || diff > 3) {
        if (tryAgain) {
          // parcours unique
          for (let j = 0; j < numbers.length; j++) {
            const modifiedNumbers = [...numbers.slice(0, j), ...numbers.slice(j + 1)];
            if (check(modifiedNumbers, compare, false)) {
              return true;
            }
          }
        }
        return false; // Aucune combinaison valide trouvée
      }
    }
    return true; // Pas d'erreur détectée
  }

  console.log('Safe Report:', safeReport);
});
