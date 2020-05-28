import React from 'react';
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';
import cloudinary from 'cloudinary-core';

export default function Cloudinary() {

    const cloudinaryCore = new cloudinary.Cloudinary({cloud_name: 'michaelalao'});
const SampleImg = () => (
    <img src={cloudinaryCore.url('style')} />
);

  return (
    <>
    <Image cloudName="michaelalao" publicId="sample" width="300" crop="scale" />
    <CloudinaryContext cloudName="michaelalao">
  <div>
    <Image publicId="style" width="50" />
  </div>
  <Image publicId="style" width="0.5" />
  <hr/>
  <p> Sample Image 2</p>
  {SampleImg}
</CloudinaryContext>
    </>
  );
}



