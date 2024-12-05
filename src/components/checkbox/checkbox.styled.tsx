
import styled from 'styled-components';
export const CheckboxWrapper=styled.div`
    display: flex;
    align-items: center;
    gap: 2px;
    margin-top: 0.5rem;
    .checkbox-field {
    width: 20px;
    height: 20px;
    border: 2px solid #ccc;
    border-radius: 4px;
    appearance: none; /* Remove default checkbox styling */
    margin-right: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease, border-color 0.3s ease;
  }
  .checkbox-label{
    font-size:1rem;
   font-weight:400;
  }
  

  /* When the checkbox is checked, change the background color */
  .checkbox-field:checked {
    background-color: white;
    position: relative;
    color: #ccc;
  }
  .checkbox-field:checked::after {
    content: "✔"; /* Unicode for the checkmark */
    position: absolute;
    top: 0px;
    left: 1px;
    font-size: 10px;
    color: #077031; 
  }


`