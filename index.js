import bodyParser from 'body-parser'
import express from 'express'
import dbClient from './db.js'
import { ObjectId } from 'mongodb'

const app = express()

// permite recibir datos en el body
app.use(bodyParser.json())

// DB info
const dbName = 'task_app'
const tasksCollectionName = 'tasks'


// Obtener Todo
app.get('/api/v1/tareas', async (req, res) => {

    // 1. Conexion a la DB
    await dbClient.connect()
    // 2. Seleccionar la DB
    const taskAppDB = dbClient.db(dbName)
    // 3. Seleccionar la coleccion
    const tasksCollection = taskAppDB.collection(tasksCollectionName)

    // 4. Realizar la query
    const taskList = await tasksCollection.find({}).toArray()


    // 5. Cerrar conexion
    await dbClient.close()

    res.json({
        message: 'documentos entregados',
        data: taskList
    })
})

// Obtener Uno
app.get('/api/v1/tareas/:id', async (req, res) => {

    // 1. Conexion a la DB
    await dbClient.connect()
    // 2. Seleccionar la DB
    const taskAppDB = dbClient.db(dbName)
    // 3. Seleccionar la coleccion
    const tasksCollection = taskAppDB.collection(tasksCollectionName)

    // 4. Realizar la query


    // 5. Cerrar conexion
    await dbClient.close()


    res.json({
        message: 'documento entregado'
    })
})

// Crear
app.post('/api/v1/tareas', async (req, res) => {
    const taskData = req.body

    // 1. Conexion a la DB
    await dbClient.connect()
    // 2. Seleccionar la DB
    const taskAppDB = dbClient.db(dbName)
    // 3. Seleccionar la coleccion
    const tasksCollection = taskAppDB.collection(tasksCollectionName)

    // 4. Realizar la query
    await tasksCollection.insertOne({
        titulo: taskData.titulo,
        descripcion: taskData.descripcion,
        responsable: taskData.responsable,
        estado: "inactiva"
    })


    // 5. Cerrar conexion
    await dbClient.close()


    res.json({
        message: 'documento creado'
    })
})

// Editar
app.put('/api/v1/tareas/:id', async (req, res) => {

    const taskData = req.body
    let id = req.params.id

    // 1. Conexion a la DB
    await dbClient.connect()
    // 2. Seleccionar la DB
    const taskAppDB = dbClient.db(dbName)
    // 3. Seleccionar la coleccion
    const taskCollection = taskAppDB.collection(tasksCollectionName)

    id = new ObjectId(id)
    let modificacion = {}
    if (taksData.titulo){
        modificacion.titulo = taskData.titulo
    }
    if (taskData.estado){
        modificacion.estado =taskData.estado
    }
    if (taskData.descripcion){
        modificacion.descripcion = taskData.descripcion
    }
    if (taskData.responsable){
        modificacion.responsable = taskData.responsable
    }

    // 4. Realizar la query
    await taskCollection.updateOne(
        {_id: id },
        {
            $set: modificacion
        }
    )


    // 5. Cerrar conexion
    await dbClient.close()

    res.json({
        message: 'documento editado'
    })
})

// Eliminar
app.delete('/', async (req, res) => {

    // 1. Conexion a la DB
    await dbClient.connect()
    // 2. Seleccionar la DB
    const taskAppDB = dbClient.db(dbName)
    // 3. Seleccionar la coleccion
    const tasksCollection = taskAppDB.collection(tasksCollectionName)

    // 4. Realizar la query



    // 5. Cerrar conexion
    await dbClient.close()

    res.json({
        message: 'documento eliminado'
    })
})

const PORT = 3000
app.listen(PORT, () => {
    console.log(`API escuchando en el puert: ${PORT}`)
})