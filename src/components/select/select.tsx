
import { ArrowDropDown } from '@mui/icons-material';
import { InputWrapper } from '../input-text/input.styled';
import { useState } from 'react';

interface optionsProp{
  label:string,
  value:string
}
interface selectProps{
  name:string,
  options:optionsProp[],
  label:string,
  setFieldValue:any,
  errorValue:string|undefined|boolean,
  className:string
  


}


const Select = (props:selectProps) => {
    const {name,options,label,setFieldValue,errorValue,className}=props;
    const [open,setOpen]=useState(false)
    const [initialValue,setinitialValue]=useState("Select")
    
    
  return (
   <InputWrapper>
   <label htmlFor={name} >{label}</label>
   <div className={className+' selectDiv'} onClick={()=>{setOpen(prev=>!prev)}}>
   <label className='' htmlFor={name}>{initialValue}</label>
    <ArrowDropDown/>
   
   </div>
   {/* <Field name={name} as='select' className='field-select' > */}
   {open &&  <ul className={className+ ' selectUl'}>
    
    {options.map((option:any)=>
    
    <>
 
    <li onClick={()=>{
        setFieldValue(name,option.value)
        setinitialValue(option.label)
        setOpen(false)
        }} className='px-2 py-1 hover:bg-gray-200 cursor-pointer'>{option.label}</li>
    
    </>)}
 
    </ul>}
    {errorValue && <div className='text-red-400'>{errorValue}</div>}
  

   
   {/* </Field> */}
   
   {/* <ErrorMessage name={name} className='error-message' component='div'/> */}
   
   </InputWrapper>
  )
}

export default Select