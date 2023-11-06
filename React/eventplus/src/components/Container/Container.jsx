import React, { Children } from 'react';
import './Container'

const Container = ( {children} ) => {
    return (
        <div className='container'>
            {children}
        </div>
    );
};

export default Container;