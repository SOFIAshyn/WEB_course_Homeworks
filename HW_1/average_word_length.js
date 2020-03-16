function avgWordLengthCalc(str) {
    const regex = /[^\w\s]/g;
    let arr = str.replace(regex, "").split(" ");
    let wordsSum = 0;
    arr.forEach(word => wordsSum = wordsSum + word.length);

    return (wordsSum / (arr.length)).toFixed(2);
}

// let s = "q w e r t y."
// let s = "The reduce method executes a reducer function."
// let s = "callback is called, accumulator!"
// let s = ""