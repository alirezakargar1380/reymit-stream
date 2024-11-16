// true if its email else false
module.exports.isEmail = function(str) {
    var re = /\S+@\S+\.\S+/;
    return re.test(str);
}


// true if x between min and max else false
module.exports.inRange = function(x, min, max) {
    return x >= min && x <= max;
}