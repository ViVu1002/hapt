var express = require("express");
var router = express.Router();
var db = require("../models");
const Op = db.Sequelize.Op;
router.get("/", function(req, res, next) {
  db.Products.findAndCountAll({
    include: "images"
  }).then(results => {
    let data = results.rows;
    res.send({ data: data });
  });
});
//Get all
router.post("/sort", function(req, res, next) {
  let currentPage = req.query.currentPage ? parseInt(req.query.currentPage) : 1;
  let perPage = req.query.perPage ? parseInt(req.query.perPage) : 5;
  db.Products.findAndCountAll({
    limit: perPage,
    offset: (currentPage - 1) * perPage,
    include: "images",
    order: [req.body]
  }).then(results => {
    let data = results.rows;
    let total = results.count;
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
//search
router.get("/search", function(req, res, next) {
  db.Products.findAndCountAll({
    where: {
      name: {
        [Op.substring]: req.query.search
      }
    },
    include: "images"
  }).then(results => {
    let data = results.rows;
    res.send({ data });
  });
});
// get orderby id
router.get("/newest", function(req, res, next) {
  db.Products.findAndCountAll({
    order: [["id", "DESC"]],
    limit: 6,
    include: "images"
  }).then(results => {
    let data = results.rows;
    res.send({ data });
  });
});

//limit 3
router.get("/new-products", function(req, res, next) {
  db.Products.findAndCountAll({
    order: [["id", "DESC"]],
    limit: 3,
    include: "images"
  }).then(results => {
    let data = results.rows;
    res.send({ data });
  });
});

// get orderby order_time
router.get("/order_time", function(req, res, next) {
  db.Products.findAndCountAll({
    order: [["order_time", "DESC"]],
    limit: 6,
    include: "images"
  }).then(results => {
    let data = results.rows;
    res.send({ data });
  });
});

router.get("/menu/:id", function(req, res, next) {
  let id = req.params.id;
  db.Products.findAndCountAll({
    where: {
      categoriesId: id
    },
    include: "images"
  }).then(results => {
    let data = results.rows;
    res.send({ data });
  });
});

// Get by id
router.get("/:id", function(req, res, next) {
  db.Products.findByPk(req.params.id, {
    include: "images"
  }).then(results => res.send({ data: results }));
});

// Get by id
router.get("/comment/:id", function(req, res, next) {
  db.Products.findByPk(req.params.id, {
    include: "comments",
    limit: 5
  }).then(results => res.send({ data: results }));
});

// Post
router.post("/", function(req, res) {
  let form = req.body;
  if (!form) {
    res.send("form exits");
  }
  db.Products.create(form).then(res.send({ message: "create success" }));
});

//Update

router.put("/:id", function(req, res, next) {
  let form = req.body;
  if (form == "") {
    console.log("hello");
  } else {
    db.Products.update(form, {
      where: {
        id: req.params.id
      }
    }).then(result => {
      res.send({ data: result, message: "update success" });
    });
  }
});

//Delete
router.delete("/:id", function(req, res, next) {
  db.Products.destroy({ where: { id: req.params.id } }).then(
    res.send({ message: "delete success" })
  );
});
module.exports = router;
