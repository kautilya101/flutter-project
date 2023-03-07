
import 'dart:io';
import 'package:image_picker/image_picker.dart';
import 'package:flutter/material.dart';

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
      ),
      home: const MyHomePage(),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key});

  // This widget is the home page of your application. It is stateful, meaning
  // that it has a State object (defined below) that contains fields that affect
  // how it looks.

  // This class is the configuration for the state. It holds the values (in this
  // case the title) provided by the parent (in this case the App widget) and
  // used by the build method of the State. Fields in a Widget subclass are
  // always marked "final".

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage>{

  File? imageFile;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Welcome to Colorify')
      ),
      body: imageFile == null
      ? Container(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Center(
              child: Container(
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
                      child: Text('GALLERY'),
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: ElevatedButton (
                      onPressed: imageFromCamera,
                      child: Text('CAMERA'),
                    ),
                  )
                ]
              )
            )
          ],
        ),
      )
          : Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Text(
                    "Your Uploaded Image",
                    style: TextStyle(
                      color: Colors.black,
                      fontWeight: FontWeight.bold,
                      fontSize: 20
                    ),
                  ),
              ),
              Container(
                  height: 200,
                  width: 200,
                child: Image.file(
                  imageFile!,
                  fit: BoxFit.cover,
                ),
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
        maxHeight: 200,
        maxWidth: 200
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
          maxHeight: 200,
          maxWidth: 200);
    if (pickedFile != null) {
      setState(() {
        imageFile = File(pickedFile.path);
      });
    }
  }

}




