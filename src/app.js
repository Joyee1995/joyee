const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')
const geocode = require(__dirname + '/utils/geocode')
const forecast = require(__dirname + '/utils/forecast')

const publicdir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../template/views')
const partialPath = path.join(__dirname, '../template/partials')
const port = process.env.PORT || 3000
// console.log(path.join(__dirname,'../views'))

// console.log(__dirname)
// console.log(__filename)
// console.log(path.join(publicdir))

//Setup handlerbars enjine and views location
// refer app.set at http://expressjs.com/en/4x/api.html#app.set
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)




app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Joyee'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'relax',
        name: "Joyee"

    })
})

//Setup static directory to serve
app.use(express.static(publicdir))


app.get('/help', (req, res) => {
    res.send([{
        name: 'Andrew',
        age: 27
    }, {
        name: 'Joyee'

    }])
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Joyee'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'please provide address'
        })
    } 
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastdata) => {
            if (error) {
                return res.send({error})
            }

        res.send({
            forecast:forecastdata,
            location,
            address: req.query.address
        })
        })

    })
})


//*表示其他沒有設route的地址
app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help article not found'
    })
})
app.get('*', (req, res) => {
    res.send('PAGE NOT FOUND!')
})

// app.use((req,res)=>{
//     res.type('text/plain');
//     res.status(404);
//     res.send('404-找不到網頁');
// })

app.listen(port, () => {
    console.log('Server is up on port'+port)
})