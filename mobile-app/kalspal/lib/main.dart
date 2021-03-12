import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart' as DotEnv;

import 'pages/login_page.dart';

const APP_TITLE = "KalSpal";
const PRIMARY_COLOR = Colors.white;
const ACCENT_COLOR = Colors.green;
const BUTTON_COLOR = Colors.greenAccent;

Future main() async {
  await DotEnv.load();
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: APP_TITLE,
      home: LoginPage(),
      theme: ThemeData(
        primaryColor: PRIMARY_COLOR,
        accentColor: ACCENT_COLOR,
        buttonColor: BUTTON_COLOR,
        textTheme: TextTheme(
          headline1: TextStyle(fontSize: 22.0, color: ACCENT_COLOR),
          headline2: TextStyle(
            fontSize: 24.0,
            fontWeight: FontWeight.w700,
            color: Colors.redAccent,
          ),
          headline3: TextStyle(
            fontSize: 20.0,
            color: ACCENT_COLOR,
          ),
          bodyText1: TextStyle(
            fontSize: 14.0,
            fontWeight: FontWeight.w400,
            color: ACCENT_COLOR,
          ),
        ),
      ),
      debugShowCheckedModeBanner: false,
    );
  }
}
