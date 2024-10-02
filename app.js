var express = require("express");
var cors = require("cors");
var path = require("path");
var router = express.Router();
var PORTA = 3333;

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/", 
router.get("/", function (res) {
    res.render("index");
})
);

var url = `http://10.18.34.59:${PORTA}`

app.listen(PORTA, function () {
    console.log(`O seu site já está na web na url ${url}`);
});