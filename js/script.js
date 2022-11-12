fetch('https://restcountries.com/v3.1/all')
  .then(res => res.json())
  .then(data =>
    data.forEach(x => {
      let html = createCard(x.flags.svg, x.name.common, x.population, x.region, x.capital)

      document.getElementsByClassName('cards-container')[0].innerHTML += html
    })
  )
  .catch(error => console.log(error))


const createCard = (img, name, population, region, capital) => {
  return `<div class="card">
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