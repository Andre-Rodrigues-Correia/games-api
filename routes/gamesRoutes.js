const router = require('express').Router()
const Game = require('../models/Games')

router.post('/insert', async (req, res) => {

    const {name, description, genre, produce, releaseYear, value} = req.body

    if(!name){
        res.status(422).json({message: 'Por favor preencha o nome do jogo'});
        return;
    }
    if(!value){
        res.status(422).json({message: 'Por favor preencha o preço do jogo'});
        return;
    }

    const game = {
        name,
        description,
        genre,
        produce,
        releaseYear,
        value
    }

    try {
       
        await Game.create(game);
        res.status(201).json({message: 'game inserted successfully'});

    } catch (error) {
        res.status(500).json({
            error: error
        })
    }

})

router.get('/find', async (req,res) => {

    try {
        const dataGame = await Game.find();
        res.status(200).json(dataGame);

    } catch (error) {
        res.status(500).json({
            error: error
        })
    }

})

router.get('/find-id-game/:id', async (req, res) => {

    const idGame = req.params.id;

    try {
        const dataGame = await Game.findOne({_id: idGame});

        if(!dataGame){
            res.status(424).json({message: 'game not found'});
            return;
        }

        res.status(200).json(dataGame)
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }

})

router.put('/update/:id', async (req, res) => {

    const idGame = req.params.id;
    const {name, description, genre, produce, releaseYear, value} = req.body

    const game = {
        name,
        description,
        genre,
        produce,
        releaseYear,
        value
    }
   

    try {

        const gameUpdate = await Game.updateOne({_id: idGame}, game);

        if(gameUpdate.matchedCount === 0){
            res.status(422).json({message: 'game not found'});
            return;
        }
        

        res.status(200).json(game);
        
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
})


router.delete('/delete/:id', async (req, res) => {

    const idGame = req.params.id;

    const dataGame = await Game.findOne({_id: idGame});

    if(!dataGame){
        res.status(424).json({message: 'game not found'});
        return;
    }
 

    try {
        await Game.deleteOne({_id: idGame})
        res.status(200).json({message: "game deleted successfully"})
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }

})

module.exports = router