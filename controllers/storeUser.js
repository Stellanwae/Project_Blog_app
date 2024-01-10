// // const User = require('../models/User')

// // module.exports = async (req, res)=> {
// //    await User.create(req.body, (error, user)=>{
// //     if(error){
// //         return res.redirect('auth/register')
// //     }
// //    })
// //    res.redirect('/')
// // }

// const User = require('../models/User');

// module.exports = async (req, res) => {
//     try {
//         const user = await User.create(req.body);
//         // Successful creation, you may want to handle this case
//         res.redirect('/');
//     } catch (error) {
//         console.error(error);
//         // Redirect to registration page in case of an error
//         res.redirect('/auth/register');
//     }
// };

const User = require('../models/User');
const flash = require('connect-flash')

module.exports = async (req, res) => {
    try {
        const user = await User.create(req.body);

        // If user creation is successful, redirect to '/'
        res.redirect('/');
    } catch (error) {
        if (error.name === 'ValidationError') {
            // If it's a validation error, extract and store the validation errors
            const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message);
            req.flash('validationErrors', validationErrors)
            // req.flash('data',req.body)
            // req.session.validationErrors = validationErrors;
            return res.redirect('/auth/register');
        }

        // Handle other types of errors
        console.error(error);
        return res.redirect('/auth/register');
    }
};

