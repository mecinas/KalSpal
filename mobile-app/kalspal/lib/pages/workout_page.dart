import 'dart:async';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:location/location.dart';
import 'package:gpx/gpx.dart';

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
  String /* codeDialog, */ valueText;

  final DELAY_IN_SECONDS = 5;

  @override
  Widget build(BuildContext context) {
    final args = ModalRoute.of(context).settings.arguments;
    print(args);

    return Scaffold(
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
                    onPressed: onPressedStartButton,
                  ))
                : Padding(
                    padding: const EdgeInsets.fromLTRB(0, 20.0, 0, 0),
                    child: (getSuitableButtonsSection()),
                  )
          ],
        ),
      ),
    );
  }

  //    GUI
  String getSuitableText() {
    if (isInitialized) return "Rozpocznij trening";

    /* if (isFinished) return "Czy chcesz dodać swój wynik?"; */

    if (isRunning)
      return "Nagrywanie treningu jest włączone.";
    else
      return "Nagrywanie treningu jest wyłączone.";
  }

  Widget getSuitableButtonsSection() {
    Color iconColor = Theme.of(context).primaryColor;
    Color buttonColor = Theme.of(context).accentColor;

    if (isFinished) return _displayTextInputDialog();
    /* return ButtonsSection(
      icon: Icons.clear_rounded,
      iconColor: Colors.white,
      buttonColor: Colors.red,
      onPressed: onPressedCancelButton,
      icon1: Icons.done_outline_rounded,
      iconColor1: Colors.white,
      buttonColor1: Colors.green,
      onPressed1: onPressedAcceptButton,
    ); */

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
      print(
          "Aby aplikacja mogła działać poprawnie, musisz zezwolić jej na dostęp do twojej lokalizacji!");

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

/*   void onPressedAcceptButton() {
    // TODO - Prześlij workout do api
    /* final workout = generateGpxString(
        workout_name, workout_type, workout_start, Datetime.now(), positions); */

    setState(() {
      isFinished = false;
      isInitialized = true;
      positions = [];
    });
  } */

/*   void onPressedCancelButton() {
    setState(() {
      isFinished = false;
      isInitialized = true;
      positions = [];
    });
  } */

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
      LocationData ld = await location.getLocation();
      Wpt position = Wpt(
          lat: ld.latitude,
          lon: ld.longitude,
          ele: ld.altitude,
          time: new DateTime.now());

      positions.add(position);
    } catch (e) {
      print(e);
    }
  }

  String generateGpxString(
      workout_name, workout_type, workout_start, workout_end, positions) {
    final gpx = Gpx();
    gpx.version = '1.1';
    gpx.creator = 'dart-gpx library';
    gpx.metadata = Metadata();
    gpx.metadata.name = workout_name;
    gpx.metadata.keywords = '${workout_type}, ${workout_start}, ${workout_end}';
    gpx.wpts = positions;

    return GpxWriter().asString(gpx, pretty: true);
  }

  Widget _displayTextInputDialog() {
    /* return showDialog(
        /* context: context, */
        builder: (context) { */
    return AlertDialog(
      title: Text('Czy chcesz udostępnić swój trening?'),
      content: TextField(
        onChanged: (value) {
          setState(() {
            valueText = value;
          });
        },
        controller: _textFieldController,
        /* initialValue: "Trening", */
        decoration: InputDecoration(hintText: "Nazwa treningu"),
      ),
      actions: <Widget>[
        FlatButton(
          color: Colors.red,
          textColor: Colors.white,
          child: Text('Nie'),
          onPressed: () {
            print("NIE !!!!" + valueText);
            setState(() {
              isFinished = false;
              isInitialized = true;
              positions = [];
            });
          },
        ),
        FlatButton(
          color: Colors.green,
          textColor: Colors.white,
          child: Text('Ok'),
          onPressed: () {
            // TODO - Prześlij workout do api
            /* final workout = generateGpxString(
                  workout_name, workout_type, workout_start, Datetime.now(), positions); */
            print(valueText);
            setState(() {
              isFinished = false;
              isInitialized = true;
              positions = [];
            });
          },
        ),
      ],
    );
    /* }); */
  }
}
