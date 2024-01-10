// const BlogPost = require('../models/BlogPost')
// const path = require('path')

// const postController = (req, res)=>{
//     let image = req.files.image
//     image.mv(path.resolve(__dirname, 'public/img',image.name), async (error)=> {
//         await BlogPost.create({
//             ...req.body,
//             image: '/img/' + image.name,
//             userid: req.session.userId
//         }) 
//         res.redirect('/')
//     })
    
// }

// module.exports = postController

const BlogPost = require('../models/BlogPost');
const path = require('path');

const postController = (req, res) => {
    const image = req.files.image;
    const uploadPath = path.resolve(__dirname, '../public/img', image.name);

    image.mv(uploadPath, async (error) => {
        if (error) {
            console.error(error);
            return res.redirect('/');
        }

        try {
            await BlogPost.create({
                ...req.body,
                image: '/img/' + image.name,
                userid: req.session.userId
            });

            res.redirect('/');
        } catch (err) {
            console.error(err);
            res.redirect('/');
        }
    });
};

module.exports = postController;
