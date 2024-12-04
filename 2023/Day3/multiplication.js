/* le prend une string et pour chaque "mul(x,y)" on addition une multiplication */

var fs =  require('fs');

const pathFile = './data.txt';

fs.readFile('./data.txt', 'utf8', (err, data) => {
    var finalResult = 0;
    const tab = data.split('do()');
    console.log(tab);
    const regEx = /mul\((\d{1,3}),(\d{1,3})\)/g; // prend les mul en tableau
    const regExMul = /\d+/g; // prend les nombre d'une ligne
    tab.forEach(line => {
        if(!line.match('don\'t()')){
            console.log('no don\'t in line : ', line);
            finalResult += calculateLine(line);
        }
        else{
            console.log('line contains don\'t : ', line);
            finalResult += calculateLine(line.split('don\'t()')[0]);
        }
    })

    function calculateLine(line) {
        console.log('line in function : ', line);
        var result = 0;
        const mulTab = line.match(regEx);
        console.log(mulTab);
        mulTab.forEach(line => {
            result += line.match(/\d+/g).map(Number)[0] * line.match(/\d+/g).map(Number)[1];
        });

        return result;
    }

    console.log('result', finalResult);

    
}

);

