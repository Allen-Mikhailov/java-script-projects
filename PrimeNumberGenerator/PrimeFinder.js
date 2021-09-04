const fs = require('fs');

const PrimeCount = 100000

var FoundPrimes = 0
const Primes = {}

for (var i = 3; FoundPrimes < PrimeCount; i += 2)
{
    var IsPrime = true
    for (var j = 2; j < i; j++) 
    {
        if (i%j == 0)
        {
            IsPrime = false
            break
        }
    } 

    if (IsPrime) 
    {
        Primes[FoundPrimes] = i
        FoundPrimes += 1
    }
}

fs.writeFileSync('./Primes.JSON', JSON.stringify(Primes, null, 2))