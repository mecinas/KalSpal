class AddWorkoutRequestModel {
  String workout;

  AddWorkoutRequestModel({this.workout});

  Map<String, dynamic> toJson() {
    Map<String, dynamic> map = {
      'workout': workout,
    };
    return map;
  }
}

class AddWorkoutResponseModel {
  final String message;

  AddWorkoutResponseModel({this.message});

  factory AddWorkoutResponseModel.fromJson(Map<String, dynamic> json) {
    return AddWorkoutResponseModel(
      message: json["message"] != null ? json["message"] : "",
    );
  }
}
