function subsetSum(numbers, target, partial) {
    var s, n;
    partial = partial || [];

    s = partial.reduce((a, b) => a + b, 0)

    if (s === target && partial.length === 3) result.push(partial);
    if (s >= target || partial.length === 3) return;

    for (var i = 0; i < numbers.length; i++) {
        n = numbers[i];
        subsetSum(numbers, target, partial.concat([n]));
    }
}



var permArr = [];
var usedChars = [];

function permute(input) {
    var i, ch;
    for (i = 0; i < input.length; i++) {
        ch = input.splice(i, 1)[0];
        usedChars.push(ch);
        if (input.length == 0)
            permArr.push(usedChars.slice());
        permute(input);
        input.splice(i, 0, ch);
        usedChars.pop();
    }
    return permArr
};

const maxCalldataSize = 100000
const separatorNum = 5000
let subset = [];
for (i = 0; i < maxCalldataSize; i+=separatorNum) {
    subset.push(i)
}




var result = [];

subsetSum(subset, maxCalldataSize)
var map = {};
var final = [];
result.forEach(item => {
    const all = permute(item);
    all.forEach(part => {
        if (!map[part.join()]) {
            final.push(part)
            map[part.join()] = true
        }
    })

})
