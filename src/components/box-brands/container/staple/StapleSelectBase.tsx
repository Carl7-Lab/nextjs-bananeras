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
import React from 'react';
import { MdOutlineArrowDropDownCircle } from 'react-icons/md';
import { useStaples } from '../../../../hooks/box-brand/container/staple/getStaples';
import { usePagination } from '../../../../hooks/usePagination';
import { StapleType } from '../../../../types/box-brand/container/staple';

interface StapleSelectBaseProps {
  name?: string;
  field?: FieldInputProps<any>;
  placeholder: string;
  setStaple?: (staple: Partial<StapleType>) => void;
  onChange?: (newValue: Partial<StapleType>) => void;
}

// const data: Partial<StapleType>[] = [
//   {
//     id: 1,
//     name: 'Grapa1',
//     quantityPerPack: 500,
//   },
//   {
//     id: 2,
//     name: 'Grapa2',
//     quantityPerPack: 750,
//   },
//   {
//     id: 3,
//     name: 'Grapa3',
//     quantityPerPack: 1000,
//   },
// ];

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
  ) => (
    <chakraComponents.DropdownIndicator {...props}>
      <Icon as={MdOutlineArrowDropDownCircle} size='13px' />
    </chakraComponents.DropdownIndicator>
  ),
};

const StapleSelectBase: React.FC<StapleSelectBaseProps> = ({
  name,
  field,
  placeholder,
  setStaple,
  onChange,
}) => {
  const { paginationParams, filterProps } = usePagination();
  const { data, isLoading, refetch } = useStaples(paginationParams);

  const handleChange = (newValue: SingleValue<Partial<StapleType>>) => {
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
      noOptionsMessage={() => 'staple not found'}
      isLoading={isLoading}
      options={data}
      getOptionLabel={(opt: Partial<StapleType>) => `${opt.name}`}
      getOptionValue={(opt: Partial<StapleType>) =>
        opt.id ? opt.id.toString() : ''
      }
      onChange={(newValue) => handleChange(newValue)}
      value={
        field?.value
          ? data.find((opt: Partial<StapleType>) => opt.id === field?.value)
          : undefined
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
