import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import { useField } from 'formik';
import React from 'react';
import AddCertificateModal from './AddCertificateModal';
import CertificateMultiSelectBase from './CertificateMultiSelectBase';
import { CertificateType } from '../../../../types/box-brand/specifications/certificate';

interface InputFieldCertificateMultiSelectProps {
  name: string;
  label: string;
  placeholder: string;
  setCertificates?: (certificates: Partial<CertificateType>[]) => void;
}

const InputFieldCertificateMultiSelect: React.FC<
  InputFieldCertificateMultiSelectProps
> = ({ name, label, placeholder, setCertificates }) => {
  const [field, meta, helpers] = useField(name);

  return (
    <FormControl id={name} isInvalid={!!meta.error && meta.touched}>
      <FormLabel fontSize='sm' mb='8px'>
        {label} <AddCertificateModal />
      </FormLabel>

      <CertificateMultiSelectBase
        name={name}
        placeholder={placeholder}
        onChange={(newValues) =>
          helpers.setValue(
            newValues.map((item: Partial<CertificateType>) => item.id)
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

export default InputFieldCertificateMultiSelect;
