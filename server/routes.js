const api = require("./controller");

function router(app){
    app.post("/api/User/new",api.Register);
    app.put("/api/User/newdate/:user1_id",api.CreateDate);
    app.get("/api/User/login",api.GetLoginUser);
    app.get("/api/User/:id",api.GetUser);
    app.post("/api/login",api.Login);
    app.get("/api/Users/:city",api.GetUsers);
    app.put("/api/User2/:user2_id",api.UpdateUserDate);
    app.delete("/api/Date/Destroy/:date_id",api.RemoveDate);

}

module.exports = router;