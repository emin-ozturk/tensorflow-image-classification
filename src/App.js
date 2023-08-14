import React, { useRef, useState } from 'react';
import * as mobilenet from '@tensorflow-models/mobilenet';
// eslint-disable-next-line
import * as tf from '@tensorflow/tfjs';
import './App.css';

function App() {
  const imgRef = useRef(null);
  const [results, setResults] = useState([])
  const [image, setImage] = useState(null)
  
  const classification = async () => {
    const model = await mobilenet.load();
    if (imgRef.current) {
	  model.classify(imgRef.current).then(predictions => {
	    setResults(predictions);
	  });
	}
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
	  setResults([]);
	  classification();
    }
  }
  
  return (
    <div className="w-full h-full flex flex-col items-center">
	  <span className="my-10 font-bold text-2xl">Tensorflow - Image Classification</span>

      <div className="border rounded-lg shadow-md px-10 py-5 mb-5">
        <input type="file" onChange={onImageChange} className="block text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-md file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-500 file:text-white
          hover:file:bg-blue-600
		  file:cursor-pointer"/>
      </div> 

	
	
	  <img className="w-60 h-60 mb-5" ref={imgRef} src={image} alt=""/>
      
	  <div className="p-10 pt-0">
	    {
           results.map(result =>
             <div>
			   <span className="font-bold"> { result.className }: </span>
			   <span> { (result.probability * 100).toFixed(5) + '%' } </span>
		     </div>
		   )
	    }
      </div>
    </div>
  );
}

export default App;
