fetch('https://restcountries.com/v3.1/all')
  .then(res => res.json())
  .then(data =>
    data.forEach(x => {

      document.querySelector('.flag img').src = x.flags.svg

      let html = `<div class="card">
      <div class="flag">
        <img src="${x.flags.svg}" alt="flag">
      </div>
      <div class="country-details">
        <h4 class="country"> ${x.name.common} </h4>
        <h5 class="population"> Population: <span class="population-span">${x.population}</span></h5>
        <h5 class="region"> Region: <span class="region-span">${x.region}</span></h5>
        <h5 class="capital"> Capital: <span class="capital-span">${x.capital}</span></h5>
      </div>
    </div>`
      document.getElementsByClassName('cards-container')[0].innerHTML += html
    })
  )
  .catch(error => console.log(error))