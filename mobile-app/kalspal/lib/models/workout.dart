import 'package:gpx/gpx.dart';

class Workout {
  String name, type;
  DateTime start, end;
  List<Wpt> positions;

  Workout({this.name, this.type, this.start, this.end, this.positions});
}
