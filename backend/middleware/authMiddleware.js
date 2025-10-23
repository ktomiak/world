import jwt from "jsonwebtoken";

export default function authMiddleware(req, res, next) {
  console.log("=== authMiddleware incoming ===");
  console.log("Method:", req.method, "URL:", req.originalUrl);
  console.log("Auth header:", req.headers.authorization);
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.log("-> brak authHeader");
    return res.status(401).json({ error: "Brak tokena" });
  }

  const token = authHeader.split(" ")[1]; // "Bearer TOKEN"
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("-> decoded token:", decoded);
    req.user = decoded; // { id: user.id }
    next();
  } catch (err) {
  	console.log("-> jwt verify error:", err.message);
    res.status(401).json({ error: "Niepoprawny token" });
  }
}
