const express = require("express");

const matchController = require("./../controllers/matchController");

const router = express.Router();

router
  .route("/")
  .get(matchController.getAllMatches)
  .post(matchController.addMatch);
router
  .route("/:id")
  .get(matchController.getMatch)
  .patch(matchController.updateMatch)
  .delete(matchController.deleteMatch);

module.exports = router;
