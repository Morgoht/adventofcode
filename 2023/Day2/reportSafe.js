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
        if (numbers[1] > numbers[0]) {
            safeReport += checkSafeIncr(numbers);
        }
        else {
            safeReport += checkSafeDec(numbers);
        }
    });
    // Vérifie l'ordre croissant
    function checkSafeIncr(numbers) {
        var result = 1;
        for (var i = 1; i < numbers.length; i++) {
            var diff = numbers[i] - numbers[i - 1];
            if (diff < 1 || diff >= 4) {
                result = 0;
                break;
            }
        }
        return result;
    }
    // Vérifie l'ordre décroissant
    function checkSafeDec(numbers) {
        var result = 1;
        for (var i = 1; i < numbers.length; i++) {
            var diff = numbers[i - 1] - numbers[i];
            if (diff < 1 || diff >= 4) {
                result = 0;
                break;
            }
        }
        return result;
    }
    console.log('Safe Report:', safeReport);
});
