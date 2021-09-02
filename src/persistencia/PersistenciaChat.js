const knex = require('knex');

/**
 * @type { knex.Knex }
 */
const database = knex({
    client: 'sqlite3',
    connection: {
        filename: './data.db'
    }
});

class PersistenciaChat {
    static async inicializarBaseDeDatos() {
        try {
            await database.schema
                .createTable('mensajes', table => {
                    table.increments('id');
                    table.string("email")
                    table.string("fecha")
                    table.string("mensaje")
                })
        }
        catch(e) {
            console.log("La tabla de mensajes no se pudo crear. Probablemente ya existe.")
        }
    }

    static async insertarMensaje(mensaje) {
        await database('mensajes').insert(mensaje)
    }
}

module.exports = PersistenciaChat;