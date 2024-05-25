import { Icon } from '@chakra-ui/react';
import {
  ChakraStylesConfig,
  DropdownIndicatorProps,
  Select as ChakraSelect,
  GroupBase,
  chakraComponents,
  MultiValue,
  CSSObjectWithLabel,
} from 'chakra-react-select';
import { FieldInputProps } from 'formik';
import React from 'react';
import { MdOutlineArrowDropDownCircle } from 'react-icons/md';
import { useCertificates } from '../../../../hooks/box-brand/specifications/certificate/getCertificates';
import { usePagination } from '../../../../hooks/usePagination';
import { CertificateType } from '../../../../types/box-brand/specifications/certificate';

interface CertificateMultiSelectBaseProps {
  name?: string;
  field?: FieldInputProps<any>;
  placeholder: string;
  setCertificates?: (certificates: Partial<CertificateType>[]) => void;
  onChange?: (newValues: Partial<CertificateType>[]) => void;
}

// const data: Partial<CertificateType>[] = [
//   {
//     id: 1,
//     name: 'Certificado1',
//     certificateCode: 'abc001',
//   },
//   {
//     id: 2,
//     name: 'Certificado2',
//     certificateCode: 'abc002',
//   },
//   {
//     id: 3,
//     name: 'Certificado3',
//     certificateCode: 'abc003',
//   },
// ];

const chakraStyles: ChakraStylesConfig<
  Partial<CertificateType>,
  true,
  GroupBase<Partial<CertificateType>>
> = {
  container: (provided) => ({
    ...provided,
    w: 'full',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: 'gray.600',
  }),
  input: (provided) => ({
    ...provided,
    color: 'gray.900',
  }),
  option: (provided) => ({
    ...provided,
    borderBottom: '1px solid',
    borderColor: 'gray.200',
  }),
};

const certificateComponents = {
  DropdownIndicator: (
    props: DropdownIndicatorProps<
      Partial<CertificateType>,
      true,
      GroupBase<Partial<CertificateType>>
    >
  ) => (
    <chakraComponents.DropdownIndicator {...props}>
      <Icon as={MdOutlineArrowDropDownCircle} size='13px' />
    </chakraComponents.DropdownIndicator>
  ),
};

const CertificateMultiSelectBase: React.FC<CertificateMultiSelectBaseProps> = ({
  name,
  placeholder,
  field,
  onChange,
  setCertificates,
}) => {
  const { paginationParams, filterProps } = usePagination();
  const { data, isLoading, refetch } = useCertificates(paginationParams);

  const handleChange = (newValues: MultiValue<Partial<CertificateType>>) => {
    if (setCertificates) {
      setCertificates(newValues as Partial<CertificateType>[]);
    }

    if (onChange) {
      onChange(newValues as Partial<CertificateType>[]);
    }
  };

  return (
    <ChakraSelect
      {...field}
      name={name}
      isMulti
      menuPortalTarget={document.body}
      styles={{
        menuPortal: (provided) =>
          ({ ...provided, zIndex: 100 }) as CSSObjectWithLabel,
      }}
      useBasicStyles
      chakraStyles={chakraStyles}
      noOptionsMessage={() => 'certificate not found'}
      isLoading={isLoading}
      options={data}
      getOptionLabel={(opt: Partial<CertificateType>) =>
        `${opt.name} - ${opt.certificateCode}`
      }
      getOptionValue={(opt: Partial<CertificateType>) =>
        opt.id ? opt.id.toString() : ''
      }
      onChange={(newValues) =>
        handleChange(newValues as Partial<CertificateType>[])
      }
      value={
        field?.value
          ? data.filter(
              (opt: Partial<CertificateType>) =>
                field.value.indexOf(opt.id) >= 0
            )
          : []
      }
      closeMenuOnSelect={false}
      placeholder={placeholder}
      components={certificateComponents}
    />
  );
};

export default CertificateMultiSelectBase;
