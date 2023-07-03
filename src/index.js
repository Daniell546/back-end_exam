const app = require("express")();
const routes = require("./routes");
const expressConfig = require("./config/expressConfig");
const dbConfig = require("./config/dbConfig");
const handlebarsConfig = require("./config/handlebarsConfig");
const cookieParser = require('cookie-parser');
const { auth } = require('./middlewares/authMiddleware');

expressConfig(app);
handlebarsConfig(app);
dbConfig()
    .then(() => console.log("DB connected"))
    .catch((err) => console.log("Error"));

    
app.use(cookieParser());
app.use(auth);
app.use(routes);

app.listen(3000, () => console.log("Server on 3000"));
