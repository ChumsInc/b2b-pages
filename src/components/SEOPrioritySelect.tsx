import React, {ChangeEventHandler} from 'react';

const SEOPrioritySelect = ({value, onChange}: {
    value: number | undefined | null;
    onChange: ChangeEventHandler<HTMLSelectElement>
}) => {
    return (
        <select className="form-select form-select-sm" value={value ?? 0} onChange={onChange} required={true}>
            <option value="">Select One</option>
            <option value={0.0}>0.0</option>
            <option value={0.1}>0.1</option>
            <option value={0.2}>0.2</option>
            <option value={0.3}>0.3</option>
            <option value={0.4}>0.4</option>
            <option value={0.5}>0.5</option>
            <option value={0.6}>0.6</option>
            <option value={0.7}>0.7</option>
            <option value={0.8}>0.8</option>
            <option value={0.9}>0.9</option>
            <option value={1.0}>1.0</option>
        </select>
    )
};

export default SEOPrioritySelect;
