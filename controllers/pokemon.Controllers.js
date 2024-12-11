const Pokemon = require ('../models/Pokemon');

exports.createPokemon = async (req, res) => {
    const { name, type, level } = req.body;
    const pokemon = new Pokemon ({name, type, level, trainerId: req.user.id});
    try {
        await pokemon.save();
        res.status(201).json(pokemon);
    } catch (error) {
        res.status(500).json({message: 'Error en la creación de pokemon', error});
    }
};

exports.getAllPokemons = async (req, res) => {
    try{
        const pokemons = await Pokemon.find();
        res.json(pokemons);
    } catch (error) {
        res.status(500).json ({message: 'Error en la búsqueda de tu pokemon', error });
    }
};

exports.getPokemonById = async  (req, res) => {
   try{
    const pokemon = await Pokemon.findById(req.params.id);
    if (!pokemon) {
        return res.status(404).json({ message: 'Pokemón no encontrado'});   
    };
   }    
};

exports.updatePokemon = async (req, res) => {
    try{
        const pokemon = await Pokemon.findById(req.params.id);
        if (!pokemon || pokemon.trainerId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'No estás autorizado para actualizar este Pokémon' });
        }
        Object.assign(pokemon, req.body);
        await pokemon.save();
        res.json(pokemon);
    } catch (error) {
        res.status(500).json({ message: 'Error de actualización', error });
    }
};

exports.deletePokemon = async (req, res) => {
    try {
        const pokemon = await Pokemon.findById(req.params.id);
        if (!pokemon || pokemon.trainerId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'No estás autorizado para borrar este Pokémon' });
        }
        await pokemon.remove();
        res.json({ message: 'Borrado de Pokemón completo' });
    } catch (error) {
        res.status(500).json({ message: 'Ups!, hubo un error al borrar tu  Pokémon', error });
    }
};
    


