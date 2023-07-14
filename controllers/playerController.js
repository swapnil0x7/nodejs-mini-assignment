const fs = require("fs");

const players = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/players.json`)
);

exports.getAllPlayers = (req, res) => {
  res.status(200).send({
    status: "success",
    data: {
      players,
    },
  });
};

exports.getPlayer = (req, res) => {
  const id = req.params.id * 1;
  const player = players.find((player) => player.id === id);

  if (!player) {
    return res.status(404).send({
      status: "fail",
      message: "Invalid ID",
    });
  }
  res.status(200).send({
    status: "success",
    data: {
      player,
    },
  });
};

exports.updatePlayer = (req, res) => {
  const id = req.params.id * 1;

  const player = players.find((player) => player.id === id);

  if (!player) {
    return res.status(404).send({
      status: "fail",
      message: "Invalid ID",
    });
  } else {
    if (req.body.name) {
      player.name = req.body.name;
    }
    if (req.body.team) {
      player.team = req.body.team;
    }
    if (req.body.score) {
      player.score = req.body.score;
    }
    if (req.body.wickets) {
      player.wickets = req.body.wickets;
    }

    return res.status(200).send({
      status: "success",
      data: {
        player,
      },
    });
  }
};

exports.deletePlayer = (req, res) => {
  const id = req.params.id * 1;

  const index = players.findIndex((player) => player.id === id);

  if (index !== -1) {
    players.splice(index, 1);
    res.status(204).send();
  } else {
    return res.status(404).send({
      status: "fail",
      message: "Invalid ID",
    });
  }
};

exports.addPlayer = (req, res) => {
  const newId = players[players.length - 1].id + 1;
  const newPlayer = Object.assign({ id: newId }, req.body);
  players.push(newPlayer);

  fs.writeFile(
    `${__dirname}/dev-data/players.json`,
    JSON.stringify(players),
    (err) => {
      res.status(200).send({
        status: "success",
        data: {
          player: newPlayer,
        },
      });
    }
  );
};
