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
    const previousButton = document.querySelector('.previousButton')
    const nextButton = document.querySelector('.nextButton')
    const pageInfo = document.querySelector('.pageInfo')

    const articlesPerPage = 6
    let currentPage = 1

    const totalPages = Math.ceil(articles.length / articlesPerPage)

    function displayArticles() {
      gallery.innerHTML = ''

      const start = (currentPage - 1) * articlesPerPage
      const end = start + articlesPerPage

      const articlesToDisplay = articles.slice(start, end)

      articlesToDisplay.forEach((article) => {
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

      pageInfo.textContent = `${currentPage} / ${totalPages}`

      previousButton.disabled = currentPage === 1
      nextButton.disabled = currentPage === totalPages

      const pagination = document.querySelector('.veillePagination')

      pagination.style.display = totalPages <= 1 ? 'none' : 'flex'
    }

    previousButton.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--
        displayArticles()
      }
    })

    nextButton.addEventListener('click', () => {
      if (currentPage < totalPages) {
        currentPage++
        displayArticles()
      }
    })

    displayArticles()
  })
  .catch((error) => {
    console.error('Erreur lors de la récupération des articles :', error)
  })
