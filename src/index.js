module.exports = function getZerosCount(number, base) {

    var allPrimeNum = [];

    //находим все простые числа из диапазона 2-256

    nextPrimeNum:
        for (var primeNum = 2; primeNum <= 256; primeNum++) {

            for (var j = 2; j < primeNum; j++) {
                if (primeNum % j == 0) continue nextPrimeNum;
            }

            allPrimeNum.push( primeNum );
        }

    var allSimpleDividers = [];

    //находим все простые делители для числа base

    for (var i = 0; i <= allPrimeNum.length; i++) {

        while (base % allPrimeNum[i] == 0) {
            base = base / allPrimeNum[i];
            allSimpleDividers.push( allPrimeNum[i]);
        }

    }

    var countsOfZero = [];

    //находим количество нулей для всех делителей (при повторении простого делителя - делим количество нулей на
    //количество повторений этого делителя

    for (var j = 0; j < allSimpleDividers.length; j++) {

        var countOfZeroByJ = 0;

        for (var k = 1; k < number; k++) {

            var divider = allSimpleDividers[j];

            if(Math.pow(allSimpleDividers[j],k) < number){
                divider = Math.pow(allSimpleDividers[j],k);
                countOfZeroByJ = countOfZeroByJ + Math.floor( number / divider );
            } else {
                var countOfSameDivider = 1;

                for (var l = 1; l <= allSimpleDividers.length; l++) {
                    if (allSimpleDividers[j] == allSimpleDividers[j + l]) {
                        countOfSameDivider++;
                    }
                }
                countsOfZero.push(Math.floor(countOfZeroByJ / countOfSameDivider));
                break;
            }

        }

    }

    var minCountOfZero = 0;
    var minOfTwo = countsOfZero[0];

    //находим минимальное значение из массива - это и есть ответ

    for(var v = 0; v < countsOfZero.length; v++) {
        minCountOfZero = Math.min(countsOfZero[v], minOfTwo);
        minOfTwo = minCountOfZero;
    }

    return minCountOfZero;

}
