import React from 'react';
import Loading from '../assets/Spin@1x-1.0s-200px-200px.gif';

function Spinner() {
    return (
        <div className='w-full h-full flex justify-center items-center'>
            <img src={Loading} alt="spinner" className='w-10' />
        </div>
    )
}

export default Spinner