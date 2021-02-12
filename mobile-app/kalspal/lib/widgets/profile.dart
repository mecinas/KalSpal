import 'package:flutter/material.dart';

import 'circle_button.dart';

class Profile extends StatelessWidget {
  final Future<void> Function() logoutAction;
  final void Function(String) startWorkout;
  final String name;
  final String picture;

  const Profile(this.logoutAction, this.startWorkout, this.name, this.picture,
      {Key key})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: <Widget>[
        Container(
          width: 150,
          height: 150,
          decoration: BoxDecoration(
            border: Border.all(color: Colors.blue, width: 4),
            shape: BoxShape.circle,
            image: DecorationImage(
              fit: BoxFit.fill,
              image: NetworkImage(picture ?? ''),
            ),
          ),
        ),
        const SizedBox(height: 24),
        Text(
          '$name',
          style: TextStyle(color: Theme.of(context).accentColor),
        ),
        const SizedBox(height: 100),
        Text(
          'Rozpocznij Trening',
          style: TextStyle(fontSize: 28, color: Theme.of(context).accentColor),
        ),
        const SizedBox(height: 30),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: <Widget>[
            CircleButton(
              icon: Icons.directions_run_rounded,
              iconColor: Theme.of(context).primaryColor,
              backgroundColor: Theme.of(context).accentColor,
              onPressed: () => startWorkout("run"),
            ),
            CircleButton(
              icon: Icons.directions_bike_rounded,
              iconColor: Theme.of(context).primaryColor,
              backgroundColor: Theme.of(context).accentColor,
              onPressed: () => startWorkout("cycling"),
            ),
          ],
        ),
        const SizedBox(height: 80),
        FlatButton(
          padding: EdgeInsets.symmetric(vertical: 15, horizontal: 70),
          onPressed: () => logoutAction(),
          child: Text(
            "Wyloguj się",
            style:
                TextStyle(fontSize: 20, color: Theme.of(context).primaryColor),
          ),
          color: Theme.of(context).accentColor,
          shape: StadiumBorder(),
        ),
      ],
    );
  }
}
