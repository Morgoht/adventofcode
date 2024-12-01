const fs = require('fs');

const filePath = './data.txt';

fs.readFile(filePath, 'utf-8', (err, data) => {
  if (err) {
    console.error('Error while loading file:', err);
    return;
  }

  const leftNumbersTab: number[] = [];
  const rightNumbersTab: number[] = [];
  let total: number = 0;

  // Lire les données et remplir les tableaux
  data.split('\n')
    .filter(line => line.trim() !== '') // Ignorer les lignes vides
    .forEach(line => {
      const [left, right] = line.split(/\s+/).map(Number); // Convertir directement en nombres
      if (!isNaN(left)) leftNumbersTab.push(left);
      if (!isNaN(right)) rightNumbersTab.push(right);
    });

  // Fonction pour obtenir et supprimer la valeur minimale
  const getMinValue = (tab: number[]): number => {
    const minValue = Math.min(...tab); // Trouver la valeur minimale
    const index = tab.indexOf(minValue); // Trouver son index
    if (index !== -1) tab.splice(index, 1); // Supprimer l'élément
    return minValue;
  };

  // Calculer la distance totale
  while (leftNumbersTab.length > 0 && rightNumbersTab.length > 0) {
    const minValueLeft = getMinValue(leftNumbersTab);
    const minValueRight = getMinValue(rightNumbersTab);

    const gap: number = Math.abs(minValueLeft - minValueRight); // Calcul de l'écart
    total += gap;
  }

  console.log('Total distance:', total);
});