/**
 * Created with JetBrains WebStorm.
 * User: b.slm
 * Date: 4/06/13
 * Time: 12:54
 * To change this template use File | Settings | File Templates.
 */
exports.home = function(req, res){
    res.render('home', { title: 'COCHES' })
};