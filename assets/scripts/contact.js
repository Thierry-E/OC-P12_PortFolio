document
  .getElementById('contactForm')
  .addEventListener('submit', function (event) {
    event.preventDefault()

    //Paramètres du service email
    const serviceID = 'service_i0nu1fq'
    const templateID = 'template_a5j0y78'

    //Récupération des valeurs du formulaire
    const name = document.getElementById('name').value
    const firstName = document.getElementById('firstName').value
    const email = document.getElementById('email').value
    const message = document.getElementById('message').value

    //Paramètre à envoyer
    const templateParams = {
      name: name,
      firstName: firstName,
      email: email,
      message: message,
    }

    // Envoie de l'email
    emailjs.send(serviceID, templateID, templateParams).then(
      function (response) {
        console.log(
          'Email envoyé avec succès :',
          response.status,
          response.text
        )
        alert(
          'Votre message a été transmis avec succès. Vous recevrez une réponse dans les meilleurs délais'
        )
      },
      function (error) {
        console.log("Échec de l'envoi de l'email.", error)
        alert(
          "Une erreur s'est produite lors de l'envoi de votre message. Veuillez vérifier les informations fournies ou réessayer ultérieurement."
        )
      }
    )
  })
