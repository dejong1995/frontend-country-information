let form = document.getElementById('form');

function getFlag (response) {
    return "<img src=\"" + response.data[0].flag + "\" alt=\"Flag of " + response.data[0].name + "\">";
    }

function generalString (response) {
    return response.data[0].name + " is situated in " + response.data[0].subregion + "<br>It has a population "
        +"of " + response.data[0].population + " people<br>The capital is " + response.data[0].capital;
}

function currencyString (response) {
    let str = " and you can pay with ";
    if (response.data[0].currencies.length === 1) {
        str = str + response.data[0].currencies[0].name + "'s";
    } if (response.data[0].currencies.length === 2) {
        str = str + response.data[0].currencies[0].name + "'s and " + response.data[0].currencies[1].name + "'s";
    }if (response.data[0].currencies.length > 2) {
        for (let i = 0; i < response.data.currencies.name.length - 2; i++) {
            str = str + response.data[0].currencies[i].name + "'s , ";
        } str = str + response.data[0].currencies[-2].name + "'s and " + response.data[0].currencies[-1].name + "'s";
    } return str;
}

function languageString (response) {
    let str = "<br>They speak ";
    if (response.data[0].languages.length === 1) {
        str = str + response.data[0].languages[0].name;
    }
    if (response.data[0].languages.length === 2) {
        str = str + response.data[0].languages[0].name + " and " + response.data[0].languages[1].name;
    } if (response.data[0].languages.length === 3) {
        str = str + response.data[0].languages[0].name + ", " + response.data[0].languages[1].name + " and " +
            response.data[0].languages[2].name;
    } return str;
}

//Fetching the keywords from the input field
form.addEventListener('submit', async function getCountry(event) {
    event.preventDefault();
    let value = form.elements['keywords'];
    let keywords = value.value;

    try {
        const response = await axios.get('https://restcountries.eu/rest/v2/name/' + keywords);
        const flag = getFlag(response);
        const name = response.data[0].name;
        let str = generalString(response);
        str = str + currencyString(response);
        str = str + languageString(response);

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