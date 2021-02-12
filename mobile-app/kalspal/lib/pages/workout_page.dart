import 'dart:async';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:gpx/gpx.dart';
import 'package:kalspal/managers/api_manager.dart';
import 'package:kalspal/managers/gpx_manager.dart';
import 'package:kalspal/models/screen_arguments.dart';
import 'package:kalspal/models/workout.dart';
import 'package:location/location.dart';

import 'package:kalspal/widgets/circle_button.dart';
import 'package:kalspal/widgets/buttons_section.dart';

class WorkoutPage extends StatefulWidget {
  @override
  _WorkoutPageState createState() => _WorkoutPageState();
}

class _WorkoutPageState extends State<WorkoutPage> {
  Location location = Location();
  List<Wpt> positions = [];
  bool isInitialized = true, isRunning = false, isFinished = false;

  TextEditingController _textFieldController = TextEditingController();
  String workoutName;
  DateTime workoutStart;
  final GlobalKey<ScaffoldState> _scaffoldKey = new GlobalKey<ScaffoldState>();

  static const DELAY_IN_SECONDS = 5;

  @override
  Widget build(BuildContext context) {
    final ScreenArguments args = ModalRoute.of(context).settings.arguments;
    String accessToken = args.accessToken;
    String workoutType = args.workoutType;

    return Scaffold(
      appBar: AppBar(
        iconTheme: IconThemeData(
          color: Theme.of(context).primaryColor, //change your color here
        ),
        title: Text(
          "Twój Trening",
          style: TextStyle(color: Theme.of(context).primaryColor),
        ),
        centerTitle: true,
        backgroundColor: Theme.of(context).accentColor,
      ),
      key: _scaffoldKey,
      backgroundColor: Theme.of(context).primaryColor,
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Padding(
              padding: const EdgeInsets.fromLTRB(0, 0, 0, 20.0),
              child: Text(
                getSuitableText(),
                style: Theme.of(context).textTheme.headline3,
              ),
            ),
            (isInitialized)
                ? (CircleButton(
                    icon: Icons.play_arrow_outlined,
                    iconColor: Theme.of(context).primaryColor,
                    buttonColor: Theme.of(context).buttonColor,
                    onPressed: () {
                      onPressedStartButton();
                      workoutStart = new DateTime.now();
                    },
                  ))
                : Padding(
                    padding: const EdgeInsets.fromLTRB(0, 20.0, 0, 0),
                    child: ((isFinished)
                        ? (showAddWorkoutDialog(accessToken, workoutType))
                        : (getSuitableButtonsSection())),
                  )
          ],
        ),
      ),
    );
  }

  //    GUI
  String getSuitableText() {
    if (isInitialized) return "Rozpocznij trening";

    if (isFinished) return "";

    if (isRunning)
      return "Nagrywanie treningu jest włączone.";
    else
      return "Nagrywanie treningu jest wyłączone.";
  }

  Widget getSuitableButtonsSection() {
    Color iconColor = Theme.of(context).primaryColor;
    Color buttonColor = Theme.of(context).accentColor;

    if (isRunning)
      return ButtonsSection(
        icon: Icons.pause_rounded,
        iconColor: iconColor,
        buttonColor: buttonColor,
        onPressed: onPressedPauseButton,
        icon1: Icons.stop_rounded,
        iconColor1: iconColor,
        buttonColor1: buttonColor,
        onPressed1: onPressedStopButton,
      );
    else
      return ButtonsSection(
        icon: Icons.play_arrow_rounded,
        iconColor: iconColor,
        buttonColor: buttonColor,
        onPressed: onPressedStartButton,
        icon1: Icons.stop_rounded,
        iconColor1: iconColor,
        buttonColor1: buttonColor,
        onPressed1: onPressedStopButton,
      );
  }

  void onPressedStartButton() async {
    bool isPermittedByUser = await getLocationPermission();
    if (!isPermittedByUser)
      showSnackBar(
          "Aby aplikacja mogła działać poprawnie, musisz zezwolić jej na dostęp do twojej lokalizacji!",
          10);

    if (isInitialized)
      setState(() {
        isInitialized = false;
      });
    if (!isRunning) {
      setState(() {
        isRunning = true;
      });
      recordPositions();
    }
  }

  void onPressedPauseButton() {
    if (isRunning)
      setState(() {
        isRunning = false;
      });
  }

  void onPressedStopButton() {
    if (isRunning)
      setState(() {
        isRunning = false;
      });
    setState(() {
      isFinished = true;
    });
  }

  //    USER LOCATION
  Future<bool> getLocationPermission() async {
    PermissionStatus permission = await location.hasPermission();
    if (permission == PermissionStatus.denied) {
      permission = await location.requestPermission();
      if (permission != PermissionStatus.granted)
        return false;
      else
        return true;
    } else
      return true;
  }

  void recordPositions() async {
    while (isRunning) {
      saveCurrentPosition();
      await Future.delayed(Duration(seconds: DELAY_IN_SECONDS));
    }
  }

  void saveCurrentPosition() async {
    try {
      LocationData locationData = await location.getLocation();
      DateTime now = new DateTime.now();
      GpxManager gpxManager = new GpxManager();
      Wpt position = gpxManager.convertLocationToWpt(locationData, now);
      positions.add(position);
    } catch (e) {
      debugPrint(e);
    }
  }

  Widget showAddWorkoutDialog(accessToken, workoutType) {
    return AlertDialog(
      title: Text('Czy chcesz udostępnić swój trening?'),
      content: TextField(
        textAlign: TextAlign.center,
        onChanged: (v) {
          String value = v;
          if (value.isEmpty) value = getSuitableWorkoutName(DateTime.now());
          setState(() {
            workoutName = value;
          });
        },
        controller: _textFieldController,
        decoration: InputDecoration(hintText: "Nazwa treningu"),
      ),
      actions: <Widget>[
        Padding(
          padding: const EdgeInsets.fromLTRB(0, 0, 40, 0),
          child: FlatButton(
            color: Colors.red,
            textColor: Colors.white,
            child: Text('Nie'),
            onPressed: () {
              setState(() {
                isFinished = false;
                isInitialized = true;
                positions = [];
              });
            },
          ),
        ),
        FlatButton(
          color: Colors.green,
          textColor: Colors.white,
          child: Text('Ok'),
          onPressed: () async {
            Workout workout = new Workout(
                name: workoutName,
                type: workoutType,
                start: workoutStart,
                end: new DateTime.now(),
                positions: positions);
            GpxManager gpxManager = new GpxManager();
            Gpx workoutGpx = gpxManager.getGpxFromWorkout(workout);
            String sWorkout = gpxManager.getGpxString(workoutGpx);

            ApiManager apiManager = new ApiManager();
            bool isSuccess = await apiManager.addWorkout(accessToken, sWorkout);
            if (isSuccess)
              showSnackBar("Twój trening został dodany", 6);
            else
              showSnackBar("Podczas dodawania treningu wystąpił błąd!", 10);

            setState(() {
              isFinished = false;
              isInitialized = true;
              positions = [];
            });
          },
        ),
      ],
    );
  }

  String getSuitableWorkoutName(DateTime now) {
    if (6 < now.hour && now.hour < 7)
      return "Trening o Brzasku";
    else if (7 < now.hour && now.hour < 10)
      return "Poranny Trening";
    else if (10 < now.hour && now.hour < 12)
      return "Trening";
    else if (12 < now.hour && now.hour < 17)
      return "Popołudniowy Trening";
    else if (17 < now.hour && now.hour < 21)
      return "Wieczorny Trening";
    else
      return "Nocny Trening";
  }

  void showSnackBar(String message, int duration) {
    _scaffoldKey.currentState.showSnackBar(SnackBar(
      backgroundColor: Colors.black,
      content:
          Text(message, style: TextStyle(fontSize: 18, color: Colors.white)),
      action: SnackBarAction(
        label: 'Ok',
        onPressed: () {},
      ),
      duration: Duration(seconds: duration),
    ));
  }
}
