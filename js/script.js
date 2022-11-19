window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('themeToggler').addEventListener('click', () => {
    let vars = document.querySelector(':root')

    if (getComputedStyle(vars).getPropertyValue('--bg-elements').trim() == 'hsl(209, 23%, 22%)') {
      vars.style.setProperty('--bg-elements', 'hsl(0, 0%, 100%)')
      vars.style.setProperty('--bg-general', 'hsl(0, 0%, 98%)')
      vars.style.setProperty('--text-color', 'hsl(200, 15%, 8%)')
      document.getElementById('themeName').innerHTML = 'Light Mode'
      document.getElementById('themeIcon').innerHTML = '<ion-icon name="sunny"></ion-icon>'
    } else {
      vars.style.setProperty('--bg-elements', 'hsl(209, 23%, 22%)')
      vars.style.setProperty('--bg-general', 'hsl(207, 26%, 17%)')
      vars.style.setProperty('--text-color', 'hsl(0, 0%, 98%)')
      document.getElementById('themeName').innerHTML = 'Dark Mode'
      document.getElementById('themeIcon').innerHTML = '<ion-icon name="moon"></ion-icon>'
    }
  })
})

if (window.location.pathname == "/") {
  window.addEventListener('DOMContentLoaded', () => {
    fetchData('all')
    document.getElementById('search').addEventListener('keyup', (e) => {
      search(e.target.value)
    })
    document.getElementById('search').addEventListener('focusout', (e) => {
      search(e.target.value)
    })
  })
}

if (window.location.pathname == "/single.html") {
  window.addEventListener('DOMContentLoaded', () => {
    const country = new URLSearchParams(window.location.search).get('country')
    fetchDataSingle(country)
  })
}

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
      console.log(data)
    )
    .catch(error => console.log(error))
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