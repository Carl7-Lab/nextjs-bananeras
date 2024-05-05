import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
} from '@chakra-ui/react';
import { useField } from 'formik';

interface OptionsProps {
  name: string;
  id: number | string;
}

interface InputFieldSelectorProps {
  name: string;
  label: string;
  options: OptionsProps[];
}

const InputFieldSelector: React.FC<InputFieldSelectorProps> = ({
  name,
  label,
  options,
}) => {
  const [field, meta, helpers] = useField(name);
  return (
    <FormControl id={name} isInvalid={!!meta.error && meta.touched}>
      <FormLabel fontSize='sm' mb='8px'>
        {label}
      </FormLabel>
      <Select {...field}>
        <option value=''>-- Seleccione {label} --</option>
        {options.map((option, index) => (
          <option key={index} value={option.id}>
            {option.name}
          </option>
        ))}
      </Select>
      {meta.error && meta.touched && (
        <FormErrorMessage mt='8px' mb='16px'>
          {meta.error}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export default InputFieldSelector;
