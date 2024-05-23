//Banner for first time visitors

export function visitCounter() {
    //Tracks the amount of times someone visits the site using localStorage
    localStorage.setItem('visitCount', JSON.stringify(parseInt(localStorage.getItem('visitCount') || 0) + 1));

    //Set the number of visits into a variable.
    var visitCount = JSON.parse(localStorage.getItem('visitCount') || 0);

    //Shows the banner if it's the first visit
    if (visitCount < 2) {
        document.querySelector("#welcome-banner").style.display = "block";
}
}