const router = require('express').Router();
const ctrl = require('../controllers/testimonial.controller');
const { protect } = require('../middleware/auth.middleware');
const { upload } = require('../config/cloudinary');

const setFolder = (req, res, next) => { req.uploadFolder = 'loving-source-logistics/testimonials'; next(); };

router.get('/', ctrl.getAll);
router.get('/admin', protect, ctrl.getAllAdmin);
router.post('/', protect, setFolder, upload.single('avatar'), ctrl.create);
router.put('/:id', protect, setFolder, upload.single('avatar'), ctrl.update);
router.delete('/:id', protect, ctrl.delete);

module.exports = router;
