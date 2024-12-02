var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var fs = require('fs');
var safeReport = 0;
fs.readFile('./data2.txt', 'utf8', function (err, data) {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    var dataTab = data.split('\n').filter(function (line) { return line.trim() !== ''; }); // Ignorer les lignes vides
    dataTab.forEach(function (line) {
        var numbers = line.split(' ').map(Number);
        if (numbers[1] > numbers[0]) {
            safeReport += checkSafeIncr(numbers, true); // Récursivité autorisée
        }
        else {
            safeReport += checkSafeDec(numbers, true); // Récursivité autorisée
        }
    });
    // Vérifie l'ordre croissant avec suppression d'une erreur
    function checkSafeIncr(numbers, allowRetry) {
        for (var i = 1; i < numbers.length; i++) {
            var diff = numbers[i] - numbers[i - 1];
            if (diff < 1 || diff >= 4) {
                if (allowRetry) {
                    var updatedNumbers = __spreadArray([], numbers, true);
                    updatedNumbers.splice(i, 1); // Supprime le nombre fautif
                    return checkSafeIncr(updatedNumbers, false); // Réévalue la ligne sans récursivité
                }
                return 0; // Si déjà une tentative, invalide la ligne
            }
        }
        return 1; // Ligne valide
    }
    // Vérifie l'ordre décroissant avec suppression d'une erreur
    function checkSafeDec(numbers, allowRetry) {
        var result = 0;
        for (var i = 1; i < numbers.length; i++) {
            var diff = numbers[i - 1] - numbers[i];
            if (diff < 1 || diff >= 4) {
                if (allowRetry) {
                    var updatedNumbers = __spreadArray([], numbers, true);
                    updatedNumbers.splice(i, 1); // Supprime le nombre fautif
                    return checkSafeDec(updatedNumbers, false); // Réévalue la ligne sans récursivité
                }
                return 0; // Si déjà une tentative, invalide la ligne
            }
        }
        return 1; // Ligne valide
    }
    console.log('Safe Report:', safeReport);
});
