exports.mainPage = (req, res) => {
   console.log(req.session)
   res.render('index', {
    name: 'Hemanta',
    greeting: req.greeting
   })
}

exports.indexId = (req, res) => {
    res.render('indexId',{
        id: req.params.id
    })
}


