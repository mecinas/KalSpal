import 'package:http/http.dart' as http;
import 'dart:convert';

import '../models/login_model.dart';
import '../models/add_workout_model.dart';

class RestApiManager {
  final URL = "https://reqres.in/api"; // TODO - podłączyć pod API
  //  {  username: eve.holt@reqres.in   ,   password: cityslicka   }

  Future<LoginResponseModel> login(LoginRequestModel requestModel) async {
    final response =
        await http.post(URL + "/login", body: requestModel.toJson());

    // TODO - dodać obsługę statusu odpowiedzi z naszego API
    if (response.statusCode == 200 || response.statusCode == 400) {
      return LoginResponseModel.fromJson(
        json.decode(response.body),
      );
    } else {
      throw Exception('Podczas wczytywania odpowiedzi wystapił błąd!');
    }
  }

  Future<AddWorkoutResponseModel> addWorkout(
      AddWorkoutRequestModel requestModel) async {
    final response =
        await http.post(URL + "/addWorkout", body: requestModel.toJson());

    // TODO - dodać obsługę statusu odpowiedzi z naszego API
    if (response.statusCode == 201) {
      return AddWorkoutResponseModel.fromJson(
        json.decode(response.body),
      );
    } else {
      throw Exception('Podczas wczytywania odpowiedzi wystapił błąd!');
    }
  }
}
