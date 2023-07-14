const express = require("express");

const router = express.Router();

const teamController = require("./../controllers/teamController");

router.route("/").get(teamController.getAllTeams).post(teamController.addTeam);
router
  .route("/:id")
  .get(teamController.getTeam)
  .patch(teamController.updateTeam)
  .delete(teamController.deleteTeam);

module.exports = router;
