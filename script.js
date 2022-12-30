document.getElementById("darkmode").addEventListener("click", displayToggle)

async function fetchJoke() {
    // const res = await fetch ("https://v2.jokeapi.dev/joke/Any?idRange=1-3")
    const res = await fetch ("https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Pun?type=single");
    let record = await res.json();
    console.log("fetched a joke: ", record.joke);
    return record.joke
}

function checkDiffJoke(joke) {
    let oldJoke = localStorage.getItem("joke") || "hello world joke";
    console.log("oldjoke: ", oldJoke);
    console.log("current joke: ", joke);
    console.log("checkDiffJoke? ", joke != oldJoke);
    if (!joke) { return false }
    return joke != oldJoke;
}

async function printJoke(joke) {
    ///update the element ID and update local storage time :D
    /// fetch data will call update Extentions
    console.log("printing joke: ", joke)
    document.getElementById("joketext").innerHTML=joke;
    
}

function formatDate(date) {
    let day = date.getDate().toString();
    let month = date.getMonth().toString();
    let year = date.getFullYear().toString();

    return year.concat(month.concat(day));

}

function displayToggle() {
    let element = document.body;
    element.classList.toggle("dark-mode");
    let buttonText = document.getElementById("darkmode").innerText
    buttonText = (buttonText == "Dark Mode") ? 
        document.getElementById("darkmode").innerText = "Light Mode" : document.getElementById("darkmode").innerText = "Dark Mode"

    // alternatively: this if/else combo works the same
    // if (document.getElementById("darkmode").innerText == "Dark Mode") {
    //     document.getElementById("darkmode").innerText="Light Mode"
    // } else { document.getElementById("darkmode").innerText="Dark Mode" }

    console.log("button clicked")
}

async function main() {
    let oldDate = localStorage.getItem("jokedate") || "00000000"
    let now = formatDate(new Date());
    let dateText = "Today's date is: ";
    document.getElementById("datebox").innerText = dateText.concat(new Date().toDateString().slice(0, 16))
 
    // if (oldDate === null) {
    //     oldDate = "20000101"
    // }
    if (oldDate !== now) {
    // if (true) {
        let joke = "";
        let jokeGood = false;
        while (!jokeGood) {
            console.log("in loop with joke: ", joke)
            joke = await fetchJoke();
            jokeGood = checkDiffJoke(joke);
        }
        printJoke(joke);
        localStorage.setItem("joke", joke)
        localStorage.setItem("jokedate", now)
    } else {
        printJoke(localStorage.getItem("joke"))
    }
}

main();

// so getUTCDate returns the date? like, the 21st
// getUTCMonth returns the month, so the 11th
// and year is the year obivously, 2022