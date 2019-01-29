import express from "express";

const app = express();

const server = app.listen(3000, "0.0.0.0", () => {
  console.log("start listen", server.address());
});

app.get("/", (_, res) => {
  res.json("hello");
});
