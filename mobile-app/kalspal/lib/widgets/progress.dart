import 'package:flutter/material.dart';

class Progress extends StatelessWidget {
  final Widget child;
  final bool isLoading;
  final Color color;
  final Animation<Color> valueColor;
  final double opacity;

  Progress({
    Key key,
    @required this.child,
    @required this.isLoading,
    this.color = Colors.white,
    this.valueColor,
    this.opacity = 0.5,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    List<Widget> widgetList = new List<Widget>();
    widgetList.add(child);

    if (isLoading) {
      final progress = new Stack(
        children: [
          new Opacity(
            opacity: opacity,
            child: ModalBarrier(dismissible: false, color: color),
          ),
          new Center(child: new CircularProgressIndicator()),
        ],
      );
      widgetList.add(progress);
    }
    return Stack(children: widgetList);
  }
}
