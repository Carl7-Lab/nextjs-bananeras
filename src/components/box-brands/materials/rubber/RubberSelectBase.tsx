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
import { useRubbers } from '../../../../hooks/box-brand/materials/rubber/getRubbers';
import { usePagination } from '../../../../hooks/usePagination';
import { RubberType } from '../../../../types/box-brand/materials/rubber';

interface RubberSelectBaseProps {
  name?: string;
  field?: FieldInputProps<any>;
  placeholder: string;
  setRubber?: (rubber: Partial<RubberType>) => void;
  onChange?: (newValue: Partial<RubberType>) => void;
}

// const data: Partial<RubberType>[] = [
//   {
//     id: 1,
//     name: 'Liga1',
//     quantityPerPack: 500,
//     color: 'color1',
//   },
//   {
//     id: 2,
//     name: 'Liga2',
//     quantityPerPack: 750,
//     color: 'color2',
//   },
//   {
//     id: 3,
//     name: 'Liga3',
//     quantityPerPack: 1000,
//     color: 'color3',
//   },
// ];

const chakraStyles: ChakraStylesConfig<
  Partial<RubberType>,
  false,
  GroupBase<Partial<RubberType>>
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

const rubberComponents = {
  DropdownIndicator: (
    props: DropdownIndicatorProps<
      Partial<RubberType>,
      false,
      GroupBase<Partial<RubberType>>
    >
  ) => (
    <chakraComponents.DropdownIndicator {...props}>
      <Icon as={MdOutlineArrowDropDownCircle} size='13px' />
    </chakraComponents.DropdownIndicator>
  ),
};

const RubberSelectBase: React.FC<RubberSelectBaseProps> = ({
  name,
  field,
  placeholder,
  setRubber,
  onChange,
}) => {
  const { paginationParams, filterProps } = usePagination();
  const { data, isLoading, refetch } = useRubbers(paginationParams);

  const handleChange = (newValue: SingleValue<Partial<RubberType>>) => {
    if (setRubber) setRubber(newValue as Partial<RubberType>);
    if (onChange) onChange(newValue as Partial<RubberType>);
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
      noOptionsMessage={() => 'rubber not found'}
      isLoading={isLoading}
      options={data}
      getOptionLabel={(opt: Partial<RubberType>) => `${opt.name}`}
      getOptionValue={(opt: Partial<RubberType>) =>
        opt.id ? opt.id.toString() : ''
      }
      onChange={(newValue) => handleChange(newValue)}
      value={
        field?.value
          ? data.find((opt: Partial<RubberType>) => opt.id === field?.value)
          : undefined
      }
      placeholder={placeholder}
      //   onInputChange={(newValue) => {
      //     filterProps.setSearch(newValue);
      //     refetch();
      //   }}
      components={rubberComponents}
    />
  );
};

export default RubberSelectBase;
