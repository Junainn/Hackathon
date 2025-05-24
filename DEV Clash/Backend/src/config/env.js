/* eslint-disable no-undef */
import { config } from "dotenv";

config({path:`.env`});

export const {
    PORT
} = process.env;