import express from "express";
import router from "./src/routes/user.routes.js";
import path from "path";
import {engine} from 'express-handlebars'
import fileUpload from "express-fileupload";
process.loadEnvFile();
const app = express();
const PORT = process.env.PORT || 3033;
const __dirname = import.meta.dirname;

//carpetos publicas
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "views")));
app.use('/css', express.static(__dirname + "/node_modules/bootstrap/dist/css"));
//FU
app.use(
    fileUpload({
        limits: 5000000,
        abortOnLimit: true,
        responseOnLimit: "La imagen pesa mucho. Usa una mas liviana"
    })
);
//HBS
app.set('view engine', 'handlebars')
app.engine (
    "handlebars",
    engine ({
        defaultLayout: "main",
        layoutDir: path.join(__dirname, "/src/views/layout"),
    })
);
//Data FORM/BODY
app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(router);

app.listen(PORT, () =>
  console.log(`🔥Server Running on http://localhost:${PORT}`)
);
