module.exports.setFlash = function(req,res,next)
{
    res.locals.flash = //for sending response from request
    {
        'success':req.flash('success'),
        'error':req.flash('error')
    }
    next();
}