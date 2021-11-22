import TemplatesDAO from "../dao/templates.dao.js";

export default class TemplatesController {
  static async apiGetTemplates(req, res, next) {
    const templateList = await TemplatesDAO.getTemplates();
    let response = {
      templates: templateList,
    };
    res.json(response);
  }
  static async apiCreateTemplate(req, res, next) {
    try {
      const productTemplate = req.body.productTemplate;
      const response = await TemplatesDAO.createTemplate(productTemplate);
      res.json({ status: "success" });
    } catch (error) {
        res.status(500).json({error : e.message})
    }
  }
  static async apiUpdateTemplate(req, res, next) {
    try {
      const productTemplate = req.body.productTemplate;
      const response = await TemplatesDAO.updateTemplate(productTemplate);
      res.json({ status: "success" });
    } catch (error) {
        res.status(500).json({error : e.message})
    }
  }
  static async apiDeleteTemplate(req, res, next) {
    try {
      const productId = req.body.productId;
      const response = await TemplatesDAO.deleteTemplate(productId);
      res.json({ status: "success" });
    } catch (error) {
        res.status(500).json({error : error.message})
    }
  }
}