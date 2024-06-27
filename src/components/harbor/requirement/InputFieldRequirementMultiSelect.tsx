import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import { useField } from 'formik';
import React from 'react';
import AddRequirementModal from './AddRequirementModal';
import RequirementMultiSelectBase from './RequirementMultiSelectBase';
import { RequirementType } from '../../../types/requirementSC';

interface InputFieldRequirementMultiSelectProps {
  name: string;
  label: string;
  placeholder: string;
  setRequirements?: (requirements: Partial<RequirementType>[]) => void;
}

const InputFieldRequirementMultiSelect: React.FC<
  InputFieldRequirementMultiSelectProps
> = ({ name, label, placeholder, setRequirements }) => {
  const [field, meta, helpers] = useField(name);

  return (
    <FormControl id={name} isInvalid={!!meta.error && meta.touched}>
      <FormLabel fontSize='sm' mb='8px'>
        {label} <AddRequirementModal />
      </FormLabel>

      <RequirementMultiSelectBase
        name={name}
        placeholder={placeholder}
        onChange={(newValues) =>
          helpers.setValue(
            newValues.map((item: Partial<RequirementType>) => item.id)
          )
        }
        field={field}
        setRequirements={setRequirements}
      />

      {meta.error && meta.touched && (
        <FormErrorMessage mt='8px' mb='16px'>
          {meta.error}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export default InputFieldRequirementMultiSelect;
