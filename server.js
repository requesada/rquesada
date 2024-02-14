const express = require('express')
const path = require('path')

const serverApp = express()
const port = 3000
const directoryName = process.cwd()

serverApp.use(express.static(path.join(directoryName, 'dist')))
serverApp.use((req, res) => {
    res.status(200)
})

serverApp.listen(port, () => {
    console.log(`Listening on port ${port}`)
})