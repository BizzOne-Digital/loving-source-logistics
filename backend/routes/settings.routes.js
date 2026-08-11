const router = require('express').Router();
const ctrl = require('../controllers/settings.controller');
const { protect } = require('../middleware/auth.middleware');
const { upload } = require('../config/cloudinary');

const setFolder = (req, res, next) => { req.uploadFolder = 'loving-source-logistics/branding'; next(); };

router.get('/', ctrl.get);
router.put('/', protect, setFolder, upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'favicon', maxCount: 1 }]), ctrl.update);

module.exports = router;
