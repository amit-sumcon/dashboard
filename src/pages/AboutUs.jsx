import React, { useState, useEffect } from 'react';
import useFetch from '../hooks/useFetch';
import axios from 'axios';
import Spinner from '../components/Spinner';

const initial_values = {
    title: "",
    sub_title: "",
    points: [],
    about_image: null,
    cover_image: null,
    has_cta: true,
    cta_text: ""
}

const url = 'http://localhost:7070/api/v1/aboutus'

function AboutUs() {
    const [image, setImage] = useState({
        about_image: "",
        cover_image: ""
    });

    const [preview, setPreview] = useState({
        about_image: "",
        cover_image: ""
    });

    const [aboutUsData, setAboutUsData] = useState(initial_values);
    const [point, setPoint] = useState('');

    const [err, setErr] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const { data, loading, error } = useFetch(url);

    useEffect(() => {
        if (data) {
            delete data.id;
            delete data.updatedAt;
            setAboutUsData(data);
            if (data.about_image) {
                setImage(prev => ({ ...prev, about_image: data.about_image }));
                setPreview(prev => ({ ...prev, about_image: data.about_image }));
            }
            if (data.cover_image) {
                setImage(prev => ({ ...prev, cover_image: data.cover_image }));
                setPreview(prev => ({ ...prev, cover_image: data.cover_image }));
            }
        }
    }, [data]);

    const onSelectFile = (e) => {
        const file = e.target.files?.[0];
        const fileType = e.target.name;

        if (!file) {
            setImage(prev => ({ ...prev, [fileType]: undefined }));
            return;
        }

        setAboutUsData(prevData => ({
            ...prevData,
            [fileType]: file
        }));

        setImage(prev => ({ ...prev, [fileType]: file }));

        // Create object URLs
        if (fileType === "cover_image") {
            const coverObjectUrl = URL.createObjectURL(file); // Pass 'file' instead of 'image.cover_image'
            setPreview(prev => ({ ...prev, cover_image: coverObjectUrl }));
            // URL.revokeObjectURL(preview.cover_image);
        }
        if (fileType === "about_image") {
            const aboutObjectUrl = URL.createObjectURL(file); // Pass 'file' instead of 'image.about_image'
            setPreview(prev => ({ ...prev, about_image: aboutObjectUrl }));
            // URL.revokeObjectURL(preview.about_image);
        }
    };

    const handleOnChange = (e) => {
        e.preventDefault();
        setAboutUsData({
            ...aboutUsData,
            [e.target.name]: e.target.value,
        });
    };

    const handleCheckboxChange = (e) => {
        setAboutUsData(prevData => ({
            ...prevData,
            has_cta: e.target.checked,
        }));
    };

    const addServicePointForEditForm = () => {
        if (point.trim() !== '') {
            setAboutUsData(prev => ({
                ...prev,
                points: [...prev.points, point.trim()],
            }));
            setPoint('');
        }
    };

    const handleServicePointsChange = (e) => {
        setPoint(e.target.value);
    };

    const removePoint = (index) => {
        setAboutUsData(prev => ({
            ...prev,
            points: [
                ...prev.points.slice(0, index),
                ...prev.points.slice(index + 1),
            ],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log(aboutUsData);
            setIsLoading(true);
            const res = await axios.put(url, aboutUsData);
            console.log(res);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setErr(error);
            setIsLoading(false);
        }
    };

    if (loading) {
        return (
            <div className='w-full h-screen'>
                <Spinner />
            </div>
        )
    }

    if (error || err) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='w-full flex justify-center'>
            <div className='w-full py-5 bg-white text-gray-500 border shadow-md rounded-md'>
                <div className='w-full flex justify-start p-3 pt-0'>
                    <span className='text-xl lg:text-3xl font-medium text-black'>Edit About Us Section</span>
                </div>
                <div className='w-full px-3'>
                    <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
                        {/* Title */}
                        <div className="flex flex-col gap-1">
                            <label htmlFor="title" className="font-medium text-gray-700">Title</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                placeholder="Enter your title"
                                value={aboutUsData.title}
                                onChange={handleOnChange}
                                className="py-2 pl-2 border rounded-md border-gray-500 outline-none text-black placeholder:text-gray-500 focus:ring focus:ring-sky-900"
                            />
                        </div>

                        {/* Sub Title */}
                        <div className="flex flex-col gap-1">
                            <label htmlFor="sub_title" className="font-medium text-gray-700">Sub Title</label>
                            <input
                                type="text"
                                id="sub_title"
                                name="sub_title"
                                value={aboutUsData.sub_title}
                                onChange={handleOnChange}
                                placeholder="Enter your sub title"
                                className="py-2 pl-2 border rounded-md border-gray-500 outline-none text-black placeholder:text-gray-500 focus:ring focus:ring-sky-900"
                            />
                        </div>

                        {/* Service Points */}
                        <div className="flex flex-col gap-1">
                            <label htmlFor="points" className="font-medium text-gray-700 dark:text-gray-300">Service Points</label>
                            <div className='w-full flex gap-2'>
                                <input
                                    type="text"
                                    id="points"
                                    name="points"
                                    placeholder="Enter your service points"
                                    value={point}
                                    onChange={handleServicePointsChange}
                                    className="w-full py-2 pl-2 border rounded-md border-gray-500 outline-none text-black placeholder:text-gray-500 focus:ring focus:ring-sky-900"
                                />
                                <button type='button' className='px-5 py-2 rounded-md grid place-items-center bg-blue-400 text-white hover:bg-blue-500' onClick={addServicePointForEditForm}>Add</button>
                            </div>
                            {
                                aboutUsData.points.length > 0 &&
                                <div className='flex flex-wrap gap-2 mt-3 border border-gray-500 rounded-md px-3 py-3'>
                                    {aboutUsData.points.map((e, i) => (
                                        <span key={i} className='w-fit flex items-center justify-between'>
                                            <span>{e}</span>
                                            <i className='bx bx-x text-2xl cursor-pointer' onClick={() => removePoint(i)}></i>
                                        </span>
                                    ))}
                                </div>
                            }
                        </div>

                        {/* Cover Image */}
                        <div className="w-full flex flex-col gap-3 border border-black rounded-md p-2">
                            <span className='text-gray-700 font-medium'>Cover Image</span>
                            <label className="border border-gray-300 p-2 rounded-md cursor-pointer">
                                <input
                                    type="file"
                                    name="cover_image"
                                    id="cover_image"
                                    accept=".jpg, .jpeg, .png, .webp"
                                    onChange={onSelectFile}
                                />
                            </label>
                            <div className="w-full h-66 md:h-80 border rounded-md flex items-center justify-center bg-gray-100">
                                {
                                    !image.cover_image
                                        ? <span className="text-gray-500">Preview here</span>
                                        : <img src={preview.cover_image} alt="preview" className='w-full h-full rounded-md' />
                                }
                            </div>
                        </div>

                        {/* About Image */}
                        <div className="w-full flex flex-col gap-3 border border-black rounded-md p-2">
                            <span className='text-gray-700 font-medium'>About Image</span>
                            <label className="border border-gray-300 p-2 rounded-md cursor-pointer">
                                <input
                                    type="file"
                                    name="about_image"
                                    id="about_image"
                                    accept=".jpg, .jpeg, .png, .webp"
                                    onChange={onSelectFile}
                                />
                            </label>
                            <div className="w-full h-66 md:h-80 border rounded-md flex items-center justify-center bg-gray-100">
                                {
                                    !image.about_image
                                        ? <span className="text-gray-500">Preview here</span>
                                        : <img src={preview.about_image} alt="preview" className='w-full h-full rounded-md' />
                                }
                            </div>
                        </div>

                        {/* CTA Checkbox */}
                        <div className='flex items-center gap-2'>
                            <input
                                type="checkbox"
                                id='cta'
                                name='cta'
                                className="text-sm font-medium text-gray-900"
                                checked={aboutUsData.has_cta}
                                onChange={handleCheckboxChange}
                            />
                            <label htmlFor="cta" className="cursor-pointer select-none">Show CTA button</label>
                        </div>

                        {/* CTA Text Input */}
                        {aboutUsData.has_cta &&
                            <div className="flex flex-col gap-1">
                                <label htmlFor="cta_text" className="font-medium text-gray-700">CTA Text</label>
                                <input
                                    type="text"
                                    id="cta_text"
                                    name="cta_text"
                                    placeholder="Enter your CTA text"
                                    value={aboutUsData.cta_text}
                                    onChange={handleOnChange}
                                    className="py-2 pl-2 border rounded-md border-gray-500 outline-none text-black placeholder:text-gray-500 focus:ring focus:ring-sky-900"
                                />
                            </div>
                        }

                        {/* Update Button */}
                        <div className='flex items-center gap-2'>
                            <button className='w-24 h-10 border border-gray-600 rounded cursor-pointer hover:bg-blue-500 hover:text-white hover:border-none'>Update</button>
                            <div className={`${!isLoading && 'hidden'}`}>
                                <Spinner />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;