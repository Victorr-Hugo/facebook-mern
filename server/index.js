import { app, httpServer } from './app.js'
import { connectDB } from './db.js'
import { PORT } from './config.js'

connectDB()

app.set('port', PORT)

httpServer.listen(app.get('port'), () => {
    const port = httpServer.address().port
    console.log('Running on: ', port)
})