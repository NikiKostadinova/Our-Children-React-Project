import { Alert, Button, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


export default function Profile() {
    const { currentUser } = useSelector(state => state.user);
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [imgUploadingProgress, setImgUploadingProgress] = useState(null);
    const [imgUploadError, setImgUploadError] = useState(null);
    
    const filePickerRef = useRef();
    const handleImgChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImageFileUrl(URL.createObjectURL(file));
        }

    }
    useEffect(() => {
        if (imageFile) {
            uploadImg();
        }
    }, [imageFile]);
    const uploadImg = async () => {
        setImgUploadError(null)
        const storage = getStorage(app);
        const fileName = new Date().getTime() + imageFile.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);
        uploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setImgUploadingProgress(progress.toFixed(0));

        },
            (error) => {
                setImgUploadError('Image was not uploaded, file must be less than 2MB!');
                setImgUploadingProgress(null);
                setImageFile(null);
                setImageFileUrl(null);
                console.log(error)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageFileUrl(downloadURL);
                })
            }
        )
    }
    return (
        <div className="max-w-lg mx-auto p-3 w-full">
            <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
            <form className="flex flex-col gap-4">
                <input type="file" accept="image/*" onChange={handleImgChange} ref={filePickerRef} hidden />
                <div className="relative w-32 h-32 self-center cursor-pointer shadow hover:shadow-md hover:shadow-red-400 overflow-hidden rounded-full" onClick={() => filePickerRef.current.click()}>
                    {imgUploadingProgress && (
                        <CircularProgressbar value={imgUploadingProgress || 0} text={`${imgUploadingProgress}%`} strokeWidth={5} styles={{
                            root: {
                                width: "100%",
                                height: "100%",
                                position: "absolute",
                                top: 0,
                                left: 0
                            },
                            path: {
                                stroke: `rgba(248, 113, 113, ${imgUploadingProgress/100})`
                            },
                            text: {
                                fill: `rgba(248, 113, 113, ${imgUploadingProgress / 100})`, 
                                fontSize: '16px',
                              },
                        }}
                        />
                    )}
                    <img src={imageFileUrl || currentUser.profilePicture} alt="user" className={`rounded-full w-full h-full object-cover border-4 border-[ligthgray] ${imgUploadingProgress && imgUploadingProgress < 100 && 'opacity-60'}`} />
                </div>
                {imgUploadError && <Alert color='failure'>{imgUploadError}</Alert>}
                <TextInput type="text" id="username" placeholder="username" defaultValue={currentUser.username} />
                <TextInput type="email" id="email" placeholder="email" defaultValue={currentUser.email} />
                <TextInput type="password" id="password" placeholder="password" />
                <Button type="submit" gradientDuoTone="pinkToOrange" outline>Update</Button>
            </form>
            <div className="text-red-400 flex justify-between mt-5">
                <span className="cursor-pointer">Delete Account</span>
                <span className="cursor-pointer">Sign Out</span>

            </div>
        </div>
    )
}
