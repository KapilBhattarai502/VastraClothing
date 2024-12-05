import {  useField } from 'formik'
import { InputWrapper } from './input.styled'





const InputText = ({label,...props}:any) => {
    const [field,meta] = useField(props);
   
   
  return (
 
<>

<InputWrapper>
<label htmlFor={props.name} className='label'>{label}</label>
<input {...field} {...props} className='feild' type={props.type}/>
{meta.error && meta.touched && <div className='text-red-400'>{meta.error}</div>}
{/* <ErrorMessage name={name} component='div' className='error-message' /> */}
</InputWrapper>

</>

  )
}

export default InputText