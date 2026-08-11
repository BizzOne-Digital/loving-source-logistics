const router = require('express').Router();
const ctrl = require('../controllers/gallery.controller');
const { protect } = require('../middleware/auth.middleware');
const { upload } = require('../config/cloudinary');

const setFolder = (req, res, next) => { req.uploadFolder = 'loving-source-logistics/gallery'; next(); };

router.get('/', ctrl.getAll);
router.get('/admin', protect, ctrl.getAllAdmin);
router.post('/', protect, setFolder, upload.single('image'), ctrl.create);
router.put('/:id/toggle', protect, ctrl.toggleActive);
router.delete('/:id', protect, ctrl.delete);

module.exports = router;
