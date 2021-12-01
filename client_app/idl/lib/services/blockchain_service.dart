import 'package:http/http.dart';
import 'package:web3dart/web3dart.dart';
import 'package:crypto/crypto.dart';
import 'package:web3dart/crypto.dart';
import 'dart:convert';

const String rpcUrl = 'https://rpc-mumbai.maticvigil.com';
final EthereumAddress contractAddr =
    EthereumAddress.fromHex('0x4CE04727722B52d1977AFFEF3AB72c68d4E2098A');

Future<bool> isGenuine(String uuid) async {
  try {
    var httpClient = Client();
    var ethClient = Web3Client(rpcUrl, httpClient);
    var abiCode =
        '[{"anonymous": false, "inputs": [{"indexed": true, "internalType": "address", "name": "previousOwner", "type": "address"}, {"indexed": true, "internalType": "address", "name": "newOwner", "type": "address"}], "name": "OwnershipTransferred", "type": "event"}, {"inputs": [{"internalType": "bytes32", "name": "", "type": "bytes32" } ], "name": "isGenuine", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [], "name": "owner", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function", "constant": true}, {"inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function"}, {"inputs": [{"internalType": "address", "name": "newOwner","type": "address"}],"name": "transferOwnership","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "bytes32","name": "hash","type": "bytes32"}], "name": "createBatch","outputs": [],"stateMutability": "nonpayable","type": "function"}]';
    final contract =
        DeployedContract(ContractAbi.fromJson(abiCode, 'IDL'), contractAddr);

    var bytes = utf8.encode(uuid);
    var hash = sha256.convert(bytes).toString();

    var genuine = await ethClient.call(
      contract: contract,
      function: contract.function('isGenuine'),
      params: [hexToBytes(hash)],
    );
    print(genuine.first);
    return genuine.first;
  } catch (err) {
    print("err : " + err.toString());
  }
  return false;
}
