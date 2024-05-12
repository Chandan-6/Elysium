import { Checkbox } from "@material-tailwind/react";
 
export default function Checkboxinput(props) {
  return (
      <Checkbox required onClick={(e) => {
        console.log(e.target.checked);
        props.onSelect(e,props.id)}} label={props.label} className={`${props.MARGINLeft && "ml-4"}`} />
    )  
}