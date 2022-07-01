var express = require("express");
var router = express.Router();
var db = require("../models");
const Op = db.Sequelize.Op;
router.get("/", function(req, res) {
  let search = req.query.search;
  let currentPage = req.query.page ? parseInt(req.query.page) : 1;
  let perPage = req.query.perPage ? parseInt(req.query.perPage) : 6;
  db.Order_status.findAndCountAll({
    where: {
      name: {
        [Op.substring]: "%" + search + "%"
      }
    },
    limit: perPage,
    offset: (currentPage - 1) * perPage
  }).then(results => {
    let total = results.count;
    let data = results.rows;
    let totalPage = Math.ceil(total / perPage);
    res.send({
      data,
      pagination: {
        total,
        perPage,
        currentPage,
        totalPage
      }
    });
  });
});

router.get("/:id", function(req, res) {
  db.Order_status.findByPk(req.params.id).then(result => {
    return res.send(result);
  });
});

router.post("/", function(req, res) {
  let order_status = req.body;

  db.Order_status.create(order_status).then(result => {
    return res.send(result);
  });
});

router.put("/:id", function(req, res) {
  let order_status_id = req.body.id;
  let order_status = req.body;
  db.Order_status.update(order_status, {
    where: {
      id: order_status_id
    }
  }).then(result => {
    res.send(result);
  });
});

router.delete("/:id", function(req, res) {
  let order_status_id = req.params.id;

  if (!order_status_id) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide order_status_id" });
  }
  db.Order_status.destroy({
    where: {
      id: order_status_id
    }
  }).then(result => {
    console.log("Done");
    return res.send({
      error: false,
      data: result,
      message: "user has been updated successfully."
    });
  });
});

module.exports = router;
