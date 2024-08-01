import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import { useField } from 'formik';
import React from 'react';
import AddHarborModal from './AddHarborModal';
import HarborMultiSelectBase from './HarborMultiSelectBase';
import { HarborType } from '../../types/harbor';

interface InputFieldHarborMultiSelectProps {
  name: string;
  label: string;
  placeholder: string;
  type: 'Nacional' | 'Internacional';
  setHarbors?: (harbors: Partial<HarborType>[]) => void;
}

const InputFieldHarborMultiSelect: React.FC<
  InputFieldHarborMultiSelectProps
> = ({ name, label, placeholder, type, setHarbors }) => {
  const [field, meta, helpers] = useField(name);

  return (
    <FormControl id={name} isInvalid={!!meta.error && meta.touched}>
      <FormLabel fontSize='sm' mb='8px'>
        {label}
        {/* <AddHarborModal /> */}
      </FormLabel>

      <HarborMultiSelectBase
        name={name}
        placeholder={placeholder}
        onChange={(newValues) =>
          helpers.setValue(
            newValues.map((item: Partial<HarborType>) => item.id)
          )
        }
        field={field}
        setHarbors={setHarbors}
        type={type}
      />

      {meta.error && meta.touched && (
        <FormErrorMessage mt='8px' mb='16px'>
          {meta.error}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export default InputFieldHarborMultiSelect;
