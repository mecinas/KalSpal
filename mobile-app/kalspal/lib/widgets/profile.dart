import 'package:flutter/material.dart';

import 'circle_button.dart';

class Profile extends StatelessWidget {
  final Future<void> Function() logoutAction;
  final String name;
  final String picture;

  const Profile(this.logoutAction, this.name, this.picture, {Key key})
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
        Text('Name: $name'),
        const SizedBox(height: 48),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: <Widget>[
            CircleButton(
              icon: Icons.run_circle_rounded,
              iconColor: Theme.of(context).primaryColor,
              buttonColor: Theme.of(context).accentColor,
              onPressed: () {},
            ),
            CircleButton(
              icon: Icons.directions_bike_rounded,
              iconColor: Theme.of(context).primaryColor,
              buttonColor: Theme.of(context).accentColor,
              onPressed: () {},
            ),
          ],
        ),
        const SizedBox(height: 24),
        RaisedButton(
          onPressed: () async {
            await logoutAction();
          },
          child: const Text('Wyloguj się'),
        ),
      ],
    );
  }

/*   void loadWorkoutPage(workoutType){
    Navigator.of(context).pushReplacement(MaterialPageRoute(
          builder: (context) => DashboardPage(logoutAction, name, picture),
        ));
  } */
}
