const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
const EngineName = "hbs"; //Dùng để đặt tên cho template engine cũng như đuôi file

//Cấu hình các thư mục tĩnh có thể render ra ngoài: ví dụ ThuMucShare, như vậy thì tất cả các thư mục con như icons,img,pdf,css đểu có thể render
app.use(express.static(path.join(__dirname, "ThuMucShare")));

//Cấu hình middleware để đọc được req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const morgan = require("morgan");
app.use(morgan("combined"));

//Templates engine
const { engine } = require("express-handlebars");
app.engine(
      EngineName,
      engine({
            extname: EngineName,
            defaultLayout: "main",
            layoutsDir: path.join(__dirname, "resources\\views\\layouts"),
            partialsDir: [path.join(__dirname, "resources\\views\\partials")],
      }),
);
app.set("view engine", EngineName);
app.set("views", path.join(__dirname, "resources\\views"));

//Render file src\resources\views\home.handlebars ra thành địa chỉ:http://localhost:3000/
app.get("/", (req, res) => {
      res.render("home");
});
//Render file src\resources\views\tintuc.handlebars ra thành địa chỉ:http://localhost:3000/tin-tuc
app.get("/tin-tuc", (req, res) => {
      res.render("tintuc");
});

//Render file src\resources\views\tintuc.handlebars ra thành địa chỉ:http://localhost:3000/tim-kiem
app.get("/tim-kiem", (req, res) => {
      res.render("timkiem");
});

//Render file src\resources\views\tintuc.handlebars ra thành địa chỉ:http://localhost:3000/tim-kiem
app.post("/tim-kiem", (req, res) => {
      console.log(req.body);
      res.render("timkiem");
});

//Localhost 127.0.0.1
app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
});
