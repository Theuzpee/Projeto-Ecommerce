const supabase = require('../config/supabaseClient');

// Função para buscar todos os produtos
const getAllProducts = async (req, res) => {
  try {
    // Usa o cliente Supabase para fazer a query
    const { data, error } = await supabase
      .from('produtos') 
      .select('*');    

    if (error) throw error; // Se houver um erro na query, lança a exceção

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar produtos', error: error.message });
  }
};

// Função para buscar um único produto por ID
const getProductById = async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    
    const { data: product, error } = await supabase
      .from('produtos')
      .select('*')
      .eq('id', productId) // Filtra onde a coluna 'id' é igual a productId
      .single(); // Espera um único resultado

    if (error) throw error;

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: 'Produto não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar produto', error: error.message });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
};
