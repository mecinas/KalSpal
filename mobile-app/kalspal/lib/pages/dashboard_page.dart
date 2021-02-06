import 'dart:async';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:location/location.dart';
import 'package:kalspal/widgets/circle_button.dart';
import 'package:kalspal/widgets/buttons_section.dart';

class DashboardPage extends StatefulWidget {
  @override
  _DashboardPageState createState() => _DashboardPageState();
}

class _DashboardPageState extends State<DashboardPage> {
  Location location = Location();
  List<LocationData> positions = []; //positions[0].latitude
  bool isInitialized = true, isRunning = false, isFinished = false;

  final DELAY_IN_SECONDS = 5;

  @override
  Widget build(BuildContext context) {
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

    if (isFinished) return "Czy chcesz dodać swój wynik?";

    if (isRunning)
      return "Nagrywanie treningu jest włączone.";
    else
      return "Nagrywanie treningu jest wyłączone.";
  }

  Widget getSuitableButtonsSection() {
    Color iconColor = Theme.of(context).primaryColor;
    Color buttonColor = Theme.of(context).accentColor;

    if (isFinished)
      return ButtonsSection(
        icon: Icons.clear_rounded,
        iconColor: Colors.white,
        buttonColor: Colors.red,
        onPressed: onPressedCancelButton,
        icon1: Icons.done_outline_rounded,
        iconColor1: Colors.white,
        buttonColor1: Colors.green,
        onPressed1: onPressedAcceptButton,
      );

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

  void onPressedAcceptButton() {
    // TODO - Prześlij positions do api
    setState(() {
      isFinished = false;
      isInitialized = true;
      positions = [];
    });
  }

  void onPressedCancelButton() {
    setState(() {
      isFinished = false;
      isInitialized = true;
      positions = [];
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
      LocationData position = await location.getLocation();
      positions.add(position);
      //print(positions.toString());
    } catch (e) {
      print(e);
    }
  }
}
