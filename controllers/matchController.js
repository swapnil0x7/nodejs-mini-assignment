const fs = require("fs");

const matches = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/matches.json`)
);

exports.getMatch = (req, res) => {
  const id = req.params.id * 1;
  const match = matches.find((match) => match.id === id);

  if (!match) {
    return res.status(404).send({
      status: "fail",
      message: "Invalid ID",
    });
  }
  res.status(200).send({
    status: "success",
    data: {
      match,
    },
  });
};

exports.getAllMatches = (req, res) => {
  res.status(200).send({
    status: "success",
    data: {
      matches,
    },
  });
};

exports.updateMatch = (req, res) => {
  const id = req.params.id * 1;

  const match = matches.find((match) => match.id === id);

  if (!match) {
    return res.status(404).send({
      status: "fail",
      message: "Invalid ID",
    });
  } else {
    if (req.body.event) {
      match.event = req.body.event;
    }
    if (req.body.firstContender) {
      match.firstContender = req.body.firstContender;
    }
    if (req.body.secondContender) {
      match.secondContender = req.body.secondContender;
    }
    if (req.body.matchDay) {
      match.matchDay = req.body.matchDay;
    }

    return res.status(200).send({
      status: "success",
      data: {
        match,
      },
    });
  }
};

exports.deleteMatch = (req, res) => {
  const id = req.params.id * 1;

  const index = matches.findIndex((match) => match.id === id);

  if (index !== -1) {
    matches.splice(index, 1);
    res.status(204).send();
  } else {
    return res.status(404).send({
      status: "fail",
      message: "Invalid ID",
    });
  }
};

exports.addMatch = (req, res) => {
  const newId = matches[matches.length - 1].id + 1;
  const newMatch = Object.assign({ id: newId }, req.body);
  matches.push(newMatch);

  fs.writeFile(
    `${__dirname}/dev-data/all-matches.json`,
    JSON.stringify(matches),
    (err) => {
      res.status(200).send({
        status: "success",
        data: {
          match: newMatch,
        },
      });
    }
  );
};
