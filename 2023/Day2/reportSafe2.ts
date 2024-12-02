const fs = require('fs');

let safeReport = 0;

fs.readFile('./data2.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  const dataTab = data.split('\n').filter((line) => line.trim() !== ''); // Ignorer les lignes vides

  dataTab.forEach((line) => {
    const numbers = line.split(' ').map(Number);

    if (numbers[1] > numbers[0]) {
      safeReport += checkSafeIncr(numbers, true); // Récursivité autorisée
    } else {
      safeReport += checkSafeDec(numbers, true); // Récursivité autorisée
    }
  });

  // Vérifie l'ordre croissant avec suppression d'une erreur
  function checkSafeIncr(numbers, allowRetry) {
    for (let i = 1; i < numbers.length; i++) {
      const diff = numbers[i] - numbers[i - 1];

      if (diff < 1 || diff >= 4) {
        if (allowRetry) {
          const updatedNumbers = [...numbers];
          updatedNumbers.splice(i, 1); // Supprime le nombre fautif
          return checkSafeIncr(updatedNumbers, false); // Réévalue la ligne sans récursivité
        }
        return 0; // Si déjà une tentative, invalide la ligne
      }
    }
    return 1; 
  }


  function checkSafeDec(numbers, allowRetry) {
    var result = 0;
    for (let i = 1; i < numbers.length; i++) {
      const diff = numbers[i - 1] - numbers[i];

      if (diff < 1 || diff >= 4) {
        if (allowRetry) {
          const updatedNumbers = [...numbers];
          updatedNumbers.splice(i, 1); 
          return checkSafeDec(updatedNumbers, false); 
        }
        return 0; 
      }
    }
    return 1; // Ligne valide
  }

  console.log('Safe Report:', safeReport);
});