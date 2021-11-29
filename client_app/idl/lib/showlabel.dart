import 'package:flutter/material.dart';
import 'package:hexcolor/hexcolor.dart';
import 'package:webview_flutter/webview_flutter.dart';

class ShowLabel extends StatefulWidget {
  ShowLabel({required this.data});
  String data;

  @override
  _ShowLabelState createState() => _ShowLabelState();
}
class _ShowLabelState extends State<ShowLabel> {
  
  late WebViewController controller;
  @override
  Widget build(BuildContext context) {
    String url='http://192.168.0.108:3000/label?id='+widget.data;
    print("open url =-->"+url);
    return Scaffold(
      appBar: AppBar(
        title: Text('Label'),
        backgroundColor: HexColor('#00008B'),
      ),
      body: WebView(
          javascriptMode: JavascriptMode.unrestricted,
          initialUrl: url,
          onWebViewCreated: (controller) {
            this.controller = controller;
          }),
    );
  }
}
