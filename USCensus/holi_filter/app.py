from flask import Flask,request,jsonify,Response
import numpy as np
from werkzeug.serving import WSGIRequestHandler
import cv2
import cloudinary as Cloud
import cloudinary.uploader
import werkzeug
import random


app = Flask(__name__)

Cloud.config(
    cloud_name ='dmc7pp8sv',
    api_key = '347284742914284',
    api_secret = '_MF8-_VBeBBFnJ5Xb2F9Rh3FNtg'
)

@app.route('/api', methods=["POST"])
def sendData() :
    imageFile = request.files['image']
    # imageName = str('./uploadedImage')
    imageFile.save('./uploadedImage.jpg')
    filter('uploadedImage.jpg')
    upload_result = cloudinary.uploader.upload('output_image.jpg')
    return {
        'message' : 'worked at last',
         'url' : upload_result['secure_url']
    }

# @app.route('/api/image', methods=["GET"])
# def getData():  
#     headers = {'Content-type':'image/jpeg'}
#     with open('output_image.jpg','rb') as f:
#         image_Data = f.read()
#     return Response(image_Data,status=200,headers=headers)
        
def filter(image):
    img = cv2.imread(image)
    gray_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    haar_cascade = cv2.CascadeClassifier('Photos/haarcascade_frontalface_default.xml')
    faces = haar_cascade.detectMultiScale(gray_img, 1.3, 5)
    face_mask = ['Photos/2.png','Photos/faceMask2.png','Photos/faceMask3.png']
    mask = cv2.imread(random.choice(face_mask))
    for (x, y, w, h) in faces:
        mask = cv2.resize(mask, (w, h))
        img[y:y+h, x:x+w] = cv2.addWeighted(img[y:y+h, x:x+w], 1, mask, 0.7, 0.2)
    # print(img)
    # cv2.imshow(img)
    # cv2.waitKey(0)
    cv2.imwrite('output_image.jpg', img)

if __name__=='__main__':

    app.run(debug = True, port = 4000)


# def put_glass(mask, fc, x, y, w, h):
#     face_width = w
#     face_height = h

#     hat_width = face_width + 1
#     hat_height = face_height + 1

#     glass = cv2.resize(mask, (w,h))

#     for i in range(hat_height):
#         for j in range(hat_width):
#             for k in range(3):
#                 if glass[i][j][k] < 235:
#                     fc[y + i - int(-0.20 * face_height)][x + j][k] = glass[i][j][k]
#     return fc