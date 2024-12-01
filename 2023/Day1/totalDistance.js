var fs = require('fs');
var filePath = './data.txt';
fs.readFile(filePath, 'utf-8', function (err, data) {
    if (err) {
        console.error('Error while loading file:', err);
        return;
    }
    var leftNumbersTab = [];
    var rightNumbersTab = [];
    var total = 0;
    // Lire les données et remplir les tableaux
    data.split('\n')
        .filter(function (line) { return line.trim() !== ''; }) // Ignorer les lignes vides
        .forEach(function (line) {
        var _a = line.split(/\s+/).map(Number), left = _a[0], right = _a[1]; // Convertir directement en nombres
        if (!isNaN(left))
            leftNumbersTab.push(left);
        if (!isNaN(right))
            rightNumbersTab.push(right);
    });
    // Fonction pour obtenir et supprimer la valeur minimale
    var getMinValue = function (tab) {
        var minValue = Math.min.apply(Math, tab); // Trouver la valeur minimale
        var index = tab.indexOf(minValue); // Trouver son index
        if (index !== -1)
            tab.splice(index, 1); // Supprimer l'élément
        return minValue;
    };
    // Calculer la distance totale
    while (leftNumbersTab.length > 0 && rightNumbersTab.length > 0) {
        var minValueLeft = getMinValue(leftNumbersTab);
        var minValueRight = getMinValue(rightNumbersTab);
        var gap = Math.abs(minValueLeft - minValueRight); // Calcul de l'écart
        total += gap;
    }
    console.log('Total distance:', total);
});
