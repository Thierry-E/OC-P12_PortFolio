exports.handler = async function () {
  const token = process.env.NOTION_VEILLE_TOKEN
  const dataSourceId = '3cd74070-720e-80f0-a68f-000bc610a869'

  try {
    const response = await fetch(
      `https://api.notion.com/v1/data_sources/${dataSourceId}/query`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Notion-Version': '2026-03-11',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      },
    )

    const data = await response.json()

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify(data),
      }
    }

    const articles = data.results.map((page) => {
      const properties = page.properties

      return {
        id: page.id,
        nom: properties.Nom?.title?.[0]?.plain_text || '',
        categorie: properties.Catégories?.select?.name || '',
        source: properties.Source?.rich_text?.[0]?.plain_text || '',
        date: properties["Date d'ajout"]?.date?.start || '',
        lien: properties.Lien?.url || '',
        statut: properties.Statut?.select?.name || '',
        avis: properties['Mon avis']?.rich_text?.[0]?.plain_text || '',
      }
    })

    return {
      statusCode: 200,
      body: JSON.stringify(articles),
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message,
      }),
    }
  }
}
