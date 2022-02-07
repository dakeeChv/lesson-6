const router = require('express').Router()
const { Create, GetAll, Update, Delete } = require('../controllers/companyController')

router.post('/', Create)
router.get('/', GetAll)
router.put('/:id', Update)
router.delete('/:id', Delete)

module.exports = router