import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
} from '@chakra-ui/react';
import { useField } from 'formik';

interface InputFieldProps {
  name: string;
  label?: string;
  placeholder?: string;
}

const InputFieldText: React.FC<InputFieldProps> = ({
  name,
  label,
  placeholder,
}) => {
  const [field, meta] = useField(name);
  return (
    <FormControl id={name} isInvalid={!!meta.error && meta.touched}>
      {label && (
        <FormLabel fontSize='sm' mb='8px'>
          {label}
        </FormLabel>
      )}
      <Input {...field} placeholder={placeholder || label} />
      {meta.error && meta.touched && (
        <FormErrorMessage mt='8px' mb='16px'>
          {meta.error}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export default InputFieldText;
