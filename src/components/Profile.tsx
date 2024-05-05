/* eslint-disable @typescript-eslint/no-explicit-any */
import { IKContext, IKUpload } from "imagekitio-react";
import { useState, useRef } from "react";
import axios from "axios";

const urlEndpoint = 'https://ik.imagekit.io/vzeqrbeyx';
const publicKey = 'public_AmDHQdTH8AoCl6orEbn5coDlf6o=';

const authenticator = async () => {
    try {
        const response = await fetch('https://media-handler-railway-production.up.railway.app/api/v1/image-kit/auth');

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Request failed with status ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        const { signature, expire, token } = data.data;
        return { signature, expire, token };
    } catch (err) {
        console.error("Authentication request failed:", err);
        throw err;
    }
};

const Profile = () => {
    const ikUploadRefTest = useRef<HTMLInputElement>(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [linkImage, setLinkImage] = useState("");

    const handleUploadSuccess = (res: any) => {
        console.log(res);
        setLinkImage(res.url);
    };

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const url = new URL(linkImage);
            const path = url.pathname;
            const parts = path.split('/');
            const filename = parts[parts.length - 1];
            
            const response = await axios.post("https://d1-cloudflare.andyakuliah.workers.dev/api/v1/image-kit/meta-data-image", {
                title: title,
                description: description,
                link_image: filename
            });

            console.log("Response:", response.data);
            setTitle("");
            setDescription("");
            setLinkImage("");
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="profile-container">
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label>Title:</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div>
                    <label>Description:</label>
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
                </div>
                <IKContext
                    urlEndpoint={urlEndpoint}
                    publicKey={publicKey}
                    authenticator={authenticator}
                >
                    <IKUpload
                        tags={["sample-tag1", "sample-tag2"]}
                        ref={ikUploadRefTest}
                        onSuccess={handleUploadSuccess}
                    />
                    {/* <button className="button-upload-profile" onClick={() => ikUploadRefTest.current?.click()}>Upload</button> */}
                </IKContext>
                <button type="submit">Submit</button>
                <p>Nama fotonya jangan ada karakter /,_.*, ntar ga bisa submit</p>
            </form>
            <p>Abis Itu Refresh :3</p>
        </div>
    );
}

export default Profile;
