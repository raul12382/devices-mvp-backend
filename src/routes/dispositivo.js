import { Router } from 'express'
const router = Router();

// DB Connection
import { connect } from '../database'
import { ObjectID } from 'mongodb'

router.get('/', async (req, res) => {
    const db = await connect();
    //const result = await db.collection('mvp').count()
    const result = await db.collection('mvp').find({}).toArray();
    res.json(result);
});

router.post('/', async (req, res) => {
    const db = await connect();
    const mvp = {
        modelo: req.body.modelo,
        index: req.body.index,
        photo: req.body.photo
    };

    if (mvp.modelo == null || mvp.index == null || mvp.photo == "" || mvp.modelo == ""||mvp.index == "" || mvp.photo == "") {
        return res.status(400).json({
            msg:"bad request", 
            status: "400"
        })
    }
    const result = await db.collection('mvp').insertOne(mvp);
    res.json({
        status: "200"
    });
});

router.get('/modelo/:modelo', async (req, res) => {
    const { modelo } = req.params;
    const db = await connect();
    const result = await db.collection('mvp').find({ modelo }).toArray();
    res.json(result);
}); 

router.get('/modelos/', async (req, res) => {
    const db = await connect();
    const result = await db.collection('mvp').distinct("modelo")
    res.json(result);
}); 

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const db = await connect();
    const result = await db.collection('mvp').findOne({ _id: ObjectID(id) });
    res.json(result);
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const db = await connect();
    const result = await db.collection('mvp').remove({ _id: ObjectID(id) });
    res.json({
        message: `dispositivo ${id} Deleted`,
        result
    });
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const newMvp = {
        modelo: req.body.modelo,
        index: req.body.index,
        photo: req.body.photo
    };
    const db = await connect();
    const result = await db.collection('mvp').updateOne({ _id: ObjectID(id) }, {$set: newMvp });
    res.json({
        message: `dispositivo ${id} Updated`
    });
});

export default router;