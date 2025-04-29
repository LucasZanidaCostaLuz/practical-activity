const express = require("express");
const router = express.Router();
const heroController = require("../controllers/heroController");
const upload = require("../config/upload");
const apiKeyMiddleware = require("../config/apiKey")

router.use(apiKeyMiddleware)
router.get("/heroes", heroController.getAllHeroes);
router.get("/heroes/:id", heroController.getHeroById);
router.post("/heroes", upload.single("photo"), heroController.createHero);
router.put("/heroes/:id", heroController.editHero);
router.delete("/heroes/:id", heroController.deleteHero)

module.exports = router;