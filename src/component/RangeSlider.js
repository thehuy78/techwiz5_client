import React, { useState } from 'react';
import { Range, getTrackBackground } from 'react-range';

const RangeSlider = ({ min, max, step, onChange }) => {
    const [values, setValues] = useState([min, max]);

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                margin: '2em 0'
            }}
        >
            <Range
                values={values}
                step={step}
                min={min}
                max={max}
                onChange={(values) => {
                    setValues(values);
                    onChange(values);
                }}
                renderTrack={({ props, children }) => (
                    <div
                        key={2}
                        {...props}
                        style={{
                            ...props.style,
                            height: '6px',
                            width: '100%',
                            background: getTrackBackground({
                                values,
                                colors: ['var(--cl_primary)', 'white', 'var(--cl_primary)'],
                                min: min,
                                max: max,
                            }),
                        }}
                    >
                        {children}
                    </div>
                )}
                renderThumb={({ props }) => (
                    <div
                        key={1}
                        {...props}
                        style={{
                            ...props.style,
                            height: '1rem',
                            width: '0.4rem',
                            outline: "none",
                            border: "none",
                            backgroundColor: 'orange',

                        }}
                    />
                )}
            />
            <output style={{ marginTop: '20px' }}>From: {values[0]}</output>
            <output style={{ marginTop: '20px', marginLeft: '10px' }}>To: {values[1]}</output>
        </div>
    );
};

export default RangeSlider;
