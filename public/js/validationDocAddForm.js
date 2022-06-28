function validateForm(){

    const NameInput = document.getElementById('Name');
    const LastNameInput = document.getElementById('LastName');
    const SalaryInput = document.getElementById('Salary');
    const dateInput = document.getElementById('EmploymentDate');

    const errorName = document.getElementById('errorName');
    const errorLastName = document.getElementById('errorLastName');
    const errorSalary = document.getElementById('errorSalary');
    const errorDate = document.getElementById('errorEmploymentDate');
    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([NameInput,LastNameInput,SalaryInput],[errorName,errorLastName,errorSalary],errorsSummary);

    let valid = true ; 

    if(!checkRequired(NameInput.value)){
        valid = false;
        NameInput.classList.add("error-input");
        errorName.innerText= "Pole jest wymagane";
    } else if (!checkTextLengthRange(NameInput.value,3,30)){
        valid = false;
        NameInput.classList.add("error-input");
        errorName.innerText = "Pole powinno zawierać od 3 do 30 znaków";
    }

    if(!checkRequired(LastNameInput.value)){
        valid = false;
        LastNameInput.classList.add("error-input");
        errorLastName.innerText= "Pole jest wymagane";
    } else if (!checkTextLengthRange(LastNameInput.value,3,30)){
        valid = false;
        LastNameInput.classList.add("error-input");
        errorLastName.innerText = "Pole powinno zawierać od 3 do 30 znaków";
    }

    if(!checkRequired(SalaryInput.value)){
        valid = false;
        SalaryInput.classList.add("error-input");
        errorSalary.innerText= "Pole jest wymagane";
    } else if (!checkNumber(SalaryInput)){
        valid = false;
        SalaryInput.classList.add("error-input");
        errorSalary.innerText = "Pole powinno byc liczbą";
    }

    if(!checkRequired(dateInput.value)){
        valid = false;
        dateInput.classList.add("error-input");
        errorDate.innerText= "Pole jest wymagane";
    }

    if(!valid){
        errorsSummary.innerText = "Formularz zawiera błędy"
    }
    return valid ; 

}

