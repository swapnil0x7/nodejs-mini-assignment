const fs = require("fs");

const teams = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/teams.json`)
);

exports.getAllTeams = (req, res) => {
  res.status(200).send({
    status: "success",
    data: {
      teams,
    },
  });
};

exports.getTeam = (req, res) => {
  const id = req.params.id * 1;
  const team = teams.find((team) => team.id === id);

  if (!team) {
    return res.status(404).send({
      status: "fail",
      message: "Invalid ID",
    });
  }
  res.status(200).send({
    status: "success",
    data: {
      team,
    },
  });
};

exports.updateTeam = (req, res) => {
  const id = req.params.id * 1;

  const team = teams.find((team) => team.id === id);

  if (!team) {
    return res.status(404).send({
      status: "fail",
      message: "Invalid ID",
    });
  } else {
    if (req.body.teamName) {
      team.teamName = req.body.teamName;
    }
    if (req.body.players) {
      team.players = req.body.players;
    }
    if (req.body.topScorer) {
      team.topScorer = req.body.topScorer;
    }
    if (req.body.topWicketTakers) {
      team.topWicketTakers = req.body.topWicketTakers;
    }

    return res.status(200).send({
      status: "success",
      data: {
        team,
      },
    });
  }
};

exports.addTeam = (req, res) => {
  const newId = teams[teams.length - 1].id + 1;
  const newTeam = Object.assign({ id: newId }, req.body);
  teams.push(newTeam);

  fs.writeFile(
    `${__dirname}/dev-data/teams.json`,
    JSON.stringify(teams),
    (err) => {
      res.status(200).send({
        status: "success",
        data: {
          team: newTeam,
        },
      });
    }
  );
};

exports.deleteTeam = (req, res) => {
  const id = req.params.id * 1;

  const index = teams.findIndex((team) => team.id === id);

  if (index !== -1) {
    teams.splice(index, 1);
    res.status(204).send();
  } else {
    return res.status(404).send({
      status: "fail",
      message: "Invalid ID",
    });
  }
};
