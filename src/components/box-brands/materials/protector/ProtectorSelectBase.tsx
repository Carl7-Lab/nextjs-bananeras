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
import { ProtectorType } from '../../../../types/box-brand/materials/protector';

interface ProtectorSelectBaseProps {
  name?: string;
  field?: FieldInputProps<any>;
  placeholder: string;
  setProtector?: (protector: Partial<ProtectorType>) => void;
  onChange?: (newValue: Partial<ProtectorType>) => void;
}

const data: Partial<ProtectorType>[] = [
  {
    id: 1,
    name: 'Protector1',
    quantityPerPack: 500,
  },
  {
    id: 2,
    name: 'Protector2',
    quantityPerPack: 750,
  },
  {
    id: 3,
    name: 'Protector3',
    quantityPerPack: 1000,
  },
];

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
  ) => (
    <chakraComponents.DropdownIndicator {...props}>
      <Icon as={MdOutlineArrowDropDownCircle} size='13px' />
    </chakraComponents.DropdownIndicator>
  ),
};

const ProtectorSelectBase: React.FC<ProtectorSelectBaseProps> = ({
  name,
  field,
  placeholder,
  setProtector,
  onChange,
}) => {
  //   const { paginationParams, filterProps } = usePagination();
  //   const { data, isLoading, refetch } = useProtectors(paginationParams);

  const handleChange = (newValue: SingleValue<Partial<ProtectorType>>) => {
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
      noOptionsMessage={() => 'protector not found'}
      //   isLoading={isLoading}
      options={data}
      getOptionLabel={(opt: Partial<ProtectorType>) => `${opt.name}`}
      getOptionValue={(opt: Partial<ProtectorType>) =>
        opt.id ? opt.id.toString() : ''
      }
      onChange={(newValue) => handleChange(newValue)}
      value={
        field?.value
          ? data.find((opt: Partial<ProtectorType>) => opt.id === field?.value)
          : undefined
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
