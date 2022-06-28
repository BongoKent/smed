function validateForm(){

    const nameInput = document.getElementById('Name');
    const lastNameInput = document.getElementById('LastName');
    const diseaseInput = document.getElementById('Disease');

    const errorFirstName = document.getElementById('errorName');
    const errorLastName = document.getElementById('errorLastName');
    const errorDisease = document.getElementById('errorDisease');
    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([nameInput,lastNameInput,diseaseInput],[errorFirstName,errorLastName,errorDisease],errorsSummary);

    let valid = true ; 

    if(!checkRequired(nameInput.value)){
        valid = false;
        nameInput.classList.add("error-input");
        errorFirstName.innerText= "Pole jest wymagane";
    } else if (!checkTextLengthRange(nameInput.value,3,30)){
        valid = false;
        nameInput.classList.add("error-input");
        errorFirstName.innerText = "Pole powinno zawierać od 3 do 30 znaków";
    }

    if(!checkRequired(lastNameInput.value)){
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText= "Pole jest wymagane";
    } else if (!checkTextLengthRange(lastNameInput.value,3,30)){
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = "Pole powinno zawierać od 3 do 30 znaków";
    }

    if(!checkRequired(diseaseInput.value)){
        valid = false;
        diseaseInput.classList.add("error-input");
        errorDisease.innerText= "Pole jest wymagane";
    } else if (!checkNumber(diseaseInput)){
        valid = false;
        diseaseInput.classList.add("error-input");
        errorDisease.innerText = "Pole powinno byc liczbą";
    }

    if(!valid){
        errorsSummary.innerText = "Formularz zawiera błędy"
    }
    return valid ; 

}

