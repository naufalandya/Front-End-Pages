import React, { useEffect, useState } from 'react';
import { IKContext, IKImage } from 'imagekitio-react';
import axios from 'axios';

interface ImageData {
  id: number;
  title: string;
  description: string;
  link_image: string;
}

const ImageComponent: React.FC = () => {
  const [imageData, setImageData] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const urlEndpoint = 'https://ik.imagekit.io/vzeqrbeyx';
  const publicKey = 'public_AmDHQdTH8AoCl6orEbn5coDlf6o=';

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch('https://d1-cloudflare.andyakuliah.workers.dev/api/v1/image-kit/meta-data-image')
      .then((response) => response.json())
      .then((data) => {
        if (data.status && data.status === true && data.data) {
          setImageData(data.data);
          setLoading(false);
        } else {
          console.error('Failed to fetch image data');
        }
      })
      .catch((error) => {
        console.error('Error fetching image data:', error);
      });
  };

  const handleDeleteImage = async (id: number) => {
    try {
      await axios.delete(`https://d1-cloudflare.andyakuliah.workers.dev/api/v1/image-kit/meta-data-image/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        imageData.map((image) => (
          <div key={image.id}>
            <h2>{image.title}</h2>
            <p>{image.description}</p>
            <IKContext urlEndpoint={urlEndpoint} publicKey={publicKey}

            >
              <IKImage
                path={image.link_image}
                transformation={[{ height: '300', width: '400' }]}
                loading="lazy"
                height="300"
                width="400"
              />
            </IKContext>
            <button onClick={() => handleDeleteImage(image.id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
};

export default ImageComponent;
