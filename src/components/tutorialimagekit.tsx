import { IKImage, IKContext, IKUpload} from 'imagekitio-react';
import React from 'react';

// IKVideo?, IKContext?, IKUpload
const urlEndpoint = 'public_AmDHQdTH8AoCl6orEbn5coDlf6o=';
const publicKey = 'https://ik.imagekit.io/vzeqrbeyx'; 
const authenticator =  async () => {
    try {
        const response = await fetch('https://media-handler-railway-production.up.railway.app/api/v1/image-kit/auth');

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Request failed with status ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        console.log(data);
        const { signature, expire, token } = data.data;
        return { signature, expire, token };
    } catch (err) {
        const errorCustom = new Error(`Authentication request failed:`);
        console.log(errorCustom, err);
        throw errorCustom
    }
};

const onError = (err : unknown) => {
    console.log("Error", err);
  };
  
  const onSuccess = (res : unknown) => {
    console.log("Success", res);
  };
  
  const onUploadProgress = (progress : unknown)=> {
    console.log("Progress", progress);
  };
  
  const onUploadStart = (evt : unknown) => {
    console.log("Start", evt);
  };


const UploadImage = () => {
    const ikUploadRefTest = React.useRef<HTMLInputElement>(null)

    if (ikUploadRefTest.current !== null) {
        ikUploadRefTest.current.click();
      }

    
    return (
        <div className="image-container">
           <IKContext 
                urlEndpoint={urlEndpoint}
                publicKey={publicKey}
                authenticator={authenticator}    
            >
                <h1>Normal Imagekit</h1>
                <IKImage path="1713965730492_awM58hGcN.png" width="400" />
                
                <h1>Url Endpoint</h1>
                <IKImage path="1713965730492_awM58hGcN.png" 
                transformation={[{
                    height: "300",
                    width: "200"
                  }]} />


                <h1>Chained</h1>

                <IKImage path="1713965730492_awM58hGcN.png"
                transformation={[{
                    height: "300",
                    width: "200",
                }, { 
                    rt: "90",
                }]}
                />

                <h1>Chained juga</h1>


                <IKImage path="1713965730492_awM58hGcN.png"
                transformation={[{
                    rt: "90",
                }, { 
                    height: "300",
                    width: "200",
                }]}
                />

                <h1>Watermark</h1>

                <IKImage path="1713965730492_awM58hGcN.png"  //watermark
                    transformation={[{ width: '400', height: '300' },{ "raw": "l-text,i-Watermark Cuy,fs-50,l-end" }]}
                />

                
                <h2>Loading image from an absolute path</h2>
                <IKImage
                src="https://ik.imagekit.io/eoeykxtr4/1713965730492_awM58hGcN.png"
                width="400"
                />


                <h2>Lazy Loading image</h2>

                <IKImage path="1713965730492_awM58hGcN.png"
                transformation={[{ height: '300', width: '400' }]}
                loading="lazy"
                height="300"
                width="400"
                />

                <h2>Quality Blur Dulu Baru Naik</h2>
                
                <IKImage path="1713965730492_awM58hGcN.png"
                lqip={{ active: true, quality: 20 }}
                width="400"
                />

                <h2>Quality Blur Dulu Baru Naik Tapi Lazy Loading Dulu</h2>

                <IKImage
                path="1713965730492_awM58hGcN.png"
                transformation={[{ height:'300', width:'400' }]}
                lqip={{ active:true }}
                loading="lazy"
                height="300"
                width="400"
                />

                <p>Upload an image</p>
                    <IKUpload
                    fileName="test-upload.png"
                    onError={onError}
                    onSuccess={onSuccess}
                />
               

               <IKUpload
                    fileName="test-upload.jpg"
                    tags={["sample-tag1", "sample-tag2"]}
                    customCoordinates={"10,10,10,10"}
                    isPrivateFile={false}
                    useUniqueFileName={true}
                    responseFields={["tags"]}
                    validateFile={file => file.size < 2000000}
                    folder={"/sample-folder"}
                    extensions={[{
                        "name": "remove-bg",
                        "options": {
                        "add_shadow": true,
                        },
                    }]}
                    webhookUrl="https://andya.com/ik-webhookk"
                    overwriteFile={true}
                    overwriteAITags={true}
                    overwriteTags={true}
                    overwriteCustomMetadata={true}
                    // customMetadata={{
                    //   "brand": "Nike",
                    //   "color": "red",
                    // }}
                    onError={onError}
                    onSuccess={onSuccess}
                    onUploadProgress={onUploadProgress}
                    onUploadStart={onUploadStart}
                    transformation = {{
                        pre: 'l-text,i-Imagekit,fs-50,l-end',
                        post: [
                            {
                                'type': 'transformation',
                                'value': 'w-100'
                            }
                        ]
                    }}
                    // style={{display: 'none'}} // hide the default input and use the custom upload button
                    ref={ikUploadRefTest}
                    />
                    <p>Custom Upload Button</p>
                    {ikUploadRefTest && <button onClick={() => ikUploadRefTest.current?.click()}>Upload</button>}
            </IKContext>
        </div>
      );
}
          
export default UploadImage