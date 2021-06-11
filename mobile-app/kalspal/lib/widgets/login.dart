import 'package:flutter/material.dart';

import 'package:flutter_signin_button/flutter_signin_button.dart';

class Login extends StatelessWidget {
  final Future<void> Function() loginAction;
  final String loginError;

  const Login(this.loginAction, this.loginError, {Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.start,
      children: <Widget>[
        const SizedBox(height: 150),
        Image.asset(
          'assets/images/logo.png',
          height: 150,
          width: 150,
        ),
        const SizedBox(height: 180),
        FlatButton(
          padding: EdgeInsets.symmetric(vertical: 15, horizontal: 70),
          onPressed: () => loginAction(),
          child: Text(
            "Zaloguj się",
            style:
                TextStyle(fontSize: 20, color: Theme.of(context).primaryColor),
          ),
          color: Theme.of(context).accentColor,
          shape: StadiumBorder(),
        ),
        const SizedBox(height: 40),
        SignInButton(
          Buttons.Facebook,
          text: "Zaloguj się przez Facebook",
          onPressed: () {},
        ),
        const SizedBox(height: 80),
        Padding(
          padding: const EdgeInsets.fromLTRB(20, 0, 20, 0),
          child: Text(loginError ?? '',
              style: TextStyle(fontSize: 22, color: Colors.red)),
        ),
      ],
    );
  }
}
