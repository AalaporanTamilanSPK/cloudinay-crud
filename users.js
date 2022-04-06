var express = require('express')
var router = express.Router();
var cloudinary = require('../utils/cloudinary')
var upload = require('../utils/multer')

var User = require('../model/cloudschema')
router.post('/upload', upload.single('video'), async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path)
        //create instance of user
        let user = new User({
            name: req.body.name,
            avatar: result.secure_url,
            cloudinary_id: result.public_id
        })//save user
        user.save()
        res.json(user)
    } catch (err) {
        console.log(err)

    }
});
router.get('/find', (req, res) => {
    User.find(function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            res.send(data);
        }
    });
});

router.delete("/remove", async (req, res) => {
    try {
        let user = await User.findById(req.body._id)
        await cloudinary.uploader.destroy(user.cloudinary_id)//delete cloude_id
        await user.remove()//remove database
        res.json(user)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router