const xp = require("express");
const bp = require("body-parser");
const router = require("./server/routes.js");
const path = require("path");
const app = xp();
app.use(xp.static( __dirname + '/angular/dist/angular' ));
app.use(bp.json());
app.use(bp.urlencoded({extended: true}));
router(app);
app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./angular/dist/angular/index.html"))
  });
app.listen(8000, (errs)=>console.log(errs?errs:"db Project"));