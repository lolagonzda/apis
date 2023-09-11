function loadCountries() {
    const select = document.getElementById('country');
    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(data => {
            data.forEach(country => {
                const option = document.createElement('option');
                option.value = country.name.common;
                option.textContent = country.name.common;
                select.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}


function getCountryInfo() {
    const selectedCountry = document.getElementById('country').value;
    const countryInfo = document.getElementById('country-info');

    if (selectedCountry) {
        fetch(`https://restcountries.com/v3.1/name/${selectedCountry}`)
            .then(response => response.json())
            .then(data => {
                const countryData = data[0];
                countryInfo.innerHTML = `
                    <h2>${countryData.name.common}</h2>
                    <p>Capital: ${countryData.capital[0]}</p>
                    <p>Población: ${countryData.population}</p>
                    <p>Región: ${countryData.region}</p>
                    <p>Idioma: ${Object.values(countryData.languages).join(', ')}</p>
                    <img src="${countryData.flags.png}" alt="Bandera de ${countryData.name.common}">
                `;
            })
            .catch(error => {
                console.error('Error:', error);
            });
    } else {
        countryInfo.innerHTML = ''; 
    }
}


window.onload = loadCountries;
