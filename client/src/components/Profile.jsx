import { Alert, Button, Modal, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";

import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {
    updateStart,
    updateSuccess,
    updateFailure,
    deleteUserAccountStart,
    deleteUserAccountSuccess,
    deleteUserAccountFailure,
    signOutSuccess,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { HiOutlineExclamation } from "react-icons/hi";


export default function Profile() {
    const { currentUser, error, loading } = useSelector(state => state.user);
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [imgUploadingProgress, setImgUploadingProgress] = useState(null);
    const [imgUploadError, setImgUploadError] = useState(null);
    const [imgFileUploading, setImgFileUploading] = useState(false);
    const [successUserUpdate, setSuccessUserUpdate] = useState(null);
    const [errorUpdateUser, setErrorUpdateUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();
    const filePickerRef = useRef();
    const dispatch = useDispatch();
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
        setImgUploadError(null);
        setImgFileUploading(true);
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
                setImgFileUploading(false);
                console.log(error)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageFileUrl(downloadURL);
                    setFormData({ ...formData, profilePicture: downloadURL });
                    setImgFileUploading(false);
                })
            }
        )
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorUpdateUser(null);
        setSuccessUserUpdate(null);
        if (Object.keys(formData).length === 0) {
            setErrorUpdateUser('There are no changes!')
            return;
        }
        if (imgFileUploading) {
            setErrorUpdateUser('Image is uploading, please wait!')
            return;
        }
        try {
            dispatch(updateStart());

            const res = await fetch(`/api/user/edit/${currentUser._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();

            if (!res.ok) {

                dispatch(updateFailure(data.message));
                setErrorUpdateUser(data.message);
            } else {

                dispatch(updateSuccess(data));
                setSuccessUserUpdate("User's profile updated successfully!")
            }
        } catch (error) {
            dispatch(updateFailure(error.message));
            setErrorUpdateUser(error.message);

        }
    };

    const deleteUser = async () => {
        setShowModal(false);
        try {
            dispatch(deleteUserAccountStart());
            const res = await fetch(`/api/user/delete/${currentUser._id}`, {
                method: 'DELETE'
            });
            const data = await res.json();
            if (!res.ok) {
                dispatch(deleteUserAccountFailure(data.message));
            } else {
                dispatch(deleteUserAccountSuccess(data));
            }
        } catch (error) {
            dispatch(deleteUserAccountFailure(error.message));
        }
    }

    const logOut = async () => {
        try {
          const res = await fetch('/api/user/signout', {
            method: 'POST'
          });
          const data = await res.json();
          if (!res.ok) {
            console.log(data.message);
          } else {
            dispatch(signOutSuccess());
            navigate('/login');
          }
        } catch (error) {
          console.log(error.message);
        }
      }
    return (
        <div className="max-w-lg mx-auto p-3 w-full">
            <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input type="file" accept="image/*" onChange={handleImgChange} ref={filePickerRef} hidden />
                <div className="relative w-32 h-32 self-center cursor-pointer shadow overflow-hidden rounded-full" onClick={() => filePickerRef.current.click()}>
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
                                stroke: `rgba(248, 113, 113, ${imgUploadingProgress / 100})`
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
                <TextInput type="text" id="username" placeholder="username" defaultValue={currentUser.username} onChange={handleChange} />
                <TextInput type="email" id="email" placeholder="email" defaultValue={currentUser.email} onChange={handleChange} />
                <TextInput type="password" id="password" placeholder="password" onChange={handleChange} />
                <Button type="submit" gradientDuoTone="pinkToOrange" outline disabled={loading || imgFileUploading}>{loading ? 'Loading...' : 'Update'}</Button>

            </form>
            <div className="text-red-400 flex justify-between mt-5">
                <span onClick={() => setShowModal(true)} className="cursor-pointer">Delete Account</span>
                <span onClick={logOut} className="cursor-pointer">Log Out</span>

            </div>
            {successUserUpdate && (
                <Alert color='success' className="mt-5">
                    {successUserUpdate}
                </Alert>
            )}
            {(errorUpdateUser || imgUploadError || error) && (
                <Alert color='failure' className="mt-5">
                    {errorUpdateUser || imgUploadError || error}
                </Alert>
            )}
            <Modal show={showModal} onClose={() => setShowModal(false)} popup size='md'>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamation className="h-14 w-14 text-red-700 mb-4 mx-auto" />
                        <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">Are you sure you want to delete your account?</h3>
                        <div className="flex justify-center gap-4">
                            <Button color='failure' onClick={deleteUser}>Yes, I am sure</Button>
                            <Button onClick={() => setShowModal(false)}>No, cancel</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}
