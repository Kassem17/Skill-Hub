import jwt from "jsonwebtoken";

const authAdmin = async (req, res, next) => {
  const aToken =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!aToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(aToken, process.env.JWT_SECRET);
    req.adminUser = decoded.id;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Unauthorized" });
  }
};

export default authAdmin;
