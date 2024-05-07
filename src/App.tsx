import { useState, useEffect } from 'react';
import './App.css';

const useImageURL = () => {
  const [imageURL1, setImageURL1] = useState(null);
  const [imageURL2, setImageURL2] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    Promise.all([
      fetch("https://jsonplaceholder.typicode.com/photos/1", { mode: "cors" }),
      fetch("https://jsonplaceholder.typicode.com/photos/2", { mode: "cors" })
    ])
    .then(([response1, response2]) => {
    
      if (response1.status >= 400) {
        throw new Error("Error en la primera solicitud");
      }
      
      if (response2.status >= 400) {
        throw new Error("Error en la segunda solicitud");
      }
      return Promise.all([response1.json(), response2.json()]);
    })
    .then(([data1, data2]) => {
      
      setImageURL1(data1.url);
      setImageURL2(data2.url);
    })
    .catch((error) => {
      
      setError(error);
    })
    .finally(() => {
      
      setLoading(false);
    });
  }, []);

  return { imageURL1, imageURL2, error, loading };
};

function App() {
  const { imageURL1, imageURL2, error, loading } = useImageURL();

  if (loading) return <p>Loading...</p>;
  if (error) return <p> A network error was encountered! </p>;

  return (
    <div>
      {imageURL1 && (
        <>
          <h1>Image 1</h1>
          <img src={imageURL1} alt="Image 1" />
        </>
      )}
      {imageURL2 && (
        <>
          <h1>Image 2</h1>
          <img src={imageURL2} alt="Image 2" />
        </>
      )}
    </div>
  );
}

export default App;