import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import { useField } from 'formik';
import React from 'react';
import ExportSelectBase from './ExportSelectBase';
import { ExportType } from '../../types/export';

interface InputFieldExportSelectProps {
  name: string;
  label: string;
  placeholder: string;
  setExport?: (exportSelected: Partial<ExportType>) => void;
}

const InputFieldExportSelect: React.FC<InputFieldExportSelectProps> = ({
  name,
  label,
  placeholder,
  setExport,
}) => {
  const [field, meta, helpers] = useField(name);

  return (
    <FormControl id={name} isInvalid={!!meta.error && meta.touched}>
      <FormLabel fontSize='sm' mb='8px'>
        {label}
      </FormLabel>

      <ExportSelectBase
        name={name}
        placeholder={placeholder}
        onChange={(newValue) => helpers.setValue(newValue?.id)}
        field={field}
        setExport={setExport}
      />

      {meta.error && meta.touched && (
        <FormErrorMessage mt='8px' mb='16px'>
          {meta.error}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export default InputFieldExportSelect;
