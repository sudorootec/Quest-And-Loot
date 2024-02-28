// Scripts related to time passage in any way
// -------------------------------------------

const intervalId = setInterval(aSecondHasPassed, 1000);

// Updates some things that depend on time every 1 second
function aSecondHasPassed(){
    if(time_of_next_aspiring_batch_arrival <= new Date()){
        generateNewBatchOfAspirants();
    }

    $('#modal_recruitment_next_batch_timer').html(getCountdown(new Date(), time_of_next_aspiring_batch_arrival));
}

// Returns a date time plus an X amount of hours
function getDateTimePlusXHours(date_time, amount_of_hours){
    date_time.setTime(date_time.getTime() + (amount_of_hours * 3600 * 1000));
    return date_time;
}

function getCountdown(fromDateTime, toDateTime) {
    // Convert strings to Date objects
    const fromDate = new Date(fromDateTime);
    const toDate = new Date(toDateTime);

    // Calculate the total difference in milliseconds
    const countdownInMilliseconds = toDate.getTime() - fromDate.getTime();

    // Convert milliseconds into days, hours, minutes, and seconds
    const days = Math.floor(countdownInMilliseconds / (1000 * 60 * 60 * 24));
    const hours = Math.floor((countdownInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((countdownInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((countdownInMilliseconds % (1000 * 60)) / 1000);

    // If countdown < 0 then it means it is over
    if (countdownInMilliseconds <= 0) {
        return "Countdown is over!";
    }

    // Preparing the countdown string
    let countdownString = "";
    if (days > 0) {
        countdownString += `${days} day${days > 1 ? "s" : ""}, `;
    }
    if (hours > 0) {
        countdownString += `${hours} hour${hours > 1 ? "s" : ""}, `;
    }
    if (minutes > 0) {
        countdownString += `${minutes} minute${minutes > 1 ? "s" : ""}, `;
    }
    if (seconds > 0) {
        countdownString += `${seconds} second${seconds > 1 ? "s" : ""}`;
    }

    if (countdownString[countdownString.length - 1] == " ") {
        countdownString = countdownString.slice(0, -2);
    }

    return countdownString;
}