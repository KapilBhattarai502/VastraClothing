import styled from 'styled-components';

export const InputWrapper = styled.div`
margin-top:0.5rem;

.label{
font-size:1rem;
font-weight:400;
}
.feild{
width:100%;
padding: 0.6rem 0.7rem 0.6rem 0.7rem;
border:1.5px solid;
border-radius:5px;
outline: none;

}
.feild:hover{
    border:1.5px solid #9694FF;
}
.error-message{
    color: #FF2929;
}
.field-select {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.option-feild{
    font-size: 1rem;
    background-color: #f3a8f2;
    color: red;
}
select.decorated option:hover {
    box-shadow: 0 0 10px 100px #333 inset;
}
/* border border-slate-500 py-2 px-5 rounded-md flex justify-between max-w-[200px] */
.selectDiv{
    
    border:1px solid #64748B;
    padding: 0.6rem 0.8rem;
    display: flex;
    justify-content: space-between;
    border-radius: 5px;

}
.selectDiv:hover{
    border:1.5px solid #9694FF;
}
/* mt-2  py-4 px-2 rounded-md border border-slate-300 */
.selectUl{
    margin-top: 6px;
    border:1px solid #64748B;
    padding: o.6rem 0.5rem;
    border-radius: 5px;

}




`

// w-full py-2 px-3 border border-slate-500 rounded-md outline-none