import React, { useState, useEffect } from 'react';

function AboutUs() {
    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState();
    const [data, setData] = useState({
        title: "",
        sub_title: "",
        description: "",
        image: {},
        isCTAOn: true
    })

    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const onSelectFile = e => {
        const file = e.target.files?.[0];
        if (!file) {
            setSelectedFile(undefined)
            return
        }
        console.log();

        setData((prevData) => ({
            ...prevData,
            image: file
        }));

        setSelectedFile(e.target.files[0])
    }

    const handleOnChange = (e) => {
        e.preventDefault();

        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(data);
    }

    const handleCheckboxChange = (e) => {
        setData((prevData) => ({
            ...prevData,
            isCTAOn: e.target.checked,
        }));
    };
    return (
        <div className='w-full flex justify-center'>
            <div className='w-full py-5 bg-white text-gray-500 border shadow-md rounded-md'>
                <div className='w-full flex justify-start p-3 pt-0'>
                    <span className='text-xl lg:text-3xl font-medium text-black'>Edit About Us Section</span>
                </div>
                <div className='w-full px-3'>
                    <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="title" className="font-medium text-gray-700">
                                Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                placeholder="Enter your title"
                                value={data.title}
                                onChange={handleOnChange}
                                className="py-2 pl-2 border rounded-md border-gray-500 outline-none text-black placeholder:text-gray-500 focus:ring focus:ring-indigo-500"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="sub_title" className="font-medium text-gray-700">
                                Sub Title
                            </label>
                            <input
                                type="text"
                                id="sub_title"
                                name="sub_title"
                                value={data.sub_title}
                                onChange={handleOnChange}
                                placeholder="Enter your sub title"
                                className="py-2 pl-2 border rounded-md border-gray-500 outline-none text-black placeholder:text-gray-500 focus:ring focus:ring-indigo-500"
                            />
                        </div>

                        <div className='flex flex-col gap-1'>
                            <label htmlFor="title" className="font-medium text-gray-700">
                                Description
                            </label>
                            <textarea
                                name="description"
                                id="description"
                                cols="30"
                                rows="10"
                                value={data.description}
                                onChange={handleOnChange}
                                className='resize-none outline-none rounded-md text-black border border-gray-500 pl-2 pt-2 placeholder:text-gray-500 focus:ring focus:ring-indigo-500'
                                placeholder='Description'
                            ></textarea>
                        </div>
                        <div className="w-full flex flex-col gap-3">
                            <label className="border border-gray-300 p-2 rounded-md cursor-pointer">
                                <input
                                    type="file"
                                    name="image"
                                    id="image"
                                    accept=".jpg, .jpeg, .png, .webp"
                                    onChange={onSelectFile}
                                />
                            </label>
                            <div className="w-full h-66 md:h-80 border rounded-md flex items-center justify-center bg-gray-100">
                                {
                                    !selectedFile
                                        ? <span className="text-gray-500">Preview here</span>
                                        : <img src={preview} alt="preview" className='w-full h-full rounded-md' />
                                }
                            </div>
                        </div>

                        <div className='flex items-center gap-2'>
                            <input
                                type="checkbox"
                                id='cta'
                                name='cta'
                                className="text-sm font-medium text-gray-900"
                                checked={data.isCTAOn}
                                onChange={handleCheckboxChange}
                            />
                            <label htmlFor="cta" className="cursor-pointer select-none">
                                Show CTA button
                            </label>
                        </div>
                        {
                            data.isCTAOn
                                ? <div className="flex flex-col gap-1">
                                    <label htmlFor="CTA_text" className="font-medium text-gray-700">
                                        CTA Text
                                    </label>
                                    <input
                                        type="text"
                                        id="CTA_text"
                                        name="CTA_text"
                                        placeholder="Enter your CTA text"
                                        value={data.CTA_text}
                                        onChange={handleOnChange}
                                        className="py-2 pl-2 border rounded-md border-gray-500 outline-none text-black placeholder:text-gray-500 focus:ring focus:ring-indigo-500"
                                    />
                                </div>
                                : null
                        }
                        <button className='w-24 h-10 border border-gray-600 rounded cursor-pointer hover:bg-blue-500 hover:text-white hover:border-none'>Update</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;