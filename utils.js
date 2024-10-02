function allowOnlyNumbersAndDot(event) {
    const char = String.fromCharCode(event.which);

    const pattern = /^[0-9.]$/;

    const controlKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete'];
    if (controlKeys.includes(event.key)) {
        return; 
    }

    if (!pattern.test(char)) {
        event.preventDefault();
    }

    if (event.target.value.includes('.') && char === '.') {
        event.preventDefault();
    }
}


function showToast(message, type) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');

    toastMessage.innerText = message; // Set the message

    // Remove all types
    toast.classList.remove('success', 'error', 'warning');

    // Add the appropriate class based on the type
    if (type === 'success') {
        toast.classList.add('success');
    } else if (type === 'error') {
        toast.classList.add('error');
    } else if (type === 'warning') {
        toast.classList.add('warning');
    }

    toast.classList.add('show'); // Show the toast
    toast.classList.remove('hidden'); // Remove hidden class

    // Automatically hide the toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show'); // Hide the toast
        toast.classList.add('hidden'); // Add hidden class back
    }, 3000);
}


