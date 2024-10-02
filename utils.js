// function allowOnlyNumbersAndDot(event) {
//     const char = String.fromCharCode(event.which);

//     const pattern = /^[0-9.]$/;

//     const controlKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete'];
//     if (controlKeys.includes(event.key)) {
//         return; 
//     }

//     if (!pattern.test(char)) {
//         event.preventDefault();
//     }

//     if (event.target.value.includes('.') && char === '.') {
//         event.preventDefault();
//     }
// }

// function allowOnlyNumbersAndDot(event) {
//     const inputValue = event.target.value
//     const pattern = /^[0-9.]$/

//     const controlKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete']
//     if (controlKeys.includes(event.key)) {
//         return
//     }

//     if (event.type === 'keydown') {
//         const char = event.key
//         if (!pattern.test(char)) {
//             event.preventDefault()
//         }
//         if (inputValue.includes('.') && char === '.') {
//             event.preventDefault()
//         }
//     }

//     if (event.type === 'input') {
//         const sanitizedValue = inputValue.replace(/[^0-9.]/g, '')
//         const dotCount = (sanitizedValue.match(/\./g) || []).length
//         if (dotCount > 1) {
//             event.target.value = sanitizedValue.substring(0, sanitizedValue.lastIndexOf('.'))
//         } else {
//             event.target.value = sanitizedValue
//         }
//     }
// }



function allowOnlyNumbersAndDot(event) {
    const inputValue = event.target.value
    const sanitizedValue = inputValue.replace(/[^0-9.]/g, '')
    const dotCount = (sanitizedValue.match(/\./g) || []).length

    if (dotCount > 1) {
        event.target.value = sanitizedValue.substring(0, sanitizedValue.lastIndexOf('.'))
    } else {
        event.target.value = sanitizedValue
    }
}

