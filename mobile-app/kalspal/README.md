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
    "name": "nazwa treningu",                     // String
    "type": "typ treningu [run/cycling]",         // String
    "start": "data i czas rozpoczęcia treningu",  // String
    "end": "data i czas zakończenia treningu",      // String
    "gpx": "<plik gpx z danymi o treningu sprowadzony do String (.toString())>"       // String
}
```


  - ***odpowiedź*** : 
  Zawartość ciała (jeżeli status odpowiedzi to 201):
```json
{
  "message":"Twój trening został zapisany."
}
```

  - ***struktura .gpx*** : 
```xml
<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="dart-gpx library">
  <metadata>
    <name>${nazwa_treningu}</name>
    <keywords>${typ_treningu [run, cycling]}, ${data_rozpoczęcia_treningu}, ${data_zakończenia_treningu}</keywords>
  </metadata>
  <wpt lat=${szerokość_geograficzna_punktu} lon=${długość_geograficzna_punktu}>
    <time>${data_dodania_punktu}</time>
    <ele>${wysokość_geograficzna_punktu}</ele>
  </wpt>
  <wpt lat=... lon=...>
    ...
  </wpt>
  ...
  </wpt>
</gpx>
```



  - ***Przykładowy plik .gpx*** : 
```xml
<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="dart-gpx library">
  <metadata>
    <name>Trening</name>
    <keywords>run, 2021-02-10 20:25:56.490019, 2021-02-10 20:26:30.532531</keywords>
  </metadata>
  <wpt lat="37.1218980" lon="-122.016">
    <time>2021-02-10T20:26:01.519138Z</time>
    <ele>5.0</ele>
  </wpt>
  <wpt lat="37.1218981" lon="-122.011">
    <time>2021-02-10T20:26:01.759003Z</time>
    <ele>5.0</ele>
  </wpt>
  <wpt lat="37.1218983" lon="-122.013">
    <time>2021-02-10T20:26:11.418739Z</time>
    <ele>5.0</ele>
  </wpt>
  <wpt lat="37.1218985" lon="-122.014">
    <time>2021-02-10T20:26:13.392704Z</time>
    <ele>5.1</ele>
  </wpt>
</gpx>
```