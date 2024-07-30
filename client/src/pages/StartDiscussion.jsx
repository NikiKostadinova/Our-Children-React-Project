

import { Alert, Button, FileInput, Select, TextInput, Textarea } from "flowbite-react";
import { useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import { app } from '../firebase';
import {CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {useNavigate} from 'react-router-dom';


export default function StartDiscussion() {

   const [file, setFile] = useState(null);
   const [uploadingImgProgress, setUploadingImgProgress] = useState(null);
   const [errorUploadingImg, setErrorUploadingImg] = useState(null);
   const [formData, setFormData] = useState({});
   const [errorPublishing, setErrorPublishing] = useState(null);

   const navigate = useNavigate();

    const uploadImg = async () =>{
        try {
            if(!file){
                setErrorUploadingImg('Please choose an image!')
                return;
            }
            setErrorUploadingImg(null);
            const storage = getStorage(app);
            const fileName = new Date().getTime() + '-' + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setUploadingImgProgress(progress.toFixed(0));
                },
                (error) => {
                    setErrorUploadingImg('Something went wrong!');
                    setUploadingImgProgress(null);
                    console.log(error)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setUploadingImgProgress(null);
                        setErrorUploadingImg(null);
                        setFormData({...formData, image: downloadURL});
                    });
                }
            );
        } catch (error) {
            setErrorUploadingImg('Image upload failed!');
            setUploadingImgProgress(null);
            console.log(error)
        }
    };

    const submitNewDiscussion = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('api/discussion/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if(!res.ok) {
                setErrorPublishing(data.message)
                return
            }
          
            if(res.ok){
                setErrorPublishing(null);
                navigate(`/discussion/${data.slug}`)
            }
        } catch (error) {
            setErrorPublishing('Something went wrong!')
        }
    }
    return (
        <div className="p-3 max-w-3xl mx-auto min-h-screen">
            <h1 className="text-center text-3xl my-7 font-semibold">Start a discussion</h1>
            <form className="flex flex-col gap-4" onSubmit={submitNewDiscussion}>
                <div className="flex flex-col gap-4 sm:flex-row justify-between">
                    <TextInput type="text" placeholder="Title" required id="title" className="flex-1" onChange={(e) => 
                    setFormData({...formData, title: e.target.value})
                    }/>
                    <Select onChange={(e) => 
                    setFormData({...formData, category: e.target.value})
                    }>
                        <option value="uncategorized">Category</option>
                        <option value="pregnancy">Pregnancy</option>
                        <option value="newborn">New Born</option>
                        <option value="firstyear">First Year</option>
                        <option value="toddlers">Toddlers</option>
                        <option value="preschoolers">Preschoolers</option>
                        <option value="schoolage">School Age Children</option>
                        <option value="teens">Teens</option>

                    </Select>
                </div>
                <div className="flex gap-4 items-center justify-between p-3">
                    <FileInput type="file" accept="image/*" onChange={(e)=> setFile(e.target.files[0])}/>
                    <Button type="button" gradientDuoTone="pinkToOrange" size="sm" onClick={uploadImg} disabled={uploadingImgProgress}>
                        { uploadingImgProgress ? (<div className="w-16 h-16">
                            <CircularProgressbar value={uploadingImgProgress} text={`${uploadingImgProgress || 0}%`} />
                        </div>) : ('Upload Image')}
                        </Button>
                </div>    
                {errorUploadingImg && (
                    <Alert color='failure'>
                        {errorUploadingImg}
                    </Alert>
                )}   
                {formData.image && (
                    <img src={formData.image} alt="cover" className="w-full h-72 object-cover"/>
                )}        
                <div className='flex flex-col gap-4'>
                    <Textarea
                        placeholder="Your content here..."
                        required
                        id="content"
                        className="border-2 border-gray-300 rounded-lg p-4 h-72 mb-4 whitespace-pre-wrap"  
                        onChange={(e) => 
                            setFormData({...formData, content: e.target.value})
                            }                      
                    />
                    <Button type='submit' gradientDuoTone='pinkToOrange'>Start</Button>
                    {errorPublishing && <Alert className="mt-5" color='failure'>{errorPublishing}</Alert>}
                </div>
            </form>

        </div>
    )
}

