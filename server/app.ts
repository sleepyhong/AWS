import cors from "cors";
import express, {Application} from "express";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
dotenv.config();

import * as ProfileRouter from "./router/ProfileRouter";

const app: Application = express();
const port: number = Number(process.env.PORT) || 3001;

require("./db");

app.use(express.json());
app.use(cors({
    origin: '*'
}));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/profiles", ProfileRouter.getProfiles);
app.post("/profile", ProfileRouter.addProfile);
app.delete("/profile/:profileId", ProfileRouter.deleteProfile);
app.put("/profile/:profileId", ProfileRouter.updateProfile);

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});

