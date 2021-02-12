import 'dart:convert';
import 'package:flutter/material.dart';

import 'package:http/http.dart' as http;
import 'package:flutter_appauth/flutter_appauth.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart' as DotEnv;
import 'package:kalspal/managers/api_manager.dart';
import 'package:kalspal/models/screen_arguments.dart';
import 'package:kalspal/pages/workout_page.dart';

import 'package:kalspal/widgets/login.dart';
import 'package:kalspal/widgets/profile.dart';

// AUTH0
final String AUTH0_DOMAIN = DotEnv.env['AUTH0_DOMAIN'];
final String AUTH0_CLIENT_ID = DotEnv.env['AUTH0_CLIENT_ID'];
final String AUTH0_REDIRECT_URI = DotEnv.env['AUTH0_REDIRECT_URI'];
final String AUTH0_ISSUER = 'https://$AUTH0_DOMAIN';

final FlutterAppAuth appAuth = FlutterAppAuth();
const FlutterSecureStorage secureStorage = FlutterSecureStorage();

class LoginPage extends StatefulWidget {
  const LoginPage({Key key}) : super(key: key);

  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  bool isBusy = false, isLoggedIn = false;
  String accessToken, errorMessage, name, picture;
  final GlobalKey<ScaffoldState> _scaffoldKey = new GlobalKey<ScaffoldState>();

  @override
  void initState() {
    initAction();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      key: _scaffoldKey,
      /* appBar: AppBar(
          title: const Text('Auth0 Demo'),
        ), */
      backgroundColor: Theme.of(context).primaryColor,
      body: Center(
        child: isBusy
            ? const CircularProgressIndicator() /* Center(child: CircularProgressIndicator()) */
            : isLoggedIn
                ? Profile(logoutAction, startWorkout, name, picture)
                : Login(loginAction, errorMessage),
      ),
    );
  }

  Future<void> initAction() async {
    final String storedRefreshToken =
        await secureStorage.read(key: 'refresh_token');
    if (storedRefreshToken == null) return;

    setState(() {
      isBusy = true;
    });

    try {
      final TokenResponse response = await appAuth.token(TokenRequest(
        AUTH0_CLIENT_ID,
        AUTH0_REDIRECT_URI,
        issuer: AUTH0_ISSUER,
        refreshToken: storedRefreshToken,
      ));

      final Map<String, Object> idToken = parseIdToken(response.idToken);
      final Map<String, Object> profile =
          await getUserDetails(response.accessToken);

      await secureStorage.write(
          key: 'refresh_token', value: response.refreshToken);

      setState(() {
        isBusy = false;
        isLoggedIn = true;
        name = idToken['name'];
        picture = profile['picture'];
      });
    } on Exception catch (e, s) {
      debugPrint('error on refresh token: $e - stack: $s');
      await logoutAction();
    }
  }

  Map<String, Object> parseIdToken(String idToken) {
    final List<String> parts = idToken.split('.');
    assert(parts.length == 3);

    return jsonDecode(
        utf8.decode(base64Url.decode(base64Url.normalize(parts[1]))));
  }

  Future<Map<String, Object>> getUserDetails(String accessToken) async {
    final String url = 'https://$AUTH0_DOMAIN/userinfo';
    final http.Response response = await http.get(
      url,
      headers: <String, String>{'Authorization': 'Bearer $accessToken'},
    );

    if (response.statusCode == 200)
      return jsonDecode(response.body);
    else
      throw Exception('Failed to get user details');
  }

  Future<void> loginAction() async {
    setState(() {
      isBusy = true;
      errorMessage = '';
    });

    try {
      final AuthorizationTokenResponse result =
          await appAuth.authorizeAndExchangeCode(
        AuthorizationTokenRequest(
          AUTH0_CLIENT_ID,
          AUTH0_REDIRECT_URI,
          issuer: 'https://$AUTH0_DOMAIN',
          scopes: <String>['openid', 'profile', 'offline_access'],
          // promptValues: ['login']
        ),
      );

      final Map<String, Object> idToken = parseIdToken(result.idToken);
      setState(() {
        accessToken = result.accessToken;
      });

      //print(accessToken);
      ApiManager apiManager = new ApiManager();
      bool isRegistered = await apiManager.checkIfUserExistsInDb(accessToken);
      if (!isRegistered) {
        setState(() {
          isBusy = false;
          isLoggedIn = false;
          errorMessage =
              "Aby korzystać z aplikacji musisz być zarejestrowany w naszym serwisie!";
        });
        return;
      }

      final Map<String, Object> profile = await getUserDetails(accessToken);
      await secureStorage.write(
          key: 'refresh_token', value: result.refreshToken);
      setState(() {
        isBusy = false;
        isLoggedIn = true;
        name = idToken['name'];
        picture = profile['picture'];
      });
    } on Exception catch (e) {
      String errorMessage = e.toString();
      if (errorMessage.contains('PlatformException'))
        errorMessage = "Aby korzystać z aplikacji musisz się zalogować!";

      setState(() {
        isBusy = false;
        isLoggedIn = false;
        errorMessage = errorMessage;
      });
    }
  }

  Future<void> logoutAction() async {
    await secureStorage.delete(key: 'refresh_token');
    setState(() {
      isLoggedIn = false;
      isBusy = false;
    });
  }

  void startWorkout(String workoutType) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => WorkoutPage(),
        settings:
            RouteSettings(arguments: ScreenArguments(workoutType, accessToken)),
      ),
    );
  }
}
