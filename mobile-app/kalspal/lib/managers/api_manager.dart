import 'dart:io';
import 'package:flutter_dotenv/flutter_dotenv.dart' as DotEnv;
import 'package:http/http.dart' as http;

import '../models/add_workout_model.dart';

class ApiManager {
  final String API_URL = DotEnv.env['API_URL'];
  final Map<String, String> ENDPOINTS = {'ADD_WORKOUT': '/api/workout/'};

  /* Future<AddWorkoutResponseModel>  Future<bool> addWorkout(*/
  Future<bool> addWorkout(String accessToken, String workout) async {
    /* AddWorkoutRequestModel arm = new AddWorkoutRequestModel(workout: workout); */
    /* final response = await http.post(API_URL + ENDPOINTS['ADD_WORKOUT'],
        headers: {HttpHeaders.authorizationHeader: access_token},
        body: (new AddWorkoutRequestModel(workout: workout)).toJson()); */

    String url = API_URL + ENDPOINTS['ADD_WORKOUT'];
    var headers = {HttpHeaders.authorizationHeader: accessToken};
    var body = (new AddWorkoutRequestModel(workout: workout)).toJson();

    final response = await http.post(url, headers: headers, body: body);

    if (response.statusCode == 201)
      return true;
    /* return AddWorkoutResponseModel.fromJson(jsonDecode(response.body))
          .message; */
    /* return AddWorkoutResponseModel.fromJson(json.decode(response.body)); */
    else
      return false;
    /* return 'Podczas dodawania treningu wystąpił błąd!'; */
  }
}
