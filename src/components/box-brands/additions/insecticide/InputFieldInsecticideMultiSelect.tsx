import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import { useField } from 'formik';
import React from 'react';
import AddInsecticideModal from './AddInsecticideModal';
import InsecticideMultiSelectBase from './InsecticideMultiSelectBase';
import { InsecticideType } from '../../../../types/box-brand/additions/insecticide';

interface InputFieldInsecticideMultiSelectProps {
  name: string;
  label: string;
  placeholder: string;
  setInsecticides?: (pesticides: Partial<InsecticideType>[]) => void;
}

const InputFieldInsecticideMultiSelect: React.FC<
  InputFieldInsecticideMultiSelectProps
> = ({ name, label, placeholder, setInsecticides }) => {
  const [field, meta, helpers] = useField(name);

  return (
    <FormControl id={name} isInvalid={!!meta.error && meta.touched}>
      <FormLabel fontSize='sm' mb='8px' h={'21px'}>
        {label} <AddInsecticideModal />
      </FormLabel>

      <InsecticideMultiSelectBase
        name={name}
        placeholder={placeholder}
        onChange={(newValues) =>
          helpers.setValue(
            newValues.map((item: Partial<InsecticideType>) => item.id)
          )
        }
        field={field}
      />

      {meta.error && meta.touched && (
        <FormErrorMessage mt='8px' mb='16px'>
          {meta.error}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export default InputFieldInsecticideMultiSelect;
