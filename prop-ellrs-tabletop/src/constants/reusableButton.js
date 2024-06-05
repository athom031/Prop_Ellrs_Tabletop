import React from 'react';

function ReusableButton({
    hover,
    setHover,
    isDisabled,
    onClick,
    imgPrefix,
    altText,
    label
}) {
    return (
        <div className='reusable-button'
            onMouseEnter={() => setHover(!isDisabled && true)}
            onMouseLeave={() => setHover(false)}
            disabled={isDisabled}
            onClick={onClick}
        >
            <img
                className='button-img'
                src={`${imgPrefix}${hover ? '-hover' : ''}.png`}
                alt={altText}
            />
            <h2>{label}</h2>
        </div>
    )
}

export default ReusableButton;
