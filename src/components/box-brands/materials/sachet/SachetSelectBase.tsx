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
import React from 'react';
import { MdOutlineArrowDropDownCircle } from 'react-icons/md';
import { useSachets } from '../../../../hooks/box-brand/materials/sachet/getSachets';
import { usePagination } from '../../../../hooks/usePagination';
import { SachetType } from '../../../../types/box-brand/materials/sachet';

interface SachetSelectBaseProps {
  name?: string;
  field?: FieldInputProps<any>;
  placeholder: string;
  setSachet?: (sachet: Partial<SachetType>) => void;
  onChange?: (newValue: Partial<SachetType>) => void;
}

// const data: Partial<SachetType>[] = [
//   {
//     id: 1,
//     name: 'Sachet1',
//     quantityPerPack: 500,
//     type: 'type1',
//   },
//   {
//     id: 2,
//     name: 'Sachet2',
//     quantityPerPack: 750,
//     type: 'type2',
//   },
//   {
//     id: 3,
//     name: 'Sachet3',
//     quantityPerPack: 1000,
//     type: 'type3',
//   },
// ];

const chakraStyles: ChakraStylesConfig<
  Partial<SachetType>,
  false,
  GroupBase<Partial<SachetType>>
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

const sachetComponents = {
  DropdownIndicator: (
    props: DropdownIndicatorProps<
      Partial<SachetType>,
      false,
      GroupBase<Partial<SachetType>>
    >
  ) => (
    <chakraComponents.DropdownIndicator {...props}>
      <Icon as={MdOutlineArrowDropDownCircle} size='13px' />
    </chakraComponents.DropdownIndicator>
  ),
};

const SachetSelectBase: React.FC<SachetSelectBaseProps> = ({
  name,
  field,
  placeholder,
  setSachet,
  onChange,
}) => {
  const { paginationParams, filterProps } = usePagination();
  const { data, isLoading, refetch } = useSachets(paginationParams);

  const handleChange = (newValue: SingleValue<Partial<SachetType>>) => {
    if (setSachet) setSachet(newValue as Partial<SachetType>);
    if (onChange) onChange(newValue as Partial<SachetType>);
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
      noOptionsMessage={() => 'sachet not found'}
      isLoading={isLoading}
      options={data}
      getOptionLabel={(opt: Partial<SachetType>) => `${opt.name}`}
      getOptionValue={(opt: Partial<SachetType>) =>
        opt.id ? opt.id.toString() : ''
      }
      onChange={(newValue) => handleChange(newValue)}
      value={
        field?.value
          ? data.find((opt: Partial<SachetType>) => opt.id === field?.value)
          : undefined
      }
      placeholder={placeholder}
      //   onInputChange={(newValue) => {
      //     filterProps.setSearch(newValue);
      //     refetch();
      //   }}
      components={sachetComponents}
    />
  );
};

export default SachetSelectBase;
