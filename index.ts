let arra: number[] = [];

//простейшие короткие

arra = [9, 5, 7, 9, 5, 3, 1, 4, 7, 8];
test(arra);

// случайные - 50 чисел

arra = new Array(50).fill(0);
arra = arra.map((_) => Math.floor(Math.random() * 300));
test(arra);

//100 чисел

arra = new Array(100).fill(0);
arra = arra.map((_) => Math.floor(Math.random() * 300));
test(arra);

//500 чисел

arra = new Array(500).fill(0);
arra = arra.map((_) => Math.floor(Math.random() * 300));
test(arra);

//1000 чисел

arra = new Array(1000).fill(0);
arra = arra.map((_) => Math.floor(Math.random() * 300));
test(arra);

// граничные - все числа 1 знака

arra = [1, 9, 8, 7, 5, 6, 4, 2, 3, 8, 7, 4, 6, 2, 4, 2];
test(arra);

// все числа из 2х знаков

arra = new Array(100).fill(0);
arra = arra.map((_) => Math.floor(Math.random() * 90 + 10 ));
test(arra);

// все числа из 3х знаков

arra = new Array(200).fill(0);
arra = arra.map((_) => Math.floor(Math.random() * (300 - 100) + 100));
test(arra);

// каждого числа по 3 - всего чисел 900

arra = new Array();
for(let i = 0; i < 300; i++) {
    arra.push(i);
    arra.push(i);
    arra.push(i);
}

test(arra);

function serialize(arr: number[]) {

    const sorted = [...arr].sort((a, b) => a - b);

    let result = "";
    let prev = 0;

    for (let num of sorted) {
        const delta = num - prev;
        prev = num;

        let code = "";
        let value = delta;

        if (value < 127) {
            code = String.fromCharCode(value);
        } else {
            let i = 0;
            while(value > 0) {
                value -= 127;
                i++;
            } 
            if(value < 0) {
                i--
                value += 127;
            }
            for (let j = 0; j < i; j++) {
                code+=String.fromCharCode(127);
            }
            code+=String.fromCharCode(value);
        }

        result += code;
    }

    return result;

}


function deserialize(str: string): number[] {

    const numbers: number[] = [];

    const divider = String.fromCharCode(127);

    let prev = 0;
    let overcharges = 0;

    for (let char of str) {
        let delta = 0;
        if(char !== divider) {
            delta = char.charCodeAt(0) + overcharges * 127;
            prev += delta;
            overcharges = 0;
            numbers.push(prev);
        } else {
            overcharges++    
        }
    }

    return numbers;
}


function assert(condition: boolean) {
    if (!condition) {
        throw "Assertion failed";
    }
}

function test(arra: number[]) {
    let msgInit = JSON.stringify(arra);
    let sortedMsg = JSON.stringify([...arra].sort((a, b) => a - b))
    let serialized = serialize(arra);
    let deserialized = deserialize(serialized);
    let deserializedMsg = JSON.stringify(deserialized)
    assert(sortedMsg === deserializedMsg);
    console.log(`Исходная строка: ${msgInit};\nCжатая строка: ${serialized};\nКоэффициент сжатия: ${serialized.length/msgInit.length}.`)
}