# KalSpal
# API
 **/workout** [POST]

  - ***opis*** :  Dodanie nowego treningu
  - ***żadanie*** : 

Nagłówek:
```sh
"Authorization": "Bearer " + <accessToken>
```
  Ciało:
```json
{
  "workout": < gpx.toString() >
}
```


  - ***odpowiedź*** : 
  Zawartość ciała (jeżeli status odpowiedzi to 201):
```json
{
  "message":"Twój trening został zapisany."
}
```