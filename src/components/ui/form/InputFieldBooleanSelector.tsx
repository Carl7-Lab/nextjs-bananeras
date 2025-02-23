import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
} from '@chakra-ui/react';
import { useField } from 'formik';

interface InputFieldBooleanSelectorProps {
  name: string;
  label: string;
  placeholder?: string;
}

const options = [
  { value: 'true', label: 'Sí' },
  { value: 'false', label: 'No' },
];

const InputFieldBooleanSelector: React.FC<InputFieldBooleanSelectorProps> = ({
  name,
  label,
  placeholder,
}) => {
  const [field, meta, helpers] = useField(name);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const value = event.target.value;
    const boolValue = value === 'true';
    helpers.setValue(boolValue);
  };

  return (
    <FormControl id={name} isInvalid={!!meta.error && meta.touched}>
      <FormLabel fontSize='sm' mb='8px'>
        {label}
      </FormLabel>
      <Select {...field} onChange={handleChange}>
        {!!placeholder ? (
          <option value={''}>{placeholder}</option>
        ) : (
          <option value={''}>{label}</option>
        )}
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
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

export default InputFieldBooleanSelector;
