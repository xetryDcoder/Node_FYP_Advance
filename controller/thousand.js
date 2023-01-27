exports.thousand = (req, res) => {
    let numbers = []

    //looping in this array
    for(let i = 0; i < 1001; i++){
        numbers.push(i)
    }
    console.log("Array is below")
    console.log(numbers)

    res.render("thousand", {
      ramey: numbers,
    });
}