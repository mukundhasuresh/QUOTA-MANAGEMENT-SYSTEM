const router = require("express").Router();
const { authenticate } = require("../middlewares/auth");
const { submitRequest } = require("../controllers/requestController");

router.post("/", authenticate, submitRequest);

module.exports = router;
