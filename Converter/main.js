const { type } = require('os');

//input
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

//consts
const SectionLength = 5
const key = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
]
let input =1
const BinaryIncrements = [1, 2, 4, 8, 16, 32, 64]

let test = [96, 97, 120, 144, 221, 243, 600, 704, 744, 754, 775, 793, 923, 980, 1003, 1072, 1102, 1115, 1387, 1415, 1466, 1568, 1713, 1728, 1832, 1865, 2023, 2075, 2135, 2214, 2279, 2356, 2409, 2450, 2455, 2464, 2560, 2683, 2781, 3017, 3025, 3076, 3103, 3106, 3216, 3284, 3307, 3519, 3537, 3876, 3976, 4266, 4575, 4606, 4630, 4631, 4693, 4715, 4762, 4884, 4965, 499]
console.log(test.sort())

function binary(input)
{
    let number = 0
    for (i=input.length-1; i>-1;i--)
    {
        number += input[input.length-i-1] * BinaryIncrements[i]
    }
    console.log(number)
}
  
  readline.question('Input the string', name => {
    input = name
    
    readline.close();
    let binaryPieces = [] 
    for (i=0; i<input.length;i++)
    {
      if (type(binaryPieces[Math.floor(i/SectionLength)]) == null) {
        binaryPieces[Math.floor(i/SectionLength)] = ""
        console.log("Test")
      } 
      console.log(Math.floor(i/SectionLength))
      binaryPieces[Math.floor(i/SectionLength)] = binaryPieces[Math.floor(i/SectionLength)]+toString(i)
    }
    console.log(binaryPieces)
  });

  //MakeAnAI123