function validateForm(){

    const IdDoctorInput = document.getElementById('IdDoctor');
    const idPatientInput = document.getElementById('IdPatient');
    const dateVisitInput = document.getElementById('DateVisit');
    const timeVisitInput = document.getElementById('TimeVisit');

    const errorIdDoctor = document.getElementById('errorIdDoctor');
    const errorIdPatient = document.getElementById('errorIdPatient');
    const errorDateVisit = document.getElementById('errorDateVisit');
    const errorTimeVisit = document.getElementById('errorTimeVisit');
    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([IdDoctorInput,idPatientInput,dateVisitInput],[errorIdDoctor,errorIdPatient,errorDateVisit],errorsSummary);

    let valid = true ; 

    if(!checkRequired(IdDoctorInput.value)){
        valid = false;
        IdDoctorInput.classList.add("error-input");
        errorIdDoctor.innerText= "Pole jest wymagane";
    } 

    if(!checkRequired(idPatientInput.value)){
        valid = false;
        idPatientInput.classList.add("error-input");
        errorIdPatient.innerText= "Pole jest wymagane";
    } 

    if(!checkRequired(dateVisitInput.value)){
        valid = false;
        dateVisitInput.classList.add("error-input");
        errorDateVisit.innerText= "Pole jest wymagane";
    } 
    if(!checkRequired(timeVisitInput.value)){
        valid = false;
        timeVisitInput.classList.add("error-input");
        errorTimeVisit.innerText= "Pole jest wymagane";
    } 

    if(!valid){
        errorsSummary.innerText = "Formularz zawiera błędy"
    }
    return valid ; 

}

