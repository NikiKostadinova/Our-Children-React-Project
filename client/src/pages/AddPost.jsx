import { useEffect } from 'react';
import { Button, FileInput, Select, TextInput, Textarea } from "flowbite-react";



export default function AddPost() {

   
    useEffect(() => {
       
    }, []);
    return (
        <div className="p-3 max-w-3xl mx-auto min-h-screen">
            <h1 className="text-center text-3xl my-7 font-semibold">Add a Post</h1>
            <form className="flex flex-col gap-4">
                <div className="flex flex-col gap-4 sm:flex-row justify-between">
                    <TextInput type="text" placeholder="Title" required id="title" className="flex-1" />
                    <Select>
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
                    <FileInput type="file" accept="image/*" />
                    <Button type="button" gradientDuoTone="pinkToOrange" size="sm" >Upload Image</Button>
                </div>               
                <div className='flex flex-col gap-4'>
                    <Textarea
                        placeholder="Your content here..."
                        required
                        id="content"
                        className="border-2 border-gray-300 rounded-lg p-4 h-72 mb-4"                        
                    />
                    <Button type='submit' gradientDuoTone='pinkToOrange'>Publish</Button>
                </div>
            </form>

        </div>
    )
}
