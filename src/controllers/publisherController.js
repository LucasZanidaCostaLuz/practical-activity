const publisherModels = require("../models/publisherModel")

const getAllPublisher = async (req, res) => {
    try {
        const publishers = await publisherModels.getAllPublisher()
        res.json(publishers)
    } catch (error) {
        res.status(500).json({message: "Erro ao buscar editora"})
    }
}


const getPublisherById = async (req, res) => {
    try {
        const publisher = await publisherModels.getPublisheById(req.params.id)
        res.json(publisher)
    } catch (error) {
        res.status(500).json({message: "erro ao buscar editora"})
    }
}

const createPublisher = async (req, res) => {
    try {
        const { name, founder } = req.body;
        const newPublisher = await publisherModels.createPublisher(name, founder);
        res.status(201).json(newPublisher);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Erro ao criar editora." });
    }
};

const editPublisher = async (req, res) => {
    try {
        const { name, founder } = req.body;
        const publisher = await publisherModels.editPublisher(name, founder, req.params.id);
        if (!publisher) {
            return res.status(404).json({ error: 'Editora não encontrada.' });
        }
        res.json(publisher);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao editar editora.' });
    }
}
const deletePublisher = async (req, res) => {
    try {
        const result = await publisherModels.deletePublisher(req.params.id);
        if (result.error) {
            console.log(error)
            return res.status(404).json(result);
        }
        res.json(result);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Erro ao deletar editora.' });
    }
}

module.exports = {getAllPublisher, getPublisherById, createPublisher, editPublisher, deletePublisher}