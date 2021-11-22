import express from "express";
import TemplatesCtrl from "./templates.controller.js";
const router = express.Router();
router.route("/").get(TemplatesCtrl.apiGetTemplates);
router
  .route("/")
  .post(TemplatesCtrl.apiCreateTemplate)
  .put(TemplatesCtrl.apiUpdateTemplate)
  .delete(TemplatesCtrl.apiDeleteTemplate);
export default router;
