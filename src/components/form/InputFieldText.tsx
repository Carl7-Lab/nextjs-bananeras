import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
} from '@chakra-ui/react';
import { useField } from 'formik';

interface InputFieldProps {
  name: string;
  label: string;
}

export const InputFieldText: React.FC<InputFieldProps> = ({ name, label }) => {
  const [field, meta] = useField(name);
  return (
    <FormControl id={name} isInvalid={!!meta.error && meta.touched}>
      <FormLabel fontSize='sm' mb='8px'>
        {label}
      </FormLabel>
      <Input {...field} placeholder={label} />
      {meta.error && meta.touched && (
        <FormErrorMessage mt='8px' mb='16px'>
          {meta.error}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};
