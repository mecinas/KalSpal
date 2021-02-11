import 'package:gpx/gpx.dart';
import 'package:kalspal/models/workout.dart';

class GpxManager {
  Gpx getGpxFromWorkout(Workout workout) {
    final gpx = Gpx();
    gpx.version = '1.1';
    gpx.creator = 'dart-gpx library';
    gpx.metadata = Metadata();
    gpx.metadata.name = workout.name;
    gpx.metadata.keywords = '${workout.type}, ${workout.start}, ${workout.end}';
    gpx.wpts = workout.positions;

    return gpx;
  }

  String getGpxString(Gpx gpx) {
    return GpxWriter().asString(gpx, pretty: true);
  }
}
