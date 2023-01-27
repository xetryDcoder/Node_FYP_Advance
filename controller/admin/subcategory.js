const SUBCATEGORY = require('../../model/admin/subcategory')
const CATEGORY = require("../../model/admin/category");

//@GET
//Route: /admin/add-subcategory
// START ADD SUBCATEGORY

exports.getAddSubcategory = async (req, res) => {
  try {
    let data = await CATEGORY.find()
    res.render("admin/subcategory/add_subcategory", {
      data
    });
  } catch(err) {
    console.log(err)
  }
    
}

//@POST
//Route: /admin/add-subcategory
// START POST SUBCATEGORY

exports.postAddSubcategory = (req, res) => {
    if(!req.body.subcategory){
            return res.status("200").send({
              data: "No subcategory was added",
            });
    }

    let data = {
        subcategory: req.body.subcategory,
        category: req.body.category,
    }
    
      SUBCATEGORY.create({ ...data })
        .then((result) => {
          res.redirect("/admin/add-subcategory");
        })
        .catch((err) => {
          console.log(err);
        });
}


//@GET
//Route: /admin/view-subcategory
// START VIEW SUBCATEGORY

exports.getViewSubcategory = (req, res) => {
    SUBCATEGORY.find()
    .populate('category')
    .then(result => {
        res.render("admin/subcategory/view_subcategory", {
           data: result 
        })
    })
    .catch(err => {
        console.log(err)
    })
}

//@GET
//Route: /admin/delete-subcategory/:id
// START DELETE SUBCATEGORY

exports.getDeleteController = (req, res) => {
    SUBCATEGORY.findByIdAndDelete(req.params.id)
    .then(result => {
        res.redirect("/admin/view-subcategory");
        console.log(result)
    })
    .catch(err => {
        console.log(err)
    })
}


//@GET
//Route: /admin/edit-subcategory/:id
// START VIEW EDIT SUBCATEGORY

exports.getEditSubcategory = (req, res) => {
    SUBCATEGORY.findById( req.params.id )
    .then(result => {
         res.render("admin/subcategory/edit_catgeory", {
           data: result
         })
    })
    .catch(err => {
        console.log(err)
    })
   
}

//END  VIEW EDIT CATGEOY


//@POST
//Route: /admin/edit-subcategory/:id
// START POST EDIT SUBCATEGORY
exports.postEditSubcategory = (req, res) => {
    if (!req.body.subcategory) {
      return res.render("error", {
        message: "Invalid Input Field",
      });
    }

    let data = {
      subcategory: req.body.subcategory,
      category: req.body.category,
    };
    
    SUBCATEGORY.findByIdAndUpdate( req.params.id , {...data} )
    .then(result => {
        console.log("Successsssss!!! wow")
        res.redirect('/admin/view-subcategory')
    })
    .catch(err => {
        console.log("O no! Faillll")
    })
}

//EDN EDIT SUBCATEGORY