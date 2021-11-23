let templates;

export default class TemplatesDAO {
  static async injectDB(conn) {
    if (templates) {
      return;
    }
    try {
      templates = await conn
        .db(process.env.TEMPLATES_NS)
        .collection("templates");
    } catch (e) {
      console.log(`error in templatesDAO : ${e}`);
    }
  }
  // TODO : add filters
  static async getTemplates() {
    let query;
    let templateList;
    try {
      query = await templates.find();
      templateList = await query.toArray();
      return templateList;
    } catch (e) {
      console.log(`error in query in DAO :${e}`);
      return [];
    }
  }
  static async createTemplate(productTemplate) {
    try {
      return await templates.replaceOne(
        { productId: productTemplate.productId },
        productTemplate,
        { upsert: true }
      );
    } catch (e) {
      console.log(`error in insert in DAO :${e}`);
      return { error: e };
    }
  }
  // static async updateTemplate(productTemplate) {
  //   try {
  //     return await templates.updateOne(
  //       { productId: productTemplate.productId },
  //       productTemplate
  //     );
  //   } catch (e) {
  //     console.log(`error in insert in DAO :${e}`);
  //     return { error: e };
  //   }
  // }
  static async deleteTemplate(productId) {
    try {
      return await templates.deleteOne({ productId: productId });
    } catch (e) {
      console.log(`error in insert in DAO :${e}`);
      return { error: e };
    }
  }
}
