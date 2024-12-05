import * as Yup from 'yup';

export const productDetailsvalidationSchema = Yup.object().shape({
    size: Yup.string()
      .oneOf(['S', 'M', 'L'], 'Size must be one of: small, medium, or large')
      .required('Size is required'),
  });