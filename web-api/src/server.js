const { bootstrap } = require('./bootstrap');
bootstrap().then(app =>
    app.listen(4000, () => {
        console.log(`listening on port 4000}`)
    }))