/* eslint-disable @typescript-eslint/no-explicit-any */
import { Icon } from '@chakra-ui/react';
import {
  ChakraStylesConfig,
  DropdownIndicatorProps,
  Select as ChakraSelect,
  GroupBase,
  SingleValue,
  chakraComponents,
  CSSObjectWithLabel,
} from 'chakra-react-select';
import { FieldInputProps } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { MdOutlineArrowDropDownCircle } from 'react-icons/md';
import { useProtectors } from '../../../../hooks/box-brand/materials/protector/getProtectors';
import { usePagination } from '../../../../hooks/usePagination';
import { ProtectorType } from '../../../../types/box-brand/materials/protector';

interface ProtectorSelectBaseProps {
  name?: string;
  field?: FieldInputProps<any>;
  placeholder: string;
  isReadOnly?: boolean;
  setProtector?: (protector: Partial<ProtectorType>) => void;
  onChange?: (newValue: Partial<ProtectorType>) => void;
}

const chakraStyles: ChakraStylesConfig<
  Partial<ProtectorType>,
  false,
  GroupBase<Partial<ProtectorType>>
> = {
  container: (provided) => ({
    ...provided,
    w: 'full',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: 'gray.600',
    h: 'auto',
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

const protectorComponents = {
  DropdownIndicator: (
    props: DropdownIndicatorProps<
      Partial<ProtectorType>,
      false,
      GroupBase<Partial<ProtectorType>>
    >
  ): React.JSX.Element => (
    <chakraComponents.DropdownIndicator {...props}>
      <Icon as={MdOutlineArrowDropDownCircle} size='13px' />
    </chakraComponents.DropdownIndicator>
  ),
};

const ProtectorSelectBase: React.FC<ProtectorSelectBaseProps> = ({
  name,
  field,
  placeholder,
  isReadOnly = false,
  setProtector,
  onChange,
}) => {
  const { paginationParams } = usePagination();
  const { data, isLoading, error } = useProtectors(paginationParams);
  const router = useRouter();

  useEffect(() => {
    if (!!error) {
      const { response } = error as any;
      const { data } = response;
      const { statusCode } = data;

      if (statusCode === 401) {
        router.push('/api/auth/signout');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const handleChange = (
    newValue: SingleValue<Partial<ProtectorType>>
  ): void => {
    if (setProtector) setProtector(newValue as Partial<ProtectorType>);
    if (onChange) onChange(newValue as Partial<ProtectorType>);
  };

  return (
    <ChakraSelect
      {...field}
      name={name}
      menuPortalTarget={document.body}
      styles={{
        menuPortal: (provided) =>
          ({ ...provided, zIndex: 100 }) as CSSObjectWithLabel,
      }}
      useBasicStyles
      chakraStyles={chakraStyles}
      noOptionsMessage={() =>
        !!error
          ? (error as any).response.data.message
          : 'Ya no hay protector/es disponible/s'
      }
      isLoading={isLoading}
      isReadOnly={isReadOnly}
      options={data}
      getOptionLabel={(opt: Partial<ProtectorType>) => `${opt.name}`}
      getOptionValue={(opt: Partial<ProtectorType>) =>
        opt.id ? opt.id.toString() : ''
      }
      onChange={(newValue) => handleChange(newValue)}
      value={
        field?.value
          ? data.find((opt: Partial<ProtectorType>) => opt.id === field?.value)
          : null
      }
      placeholder={placeholder}
      //   onInputChange={(newValue) => {
      //     filterProps.setSearch(newValue);
      //     refetch();
      //   }}
      components={protectorComponents}
    />
  );
};

export default ProtectorSelectBase;
