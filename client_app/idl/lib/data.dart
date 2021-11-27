import 'package:flutter/material.dart';
import 'package:idl/services/template_service.dart';

class PrintData extends StatefulWidget {
  PrintData({required this.data});
  String data;
  @override
  _PrintDataState createState() => _PrintDataState();
}

TemplateService templateService = TemplateService();

class _PrintDataState extends State<PrintData> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Product Detail'),
      ),
      body: FutureBuilder<Map<String, dynamic>>(
        future: templateService.getTemplates(),
        builder: (context, snapshot) {
          if (snapshot.hasData) {
            int val = -1;
            for (int i = 0; i < snapshot.data!['templates'].length; i++) {
              if (snapshot.data!['templates'][i]['productId'] == widget.data) {
                val = i;
                break;
              }
            }
            return Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: SizedBox(
                    height: MediaQuery.of(context).size.height * 0.4,
                    width: MediaQuery.of(context).size.width,
                    child: Card(
                      child: Column(
                        children: [
                          Row(children: [
                            Expanded(
                                child: Text('Product ID: ' +
                                    snapshot.data!['templates'][val]['productId'].toString())),
                          ]),
                          Row(children: [
                            Expanded(
                                child: Text('Product Name: ' + snapshot.data!['templates'][val]['name'].toString()))
                          ])
                        ],
                      ),
                    ),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: [
                      SizedBox(
                        height: MediaQuery.of(context).size.height * 0.05,
                        width: MediaQuery.of(context).size.width * 0.44,
                        child: ElevatedButton(
                            style: ButtonStyle(
                              backgroundColor: MaterialStateProperty.all<Color>(
                                  Colors.green),
                              elevation: MaterialStateProperty.all(0),
                              shape: MaterialStateProperty.all<
                                  RoundedRectangleBorder>(
                                RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(18.0),
                                ),
                              ),
                            ),
                            onPressed: () {},
                            child: const Text(
                              ' Detail',
                              style: TextStyle(
                                  color: Colors.white,
                                  fontSize: 20,
                                  fontWeight: FontWeight.w400),
                            )),
                      ),
                      SizedBox(
                        height: MediaQuery.of(context).size.height * 0.05,
                        width: MediaQuery.of(context).size.width * 0.44,
                        child: ElevatedButton(
                          style: ButtonStyle(
                            backgroundColor:
                                MaterialStateProperty.all<Color>(Colors.red),
                            elevation: MaterialStateProperty.all(0),
                            shape: MaterialStateProperty.all<
                                RoundedRectangleBorder>(
                              RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(18.0),
                              ),
                            ),
                          ),
                          onPressed: () {},
                          child: const Padding(
                              padding: EdgeInsets.all(0.0),
                              child: Text(
                                ' Feedback',
                                style: TextStyle(
                                    color: Colors.white,
                                    fontSize: 20,
                                    fontWeight: FontWeight.w400),
                              )),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            );
          } else if (snapshot.hasError) {
            return Center(
              child: Text('Error'),
            );
          } else {
            return Center(
              child: CircularProgressIndicator(),
            );
          }
        },
      ),
    );
  }
}
