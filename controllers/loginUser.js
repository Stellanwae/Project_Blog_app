// const bcrypt = require('bcrypt')
// const User = require('../models/User')

// module.exports = (req, res) => {
//     const { username, password } = req.body

//     User.findOne({username:username}, (error, user)=>{
//         if(user){
//             bcrypt.compare(password, user.password, (error, same)=> {
//                 if(same){
//                     req.session.userId = user._id
//                     res.redirect('/')
//                 }else{
//                     res.redirect('/auth/login')
//                 }
//             })
//         }else{
//             res.redirect('auth/login')
//         }
//     })
// }



const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username: username });

        if (user) {
            const same = await bcrypt.compare(password, user.password);

            if (same) {
                req.session.userId = user._id;
                return res.redirect('/');
            } else {
                return res.redirect('/auth/login');
            }
        } else {
            return res.redirect('/auth/login');
        }
    } catch (error) {
        console.error(error);
        return res.redirect('/auth/login');
    }
};
