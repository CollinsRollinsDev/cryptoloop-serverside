import express from "express";
import fetch from "node-fetch";
import getRequestedData from './getData.js';
const index = express();
index.use(express.urlencoded({ extended: true }));
index.use(express.json());
var cors = require('cors')

index.use(cors())


index.get("/", async (req, res) => {
  const method = req.method;
  const { url, token, limit } = req.query;
  if (method !== "GET") {
    return res.status(401).json({
      success: false,
      reason: "Invalid request type",
      data: "",
    });
  }
  let proceedWithLimit = false;
  if (!url) {
    return res.status(401).json({
      success: false,
      reason: "Not provided with valid params",
      data: "",
    });
  }
  if (limit) {
    proceedWithLimit = true;
  }
  console.log("Things are working well");
  const data = await getRequestedData(url);
  if (data == "something went wrong") {
    return res.status(401).json({
      success: false,
      reason: "Internal server error",
      data: "",
    });
  }
  console.log(data, "as data");
  return res.status(201).json({
    success: true,
    reason: "all fine and good",
    data,
  });
});

const PORT = 7000;
index.listen(PORT, console.log(`Server is running on port ${PORT}`));
