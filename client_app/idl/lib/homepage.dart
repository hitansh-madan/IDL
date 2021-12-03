// ignore_for_file: file_names

import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_barcode_scanner/flutter_barcode_scanner.dart';
import 'package:hexcolor/hexcolor.dart';
import 'package:idl/data.dart';
import 'package:idl/services/blockchain_service.dart';

class MyHomePage extends StatefulWidget {
  const MyHomePage({Key? key, required this.title}) : super(key: key);

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  String scannedQrcode = '';
  Future<void> scanQR() async {
    try {
      scannedQrcode = await FlutterBarcodeScanner.scanBarcode(
          '#ff6666', 'cancel', true, ScanMode.QR);
      if (scannedQrcode.isNotEmpty) {
        var data = jsonDecode(scannedQrcode);
        print(data);
        String uuid = data['UUID'].toString();
        bool check = await isGenuine(uuid);
        print(uuid);
        print(check);
        Navigator.push(
          context,
          MaterialPageRoute(
              builder: (context) => PrintData(
                    data: scannedQrcode,
                    auth: check.toString(),
                  )),
        );
        //  print('ho gya');
      } else {
        //print('nhi hua yaar');
      }
    } on PlatformException {}
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: HexColor('#00008B'),
        title: Text(
          widget.title,
          style: TextStyle(color: Colors.white),
        ),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            SizedBox(
              height: MediaQuery.of(context).size.height * 0.05,
              width: MediaQuery.of(context).size.width * 0.44,
              child: ElevatedButton(
                style: ButtonStyle(
                  backgroundColor:
                      MaterialStateProperty.all<Color>(HexColor('#00008B')),
                  elevation: MaterialStateProperty.all(2),
                  shape: MaterialStateProperty.all<RoundedRectangleBorder>(
                    RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(18.0),
                    ),
                  ),
                ),
                onPressed: () {
                  scanQR();
                },
                child: const Text(
                  'Scan QR',
                  style: TextStyle(
                      color: Colors.white,
                      fontSize: 20,
                      fontWeight: FontWeight.w600),
                ),
              ),
            )
          ],
        ),
      ),
    );
  }
}
