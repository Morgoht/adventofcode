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
fs.readFile('./data.txt', 'utf8', function (err, data) {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    var dataTab = data.split('\n');
    dataTab.forEach(function (line) {
        var numbers = line.split(' ').map(Number);
        if (checkSafeIncr(__spreadArray([], numbers, true)) || checkSafeDec(__spreadArray([], numbers, true))) {
            safeReport++;
        }
    });
    // Vérifie si une combinaison est possible en croissant
    function checkSafeIncr(numbers) {
        return check(numbers, function (a, b) { return b - a; }, true);
    }
    // Vérifie si une combinaison est possible en décroissant
    function checkSafeDec(numbers) {
        return check(numbers, function (a, b) { return a - b; }, true);
    }
    // Fonction générique qui contient le tableau original
    function check(numbers, compare, tryAgain) {
        for (var i = 1; i < numbers.length; i++) {
            var diff = compare(numbers[i - 1], numbers[i]);
            if (diff < 1 || diff > 3) {
                if (tryAgain) {
                    // parcours unique
                    for (var j = 0; j < numbers.length; j++) {
                        var modifiedNumbers = __spreadArray(__spreadArray([], numbers.slice(0, j), true), numbers.slice(j + 1), true);
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
