import {
  Flex,
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
  isDisabled?: boolean;
  flexDirection?: 'column' | 'row';
  alignItems?: 'flex-start' | 'flex-end';
}

const InputFieldSelector: React.FC<InputFieldSelectorProps> = ({
  name,
  label,
  options,
  isDisabled,
  flexDirection = 'column',
  alignItems = 'flex-start',
}) => {
  const [field, meta, helpers] = useField(name);

  return (
    <FormControl id={name} isInvalid={!!meta.error && meta.touched}>
      <Flex flexDirection={flexDirection} alignItems={alignItems}>
        <FormLabel fontSize='sm' mb='8px'>
          {label}
        </FormLabel>
        <Select {...field} isDisabled={isDisabled}>
          <option value={!isDisabled ? '' : 'N/A'}>
            {!isDisabled ? `-- Seleccione ${label} --` : `N/A`}
          </option>
          {options.map((option, index) => (
            <option key={index} value={option.id}>
              {option.name}
            </option>
          ))}
        </Select>
      </Flex>
      {meta.error && meta.touched && (
        <FormErrorMessage mt='8px' mb='16px'>
          {meta.error}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export default InputFieldSelector;
