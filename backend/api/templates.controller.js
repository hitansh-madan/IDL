import TemplatesDAO from "../dao/templates.dao.js";

export default class TemplatesController {
  static async apiGetTemplates(req, res, next) {
    const templateList = await TemplatesDAO.getTemplates();
    let response = {
      templates: templateList,
    };
    res.json(response);
  }
  static async apiGetTemplateById(req, res, next) {
    let id = req.params.id || {};
    const template = await TemplatesDAO.getTemplateById(id);
    res.json(template);
  }
  static async apiCreateTemplate(req, res, next) {
    try {
      const productTemplate = req.body;
      const response = await TemplatesDAO.createTemplate(productTemplate);
      res.json({ status: "success" });
    } catch (error) {
      res.status(500).json({ error: e.message });
    }
  }
  static async apiUpdateTemplate(req, res, next) {
    try {
      const productTemplate = req.query.productTemplate;
      const response = await TemplatesDAO.updateTemplate(productTemplate);
      res.json({ status: "success" });
    } catch (error) {
      res.status(500).json({ error: e.message });
    }
  }
  static async apiDeleteTemplate(req, res, next) {
    try {
      const productId = req.query.productId;
      const response = await TemplatesDAO.deleteTemplate(productId);
      res.json({ status: "success" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}