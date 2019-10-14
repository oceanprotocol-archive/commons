import debug from 'debug'
import express from 'express'
import compression from 'compression'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import pkg from '../package.json'

// routes
import UrlCheckRouter from './routes/UrlCheckRouter'
import ReportRouter from './routes/ReportRouter'

// config
import config from './config'

// debug
const log = debug('server:index')

const app = express()

function onListening(): void {
    log('Server thread started')
}

function onError(error: NodeJS.ErrnoException): void {
    if (error.syscall !== 'listen') throw error
    switch (error.code) {
        case 'EACCES':
            log('Required elevated privileges')
            process.exit(1)
        case 'EADDRINUSE':
            log('Port is already in use')
            process.exit(1)
        default:
            throw error
    }
}

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    )
    res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, DELETE'
    )
    next()
})
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(compression())

// routes
app.get('/', (req, res) => {
    res.send(
        `<strong><code>
            🏄‍♀️ <br />
            Ocean Protocol Commons Server v${pkg.version}<br />
            <a href="https://github.com/oceanprotocol/commons" style="text-decoration:none;color:#f6388a">github.com/oceanprotocol/commons</a>
        </code></strong>`
    )
})
app.use('/api/v1/urlcheck', UrlCheckRouter)
app.use('/api/v1/report', ReportRouter)

/// catch 404
app.use((req, res) => {
    res.status(404).send()
})

// listen
const server = app.listen(config.app.port)
server.on('listening', onListening)
server.on('error', onError)

export default server
