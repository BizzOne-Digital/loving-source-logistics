const router = require('express').Router();
const ctrl = require('../controllers/service.controller');
const { protect } = require('../middleware/auth.middleware');
const { upload } = require('../config/cloudinary');

const setFolder = (folder) => (req, res, next) => { req.uploadFolder = folder; next(); };

router.get('/', ctrl.getAll);
router.get('/admin', protect, ctrl.getAllAdmin);
router.post('/', protect, setFolder('loving-source-logistics/services'), upload.single('image'), ctrl.create);
router.put('/:id', protect, setFolder('loving-source-logistics/services'), upload.single('image'), ctrl.update);
router.delete('/:id', protect, ctrl.delete);

module.exports = router;
