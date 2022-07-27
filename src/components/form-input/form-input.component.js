import './form-input.styles.scss'

//here we are using label separately that is why we are passing the label property
//separately, and the other prperties we dont use, so we are passing it together.
const FormInput = ({ label, ...otherProps }) => {
    return (
        <div className='group'>
            <input className='form-input' {...otherProps} />
            {label && (
                <label className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`}>{label} </label>
            )}
        </div>
    )
}
export default FormInput;