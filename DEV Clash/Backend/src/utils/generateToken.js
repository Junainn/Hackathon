import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";
import jwt from "jsonwebtoken";
export const generateToken = (id, role, res) => {
    const token = jwt.sign({ Id: id, role: role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    res.cookie(
        "jwt",
        token,
        {
            httpOnly: true,
            secure: false,          // should be true in production with HTTPS
            sameSite: 'Lax',
        }
    )
    return token;
}