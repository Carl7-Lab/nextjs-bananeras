import { Icon } from '@chakra-ui/react';
import {
  ChakraStylesConfig,
  DropdownIndicatorProps,
  Select as ChakraSelect,
  GroupBase,
  chakraComponents,
  SingleValue,
  CSSObjectWithLabel,
} from 'chakra-react-select';
import { FieldInputProps } from 'formik';
import React from 'react';
import { MdOutlineArrowDropDownCircle } from 'react-icons/md';
import { usePesticides } from '../../../../hooks/box-brand/post-harvest/pesticide/getPesticides';
import { usePagination } from '../../../../hooks/usePagination';
import { PesticideType } from '../../../../types/box-brand/post-harvest/pesticide';

interface PesticideSelectBaseProps {
  name?: string;
  field?: FieldInputProps<any>;
  placeholder: string;
  setPesticide?: (pesticide: Partial<PesticideType>) => void;
  onChange?: (newValue: Partial<PesticideType>) => void;
}

// const data: Partial<PesticideType>[] = [
//   {
//     id: 1,
//     name: 'Pesticida1',
//   },
//   {
//     id: 2,
//     name: 'Pesticida2',
//   },
//   {
//     id: 3,
//     name: 'Pesticida3',
//   },
// ];

const chakraStyles: ChakraStylesConfig<
  Partial<PesticideType>,
  false,
  GroupBase<Partial<PesticideType>>
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

const pesticideComponents = {
  DropdownIndicator: (
    props: DropdownIndicatorProps<
      Partial<PesticideType>,
      false,
      GroupBase<Partial<PesticideType>>
    >
  ) => (
    <chakraComponents.DropdownIndicator {...props}>
      <Icon as={MdOutlineArrowDropDownCircle} size='13px' />
    </chakraComponents.DropdownIndicator>
  ),
};

const PesticideSelectBase: React.FC<PesticideSelectBaseProps> = ({
  name,
  field,
  placeholder,
  setPesticide,
  onChange,
}) => {
  const { paginationParams, filterProps } = usePagination();
  const { data, isLoading, refetch } = usePesticides(paginationParams);

  const handleChange = (newValue: SingleValue<Partial<PesticideType>>) => {
    if (setPesticide) setPesticide(newValue as Partial<PesticideType>);
    if (onChange) onChange(newValue as Partial<PesticideType>);
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
      getOptionLabel={(opt: Partial<PesticideType>) => `${opt.name}`}
      getOptionValue={(opt: Partial<PesticideType>) =>
        opt.id ? opt.id.toString() : ''
      }
      onChange={(newValue) => handleChange(newValue)}
      value={
        field?.value
          ? data.find((opt: Partial<PesticideType>) => opt.id === field?.value)
          : undefined
      }
      placeholder={placeholder}
      //   onInputChange={(newValue) => {
      //     filterProps.setSearch(newValue);
      //     refetch();
      //   }}
      components={pesticideComponents}
    />
  );
};

export default PesticideSelectBase;
