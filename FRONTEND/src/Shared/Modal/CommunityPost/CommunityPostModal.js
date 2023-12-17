import React, { useContext, useState } from 'react';
import './CommunityPostModal.css'
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../../Context/AuthProvider';
import { API_URL } from '../../../API/config';
import { useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';


const CommunityPost = ({ refetch }) => {
    const { user } = useContext(AuthContext)
    const params = useParams()
    const [loading, setLoading] = useState(false)
    const { register, setValue, handleSubmit, formState: { errors } } = useForm();
    const [active, setActive] = useState(true);
    const [isPhoto, setIsPhoto] = useState(true);
    var [selectedImages, setSelectedImages] = useState([]);
    var [imageName, setImageName] = useState([]);
    var [imgFile, setImgFile] = useState([]);

    const onSelectFile = (event) => {
        const selectedFiles = event.target.files;
        const selectedFilesArray = Array.from(selectedFiles);

        const imagesArray = selectedFilesArray.map((file) => {

            return URL.createObjectURL(file);
        });
        const imagesArray2 = selectedFilesArray.map((file) => {

            return file.name;
        });
        const imagesArray3 = selectedFilesArray.map((file) => {

            return file;
        });

        setSelectedImages((previousImages) => {
            return previousImages.concat(imagesArray)

        });
        setImageName((previousImages) => {
            return previousImages.concat(imagesArray2)

        });
        setImgFile((previousImages) => {
            return previousImages.concat(imagesArray3)

        });

        // FOR BUG IN CHROME
        event.target.value = "";


    };

    function deleteHandler(image) { //deleting images from selectedImages array
        setSelectedImages(selectedImages.filter((e) => e !== image));
        URL.revokeObjectURL(image);
    }

    const blinkHandler = (p) => {
        setActive(p);

    }
    const blinkHandler2 = (p) => {
        setTimeout(() => {
            setActive(p);
            setIsPhoto(p)
        }, 1000);
    }
    const photoHandler = (q) => {
        setIsPhoto(q);
    }
    const resetValue = () => {
        setSelectedImages([]);
        setImageName([]);
        setImgFile([]);
        setValue("name", "");





    }

    const handlePost = async (data, e) => {
        if (data.name === '' && selectedImages.length === 0) {
            toast.error('Please write something or add an image', {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            })
            return;

        }

        console.log(data.name);
        console.log(selectedImages)
        const formData = new FormData();
        imgFile.forEach((file, i) => {
            formData.append("image", file, file.name);
        });
        formData.append("content", data.name);
        setLoading(true)
        try {

            const res = await fetch(`${API_URL}/api/v1/post/createPost?communityId=${params.id}`, {
                method: "POST",
                headers: {
                    'Authorization': `bearer ${localStorage.getItem('token')}`
                },
                body: formData
            })
            const x = await res.json()
            setLoading(false);
            refetch()
            e.target.reset();
            selectedImages.length = 0;
            imgFile.length = 0;
            resetValue();
            (document.getElementById("my-modal")).checked = false;

        }
        catch (error) {
            console.log(error)
            setLoading(false)
            e.target.reset();
            selectedImages.length = 0;
            imgFile.length = 0;
            (document.getElementById("my-modal")).checked = false;

        }


    }

    return (
        <div>
            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <form onSubmit={handleSubmit(handlePost)}>
                        <div className='flex items-center'>
                            <div className="w-14 mr-4">

                                <img src={`${API_URL}/${user.profilePicture}`} alt='User' className='rounded-full shadow-md' />

                            </div>
                            <div>
                                <h1 className='text-xl'>Write Something</h1>
                            </div>
                        </div>
                        <div>
                            <div>
                                <hr className='h-[1px] bg-slate-300 shadow-lg my-5'></hr>
                            </div>


                            <div className='cursor'>
                                <textarea type="textarea" {...register("name")} 
                                className="textarea textarea-ghost resize-none w-full area rq-form-element text-lg" rows='8' placeholder="Write from here" onClick={() => blinkHandler(false)}></textarea>
                                <i className={`${active ? 'block' : 'invisible'}`}></i>
                            </div>
                            <div className={`flex flex-col justify-center ${isPhoto ? 'block' : 'invisible'}`} >
                                <label className='input-field-label'>
                                    + Add Images
                                    <br />
                                    <span>up to 10 images</span>
                                    <input
                                        className='photo-input'
                                        type="file"
                                        multiple
                                        accept="image/png , image/jpeg, image/webp"
                                        onChange={onSelectFile}

                                    />
                                </label>
                                <br />

                                <input type="file" className='photo-input' multiple />

                                {selectedImages.length > 0 &&
                                    (selectedImages.length > 10 ? (
                                        <p className="error">
                                            You can't upload more than 10 images! <br />
                                            <span>
                                                please delete <b> {selectedImages.length - 10} </b> of them{" "}
                                            </span>
                                        </p>
                                    ) : (
                                        <button
                                            className="upload-btn"
                                            onClick={() => {
                                                console.log(selectedImages);
                                            }}
                                        >
                                            UPLOAD {selectedImages.length} IMAGE
                                            {selectedImages.length === 1 ? "" : "S"}
                                        </button>
                                    ))}

                                <div className="images">
                                    {selectedImages &&
                                        selectedImages.map((image, index) => {
                                            return (
                                                <div key={image} className="image">
                                                    <img src={image} height="200" alt="upload" className='photo-img' />
                                                    <button onClick={() => deleteHandler(image)}>
                                                        delete image
                                                    </button>
                                                    <p>{index + 1}</p>
                                                </div>
                                            );
                                        })}
                                </div>
                                <button onClick={() => photoHandler(false)} className={`btn bg-red-600 hover:bg-red-700 w-1/5 mx-auto ${selectedImages.length === 0 ? 'block' : 'invisible'}`}>Remove</button>
                            </div>

                        </div>
                        <div className="modal-action flex items-center">


                            <label><input className="btn btn-accent mr-3" value={loading ? "Posting..." : "Post"} disabled={loading}
                                type="submit" /></label>

                            <label htmlFor="my-modal" className="btn" onClick={() => blinkHandler2(true)}>Cancel</label>
                        </div>
                    </form>
                </div>
            </div>

        </div>

    );
};

export default CommunityPost;