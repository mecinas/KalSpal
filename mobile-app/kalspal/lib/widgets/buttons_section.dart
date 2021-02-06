import 'package:flutter/material.dart';
import 'circle_button.dart';

class ButtonsSection extends StatelessWidget {
  final IconData icon, icon1;
  final Color iconColor, iconColor1;
  final Color buttonColor, buttonColor1;
  final Function onPressed, onPressed1;

  ButtonsSection({
    Key key,
    this.icon,
    this.icon1,
    this.iconColor,
    this.iconColor1,
    this.buttonColor,
    this.buttonColor1,
    this.onPressed,
    this.onPressed1,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      alignment: FractionalOffset.topCenter,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: <Widget>[
          CircleButton(
            icon: icon,
            iconColor: iconColor,
            buttonColor: buttonColor,
            onPressed: onPressed,
          ),
          CircleButton(
            icon: icon1,
            iconColor: iconColor1,
            buttonColor: buttonColor1,
            onPressed: onPressed1,
          ),
        ],
      ),
    );
  }
}
