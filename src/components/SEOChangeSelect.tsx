import React, {ChangeEventHandler} from 'react';
import {FormSelect, FormSelectProps} from "react-bootstrap";

const SEOChangeSelect = ({value, onChange, ...rest}: FormSelectProps) => {
    return (
        <FormSelect size="sm" value={value || ''} onChange={onChange} required={true} {...rest}>
            <option>Select One</option>
            <option value="n/a">Not Published</option>
            <option value="always">always</option>
            <option value="hourly">hourly</option>
            <option value="daily">daily</option>
            <option value="weekly">weekly</option>
            <option value="monthly">monthly</option>
            <option value="yearly">yearly</option>
            <option value="never">never</option>
        </FormSelect>
    )
};

export default SEOChangeSelect;
