import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:hexcolor/hexcolor.dart';
import 'package:idl/services/blockchain_service.dart';
import 'package:idl/services/template_service.dart';
import 'package:idl/showlabel.dart';
import 'package:intl/intl.dart';
import 'package:cool_alert/cool_alert.dart';

class PrintData extends StatefulWidget {
  PrintData({required this.data, required this.auth});
  String data;
  String auth;
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
            int val = -1;

            for (int i = 0; i < snapshot.data!['templates'].length; i++) {
              if (snapshot.data!['templates'][i]['productId'] ==
                  value['productId']) {
                val = i;
                break;
              }
            }

            if (val == -1) {
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
                  ],
                ),
              );
            }
            String t = value['time'].toString();
            int time = int.tryParse(t) ?? 0;

            String formatted =
                new DateTime.fromMicrosecondsSinceEpoch(time * 1000)
                    .toString()
                    .substring(0, 19);
            void showAlert() {
              if (widget.auth.toString() == 'true') {
                print('auth-value');
                print(widget.auth);
                CoolAlert.show(
                    context: context,
                    type: CoolAlertType.success,
                    text: 'Product is Authentic',
                    autoCloseDuration: Duration(seconds: 3));
              } else {
                CoolAlert.show(
                    context: context,
                    type: CoolAlertType.error,
                    text: 'Product is not Authentic',
                    autoCloseDuration: Duration(seconds: 3));
              }
            }
            return Center(
              child: Column(
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
                                  MaterialStateProperty.all<Color>(Colors.green),
                              elevation: MaterialStateProperty.all(0),
                              shape: MaterialStateProperty.all<
                                  RoundedRectangleBorder>(
                                RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(18.0),
                                ),
                              ),
                            ),
                            onPressed: () {
                              if (widget.auth.toString() == 'true') {
                                print('auth-value');
                                print(widget.auth);
                                CoolAlert.show(
                                    context: context,
                                    type: CoolAlertType.success,
                                    text: 'Product is Authentic',
                                    autoCloseDuration: Duration(seconds: 3));
                              } else {
                                CoolAlert.show(
                                    context: context,
                                    type: CoolAlertType.error,
                                    text: 'Product is not Authentic',
                                    autoCloseDuration: Duration(seconds: 3));
                              }
                            },
                            child: const Padding(
                                padding: EdgeInsets.all(0.0),
                                child: Text(
                                  ' Verify',
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
              ),
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
