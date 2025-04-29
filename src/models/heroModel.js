const pool = require("../config/databse");

const getAllHeroes = async (name) => {
    if(!name){
        const result = await pool.query("SELECT hero.*, publisher.name AS heroes_editora_names FROM hero LEFT JOIN publisher ON hero.id_publisher = publisher.id");
        return result.rows;
    } else {
        const result = await pool.query(`SELECT hero.*, publisher.name AS heroes_editora_names FROM hero LEFT JOIN publisher ON hero.id_publisher = publisher.id WHERE hero.name ILIKE $1`, [`%${name}%`]);
        return result.rows;
    }
    
}

const getHeroById = async (id) => {
    const result = await pool.query("SELECT hero.*, publisher.name AS heroes_editora_names FROM hero LEFT JOIN publisher ON hero.id_publisher = publisher.id WHERE hero.id = $1", [id])
    return result.rows[0]
}

const createHero = async (name, id_publisher, photo) => {
    const result = await pool.query("INSERT INTO hero (name, id_publisher, photo) VALUES ($1, $2, $3) RETURNING *", [name, id_publisher, photo])
    return result.rows[0]
}

const editHero = async (name, id_publisher, photo, id) => {
    const result = await pool.query (`UPDATE hero SET name = $1, id_publisher = $2 WHERE id = $3 RETURNING *`, [name, id_publisher, id])
    return result.rows[0]
}

const deleteHero = async (id) => {
    const result = await pool.query (`DELETE FROM hero WHERE id = $1 RETURNING *`, [id])
    if (result.rowCount === 0) {
        return { error: "herói não encontrado." };
    }
    return { message: "Herói deletado com sucesso." };
}

module.exports = {getAllHeroes, getHeroById, createHero, editHero, deleteHero};