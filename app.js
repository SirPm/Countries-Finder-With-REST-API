// Selectors

const countryCard = document.querySelector('.country-card');
const fullDetailsDiv = document.querySelector('.fullDetailsDiv');
const main = document.getElementById('main');
const countrySearch = document.querySelector('.countrySearch');
const regions = document.querySelector('.regions');
const searchAndSelect = document.querySelector('.search-and-select');
const theBackBtn = document.querySelector('.the-back-btn');
const darkModeBtn = document.querySelector('.dark-mode');



// Dark Mode Toggler

let darkMode = localStorage.getItem('darkmode');

const enableDarkMode = () => {
    localStorage.setItem('darkmode', 'enabled');
    document.body.classList.add('dark-mode-section');
    console.log(darkMode)
}

const disableDarkMode = () => {
    localStorage.setItem('darkmode', null);
    document.body.classList.remove('dark-mode-section');
    console.log(darkMode)
}

if(darkMode === 'enabled') {
    enableDarkMode();
}

darkModeBtn.addEventListener('click', () => {
    darkMode = localStorage.getItem('darkmode');
    if(darkMode !== 'enabled') {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
})



// Classes
class General {
    // Method to load the countries from the api and display them
    static loadCountries(api) {
        fetch(api)
        .then(response => response.json())
        .then( (data) => {            
            main.innerHTML = "";
            data.forEach(function(country) {
                let bodyHtmlString = `
                    <div class="col-3">
                        <div class="country-card">
                            <div class="flag-div">
                                <img src="${country.flag}" class="flag" alt="flag">
                            </div>
                            <div class="country-card-info">
                                <h3 class="country-name">${country.name}</h3>
                                <p class="population">Population: <span class="input-text">${country.population}</span></p>
                                <p class="region">Region: <span class="input-text">${country.region}</span></p>
                                <p class="capital">Capital: <span class="input-text">${country.capital}</span></p>
                            </div>
                        </div>
                    </div>
                `;
                main.innerHTML += bodyHtmlString;
            })
        })
        .catch( (error) => {
            console.warn(error);
        });
    }
}


// Events
window.addEventListener('load', General.loadCountries(`https://restcountries.eu/rest/v2/all`));
main.addEventListener('click', showCountryInfo);
countrySearch.addEventListener('keyup', showSearchResult);
regions.addEventListener('click', showRegions);
theBackBtn.addEventListener('click', goToHomePage);


// Functions 
function goToHomePage(e) {
    if(e.target.classList.contains('back-btn')) {
        window.location.assign('index.html');
    }
}

function showRegions() {
    if(regions.value !== 'default') {
        General.loadCountries(`https://restcountries.eu/rest/v2/region/${regions.value}`);
    }
}

function showSearchResult() {
    General.loadCountries(`https://restcountries.eu/rest/v2/name/${countrySearch.value}`);
}


function showCountryInfo(e) {
    fetch(`https://restcountries.eu/rest/v2/all`)
    .then( (response) => response.json())
    .then( (data) => {
        if(e.target.classList.contains('country-card')) {
            // Loop through the data array and check for the one that has the same country name as the one selected            
            data.forEach(function(country) {
                // This if statement does the check and displays the one that matches
                if(e.target.children[1].firstElementChild.textContent === country.name) {
                    searchAndSelect.style.display = "none";
                    main.innerHTML = "";
                    let bodyHtmlString = `                    
                        <div id="backBtn">
                            <div id="backBtnButton" class="back-btn">
                                <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-arrow-left" fill="var(--black-color)" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M5.854 4.646a.5.5 0 0 1 0 .708L3.207 8l2.647 2.646a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 0 1 .708 0z"/>
                                    <path fill-rule="evenodd" d="M2.5 8a.5.5 0 0 1 .5-.5h10.5a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                                </svg>
                                <a id="backLink" href="index.html">Back</a>
                            </div>
                        </div>
                        <div class="fullDetailsDiv">
                            <div id="bigFlag">
                                <img src="${country.flag}">
                            </div>
                            <div class="info">
                                <h2>${country.name}</h2>
                                <div class="country-details">
                                    <div class="left-side">
                                        <p>
                                            <strong>Native Name: </strong><span class="input-text">${country.nativeName}</span>
                                        </p>
                                        <p>
                                            <strong>Population: </strong><span class="input-text">${country.population}</span>
                                        </p>
                                        <p>
                                            <strong>Region: </strong><span class="input-text">${country.region}</span>
                                        </p>
                                        <p>
                                            <strong>Sub Region: </strong><span class="input-text">${country.subregion}</span>
                                        </p>
                                        <p>
                                            <strong>Capital: </strong><span class="input-text">${country.capital}</span>
                                        </p>
                                    </div>
                                    <div class="right-side">
                                        <p><strong>Top Level Domain: </strong>`
                                            country.topLevelDomain.forEach(function(domain) {
                                                bodyHtmlString += `<span class="input-text">${domain}, </span>`
                                            })
                                            bodyHtmlString += `
                                        </p>
                                        <p><strong>Currencies: </strong>`;
                                            country.currencies.forEach(function(currency) {
                                                bodyHtmlString += `<span class="input-text">${currency.name}, </span>`
                                            })
                                            bodyHtmlString += `
                                        </p>
                                        <p><strong>Languages: </strong>`
                                            country.languages.forEach(function(language) {
                                                bodyHtmlString += `<span class="input-text">${language.name}, </span>`
                                            })
                                            bodyHtmlString += `
                                        </p>
                                    </div>
                                </div>
                                <div id="endOfCountryInfo">
                                    <div id="borderDiv">
                                        <p id="border-header"><strong>Border Countries: </strong></p>
                                        <div id="borderCountries">`
                                            if(country.borders.length !== 0) {
                                                country.borders.forEach(function(border) {
                                                    bodyHtmlString += `<button class="my-border">${border}</button>`;
                                                })
                                            } else {
                                                bodyHtmlString += `<button class="my-border">None</button>`;
                                            }
                                            bodyHtmlString += `
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        `;
                    theBackBtn.innerHTML = bodyHtmlString;
                }
            });
        } 
    })
    .catch( (error) => {
        console.warn(error);
    })
}