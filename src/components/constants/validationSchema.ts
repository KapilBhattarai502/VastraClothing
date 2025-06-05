import * as Yup from "yup";

export const productDetailsvalidationSchema = Yup.object().shape({
  size: Yup.string().when('$isClothes', (isClothes, schema) =>
    isClothes
      ? schema.required("Size is required for clothes")
      : schema.notRequired()
  ),
});
