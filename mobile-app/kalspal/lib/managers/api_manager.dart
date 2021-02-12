import 'dart:convert';

import 'package:flutter_dotenv/flutter_dotenv.dart' as DotEnv;
import 'package:http/http.dart' as http;

class ApiManager {
  final String API_URL = DotEnv.env['API_URL'];
  static const Map<String, String> ENDPOINTS = {
    'CHECK_USER': '/api/user/check/registration',
    'ADD_WORKOUT': '/api/workout/'
  };

  Future<bool> checkIfUserExistsInDb(String accessToken) async {
    String url = API_URL + ENDPOINTS['CHECK_USER'];
    var headers = <String, String>{'Authorization': 'Bearer $accessToken'};

    final response = await http.get(url, headers: headers);
    if (response.statusCode == 200) return true;
    return false;
  }

  Future<bool> addWorkout(String accessToken, String workout) async {
    String url = API_URL + ENDPOINTS['ADD_WORKOUT'];
    var headers = <String, String>{
      'Authorization': 'Bearer $accessToken',
      'Content-Type': 'application/json; charset=UTF-8'
    };
    var body = jsonEncode(<String, String>{
      'workout': "$workout",
    });
    print("Body = " + body.toString());

    final response = await http.post(url, headers: headers, body: body);
    if (response.statusCode == 201)
      return true;
    else
      return false;
  }
}
