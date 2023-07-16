// CONSTANTS
const EMAIL_REGEX = /^[\w-\.]+a([\w-]+\.)+[\w-]{2,4}$/
const PHONE_REGEX = /[0-9]{3}-[0-9]{3}-[0-9]{4}/

// FUNCTIONS
let validate = (e) => {
    let inputs = document.querySelectorAll("input");
    let passwords = [];


    // Display error message where applicable
    inputs.forEach( (input) => {
        
        // Check for empty fields - display error if empty
        if (input.value === "")
            manageError(input, "Please enter a value.");

        // Validate email format - display error if invalid
        else if (input.id === "email" && !EMAIL_REGEX.test(input.value)) {
            manageError(input, "Please enter a valid email.");
        }

        // Validate phone number format - display error if invalid
        else if (input.id === "phone-number" && !PHONE_REGEX.test(input.value)) {
            manageError(input, "Please match the requested format.");
        }

        // Default - remove error messages if above validations were passed
        else {
            manageError(input, "", false);
        }

        // Store passwords for later side-by-side comparison
        if (input.id === "password" || input.id === "password-confirmation")
            passwords.push(input);

    });

    let pass, confirm;

    // Destructure array into separate variables
    [pass, confirm] = passwords;

    if (pass.value !== confirm.value) {
        manageError(pass, "Passwords do not match.");
        manageError(confirm, "Passwords do not match.");
    }

}


// Behavior depends on the "show" argument - show an error with a specified messagee if true, and remove the error if false. Also applies and removes the "invalid" rule set
let manageError = (inputField, message, show=true, ) => {

    // Set value of error message - only shown if show=true
    inputField.nextElementSibling.textContent = message;

    // Reveal the error message and add the .invalid class for visual clarity
    if (show) {
        inputField.nextElementSibling.style.visibility = "visible";
        inputField.classList.add("invalid");
    }

    // Hide the error message and remove the .invalid class for visual clarity
    else {
        inputField.nextElementSibling.style.visibility = "hidden";
        inputField.classList.remove("invalid");
    }

}


// MAIN SCRIPT
let submit = document.querySelector('.submit');

submit.addEventListener("click", validate);