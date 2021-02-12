import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart' as DotEnv;

import 'pages/login_page.dart';

const APP_TITLE = "KalSpal";
const PRIMARY_COLOR = Colors.white;
const SECONDARY_COLOR = Colors.blue;
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
        accentColor: SECONDARY_COLOR,
        buttonColor: SECONDARY_COLOR,
        textTheme: TextTheme(
          headline1: TextStyle(fontSize: 22.0, color: SECONDARY_COLOR),
          headline2: TextStyle(
            fontSize: 24.0,
            fontWeight: FontWeight.w700,
            color: SECONDARY_COLOR,
          ),
          headline3: TextStyle(
            fontSize: 22.0,
            color: SECONDARY_COLOR,
          ),
          bodyText1: TextStyle(
            fontSize: 14.0,
            fontWeight: FontWeight.w400,
            color: SECONDARY_COLOR,
          ),
        ),
      ),
      debugShowCheckedModeBanner: false,
    );
  }
}
