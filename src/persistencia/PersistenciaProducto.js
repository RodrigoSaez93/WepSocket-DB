const knex = require('knex');

/**
 * @type { knex.Knex }
 */
const database = knex({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'ch_productos'
    }
})

class PersistenciaProducto {
    static async inicializarBaseDeDatos() {
        try {
            await database.schema
                .createTable('productos', table => {
                    table.increments('id');
                    table.string("title")
                    table.string("price")
                    table.string("thumbnail")
                })
        }

        catch (e) {
            console.log("La tabla de producto no se pudo crear. Probablemente ya existe.")
        }
    }

    static async insertar(producto) {
        // producto debe tener title, price y thumbnail
        return await database('productos').insert(producto);
    }

    static async buscar(id) {
        return await database('productos')
            .where({ id: id })
            .select('id', 'title', 'price', 'thumbnail');
    }

    static async listar() {
        return await database('productos')
            .select('id', 'title', 'price', 'thumbnail');
    }

    static async actualizar(producto) {
        return await database('productos').where({ id: producto.id })
            .update({
                title: producto.title,
                price: producto.price,
                thumbnail: producto.thumbnail
            })
    }

    static async eliminar(id) {
        return await database('productos').where({ id: id })
            .del();
    }
}

module.exports = PersistenciaProducto;