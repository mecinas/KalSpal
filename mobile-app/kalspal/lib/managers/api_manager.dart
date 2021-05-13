import 'dart:convert';

import 'package:flutter_dotenv/flutter_dotenv.dart' as DotEnv;
import 'package:http/http.dart' as http;
import 'package:kalspal/models/workout.dart';

class ApiManager {
  final String API_URL = DotEnv.env['API_URL'];
  final Map<String, String> ENDPOINTS = {
    'CHECK_USER': DotEnv.env['CHECK_IF_USER_IS_REGISTERED_ENDPOINT'],
    'ADD_WORKOUT': DotEnv.env['ADD_WORKOUT_ENDPOINT']
  };

  Future<bool> checkIfUserExistsInDb(String accessToken) async {
    String url = API_URL + ENDPOINTS['CHECK_USER'];
    var headers = <String, String>{'Authorization': 'Bearer $accessToken'};

    final response = await http.get(url, headers: headers);
    print("Response Status : " + response.statusCode.toString());
    if (response.statusCode == 200) return true;
    return false;
  }

//  Future<bool> addWorkout(String accessToken, String workout) async {
  Future<bool> addWorkout(String accessToken, Workout workout, String workoutGpxString) async {
    String url = API_URL + ENDPOINTS['ADD_WORKOUT'];
    var headers = <String, String>{
      'Authorization': 'Bearer $accessToken',
      'Content-Type': 'application/json'
    };
    var body = jsonEncode(<String, String>{
      'name': workout.name,
      'type': workout.type,
      'start': workout.start.toString(),
      'end': workout.end.toString(),
      'gpx': workoutGpxString
      }
      );

      print(body.toString());

    final response = await http.post(url, headers: headers, body: body);
    if (response.statusCode == 201) return true;
    return false;
  }
}
