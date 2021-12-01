import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:hexcolor/hexcolor.dart';
import 'package:idl/services/template_service.dart';
import 'package:idl/showlabel.dart';
import 'package:intl/intl.dart';

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
        backgroundColor: HexColor('#00008B'),
        title: Text(
          'Product Detail',
          style: TextStyle(color: Colors.white),
        ),
        iconTheme: IconThemeData(color: Colors.white),
      ),
      body: FutureBuilder<Map<String, dynamic>>(
        future: templateService.getTemplates(),
        builder: (context, snapshot) {
          if (snapshot.hasData) {
            var value = jsonDecode(widget.data);
            print(value);
            //print(snapshot.data);
            int val = -1;
            // print("data=="+widget.data);
            for (int i = 0; i < snapshot.data!['templates'].length; i++) {
              //print(snapshot.data!['templates'][i]['productId']);

              if (snapshot.data!['templates'][i]['productId'] ==
                  value['productId']) {
                // print(snapshot.data!['templates'][i]['productId']);
                val = i;
                break;
              }
            }
            if (val == -1) {
              print(val);
              return Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: <Widget>[
                    Text('No template found for this product'),
                    SizedBox(
                      height: 10,
                    ),
                    SizedBox(
                      height: MediaQuery.of(context).size.height * 0.05,
                      width: MediaQuery.of(context).size.width * 0.44,
                      child: ElevatedButton(
                        style: ButtonStyle(
                          backgroundColor: MaterialStateProperty.all<Color>(
                              HexColor('#00008B')),
                          elevation: MaterialStateProperty.all(2),
                          shape:
                              MaterialStateProperty.all<RoundedRectangleBorder>(
                            RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(18.0),
                            ),
                          ),
                        ),
                        onPressed: () {
                          Navigator.pop(context);
                        },
                        child: Text(
                          'Back',
                          style: TextStyle(
                            color: Colors.white,
                          ),
                        ),
                      ),
                    )
                    // RaisedButton(
                    //   child: Text('Back'),
                    //   onPressed: () {
                    //     Navigator.pop(context);
                    //   },
                    // )
                  ],
                ),
              );
            }
            String t = value['time'].toString();
            int time = int.tryParse(t) ?? 0;
            print("time=" + value['time'].toString());
            print(time);
            String formatted = new DateTime.fromMicrosecondsSinceEpoch(time*1000)
                .toString()
                .substring(0, 19);
            print(formatted);
            return Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: SizedBox(
                    height: MediaQuery.of(context).size.height * 0.3,
                    width: MediaQuery.of(context).size.width,
                    child: Card(
                      child: Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                          crossAxisAlignment: CrossAxisAlignment.center,
                          children: [
                            Row(children: [
                              Expanded(
                                child: Text(
                                  'Product ID: ' +
                                      snapshot.data!['templates'][val]
                                              ['productId']
                                          .toString(),
                                  style: TextStyle(
                                    fontSize: 20,
                                    fontWeight: FontWeight.bold,
                                    color: Colors.grey.shade700,
                                  ),
                                ),
                              ),
                            ]),
                            Row(children: [
                              Expanded(
                                child: Text(
                                  'Product Name: ' +
                                      snapshot.data!['templates'][val]['name']
                                          .toString(),
                                  style: TextStyle(
                                    fontSize: 20,
                                    fontWeight: FontWeight.bold,
                                    color: Colors.grey.shade700,
                                  ),
                                ),
                              )
                            ]),
                            Row(children: [
                              Expanded(
                                  child: Text(
                                'Product Category: ' +
                                    snapshot.data!['templates'][val]['category']
                                        .toString(),
                                style: TextStyle(
                                  fontSize: 20,
                                  fontWeight: FontWeight.bold,
                                  color: Colors.grey.shade700,
                                ),
                              ))
                            ]),
                            Row(children: [
                              Expanded(
                                  child: Text(
                                'Batch Number: ' + value['batchNo'].toString(),
                                style: TextStyle(
                                  fontSize: 20,
                                  fontWeight: FontWeight.bold,
                                  color: Colors.grey.shade700,
                                ),
                              )),
                            ]),
                            Row(children: [
                              Expanded(
                                  child: Text(
                                'Manufacturing Date: ' + formatted,
                                style: TextStyle(
                                  fontSize: 20,
                                  fontWeight: FontWeight.bold,
                                  color: Colors.grey.shade700,
                                ),
                              )),
                            ]),
                          ],
                        ),
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
                                  HexColor('#00008B')),
                              elevation: MaterialStateProperty.all(2),
                              shape: MaterialStateProperty.all<
                                  RoundedRectangleBorder>(
                                RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(18.0),
                                ),
                              ),
                            ),
                            onPressed: () {
                              Navigator.push(
                                context,
                                MaterialPageRoute(
                                  builder: (context) => ShowLabel(
                                    data: value['productId'].toString(),
                                  ),
                                ),
                              );
                            },
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
              child: CircularProgressIndicator(
                color: HexColor('#00008B'),
              ),
            );
          }
        },
      ),
    );
  }
}
