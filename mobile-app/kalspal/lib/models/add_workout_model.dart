// TODO - dopasować model żadania pod nasze API
import 'package:location/location.dart';

class AddWorkoutRequestModel {
  String token;
  List<LocationData> positions;

  AddWorkoutRequestModel({
    this.token,
    this.positions,
  });

  Map<String, dynamic> toJson() {
    Map<String, dynamic> map = {
      'token': token.trim(),
      'positions': positions.toString(),
    };

    return map;
  }
}

// TODO - dopasować model odpowiedzi pod nasze API
class AddWorkoutResponseModel {
  final String message;

  AddWorkoutResponseModel({this.message});

  factory AddWorkoutResponseModel.fromJson(Map<String, dynamic> json) {
    return AddWorkoutResponseModel(
      message: json["message"] != null ? json["message"] : "",
    );
  }
}
