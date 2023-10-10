const express = require('express')
const app = express()
const port = 3000
app.get('/', (req, res) => {
 res.send('Hello World!')
})
const path = require('path')
app.use('/car-rental-online', express.static(path.join(__dirname,
'public')))
app.listen(port, () => {
 console.log(`Car Rental Online listening on port ${port}`)
})