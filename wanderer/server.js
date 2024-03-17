import express from "express";
import * as dotenv from "dotenv";
import routes from "./routes/index.js";
import { dbConnect } from "./db/connection.js";
import middlewareWrapper from "cors";
import bodyParser from "body-parser";