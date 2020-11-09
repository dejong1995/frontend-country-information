async function getCountries() {
    try {
        //Gegevens ophalen en opslaan
        const response = await axios.get('https://restcountries.eu/rest/v2/all');
        const countries = response.data;
        //Sorteren op populatie van laag naar hoog
        countries.sort(function (a, b) {
            return a.population - b.population;
        })
        let list = generateList(countries);


        document.getElementById("listOfCountries").innerHTML = list;
        console.log(response)
    } catch (error) {
        console.log(error)
    }
}

getCountries();

function generateList(countries) {
    let list = "";
    for (let i = 0; i < countries.length; i++) {
        let {name, flag, region, population} = countries[i];
        let region2 = region
        if (region2 === ""){
            region2 = "notDefined";
        }

        list = list + ("<div class=\'" + region2 + "\'> <br>") + ("<img id=" + name + " src=" + flag + " height='20px' width='30px'> " + name + "<br>")
        + ("<span class='tooltiptext'> Population: " + formatNumber(population) + "</span><br></div><br>");
    } return list;
}

function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}