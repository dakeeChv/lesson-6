const router = require('express').Router()
const { Create, GetAll, Update, Delete } = require('../controllers/companyController')

var passportJWT = require('../middleware/passportJWT')
var checkAdmin = require('../middleware/checkAdmin')


router.post('/', Create)
router.get('/',[passportJWT.IsLogin, checkAdmin.IsAdmin], GetAll)
router.put('/:id', Update)
router.delete('/:id', Delete)

module.exports = router