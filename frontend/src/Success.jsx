import { useState, useEffect } from "react";
import React from "react";
import { DropzoneArea } from 'material-ui-dropzone';

import axios from 'axios'
// const axios = require("axios").default;
const Success = () => {
    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState();
    const [data, setData] = useState();
    const [image, setImage] = useState(false);
    const [isLoading, setIsloading] = useState(false);
    let confidence = 0;
  
    const sendFile = async () => {
      if (image) {
        let formData = new FormData();
        formData.append("file", selectedFile);
        let res = await axios({
          method: "post",
          url: "http://127.0.0.1:8000/predict",
          data: formData,
        });
        if (res.status === 200) {
          setData(res.data);
          console.log(res.data.confidence)
        }
        setIsloading(false);
      }
    }
  
    const clearData = () => {
      setData(null);
      setImage(false);
      setSelectedFile(null);
      setPreview(null);
    };
  
    useEffect(() => {
      if (!selectedFile) {
        setPreview(undefined);
        return;
      }
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
    }, [selectedFile]);
  
    useEffect(() => {
      if (!preview) {
        return;
      }
      setIsloading(true);
      sendFile();
    }, [preview]);
  
    const onSelectFile = (files) => {
      if (!files || files.length === 0) {
        setSelectedFile(undefined);
        setImage(false);
        setData(undefined);
        return;
      }
      setSelectedFile(files[0]);
      setData(undefined);
      setImage(true);
    };
  
  return (
    <>
        CodeBasics: Potato Disease Classification
         
       
           <DropzoneArea
             acceptedFiles={['image/*']}
             dropzoneText={"Drag and drop an image of a potato plant leaf to process"}
             onChange={onSelectFile}
           />
       <div  >
        {data?.class}
            {data?.confidence}
         <div onClick={clearData}>Clear</div>
       </div>

    </>
  )
}

export default Success
