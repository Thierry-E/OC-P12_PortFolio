//Import du fichier json "projets"
const projets = './assets/datas/projets.json'

//Variables Globales

// Récupération de la div gallery dans le DOM (page web)
const gallery = document.querySelector('.gallery')
//console.log(gallery)

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

      // Ajout des données à la div "cards"
      cards.innerHTML = `
      <img src=${projet.picture} alt=${projet.name}>
      <h3>${projet.name}</h3>
      `

      //Ajout d'un écouteur d'événement sur la div "cards"
      cards.addEventListener('click', () => {
        openModal(projet)
      })

      //Ajout de la div "cards comme enfant à la div "gallery"
      gallery.appendChild(cards)
    })
  })
  .catch((error) => {
    console.error('Erreur:', error)
  })

// Fonction pour ouvrir la modale comportant les infos du projet
function openModal(projet) {
  // Création de l'overlay
  const overlay = document.createElement('div')
  overlay.classList.add('overlay')

  //Création de la modale
  const modal = document.createElement('div')
  modal.classList.add('modal')

  //Ajout du contenu à la modale
  modal.innerHTML = `
  <i class="fa-solid fa-xmark"></i>
  <img src=${projet.picture} alt=${projet.name}>
  <h2>${projet.name}</h2>
  <p>${projet.description}</p>
  <p>${projet.langages}</p>
  <a href=${projet.url} target="_blank">Voir le site</a>
  `

  // ajout de la modal à la galerie
  gallery.appendChild(overlay)
  gallery.appendChild(modal)

  // Ajout d'un écouteur d'événement pour fermer la modale avec au clic sur la croix.
  const close = document.querySelector('.fa-xmark')
  close.addEventListener('click', () => {
    modal.remove() //Supprimer la modale
    overlay.remove() //supprimer l'overlay
  })

  // Ajout d'un écouteur d'événement pour fermer la modale au clic sur l'overlay
  overlay.addEventListener('click', () => {
    modal.remove()
    overlay.remove()
  })
}
