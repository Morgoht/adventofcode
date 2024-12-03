/* le prend une string et pour chaque "mul(x,y)" on addition une multiplication */

var fs =  require('fs');

const pathFile = './data.txt';

fs.readFile('./data.txt', 'utf8', (err, data) => {

    var result = 0;
    const regEx = /mul\((\d{1,3}),(\d{1,3})\)/g;
    const regExMul = /\d+/g; // prend les nombre d'une ligne
    const mulTab = data.match(regEx);
    console.log(mulTab);
    mulTab.forEach(line => {
        console.log('line',line);
        
        result += line.match(/\d+/g).map(Number)[0] * line.match(/\d+/g).map(Number)[1];

    })
    console.log('result', result);

    
}

);

