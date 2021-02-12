import 'package:flutter/material.dart';
import 'circle_button.dart';

class DoubleButtonsSection extends StatelessWidget {
  final IconData icon, icon1;
  final Color iconColor, iconColor1;
  final Color backgroundColor, backgroundColor1;
  final Function onPressed, onPressed1;

  DoubleButtonsSection({
    Key key,
    this.icon,
    this.icon1,
    this.iconColor,
    this.iconColor1,
    this.backgroundColor,
    this.backgroundColor1,
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
            backgroundColor: backgroundColor,
            onPressed: onPressed,
          ),
          CircleButton(
            icon: icon1,
            iconColor: iconColor1,
            backgroundColor: backgroundColor1,
            onPressed: onPressed1,
          ),
        ],
      ),
    );
  }
}
