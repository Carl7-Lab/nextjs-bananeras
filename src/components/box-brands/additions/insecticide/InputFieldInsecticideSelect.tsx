import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import { useField } from 'formik';
import React from 'react';
import AddInsecticideModal from './AddInsecticideModal';
import InsecticideSelectBase from './InsecticideSelectBase';
import { InsecticideType } from '../../../../types/box-brand/additions/insecticide';

interface InputFieldInsecticideSelectProps {
  name: string;
  label: string;
  placeholder: string;
  setInsecticide?: (insecticide: Partial<InsecticideType>) => void;
}

const InputFieldInsecticideSelect: React.FC<
  InputFieldInsecticideSelectProps
> = ({ name, label, placeholder, setInsecticide }) => {
  const [field, meta, helpers] = useField(name);

  return (
    <FormControl id={name} isInvalid={!!meta.error && meta.touched}>
      <FormLabel fontSize='sm' mb='8px' h={'21px'}>
        {label} <AddInsecticideModal />
      </FormLabel>

      <InsecticideSelectBase
        name={name}
        placeholder={placeholder}
        onChange={(newValue) => helpers.setValue(newValue?.id)}
        field={field}
        setInsecticide={setInsecticide}
      />

      {meta.error && meta.touched && (
        <FormErrorMessage mt='8px' mb='16px'>
          {meta.error}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export default InputFieldInsecticideSelect;
