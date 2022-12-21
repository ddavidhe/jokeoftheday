async function fetchData() {
    const res = await fetch ("https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Pun?type=single");
    const record = await res.json();
    document.getElementById("date").innerHTML=record.joke
}
fetchData();
