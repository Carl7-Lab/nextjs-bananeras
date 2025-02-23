/* eslint-disable @typescript-eslint/no-explicit-any */
import { Icon } from '@chakra-ui/react';
import {
  CSSObjectWithLabel,
  ChakraStylesConfig,
  DropdownIndicatorProps,
  Select as ChakraSelect,
  GroupBase,
  SingleValue,
  chakraComponents,
} from 'chakra-react-select';
import { FieldInputProps } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { MdOutlineArrowDropDownCircle } from 'react-icons/md';
import { useStaples } from '../../../../hooks/box-brand/container/staple/getStaples';
import { usePagination } from '../../../../hooks/usePagination';
import { StapleType } from '../../../../types/box-brand/container/staple';

interface StapleSelectBaseProps {
  name?: string;
  field?: FieldInputProps<any>;
  placeholder: string;
  isReadOnly?: boolean;
  setStaple?: (staple: Partial<StapleType>) => void;
  onChange?: (newValue: Partial<StapleType>) => void;
}

const chakraStyles: ChakraStylesConfig<
  Partial<StapleType>,
  false,
  GroupBase<Partial<StapleType>>
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

const stableComponents = {
  DropdownIndicator: (
    props: DropdownIndicatorProps<
      Partial<StapleType>,
      false,
      GroupBase<Partial<StapleType>>
    >
  ): React.JSX.Element => (
    <chakraComponents.DropdownIndicator {...props}>
      <Icon as={MdOutlineArrowDropDownCircle} size='13px' />
    </chakraComponents.DropdownIndicator>
  ),
};

const StapleSelectBase: React.FC<StapleSelectBaseProps> = ({
  name,
  field,
  placeholder,
  isReadOnly = false,
  setStaple,
  onChange,
}) => {
  const { paginationParams } = usePagination();
  const { data, isLoading, error } = useStaples(paginationParams);
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

  const handleChange = (newValue: SingleValue<Partial<StapleType>>): void => {
    if (setStaple) setStaple(newValue as Partial<StapleType>);
    if (onChange) onChange(newValue as Partial<StapleType>);
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
          : 'Ya no hay grapa/s disponible/s'
      }
      isLoading={isLoading}
      isReadOnly={isReadOnly}
      options={data}
      getOptionLabel={(opt: Partial<StapleType>) => `${opt.name}`}
      getOptionValue={(opt: Partial<StapleType>) =>
        opt.id ? opt.id.toString() : ''
      }
      onChange={(newValue) => handleChange(newValue)}
      value={
        field?.value
          ? data.find((opt: Partial<StapleType>) => opt.id === field?.value)
          : null
      }
      placeholder={placeholder}
      //   onInputChange={(newValue) => {
      //     filterProps.setSearch(newValue);
      //     refetch();
      //   }}
      components={stableComponents}
    />
  );
};

export default StapleSelectBase;
