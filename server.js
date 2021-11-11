const express = require("express");
const clear = require('./api/clearCache');
const timeout = require('./api/clientTimeout');
const app = express();
require('dotenv').config();


app.get('/', (req, res) => {
    res.json({ 'Message': 'conected' })
})

app.get('/api/clear/:targetRedis', async function (req, res) {
    let target = req.params.targetRedis
    
    try {
        await clear.clearCache(target)

        res.send({
            'cache': `${req.params.targetRedis}`,
            'message': 'Successfully cleared cache',
            'status': 200
        })

    } catch (err) {
        console.error(`Error flushing db '${target}': ` + err)
        res.send({ "error": 500 })
    }

})

app.get('/api/timeout/:targetRedis', async function (req, res) {
    let target = req.params.targetRedis
    
    try {
        timeout.clientTimeout(target)

        res.send({
            'cache': `${req.params.targetRedis}`,
            'message': 'Successfully client timeout',
            'status': 200
        })

    } catch (err) {
        console.error(`Error flushing db '${target}': ` + err)
        res.send({ "error": 500 })
    }

})

const port = process.env.PORT || 9200
app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
})






