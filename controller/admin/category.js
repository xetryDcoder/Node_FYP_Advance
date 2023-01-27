const CATEGORY = require('./../../model/admin/category')

//@GET
//Route: /admin/add-category
// START ADD CATEGORY

exports.getAddCategory = (req, res) => {
    res.render("admin/category/add_category", {
      message: req.flash("info")
    });
}

//@POST
//Route: /admin/add-category
// START POST CATEGORY

exports.postAddCategory = (req, res) => {
    if(!req.body.category){
            return res.status("200").send({
              data: "No category was added",
            });
    }

    if( typeof req.file == "undefined") {
        return res.status('200').send({
          data:'No Image was uploaded'
        })
    }

    let data = {
        category: req.body.category,
        image: req.file.filename,
    }
    
      CATEGORY.create({ ...data })
        .then((result) => {
          req.flash("info", "Data Created success");
          res.redirect("/admin/add-category");
        })
        .catch((err) => {
          console.log(err);
        });
}


//@GET
//Route: /admin/view-category
// START VIEW CATEGORY

exports.getViewCategory = (req, res) => {
    CATEGORY.find()
    .then(result => {
        res.render("admin/category/view_category", {
           data: result 
        })
    })
    .catch(err => {
        console.log(err)
    })
}

//@GET
//Route: /admin/delete-category/:id
// START DELETE CATEGORY

exports.getDeleteController = (req, res) => {
    CATEGORY.findByIdAndDelete(req.params.id)
    .then(result => {
        res.redirect("/admin/view-category");
        console.log(result)
    })
    .catch(err => {
        console.log(err)
    })
}


//@GET
//Route: /admin/edit-category/:id
// START VIEW EDIT CATEGORY

exports.getEditCategory = (req, res) => {
    CATEGORY.findById( req.params.id )
    .then(result => {
         res.render("admin/category/edit_catgeory", {
           data: result
         })
    })
    .catch(err => {
        console.log(err)
    })
   
}

//END  VIEW EDIT CATGEOY


//@POST
//Route: /admin/edit-category/:id
// START POST EDIT CATEGORY
exports.postEditCategory = (req, res) => {
    if (!req.body.category) {
      return res.render("error", {
        message: "Invalid Input Field",
      });
    }

    let data = {
      category: req.body.category,
      image: req.file.filename,
    };
    
    CATEGORY.findByIdAndUpdate( req.params.id , {...data} )
    .then(result => {
        console.log("Successsssss!!! wow")
        res.redirect('/admin/view-category')
    })
    .catch(err => {
        console.log("O no! Faillll")
    })
}

//EDN EDIT CATEGORY