/*______form inputs max______*/
const NAME_MAX_LENGTH = 32;
const EMAIL_MAX_LENGTH = 64;
const PEOPLE_MAX = 20;

//Nb of people for a reservation
var NB_OF_PEOPLE = 0;


/*______Form inputs check regexp______*/
const NAME_REGEX = new RegExp(/^[a-zA-Z-\s]+$/);
const EMAIL_REGEX = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
const DAY_REGEX = new RegExp(/^[0-2][0-9]|3[0-1]$/);
const MONTH_REGEX = new RegExp(/^0[1-9]|1[0-2]$/);
const YEAR_REGEX = new RegExp(/^[0-9]{4}$/);


/*______Form Error Messages______*/

//General error msgs
const NAN_INPUT_ERR = "Invalid field (only numbers)";  
const EMPTY_INPUT_ERR = "This field is required";
const INCOMPLETE_INPUT_ERR = "This field is incomplete";

//Name error msgs
const NAME_MAX_LENGTH_ERR = "Invalid field (" + NAME_MAX_LENGTH + " characters max)";
const NAME_FORMAT_ERR = "Invalid field. Only letters (without accent), spaces and dashes.";

//Email error msgs
const EMAIL_MAX_LENGTH_ERR = "Invalid email address (" + EMAIL_MAX_LENGTH + " characters max)";
const EMAIL_FORMAT_ERR = "Invalid email address.";

//Date error msgs
const DATE_FORMAT_ERR = "Invalid date";

//Time error msgs
const TIME_FORMAT_ERR = "Invalid time";

//Number of people error msgs
const NO_PEOPLE_INPUT_ERR = "Set the number of people for your reservation";

/*______DOM Elements______*/
var bookingFormElt = document.getElementById('booking-form');

//Elements to display error messages
var nameInputErrorElt = document.getElementById('name-input-error');
var emailInputErrorElt = document.getElementById('email-input-error');
var dateInputErrorElt = document.getElementById('date-input-error');
var timeInputErrorElt = document.getElementById('time-input-error');
var nbOfPeopleInputErrorElt = document.getElementById('nb-of-ppl-input-error');

//Elements to select the booking date
var dateFieldElt = document.getElementById('date-container');
var dayInputElt = document.getElementById('day');
var monthInputElt = document.getElementById('month');
var yearInputElt = document.getElementById('year');

//Elements to select the booking time
var timeFieldElt = document.getElementById('time-container');
var hoursInputElt = document.getElementById('hours');
var minutesInputElt = document.getElementById('minutes');
var timeSelectionElt = document.getElementById('selected-time-option');
var timeOptionsElts = Array.from(document.getElementsByClassName('time-options__item'));

//Elements to adjust the number of people for a reservation
var nbOfPeopleElt = document.getElementById("nb-of-ppl");
var nbOfPeopleFieldElt = document.getElementById("ppl-adjust");
var nbOfPeopleAdjustBtns = document.getElementById("booking-form").getElementsByTagName("button");

//inputElts contains all the inputs except the submit button
var inputElts = Array.from(document.getElementsByTagName('input'));
inputElts.pop();


/*______inputs validation functions______*/
function checkNameInput(name){
    name = name.trim();
    if(!name){
        nameInputErrorElt.innerText = EMPTY_INPUT_ERR;
        return false;
    } else if(name.length > NAME_MAX_LENGTH){
        nameInputErrorElt.innerText = NAME_MAX_LENGTH_ERR;
        return false;
    }else if(!NAME_REGEX.test(name)){
        nameInputErrorElt.innerText = NAME_FORMAT_ERR;
        return false;
    }
    return true;
}

function checkEmailInput(email){
    email = email.trim();
    if(!email){
        emailInputErrorElt.innerText = EMPTY_INPUT_ERR;
        return false;
    }else if(email.length > EMAIL_MAX_LENGTH){
        emailInputErrorElt.innerText = EMAIL_MAX_LENGTH_ERR;
        return false;
    }else if (!EMAIL_REGEX.test(email)){
        emailInputErrorElt.innerText = EMAIL_FORMAT_ERR;
        return false;
    }
    return true;
}

function checkDateInput(value, regex){
    if(!value){
        dateInputErrorElt.innerText = EMPTY_INPUT_ERR;
        return false;
    }else{
        if(!regex.test(value)){
            dateInputErrorElt.innerText = DATE_FORMAT_ERR;
            return false;
        }else{
            if(regex === YEAR_REGEX){
                const currentYear = new Date().getFullYear();
                if(parseInt(value) < currentYear){
                    dateInputErrorElt.innerText = DATE_FORMAT_ERR;
                    return false;
                }
            }
            return true;
        }
    }
}


/**
 * Used when the form is submitted.
 * Indicates the wrong fields to the user.
 **/

function checkFullDate(){
    var dayCheck = checkDateInput(dayInputElt.value, DAY_REGEX);
    var monthCheck = checkDateInput(monthInputElt.value, MONTH_REGEX);
    var yearCheck = checkDateInput(yearInputElt.value, YEAR_REGEX);
    var fullCheck = dayCheck && monthCheck && yearCheck;

    if(fullCheck)
        dateInputErrorElt.innerHTML = "";
    fullCheck ? dateFieldElt.classList.remove('date--error') : dateFieldElt.classList.add('date--error');
    dayCheck ? dayInputElt.classList.remove('error') : dayInputElt.classList.add('error');
    monthCheck ? monthInputElt.classList.remove('error') : monthInputElt.classList.add('error');
    yearCheck ? yearInputElt.classList.remove('error') : yearInputElt.classList.add('error');
    
    return fullCheck;
}

function checkNbOfPeople(){
    var nbOfPeopleCheck = false;
    if(!Number.isInteger(NB_OF_PEOPLE))
        nbOfPeopleInputErrorElt.innerText = NAN_INPUT_ERR;
    else if(NB_OF_PEOPLE <= 0)
        nbOfPeopleInputErrorElt.innerText = NO_PEOPLE_INPUT_ERR;
    else if(NB_OF_PEOPLE > PEOPLE_MAX)
        nbOfPeopleInputErrorElt.innerText = TOO_MUCH_PEOPLE_INPUT_ERR;
    else{
        nbOfPeopleCheck = true;
        nbOfPeopleInputErrorElt.innerText = "";
    }

    nbOfPeopleCheck? nbOfPeopleFieldElt.classList.remove('ppl-adjust--error') : nbOfPeopleFieldElt.classList.add('ppl-adjust--error');
    return nbOfPeopleCheck;
}

/*______Form Events______*/

//add error messages to help the user fill the form correctly
inputElts.map(input => {
    if(input.id !== "name" && input.id !== "email"){
        input.addEventListener('keyup', (e) => {
            if(e.target.value.length === parseInt(e.target.attributes.maxlength.value))
                e.target.blur()
        });
    }

    if(input.id === "hours"){
        input.addEventListener('change', (e) => {
            var hour = parseInt(e.target.value);
            if(hour !== 0 && hour < 9){
                timeSelected = 'PM';
                timeSelectionElt.innerText = timeSelected;
                timeOptionsElts[0].classList.remove('time-options__item--selected');
                timeOptionsElts[1].classList.add('time-options__item--selected');
            }
        });
    }


    input.addEventListener('blur', (e) => {
        const input = e.target;
        const inputId = e.target.id;

        switch(inputId){
            case "name":
                if(!checkNameInput(input.value)){
                    input.classList.add('error');
                }else{
                    input.classList.remove('error');
                    nameInputErrorElt.innerText = "";
                }
                break;
            case "email":
                if(!checkEmailInput(input.value)){
                    input.classList.add('error');
                }else{
                    input.classList.remove('error');
                    emailInputErrorElt.innerText = "";
                }
                break;
            case "hours":
                if(input.value === "7" || input.value === "8" || input.value === "9")
                    input.value = "0" + input.value;
                break;
            default:
                break;
        }
    });

    input.addEventListener('focus', (e) => {
        const inputId = e.target.id;
        switch(inputId){
            case "name":
                input.classList.remove('error');
                nameInputErrorElt.innerText = "";
                break;
            case "email":
                input.classList.remove('error');
                emailInputErrorElt.innerText = "";
                break;
            default:
                break;
        }
    });
});

//Click events to set the right number of people for the reservation
nbOfPeopleElt.innerHTML = NB_OF_PEOPLE + " people";
for(var i = 0; i < nbOfPeopleAdjustBtns.length; i++){
    nbOfPeopleAdjustBtns[i].addEventListener('click', (e) => {
        e.preventDefault();
        NB_OF_PEOPLE = e.target.classList.contains("more-ppl")
            ? (NB_OF_PEOPLE < 20? ++NB_OF_PEOPLE : NB_OF_PEOPLE)
            : (NB_OF_PEOPLE === 0 ? 0 : --NB_OF_PEOPLE);
        if(e.target.classList.contains('more-ppl')){
            nbOfPeopleInputErrorElt.innerText = "";
            nbOfPeopleFieldElt.classList.remove('ppl-adjust--error');
        }
        nbOfPeopleElt.innerHTML = NB_OF_PEOPLE + " people";
    });
}

//Set 'AM' by default in the customized 'select' element to pick a date
var timeSelected = 'AM';
timeSelectionElt.innerText = timeSelected;
timeOptionsElts[0].classList.add('time-options__item--selected');

//Select 'AM' or 'PM' in the reservation and display the selected one 
timeSelectionElt.addEventListener('click', (e) =>{
    timeOptionsElts.map(option => option.classList.toggle("time-options__item--visible"));
    timeSelectionElt.classList.toggle('selected-time-option--active');
});

timeOptionsElts.map(option => {
    option.addEventListener('click', (e) =>{
        timeSelected = option.id;
        timeSelectionElt.innerText = timeSelected;
        if(!option.classList.contains('time-options__item--selected'))
            timeOptionsElts.map(elt => elt.classList.toggle("time-options__item--selected"))
        setTimeout(() => timeOptionsElts.map(elt => elt.classList.toggle("time-options__item--visible")), 500);
        timeSelectionElt.classList.remove('selected-time-option--active');
    });
});


/*______form validation______*/
bookingFormElt.addEventListener('submit', (e) =>{
    e.preventDefault();
    var checkDate = checkFullDate();
    var checkPeople = checkNbOfPeople();
    var validForm = checkDate && checkPeople;
    if(!validForm)
        e.preventDefault();
    else{
        alert("Your reservation has been registered. See you soon !");
    }
});