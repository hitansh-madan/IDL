import 'dart:convert';

import 'package:http/http.dart' as http;

class TemplateService {
  // add server url
  String baseUrl = "http://192.168.0.108:5000/api/templates";

  Future<Map<String,dynamic>> getTemplates() async {
    try {
      var response = await http.get(Uri.parse(baseUrl));
      // return response.body;
      if (response.statusCode == 200) {
       // print(response.body);
        return jsonDecode(response.body);
      } else {
        print(response.statusCode);
        return Future.error("Server Error !");
      }
    } catch (socketException) {
      print(socketException);
      return Future.error('Error Fetching Data !');
    }
  }
}
