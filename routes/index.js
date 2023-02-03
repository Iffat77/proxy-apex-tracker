const url = require("url");
const express = require("express");
const router = express.Router();
const needle = require("needle");

const API_BASE_URL = process.env.API_BASE_URL;
const REACT_APP_API_KEY = process.env.REACT_APP_API_KEY;

router.get("/", async (req, res) => {
  try {
    console.log(url.parse(req.url, true).query);

    const params = new URLSearchParams({
      ...url.parse(req.url, true).query,
    });
    let plat = params.get("plat");
    let user = params.get("user");

    console.log(plat, user, "here");
    //log the request to strats
    if (process.env.NODE_ENV !== "production") {
      console.log(`REQUEST: ${API_BASE_URL}${params}`);
    }

    const apiRes = await needle(
      "get",
      // "https://public-api.tracker.gg/v2/apex/standard/profile/xbl/taffi77",
      `${API_BASE_URL}${plat}/${user}`,
      { headers: { "TRN-Api-Key": REACT_APP_API_KEY } }
    );
    const data = apiRes.body;

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;