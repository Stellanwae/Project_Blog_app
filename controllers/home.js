const BlogPost = require('../models/BlogPost')

const  homeControllers =  async (req, res)=>{
    let blogposts = await BlogPost.find({}).populate('userid')
    res.render('index', {
        blogposts: blogposts
    })

}

module.exports = homeControllers