let form = document.getElementById('form');

//Fetching the keywords from the input field
form.addEventListener('submit', async function getCountry(event) {
    event.preventDefault();
    let value = form.elements['keywords'];
    let keywords = value.value;

    try {
        const response = await axios.get('https://restcountries.eu/rest/v2/name/' + keywords);
        const country = response.data[0];
        const flag = getFlag(country);
        const name = response.data[0].name;
        let str = generalString(country);
        str = str + currencyString(country);
        str = str + languageString(country);

        document.getElementById("info").style.boxShadow = '0 0 20px rgba(0,0,0,0.8)';
        document.getElementById("flag").innerHTML = flag;
        document.getElementById("countryName").innerHTML = name;
        document.getElementById("information").innerHTML = str;
    } catch (error) {
        document.getElementById("flag").innerHTML = "";
        document.getElementById("countryName").innerHTML = "";
        document.getElementById("information").innerHTML = "Nothing found! Check your spelling.";
    } document.getElementById("form").reset();
});


function getFlag (response) {
    return "<img src=\"" + response.flag + "\" alt=\"Flag of " + response.name + "\">";
    }

function generalString (response) {
    return response.name + " is situated in " + response.subregion + "<br>It has a population "
        +"of " + response.population + " people<br>The capital is " + response.capital;
}

function currencyString (response) {
    let str = " and you can pay with ";
    if (response.currencies.length === 1) {
        str = str + response.currencies[0].name + "'s";
    } if (response.currencies.length === 2) {
        str = str + response.currencies[0].name + "'s and " + response.currencies[1].name + "'s";
    }if (response.currencies.length > 2) {
        for (let i = 0; i < response.currencies.name.length - 2; i++) {
            str = str + response.currencies[i].name + "'s , ";
        } str = str + response.currencies[-2].name + "'s and " + response.currencies[-1].name + "'s";
    } return str;
}

function languageString (response) {
    let str = "<br>They speak ";
    if (response.languages.length === 1) {
        str = str + response.languages[0].name;
    }
    if (response.languages.length === 2) {
        str = str + response.languages[0].name + " and " + response.languages[1].name;
    } if (response.languages.length === 3) {
        str = str + response.languages[0].name + ", " + response.languages[1].name + " and " +
            response.languages[2].name;
    } return str;
}
