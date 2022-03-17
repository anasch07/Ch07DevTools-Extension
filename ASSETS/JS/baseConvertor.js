document.addEventListener('DOMContentLoaded',async ()=>{
    const decimalInputOutput=document.querySelector("#decimalInputOutput");
    const hexaInputOutput=document.querySelector("#hexaInputOutput");
    const octalInputOutput=document.querySelector("#octalInputOutput");
    const binaryInputOutput=document.querySelector("#binaryInputOutput");
    const inputs=document.querySelectorAll(".form-control");
    const copys=document.querySelectorAll(".btn.btn-primary");

    decimalInputOutput.addEventListener("input",()=>{
        let data=parseInt(decimalInputOutput.value);
        console.log(data);
        hexaInputOutput.value=decimalToHexadConvert(data);
        octalInputOutput.value=decimalToOctalConvert(data);
        binaryInputOutput.value=decimalToBinaryConvert(data);
        }
    )
    hexaInputOutput.addEventListener("input",()=>{
        let data=(hexaInputOutput.value).toLowerCase();

        decimalInputOutput.value=hexadToDecimalConvert(data);
        octalInputOutput.value=hexadToOctalConvert(data);
        binaryInputOutput.value=hexadToBinaryConvert(data);

    })

    octalInputOutput.addEventListener("input",()=>{
        let data=octalInputOutput.value;
        decimalInputOutput.value=octalToDecimalConvert(data);
        hexaInputOutput.value=octalToHexadConvert(data);
        binaryInputOutput.value=octalToBinaryConvert(data);
    })

    binaryInputOutput.addEventListener("input",()=>{
        let data=binaryInputOutput.value;
        decimalInputOutput.value=binaryToDecimalConvert(data);
        hexaInputOutput.value=binaryToHexadConvert(data);
        octalInputOutput.value=binaryToOctalConvert(data);
    })


    inputs.forEach(input=>{
        input.addEventListener("input",()=>{
            if(document.getElementById(input.id).value===""){
                decimalInputOutput.value=""
                hexaInputOutput.value=""
                octalInputOutput.value=""
                binaryInputOutput.value=""
            }
        })
    })
    console.log(copys)
    copys.forEach(copy=>{
        copy.addEventListener("click",()=>{
            const copyFrom=document.createElement("textarea");
            if(copy.id=="copyElementDecimal"){
                copyFrom.value=decimalInputOutput.value;
            }
            else if(copy.id=="copyElementHexa"){
                copyFrom.value=hexaInputOutput.value;
            }
            else if(copy.id=="copyElementOctal"){
                copyFrom.value=octalInputOutput.value;
            }
            else {
                copyFrom.value=binaryInputOutput.value;
            }
            document.body.appendChild(copyFrom);
            copyFrom.select();
            document.execCommand('copy');
            copyFrom.blur();
            document.body.removeChild(copyFrom);
        })
    })

})

toDecimal = (num, base) => {
    let newNum;

    if (base != 16) {
        newNum = num
            .split("")
            .reverse()
            .join("");
    } else {
        newNum = num.split("");
        forHex(newNum);
        newNum = newNum.reverse();
    }

    let final = 0;
    for (let i = 0; i < newNum.length; i++) {
        const bin = +(newNum[i] * Math.pow(`${base}`, `${i}`));
        final += bin;
    }

    return final;
};

fromDecimal = (decimalNo, base) => {
    let remainder = [];
    let decimal = +decimalNo;
    let convertedNumber;

    if (decimal === 0) {
        remainder = 0;
        return remainder;
    } else {
        while (decimal >= 1) {
            if (decimal % base == 0) {
                decimal = +(decimal / base);
                remainder.push("0");
            } else {
                remainder.push(`${decimal % base}`.toString());
                decimal = +Math.floor(+(decimal / base));
            }
        }
    }
    if (base != 16) {
        convertedNumber = remainder.reverse().join("");
        return convertedNumber;
    } else {
        convertedNumber = remainder.reverse();
        forHex(convertedNumber);
        convertedNumber = convertedNumber.join("");
        return convertedNumber;
    }
};

binaryToDecimalConvert = binaryNo => {
    let result = toDecimal(binaryNo, 2);
    return +result;
};

decimalToBinaryConvert = decimalNo => {
    let result = fromDecimal(decimalNo, 2);
    return result;
};

binaryToOctalConvert = binaryNo => {
    const octal = parseInt(binaryNo, 2).toString(8);
    return octal;
};

binaryToHexadConvert = binaryNo => {
    const hex = parseInt(binaryNo, 2).toString(16);
    return hex;
};

octalToBinaryConvert = octalNo => {
    let octal = octalNo.split("");
    let m = [];
    for (let i = 0; i < octal.length; i++) {
        let n = decimalToBinaryConvert(octal[i]);
        if (n >= 10 && n < 100) {
            m.push(`0${n}`);
        } else if (n < 10) {
            m.push(`00${n}`);
        } else {
            m.push(n);
        }
    }
    return m.join("");
};

hexadToBinaryConvert = hexadNo => {
    let hex = hexadNo.split("");
    forHex(hex);

    let m = [];
    for (let i = 0; i < hex.length; i++) {
        let n = decimalToBinaryConvert(hex[i]);
        if (n >= 100 && n < 1000) {
            m.push(`0${n}`);
        } else if (n >= 10 && n < 100) {
            m.push(`00${n}`);
        } else if (n < 10) {
            m.push(`000${n}`);
        } else {
            m.push(n);
        }
    }
    return m.join("");
};

decimalToOctalConvert = decimalNo => {
    let result = fromDecimal(decimalNo, 8);
    return +result;
};

decimalToHexadConvert = decimalNo => {
    let result = fromDecimal(decimalNo, 16);
    return result;
};

octalToDecimalConvert = octalNo => {
    let result = toDecimal(octalNo, 8);
    return +result;
};

hexadToDecimalConvert = hexadNo => {
    let result = toDecimal(hexadNo, 16);
    return result;
};

hexadToOctalConvert = hexadNo => {
    const octal = parseInt(hexadNo, 16).toString(8);
    return octal;
};

octalToHexadConvert = octalNo => {
    const octal = parseInt(octalNo, 8).toString(16);
    return octal;
};

printValue = convertedValue => {
    document.querySelector("#toResult").value = convertedValue;
};

const forHex = alteredArray => {
    alteredArray.forEach((arr, i) => {
        switch (arr) {
            case "a":
                alteredArray.splice(i, 1, "10");
                break;
            case "10":
                alteredArray.splice(i, 1, "a");
                break;

            case "b":
                alteredArray.splice(i, 1, "11");
                break;
            case "11":
                alteredArray.splice(i, 1, "b");
                break;

            case "c":
                alteredArray.splice(i, 1, "12");
                break;
            case "12":
                alteredArray.splice(i, 1, "c");
                break;

            case "d":
                alteredArray.splice(i, 1, "13");
                break;
            case "13":
                alteredArray.splice(i, 1, "d");
                break;

            case "e":
                alteredArray.splice(i, 1, "14");
                break;
            case "14":
                alteredArray.splice(i, 1, "e");
                break;

            case "f":
                alteredArray.splice(i, 1, "15");
                break;
            case "15":
                alteredArray.splice(i, 1, "f");
                break;

            default:
                break;
        }
    });
};
