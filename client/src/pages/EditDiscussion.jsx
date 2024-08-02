
import { Alert, Button, FileInput, Select, TextInput, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from "react-redux";


export default function EditDiscussion() {

    const [file, setFile] = useState(null);
    const [uploadingImgProgress, setUploadingImgProgress] = useState(null);
    const [errorUploadingImg, setErrorUploadingImg] = useState(null);
    const [formData, setFormData] = useState({ title: "", category: "uncategorized", content: "" });
    const [errorPublishing, setErrorPublishing] = useState(null);
    const { discussionId } = useParams();

    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.user);
    useEffect(() => {
        try {
            const fetchDiscussion = async () => {
                const res = await fetch(`/api/discussion/getdiscussions?discussionId=${discussionId}`);
                const data = await res.json();
                if (!res.ok) {
                    console.log(data.message);
                    setErrorPublishing(data.message);
                }
                if (res.ok) {
                    setErrorPublishing(null);
                    setFormData(data.discussions[0]);
                }
            }
            fetchDiscussion();
        } catch (error) {
            console.log(error)
        }
    }, [discussionId]);

    console.log(uploadingImgProgress, errorUploadingImg, errorPublishing)
    const uploadImg = async () => {
        try {
            if (!file) {
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
                        setFormData({ ...formData, image: downloadURL });
                    });
                }
            );
        } catch (error) {
            setErrorUploadingImg('Image upload failed!');
            setUploadingImgProgress(null);
            console.log(error)
        }
    };

    const submitEditedDiscussion = async (e) => {
        e.preventDefault();
        try {
          
            const res = await fetch(`/api/discussion/editdiscussion/${formData._id}/${currentUser._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (!res.ok) {
                setErrorPublishing(data.message)
                return
            }

            if (res.ok) {
                setErrorPublishing(null);
                navigate(`/discussion/${data.slug}`)
            }
        } catch (error) {
            setErrorPublishing('Something went wrong!')
        }
    }
    return (
        <div className="p-3 max-w-3xl mx-auto min-h-screen">
            <h1 className="text-center text-3xl my-7 font-semibold">Update Discussion</h1>
            <form className="flex flex-col gap-4" onSubmit={submitEditedDiscussion}>
                <div className="flex flex-col gap-4 sm:flex-row justify-between">
                    <TextInput type="text" placeholder="Title" required id="title" className="flex-1" onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                    } value={formData.title} />
                    <Select onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                    } value={formData.category}>
                        <option value="uncategorized">Category</option>
                        <option value="pregnancy">Pregnancy</option>
                        <option value="newborn">New Born</option>
                        <option value="firstyear">First Year</option>
                        <option value="toddlers">Toddlers</option>
                        <option value="preschoolers">Pre Schoolers</option>
                        <option value="schoolage">School Age</option>
                        <option value="teens">Teens</option>

                    </Select>
                </div>
                <div className="flex gap-4 items-center justify-between p-3">
                    <FileInput type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
                    <Button type="button" gradientDuoTone="pinkToOrange" size="sm" onClick={uploadImg} disabled={uploadingImgProgress}>
                        {uploadingImgProgress ? (<div className="w-16 h-16">
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
                    <img src={formData.image} alt="cover" className="w-full h-72 object-cover" />
                )}
                <div className='flex flex-col gap-4'>
                    <Textarea
                        placeholder="Your content here..."
                        required
                        id="content"
                        className="border-2 border-gray-300 rounded-lg p-4 h-72 mb-4"
                        onChange={(e) =>
                            setFormData({ ...formData, content: e.target.value })
                        }
                        value={formData.content}
                    />
                    <Button type='submit' gradientDuoTone='pinkToOrange'>Update</Button>
                    {errorPublishing && <Alert className="mt-5" color='failure'>{errorPublishing}</Alert>}
                </div>
            </form>

        </div>
    )
}
