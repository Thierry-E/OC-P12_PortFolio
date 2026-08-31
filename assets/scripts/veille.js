fetch('/.netlify/functions/veille')
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`)
    }

    return response.json()
  })
  .then((data) => {
    const articles = data.map((article) => ({
      id: article.id,
      nom: article.nom || '',
      categorie: article.categorie || '',
      source: article.source || '',
      lien: article.lien || '',
      dateAjout: article.date || '',
      statut: article.statut || '',
      avis: article.avis || '',
    }))

    console.log('Articles récupérés pour affichage :', articles)

    const gallery = document.querySelector('.veilleContainer')

    articles.forEach((article) => {
      const card = document.createElement('article')
      card.classList.add('veilleCard')

      card.innerHTML = `
        <h3>${article.nom}</h3>
        <p><strong>${article.categorie}</strong> · ${article.source} · ${article.dateAjout}</p>
        <p><strong>Mon avis :</strong> ${article.avis}</p>
        <a href="${article.lien}" target="_blank" rel="noopener noreferrer">
          Lire l'article
        </a>
      `

      gallery.appendChild(card)
    })
  })
  .catch((error) => {
    console.error('Erreur lors de la récupération des articles :', error)
  })
