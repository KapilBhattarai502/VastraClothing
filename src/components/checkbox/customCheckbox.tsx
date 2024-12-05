
import { Field } from "formik";
import { CheckboxWrapper } from "./checkbox.styled";

const Customcheckbox = (props: any) => {
  const { name, label } = props;
  return (
    <CheckboxWrapper>
        <Field
        type="checkbox"
        name={name}
        value={label}
        className="checkbox-field"
      />
      <label className="checkbox-label">{label}</label>
     
    </CheckboxWrapper>
  );
};

export default Customcheckbox;
