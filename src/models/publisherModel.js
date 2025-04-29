const pool = require("../config/databse");

const getAllPublisher = async () => {
    const result = await pool.query("SELECT * FROM publisher");
    return result.rows;
}

const getPublisheById = async (id) => {
    const result = await pool.query("SELECT * FROM publisher WHERE id = $1", [id])
    return result.rows[0]
}

const createPublisher = async (name, founder) => {
    const result = await pool.query("INSERT INTO publisher (name, founder) VALUES ($1, $2) RETURNING *", [name, founder])
    return result.rows[0]
}

const editPublisher = async (name, founder, id) => {
    const result = await pool.query (`UPDATE publisher SET name = $1, founder = $2 WHERE id = $3 RETURNING *`, [name, founder, id])
    return result.rows[0]
}

const deletePublisher = async (id) => {
    const result = await pool.query (`DELETE FROM publisher WHERE id = $1 RETURNING *`, [id])
    if (result.rowCount === 0) {
        return { error: "Herói não encontrado." };
    }
    return { message: "Herói deletado com sucesso." };
    
}

module.exports = {getAllPublisher, getPublisheById, createPublisher, editPublisher, deletePublisher};