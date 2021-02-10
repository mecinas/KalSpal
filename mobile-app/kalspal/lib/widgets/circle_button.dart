import 'package:flutter/material.dart';

class CircleButton extends StatelessWidget {
  final IconData icon;
  final Color iconColor, buttonColor;
  final Function onPressed;
  final double iconSize, paddingSize;

  CircleButton({
    Key key,
    this.icon,
    this.iconColor,
    this.buttonColor,
    this.onPressed,
    this.iconSize = 60.0,
    this.paddingSize = 15.0,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return RawMaterialButton(
      child: Icon(
        icon,
        size: iconSize,
        color: iconColor,
      ),
      fillColor: buttonColor,
      elevation: 2.0,
      padding: EdgeInsets.all(paddingSize),
      shape: CircleBorder(),
      onPressed: onPressed,
    );
  }
}
