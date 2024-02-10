import express from 'express'
import path from 'path'

const serverApp = express()
const port = 3000
const directoryName = process.cwd()

serverApp.use(express.static('public'))

serverApp.get('/', (req, res) => {
    res.sendFile(path.join(directoryName, 'public/index.html'))
})

serverApp.listen(port, () => {
    console.log(`Listening on port ${port}`)
})