import 'package:flutter/material.dart';

class CircleButton extends StatelessWidget {
  final IconData icon;
  final Color iconColor, backgroundColor;
  final double iconSize, padding, elevation;
  final Function onPressed;

  CircleButton({
    Key key,
    this.icon,
    this.iconColor,
    this.backgroundColor,
    this.onPressed,
    this.iconSize = 60.0,
    this.padding = 15.0,
    this.elevation = 4.0,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return RawMaterialButton(
      child: Icon(
        icon,
        size: iconSize,
        color: iconColor,
      ),
      fillColor: backgroundColor,
      padding: EdgeInsets.all(padding),
      elevation: elevation,
      shape: CircleBorder(),
      onPressed: onPressed,
    );
  }
}
