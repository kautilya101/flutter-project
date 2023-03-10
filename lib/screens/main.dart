
import 'dart:convert';
import 'dart:io';
import 'package:flutter/foundation.dart';
import 'package:gallery_saver/gallery_saver.dart';
import 'package:image_picker/image_picker.dart';
import 'package:flutter/material.dart';
import 'dart:ui' as ui;
import 'package:http/http.dart' as http;
import 'package:image_downloader/image_downloader.dart';
import 'dart:typed_data';
void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        scaffoldBackgroundColor: const Color.fromRGBO(236, 249, 255,1)
      ),
      home: const MainPage(),
    );
  }
}

class MainPage extends StatefulWidget {
  const MainPage({super.key});

  @override
  State<MainPage> createState() => MainPageState();
}

class MainPageState extends State<MainPage>{
  @override
  Widget build(BuildContext context) {
    return Scaffold(
       appBar: AppBar(
         title: const Text('Welcome to Colorify'),
       ),
      body: Column(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          Center(
            child : Card(
                elevation: 5,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(10.0)
                ),
                child : InkWell(
                  onTap: () => {
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => const MyHomePage())
                    )
                  },
                  child: SizedBox(
                    height: 150,
                    width: 300,
                    child: Padding(
                      padding: const EdgeInsets.all(3),
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: const <Widget>[
                          Center(
                              child: Icon(
                                Icons.brush_rounded,
                                size: 50.0 ,
                              )

                          ),
                          Center(
                            child: Text(
                                'COLOR YOUR PHOTO',
                                style: TextStyle(
                                    color: Colors.black,
                                    fontWeight: FontWeight.bold,
                                    fontSize: 20
                                )
                            ),
                          )
                        ],
                      ),

                    ),
                  ),
                )

            ),
          ),

          Center(
            child:Card(
                elevation: 5,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(10.0)
                ),
                child : SizedBox(
                  height: 150,
                  width: 300,
                  child: Padding(
                    padding: const EdgeInsets.all(3),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: const <Widget>[
                        Center(
                            child: Icon(
                              Icons.cleaning_services_rounded,
                              size: 50.0 ,
                            )

                        ),
                        Center(
                          child: Text(
                              'CLEAN YOUR PHOTO',
                              style: TextStyle(
                                  color: Colors.black,
                                  fontWeight: FontWeight.bold,
                                  fontSize: 20
                              )
                          ),
                        )
                      ],
                    ),

                  ),
                )
            ),
          )
        ],
      ) ,
    );
  }

}


class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key});

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage>{

  File? imageFile;
  final picker = ImagePicker();
  String? message;
  var imgUrl;
  uploadImage() async{
    final request = http.MultipartRequest('POST',Uri.parse("http://10.0.2.2:4000/api"));
    final headers = {
      'Content-type' : "multipart/form-data",
    };
    request.files.add(
      http.MultipartFile('image',imageFile!.readAsBytes().asStream(),imageFile!.lengthSync(),
          filename: imageFile!.path.split('/').last)
    );
    request.headers.addAll(headers);
    final response = await request.send();
    http.Response res = await http.Response.fromStream(response);
    final resJson = await jsonDecode(res.body);
    message = await resJson['message'];
    imgUrl = await resJson['url'];
    print(message);
    print(imgUrl);
    // setState(() {
    //
    // });
  }

  late http.Response response;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Welcome to Colorify')
      ),
      body: imageFile == null
      ? Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const Center(
            child: SizedBox(
              width: 200,
              height: 150,
              child: Icon(Icons.add_a_photo),
            ),
          ),
          Center(
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: ElevatedButton (
                    onPressed: imageFromGallery,
                    child: const Text('GALLERY'),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: ElevatedButton (
                    onPressed: imageFromCamera,
                    child: const Text('CAMERA'),
                  ),
                )
              ]
            )
          )
        ],
      )
          : Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: <Widget>[

              const Padding(
                  padding: EdgeInsets.all(8.0),
                  child: Text(
                    "Your Uploaded Image",
                    style: TextStyle(
                      color: Colors.black,
                      fontWeight: FontWeight.bold,
                      fontSize: 20
                    ),
                  ),
              ),
              SizedBox(
                height: 400,
                width: 400,
                child: Image.file(
                  imageFile!,
                )
              ),
              ElevatedButton(
                  onPressed: () {
                    uploadImage();
    Future.delayed(Duration(seconds:5),(){
                    debugPrint('send pressed');
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => ImagePreview(url: imgUrl)
                    ));
                  });},
                  child: const Text(
                      'COLOR IMAGE'
                  )
              )
            ],
          ),
      )
    );
  }
  imageFromGallery() async{
    PickedFile? pickedFile = await ImagePicker()
        .getImage(
        source: ImageSource.gallery,
        maxHeight: 1800,
        maxWidth: 1800
    );
    if(pickedFile != null){
      setState(() {
        imageFile = File(pickedFile.path);
      });
    }
    }

  imageFromCamera() async{
    PickedFile? pickedFile = await ImagePicker()
        .getImage(source: ImageSource.camera,
          maxHeight: 1800,
          maxWidth: 1800);
    if (pickedFile != null) {
      setState(() {
        imageFile = File(pickedFile.path);
      });
    }
  }

  }


class CircularProgressIndicatorApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return const CircularProgressIndicator(
      backgroundColor: Colors.red,
      strokeWidth: 8,);
  }
}


class ImagePreview extends StatefulWidget {
  const ImagePreview({super.key,required this.url});

  final String url;
  @override
  State<StatefulWidget> createState() => ImagePreviewState();
}

class ImagePreviewState extends State<ImagePreview> {


  static final Map<String, String> httpHeaders = {
    HttpHeaders.contentTypeHeader: "image",
    "Connection": "Keep-Alive",
    "Keep-Alive": "timeout=5, max=1000"
  };

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: const Text('Colorify'),
        ),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Padding(
                padding: EdgeInsets.all(8.0),
                child: Text(
                  "Your Colorized Image",
                  style: TextStyle(
                      color: Colors.grey,
                      fontWeight: FontWeight.bold,
                      fontSize: 20
                  ),
                ),
              ),
              SizedBox(
                  height: 500,
                  width: 400,
                  child: Image.network(
                    widget.url
                  )
              ),
              ElevatedButton(
                  onPressed: (){
                    getImage(widget.url);
                    },
                  child: const Text(
                      'DOWNLOAD'
                  )
              )
            ],
          ),
        )
    );
  }

  getImage(url) async{
        await GallerySaver.saveImage(url,toDcim: true);
  }
}




