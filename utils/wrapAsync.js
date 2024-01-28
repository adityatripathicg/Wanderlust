module.exports = function wrapAsync(fn){
    return function (req,res,next){
        if (typeof fn !== 'function') {
            return next(new Error('Provided argument is not a function.'));
        }
        fn(req,res,next).catch(next);
    }
}