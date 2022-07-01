var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var order_productsRouter = require("./routes/order_products");
var order_statusesRouter = require("./routes/order_statuses");
var ordersRouter = require("./routes/orders");
var order_detailsRouter = require("./routes/order_details");
var categoriesRouter = require("./routes/categories");
var productsRouter = require("./routes/products");
var galleryRouter = require("./routes/product_image");
var slideRouter = require("./routes/slide");
var commentRouter = require("./routes/comments");
var jwt = require('jsonwebtoken');
var app = express();
// view engine setup
app.use(cors());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "storage")));
app.use("/", indexRouter);
app.use("/order_products", order_productsRouter);
app.use("/order_statuses", order_statusesRouter);
app.use("/orders", ordersRouter);
app.use("/order_details", order_detailsRouter);
app.use("/categories", categoriesRouter);
app.use("/products", productsRouter);
app.use("/gallery", galleryRouter);
app.use("/slide", slideRouter);
app.use("/comment", commentRouter);
//socket io
const server = require('http').createServer(app);
var io = require('socket.io')(server);
var fs = require('fs');
function handler(req, res) {
    fs.readFile(__dirname + '/index.html',
        function(err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading index.html');
            }

            res.writeHead(200);
            res.end(data);
        });
}

io.on('connection', function(socket) {
    socket.on("update-status", function(data) {
        io.sockets.emit("success-status", data);
    });
    socket.on("cancel-order", function(data) {
        io.sockets.emit("success-cancel", data);
    });
    socket.on("cancel-user-order", function(data) {
        io.sockets.emit("success-cancel-user-order", data);
    });

});
// decode token
var checkUserLogged = (req, res, next) => {
    // check header or url parameters or post parameters for token
    var token =
        req.body.token ||
        req.query.token ||
        req.headers["x-access-token"] ||
        req.headers["access-token"] ||
        req.headers["token"] ||
        req.header("token");
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, "qtahhnmsv", (err, decoded) => {
            if (err) {
                return res.json({
                    success: false,
                    message: "Failed to authenticate token.",
                    header: req.headers
                });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                // if (decoded.user_role) {
                next();
                // } else {
                //     return res.status(403).send({
                //         success: false,
                //         message: "Not allow"
                //     });
                // }
            }
        });
    } else {
        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: "No token provided."
        });
    }
};
app.use(checkUserLogged);
app.use("/users", usersRouter);
server.listen(4000, function() {
    console.log("Node app is running on port 4000");
});
module.exports = app;