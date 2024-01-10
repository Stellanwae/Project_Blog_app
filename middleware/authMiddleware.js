// const User = require('../models/User')
// module.exports = (req, res, next) => {
//     User.findById(req.session.userId, (error, user ) =>{
//         if(error || !user )
//             return res.redirect('/')
//             next()
//         })
// }


const User = require('../models/User');

module.exports = async (req, res, next) => {
    try {
        const user = await User.findById(req.session.userId);

        if (!user) {
            return res.redirect('/');
        }

        next();
    } catch (error) {
        console.error(error);
        return res.redirect('/');
    }
};
