//express
const express = require("express");
const app = express()
//mongo - database
const mongoose = require("mongoose")
const cors = require("cors")

const PORT = 9090;
//dados database
const DB_USER = 'database-api-games';
const DB_PASS =  encodeURIComponent('SYdQKUkmDZ0NnfAD')

app.use(cors())

app.use(
    express.urlencoded({
        extended:true,
    }),
)


//permitindo a leitura de json
app.use(express.json())

//rotas
const gamesRoutes = require('./routes/gamesRoutes')

app.use('/game', gamesRoutes)





//configuração de rotas
app.get('/', (req, res) =>{

    res.json({message: "Olá mundo!"});

})




mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASS}@clusterapi.gmzbh6s.mongodb.net/gamesdatabase?retryWrites=true&w=majority`)
.then(() => {
    console.log('conectamos ao banco de dados')
    //porta api
    app.listen(PORT)
})
.catch((err) => {
    console.log(err)
})
