// Theme Toggler
window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('themeToggler').addEventListener('click', () => {
    let vars = document.querySelector(':root')

    document.getElementsByTagName('body')[0].classList.toggle('light-theme')

    if (document.getElementsByTagName('body')[0].classList.contains('light-theme')) {
      document.getElementById('themeName').innerHTML = 'Dark Mode'
      document.getElementById('themeIcon').innerHTML = '<ion-icon name="moon"></ion-icon>'
    } else {
      document.getElementById('themeName').innerHTML = 'Light Mode'
      document.getElementById('themeIcon').innerHTML = '<ion-icon name="sunny"></ion-icon>'
    }
  })
})

// Homepage
if (window.location.pathname == "/") {
  window.addEventListener('DOMContentLoaded', () => {
    fetchData('all')
    document.getElementById('search').addEventListener('keyup', (e) => {
      search(e.target.value)
    })
    document.getElementById('search').addEventListener('focusout', (e) => {
      search(e.target.value)
    })
    document.getElementById('filterSelect').addEventListener('change', (e) => {
      const regionPath = {
        'all': 'all',
        'africa': 'region/africa',
        'americas': 'region/americas',
        'asia': 'region/asia',
        'europe': 'region/europe',
        'oceania': 'region/oceania',

      }
      clearData()
      fetchData(regionPath[e.target.value])
    })
  })
}

// Single Country Page
if (window.location.pathname == "/single.html") {
  window.addEventListener('DOMContentLoaded', () => {
    const country = new URLSearchParams(window.location.search).get('country')
    fetchDataSingle(country)
  })
}

// Functions
const createCard = (img, name, population, region, capital) => {
  return `<div id="${name}" class="card button-card">
            <div class="flag">
              <img src="${img}" alt="flag">
            </div>
            <div class="country-details">
              <h4 class="country"> ${name} </h4>
              <h5 class="population"> Population: <span class="population-span">${population}</span></h5>
              <h5 class="region"> Region: <span class="region-span">${region}</span></h5>
              <h5 class="capital"> Capital: <span class="capital-span">${capital}</span></h5>
            </div>
          </div>`
}

const createCardSingle = (flag, name, native, population, region, subRegion, capital, topLvlDomain, currencies, languages, borderCountries) => {
  let curs = Object.values(currencies)
  let cur = ""
  let langs = Object.values(languages)
  let lang = ""
  let q = ""
  curs.forEach((x, i) => {
    if (i == curs.length - 1) {
      cur += x.name
    } else {
      cur += x.name + " ,"
    }
  })
  langs.forEach((y, i) => {
    if (i == langs.length - 1) {
      lang += y
    } else {
      lang += y + " ,"
    }
  })

  borderCountries.forEach(c => {
    q += c + ","
  })

  fetchBorder(q)

  return `<div class="flag-container">
            <img src="${flag}" alt="flag">
          </div>
          <div class="details-container">
            <h1 class="country-name">${name}</h1>
            <div class="details">
              <div class="col-left">
                <span>Native Name: ${native}</span>
                <span>Population: ${population}</span>
                <span>Region: ${region}</span>
                <span>Sub Region: ${subRegion}</span>
                <span>Capital: ${capital}</span>
              </div>
              <div class="col-right">
                <span>Top Level Domain: ${topLvlDomain}</span>
                <span>Currencies: ${cur}</span>
                <span>Languages: ${lang}</span>
              </div>
            </div>
            <div class="border-countries-container">
              <span>Border Countries:</span>
              <span id="borderCountriesSpan"></span>
            </div>
          </div>`
}

const fetchData = (q) => {
  fetch('https://restcountries.com/v3.1/' + q)
    .then(res => res.json())
    .then(data =>
      data.forEach(x => {
        let html = createCard(x.flags.svg, x.name.common, x.population, x.region, x.capital)
        document.getElementsByClassName('cards-container')[0].innerHTML += html
      })
    )
    .catch(error => console.log(error))

  setTimeout(addListenerCard, 1000)
}

const fetchDataSingle = (q) => {
  fetch('https://restcountries.com/v3.1/name/' + q)
    .then(res => res.json())
    .then(data =>
      data.forEach(x => {
        let html = createCardSingle(x.flags.svg, x.name.common, x.name.official, x.population, x.region, x.subregion, x.capital[0], x.tld[0], x.currencies, x.languages, x.borders)
        document.getElementsByClassName('single-content')[0].innerHTML = html
      })
    )
    .catch(error => console.log(error))
}

async function fetchBorder(a) {
  let borderC = ""
  const response = await fetch('https://restcountries.com/v3.1/alpha?codes=' + a)
  const jsonData = await response.json()
  jsonData.forEach(k => {
    borderC += '<a href="/single.html?country=' + k.name.common + '"}>' + k.name.common + '</a>'
  })
  document.getElementById('borderCountriesSpan').innerHTML = borderC
}

const clearData = () => {
  document.getElementsByClassName('cards-container')[0].innerHTML = ''
}

const addListenerCard = () => {
  Array.from(document.getElementsByClassName('button-card')).forEach(x => {
    x.addEventListener('click', () => {
      window.location.href = "/single.html?country=" + x.id
    })
  })
}

const search = (s) => {
  if (s == "") {
    fetchData('all')
  }

  clearData()
  fetchData('name/' + s)
}