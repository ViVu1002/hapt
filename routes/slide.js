var express = require("express");
var router = express.Router();
var db = require("../models");
router.get("/", function(req, res) {
    db.Slide.findAndCountAll({
        include: 'slide_images'
    }).then(results => {
        res.send(results);
    });
});

router.get("/:id", function(req, res) {
    db.Slide.findByPk(req.params.id, {
        include: 'slide_images'
    }).then(result => {
        return res.send(result);
    });
});

router.post("/", function(req, res) {
    let slide = req.body;
    db.Slide.create(slide).then(result => {
        return res.send(result);
    });
});
router.put("/:id", function(req, res) {
    let slide_id = req.body.id;
    let slide_detail = req.body;
    db.Slide.update(slide_detail, {
        where: {
            id: slide_id
        }
    }).then(result => {
        res.send(result);
    });
});

router.delete("/:id", function(req, res) {
    let slide_detail_id = req.params.id;

    if (!slide_detail_id) {
        return res
            .status(400)
            .send({ error: true, message: "Please provide order_detail_id" });
    }
    db.Slide.destroy({
        where: {
            id: slide_detail_id
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