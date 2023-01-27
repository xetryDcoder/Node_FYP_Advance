exports.postAdd = (req, res) => {
  let sum = parseInt( req.body.numberOne) + parseInt( req.body.numberTwo )
  res.status(200).send({
    data: sum,
  });
};