//https://superheroapi.com/api/access-token/character-id

// i store this token and api in variable to call later
const SUPERHERO_TOKEN = '9091616990855834'
const BASE_URL = `https://superheroapi.com/api.php/${SUPERHERO_TOKEN}`

// I access id to manipulate DOM
const randomHeroButtonDiv = document.getElementById('newHeroButton')
const heroImageDiv = document.getElementById('heroImage')
const inputDiv = document.getElementById('searchInput')
const searchButtonDiv = document.getElementById('searchButton')
const heroNameDiv = document.getElementById('heroName')
const herostatsDiv = document.getElementById('heroStats')

// i create emojistats object to loop into showHeroInfo 
const emojiStats = {
  intelligence: '🧠',
  strength: '💪🏻',
  speed: '⚡',
  durability: '🏋🏻',
  power: '📊',
  combat: '⚔️'
}

// This function to show hero info such as Name , Img , stats 
const showHeroInfo = (character) => {
  const name = `<h3>${character.name.toUpperCase()}</h3>`
  const img = `<img src="${character.image.url}" height="250" width="250">`
  const stats = Object.keys(character.powerstats).map(stat => {
    return `<p>${emojiStats[stat]} ${stat.toUpperCase()}: ${character.powerstats[stat]}</p>`
  }).join('')

  heroImageDiv.innerHTML = img
  heroNameDiv.innerHTML = name
  herostatsDiv.innerHTML = stats
}

// This function to fetch superhero API and use Superhero ID to generate random hero

//id 👉 base_url/id
// json.image.url
const getRandomSuperhero = (id) => {

  fetch(`${BASE_URL}/${id}`)
    .then(response => response.json())
    .then(json => {
      console.log(json)
      const superHero = json
      showHeroInfo(superHero)
    })
}


// This function to fetch superhero API and use Superhero name to search a specific hero

//name 👉 base_url/search/batman
//json.result[0].image.url

const getSearchSuperhero = (name) => {
  fetch(`${BASE_URL}/search/${name}`)
    .then(response => response.json())
    .then(json => {
      const superHero = json.results[0]
      console.log(superHero)
      showHeroInfo(superHero)

      // heroImageDiv.innerHTML = `<img src="${hero.image.url}" height="200" width="200">`
      // heroNameDiv.innerHTML = `<h3>${hero.name}</h3>`
      // let powerStats = JSON.stringify(hero.powerstats)
      // herostatsDiv.innerText = powerStats

    })
}


// This function is to generate a random number from 1 - 731 to random the hero
const randomHero = () => {
  const numberOfHeroes = 731
  return Math.ceil(Math.random() * numberOfHeroes)
}

// This onclick event when user click the search button it will search the hero by name
searchButtonDiv.onclick = () => {
  if (inputDiv.value == '') {
    alert('You need to enter the superhero Name')
  } else {
    getSearchSuperhero(inputDiv.value)
  }
}

// This onclick event when user click the random hero button it will random the hero by id
randomHeroButtonDiv.onclick = () => {
  getRandomSuperhero(randomHero())
}
