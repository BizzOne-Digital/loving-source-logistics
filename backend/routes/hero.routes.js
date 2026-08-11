const router = require('express').Router();
const ctrl = require('../controllers/hero.controller');
const { protect } = require('../middleware/auth.middleware');
const { upload } = require('../config/cloudinary');

const setFolder = (req, res, next) => { req.uploadFolder = 'loving-source-logistics/hero'; next(); };

router.get('/', ctrl.get);
router.put('/', protect, setFolder, upload.single('backgroundImage'), ctrl.update);

module.exports = router;
