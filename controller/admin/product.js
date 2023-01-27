const Product = require('./../../model/product')


exports.getAddProduct = (req, res) => {
    let data = req.flash('message')
    res.render('admin/product/add_product', {
        message: data,
    })
}

exports.allProducts = (req, res) => {
    Product.find()
    .then(data => {
        res.render("admin/product/products", {
            data
        })
    })
    .catch(err => {
        console.log(err)
    })
}

exports.postProduct = (req, res) => {
    if(!req.body.user && !req.body.name && !req.body.description) {
        res.redirect("/admin/add-product");
        return
    } else {
        let data = {
            ...req.body,
            image: req.file.filename
        }
        Product.create({...data})
        .then(result => {
            req.flash('message', 'Product Added Successfully!')
            res.redirect("/admin/add-product");
            console.log("success")
        })
        .catch(err => {
            req.flash('message', 'Prroduct Adding Failed')
            console.log(err)
        })
    }
}

exports.getEditProduct = (req, res) => {
    Product.findById(req.params.id)
    .then(result => {
        res.render("admin/product/edit_product", {
            data: result
        });
    })
    .catch(err => {
        res.redirect("/admin/add-product");
        console.log(err)
    })
}

exports.postEditProduct = (req, res) => {
    console.log(req);
    Product.findByIdAndUpdate(req.params.id, {...req.body})
    .then(result => {
        res.redirect("/admin/add-product");
    })
    .catch(err => {
            res.redirect("/admin/add-product");
        })
}