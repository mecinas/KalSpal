import 'package:flutter/material.dart';

class Login extends StatelessWidget {
  final Future<void> Function() loginAction;
  final String loginError;

  const Login(this.loginAction, this.loginError, {Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: <Widget>[
        FlatButton(
          padding: EdgeInsets.symmetric(vertical: 12, horizontal: 80),
          onPressed: () async {
            await loginAction();
          },
          child: Text(
            "Zaloguj się",
            style: TextStyle(color: Theme.of(context).primaryColor),
          ),
          color: Theme.of(context).accentColor,
          shape: StadiumBorder(),
        ),
        Text(loginError ?? ''),
      ],
    );
  }
}
