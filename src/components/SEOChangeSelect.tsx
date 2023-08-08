import React, {ChangeEventHandler} from 'react';

const SEOChangeSelect = ({value, onChange}: {
    value: string | null | undefined;
    onChange: ChangeEventHandler<HTMLSelectElement>;
}) => {
    return (
        <select className="form-select form-select-sm" value={value || ''} onChange={onChange} required={true}>
            <option>Select One</option>
            <option value="n/a">Not Published</option>
            <option value="always">always</option>
            <option value="hourly">hourly</option>
            <option value="daily">daily</option>
            <option value="weekly">weekly</option>
            <option value="monthly">monthly</option>
            <option value="yearly">yearly</option>
            <option value="never">never</option>
        </select>
    )
};

export default SEOChangeSelect;
