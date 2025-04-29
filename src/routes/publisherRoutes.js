const express = require("express");
const router = express.Router();
const publisherController = require("../controllers/publisherController");
const apiKeyMiddleware = require("../config/apiKey")

router.use(apiKeyMiddleware)
router.get("/publisher", publisherController.getAllPublisher);
router.get("/publisher/:id", publisherController.getPublisherById);
router.post("/publisher", publisherController.createPublisher);
router.put("/publisher/:id", publisherController.editPublisher);
router.delete("/publisher/:id", publisherController.deletePublisher);

module.exports = router;