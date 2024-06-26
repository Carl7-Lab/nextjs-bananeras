import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import { useField } from 'formik';
import React from 'react';
import AddCertificateModal from './AddRequiredCertificateModal';
import RequiredCertificateMultiSelectBase from './RequiredCertificateMultiSelectBase';
import { RequiredCertificateType } from '../../../../types/box-brand/specifications/requiredCertificate';

interface InputFieldRequiredCertificateMultiSelectProps {
  name: string;
  label: string;
  placeholder: string;
  setCertificates?: (certificates: Partial<RequiredCertificateType>[]) => void;
}

const InputFieldRequiredCertificateMultiSelect: React.FC<
  InputFieldRequiredCertificateMultiSelectProps
> = ({ name, label, placeholder, setCertificates }) => {
  const [field, meta, helpers] = useField(name);

  return (
    <FormControl id={name} isInvalid={!!meta.error && meta.touched}>
      <FormLabel fontSize='sm' mb='8px'>
        {label} <AddCertificateModal />
      </FormLabel>

      <RequiredCertificateMultiSelectBase
        name={name}
        placeholder={placeholder}
        onChange={(newValues) =>
          helpers.setValue(
            newValues.map((item: Partial<RequiredCertificateType>) => item.id)
          )
        }
        field={field}
        setCertificates={setCertificates}
      />

      {meta.error && meta.touched && (
        <FormErrorMessage mt='8px' mb='16px'>
          {meta.error}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export default InputFieldRequiredCertificateMultiSelect;
