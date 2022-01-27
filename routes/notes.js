const express = require('express')

const noteController = require('../controllers/note')

const router = express.Router()

router.get('/', noteController.list)
router.post('/', noteController.create)
router.get('/new', noteController.render_create_form)
router.get('/:id', noteController.getById, noteController.read)
router.get(
  '/:id/update',
  noteController.getById,
  noteController.render_update_form
)
router.patch('/:id', noteController.getById, noteController.update)
router.delete('/:id', noteController.getById, noteController.destroy)

module.exports = router
