/**Total distance 
 * Obkectif : coupler le plus petit nombre de la liste de gauche
 * avec le plus petit de la liste de droit. Puis le second plus petit 
 * et ainsi de suite.
 * 
 * Pour chaque paire, trouver l'ecart entre les deux
 * et aditionner tout ça
*/
const fs = require('fs');
const { isUtf8 } = require('buffer');


const filePath = './data.txt';

fs.readFile(filePath, 'utf-8', (err, data) => {
    if(err){
        console.error('error while loading file');
        return;
    }
    //console.log(data);
    // j'ai bien accès aux données, maintenant il faut mettre dans un premier tableai
    // les donnée de gauche et dans un second les données de droite.
const leftNumbersTab: number[] = [];
const rightNumbersTab: number[] = [];
var total: number = 0;
data.split('\n')
.forEach(line => {
    //destructuration
    const [leftNumbers, rightNumbers] = line.split('  ');
    rightNumbersTab.push(parseInt(rightNumbers));
    leftNumbersTab.push(parseInt(leftNumbers));
})
const getMinValue = (tab) => {
    console.log(tab);
    var minValue;
    tab.forEach(n => {
        if(n < minValue)minValue = n;
    });
    tab.pop(minValue);
    return minValue;
}

console.log('left tab', leftNumbersTab);
console.log('right tab', rightNumbersTab);

while(leftNumbersTab.length > 0){
    var minValueLeft = getMinValue(leftNumbersTab);
    var minValueRight = getMinValue(rightNumbersTab);
    

    var gap: number = (minValueLeft - minValueRight);
    if(gap <0) gap = gap* -1;
    console.log(total)
    total += gap;
}
console.log(total);

})
