const router = require('express').Router();
const ctrl = require('../controllers/quote.controller');
const { protect } = require('../middleware/auth.middleware');

router.post('/', ctrl.submitQuote);
router.get('/', protect, ctrl.getAll);
router.get('/:id', protect, ctrl.getOne);
router.put('/:id/status', protect, ctrl.updateStatus);
router.delete('/:id', protect, ctrl.delete);

module.exports = router;
