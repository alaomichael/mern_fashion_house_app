import React, {useState, useEffect} from 'react';
import { CloudinaryContext, Image } from "cloudinary-react";
import { fetchPhotos, openUploadWidget } from "./CloudinaryService";


function ImageUploader() {
  const [images, setImages] = useState([])

  const beginUpload = tag => {
    const uploadOptions = {
      cloudName: "michaelalao",
      tags: [tag, 'anImage'],
      uploadPreset: "style"
    };
    openUploadWidget(uploadOptions, (error, photos) => {
      if (!error) {
        console.log(photos);
        if(photos.event === 'success'){
          setImages([...images, photos.info.public_id])
        }
      } else {
        console.log(error);
      }
    })
  }

  useEffect( () => {
    fetchPhotos("image", setImages);
  }, [])

  return (
    <>
    <h1>From IMAGE.JS</h1>
   <CloudinaryContext cloudName="michaelalao">
      <div className="App">
        <button onClick={() => beginUpload("image")}>Upload Image</button>
      <section>
        {images.map(i => <Image
              key={i}
              publicId={i}
              fetch-format="auto"
              quality="auto"
            />)}
      </section>
    </div>
   </CloudinaryContext>
   </>
  );
}

export default ImageUploader;