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
import { BandType } from '../../../../types/box-brand/materials/band';

interface BandSelectBaseProps {
  name?: string;
  field?: FieldInputProps<any>;
  placeholder: string;
  setBand?: (band: Partial<BandType>) => void;
  onChange?: (newValue: Partial<BandType>) => void;
}

const data: Partial<BandType>[] = [
  {
    id: 1,
    name: 'Banda1',
    quantityPerPack: 500,
    color: 'color1',
  },
  {
    id: 2,
    name: 'Banda2',
    quantityPerPack: 750,
    color: 'color2',
  },
  {
    id: 3,
    name: 'Banda3',
    quantityPerPack: 1000,
    color: 'color3',
  },
];

const chakraStyles: ChakraStylesConfig<
  Partial<BandType>,
  false,
  GroupBase<Partial<BandType>>
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

const bandComponents = {
  DropdownIndicator: (
    props: DropdownIndicatorProps<
      Partial<BandType>,
      false,
      GroupBase<Partial<BandType>>
    >
  ) => (
    <chakraComponents.DropdownIndicator {...props}>
      <Icon as={MdOutlineArrowDropDownCircle} size='13px' />
    </chakraComponents.DropdownIndicator>
  ),
};

const BandSelectBase: React.FC<BandSelectBaseProps> = ({
  name,
  field,
  placeholder,
  setBand,
  onChange,
}) => {
  //   const { paginationParams, filterProps } = usePagination();
  //   const { data, isLoading, refetch } = useBands(paginationParams);

  const handleChange = (newValue: SingleValue<Partial<BandType>>) => {
    if (setBand) setBand(newValue as Partial<BandType>);
    if (onChange) onChange(newValue as Partial<BandType>);
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
      noOptionsMessage={() => 'band not found'}
      //   isLoading={isLoading}
      options={data}
      getOptionLabel={(opt: Partial<BandType>) => `${opt.name}`}
      getOptionValue={(opt: Partial<BandType>) =>
        opt.id ? opt.id.toString() : ''
      }
      onChange={(newValue) => handleChange(newValue)}
      value={
        field?.value
          ? data.find((opt: Partial<BandType>) => opt.id === field?.value)
          : undefined
      }
      placeholder={placeholder}
      //   onInputChange={(newValue) => {
      //     filterProps.setSearch(newValue);
      //     refetch();
      //   }}
      components={bandComponents}
    />
  );
};

export default BandSelectBase;
