const get404 = (req, res, next) => {
    //pub file
    res.status(404).render('404', { pageTitle: 'Page Not Found', path: 'error'});
};


module.exports = {
    get404 : get404
};