const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  // Headers CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Gérer preflight OPTIONS
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // GET - Récupérer les produits
    if (req.method === 'GET') {
      const dataPath = path.resolve(__dirname, '_products-data.json');
      const fileContents = fs.readFileSync(dataPath, 'utf8');
      const defaultData = JSON.parse(fileContents);

      return res.status(200).json({
        success: true,
        data: defaultData,
        totalProducts: defaultData.products.length,
        totalCategories: defaultData.categories.length
      });
    }

    // Méthode non supportée
    return res.status(405).json({ 
      success: false, 
      error: 'Method not allowed' 
    });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Erreur serveur',
      details: error.message
    });
  }
};
