const router = require("express").Router();
const { authenticate, authorize } = require("../middlewares/auth");
const { setQuota, getUsageReport } = require("../controllers/adminController");

// ✅ Assign quota
router.put(
  "/quota/:userId",
  authenticate,
  authorize("ADMIN"),
  setQuota
);

// ✅ Usage report
router.get(
  "/reports",
  authenticate,
  authorize("ADMIN"),
  getUsageReport
);

module.exports = router;
