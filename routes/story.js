const express = require('express')
const Story = require('../models/story')
const { ensureAuth ,ensureGuest} = require('../middleware/auth')
const router = express.Router();

router.get('/add', (req,res)=>{
    res.send("story added : this is the story")
})
router.get('/', (req,res)=>{
    res.send("you are in the stories backend")
})
router.post('/poststories',async (req, res) => {
    try {
    //   
    await Story.create(req.body)
      res.redirect('/')
    } catch (err) {
      console.error(err)
    //   res.render('error/500')
    }
  })
  router.get('/getstories',  async (req, res) => {
    try {
      console.log(req.user)
      const stories = await Story.find({ status: 'public' })
        .populate('user')
        .sort({ createdAt: 'desc' })
        // .lean()
  
      res.send(stories)
    } catch (err) {
      console.error(err)
    //   res.render('error/500')
    }
  })
  // @route   GET /stories/:id
router.get('/getstories/:id', async (req, res) => {
    try {
      const user = req.user
      console.log(user)
      const story = await Story.find({user : req.params.id })
        .populate('user')
  
      if (!story) {
          res.send("no story found for this particular user")
      }
  
    //   if (story.user._id != req.user.id && story.status == 'private') {
    //     res.render('error/404')
    //   } else {
    //     res.render('stories/show', {
    //       story,
    //     })
    //   }
        res.send(story)
    } catch (err) {
      console.error(err)
    //   res.render('error/404')
    }
  })
  router.get('/getstoriesbyc' ,async (req, res)=>{
    try {
      const category = req.query.cat; 
      const stories = await Story.find({ category: category })
        // .populate('user')
        .sort({ createdAt: 'desc' })
        // .lean()
  
      res.send(stories)
    } catch (err) {
      console.error(err)
    //   res.render('error/500')
    }
  })
  router.post('/like' , (req,res)=> {
    console.log(req.user)
    const id = req.user._id
    Story.findByIdAndUpdate( req.body.StoryId, {
      $push : {likes : id}
    } , { new : true}).exec((err,result)=> {
      if( err){
        return res.status(422).json({error : err})
      }
      else{
        res.json(result)
      }
    })
  })
  router.put('/unlike' , (req,res)=> {
    const id = req.user._id
    Story.findByIdAndUpdate( req.body.StoryId, {
      $pull : {likes : id}
    } , { new : true}).exec((err,result)=> {
      if( err){
        return res.status(422).json({error : err})
      }
      else{
        res.json(result)
      }
    })
  })
module.exports = router;