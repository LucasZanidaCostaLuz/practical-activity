const heroModels = require("../models/heroModel");

const getAllHeroes = async (req, res) => {
    try {
        const { name } = req.query;
        const heroes = await heroModels.getAllHeroes(name);
        res.json(heroes);
    } catch (error) {
        res.status(500).json({message: "Erro ao buscar heróis"});
    }
}

const getHeroById = async (req, res) => {
    try {
        const hero = await heroModels.getHeroById(req.params.id)
        res.json(hero)
    } catch (error) {
        res.status(500).json({message: "erro ao buscar herói"})
    }
}

const createHero = async (req, res) => {
    try {
        const { name, id_publisher } = req.body;
        const photo = req.file ? req.file.filename : null;
        const newHero = await heroModels.createHero(name, id_publisher, photo);
        res.status(201).json(newHero);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Erro ao criar herói." });
    }
};

const editHero = async (req, res) => {
    try {
        const { name, id_publisher } = req.body;
        const hero = await heroModels.editHero(name, id_publisher, req.params.id);
        res.json(hero);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Erro ao editar herói.' });
    }
}
const deleteHero = async (req, res) => {
    try {
        const result = await heroModels.deleteHero(req.params.id);
        if (result.error) {
            return res.status(404).json(result);
        }
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar herói.' });
    }
}

module.exports = {getAllHeroes, getHeroById, createHero, editHero, deleteHero};