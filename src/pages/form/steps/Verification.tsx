import { useFormContext } from "../FormContext";

export default function Verification() {
  const { formData } = useFormContext();
  console.log(formData);

  return <>verifi</>;
}
