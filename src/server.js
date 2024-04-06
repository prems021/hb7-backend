const express = require("express");



const get_Route = require("./routes/get_routes");
const admin_Route = require("./routes/admin_routes");
const post_Route = require("./routes/post_routes");
const routes = require("./routes");


var cors = require("cors");
const app = express();
const path = require("path");
const port = process.env.PORT || 9001;

//  var whitelist = ['https://asaja.in','https://api.kpcuc.com','https://csweb.in','https://store.csweb.in']
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }
 

// app.use(cors(corsOptions));


 app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.use("/hb7-india-api/", routes());
app.use("/hb7-india-api/get",get_Route());
app.use("/hb7-india-api/post",post_Route());
app.use("/hb7-india-api/admin",admin_Route());


app.get("/about", function(req, res) {

    res.send("Hello World, How are you!");
  
});
app.get("/", function(req, res) {
   res.send("Hello World, How are you!");
});

// app.options('*', cors())

app.listen(port, function() {
  console.log(`This app tuning on port ${port}!`);
});