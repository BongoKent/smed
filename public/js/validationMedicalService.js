function validateForm(){
    console.log("robie walida")

    const changeInput = document.getElementById('Change');
   

    const errorChange = document.getElementById('errorChange');
    const errorsSummary = document.getElementById('errorsSummary');

    //resetErrors([changeInput],[errorChange],errorsSummary);

    let valid = true ; 

    console.log("robie walida")
    if(!checkRequired(changeInput.value)){
        valid = false;
        changeInput.classList.add("error-input");
        errorChange.innerText= "Wymagana liczba";
    } else if (!checkNumber(changeInput)){
        valid = false;
        changeInput.classList.add("error-input");
        errorChange.innerText = "Pole musi być liczbą";
    }

    if(!valid){
        errorsSummary.innerText = "Formularz zawiera błędy"
    }
    return valid ; 

}
