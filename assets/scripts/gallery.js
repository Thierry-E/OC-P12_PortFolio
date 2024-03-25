//Variables Globales

// Récupération de la div gallery dans le DOM (page web)
const gallery = document.querySelector('.gallery')
//console.log(gallery)

//Import du fichier json "projets"
const projets = './assets/datas/projets.json'

fetch(projets)
  .then((response) => {
    if (!response.ok) {
      throw new Error('Erreur de chargement du fichier JSON')
    }
    return response.json()
  })
  .then((projets) => {
    //Traitement des données chargées
    projets.forEach((projet) => {
      //Création de la div "cards" contenant chaque projet.
      const cards = document.createElement('div')
      cards.classList.add('cards')

      //Création de la div "infos" contenant les infos du projet.
      const infos = document.createElement('div')
      infos.classList.add('infos')

      //Création de la div "picture" contenant l'image et le lien du projet.
      const picture = document.createElement('div')
      picture.classList.add('picture')

      //Ajout des données des projets.
      infos.innerHTML = `
        <h3>${projet.name}</h3>
        <p>${projet.description}</p>
        <p>${projet.langages}</p>
      `
      picture.innerHTML = ` <img src="${projet.picture}" alt="${projet.name}">
        <a href="${projet.url}">${projet.name}</a>`

      //Ajout de la div "cards comme enfant à la div "gallery"
      gallery.appendChild(cards)
      cards.appendChild(infos)
      cards.appendChild(picture)
    })
  })
  .catch((error) => {
    console.error('Erreur:', error)
  })
