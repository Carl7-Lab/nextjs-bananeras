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
import { useLabels } from '../../../../hooks/box-brand/materials/label/getLabels';
import { usePagination } from '../../../../hooks/usePagination';
import { LabelType } from '../../../../types/box-brand/materials/label';

interface LabelSelectBaseProps {
  name?: string;
  field?: FieldInputProps<any>;
  placeholder: string;
  setLabel?: (label: Partial<LabelType>) => void;
  onChange?: (newValue: Partial<LabelType>) => void;
}

// const data: Partial<LabelType>[] = [
//   {
//     id: 1,
//     name: 'Etiqueta1',
//     quantityPerRoll: 500,
//     description: 'Descipcion1',
//   },
//   {
//     id: 2,
//     name: 'Etiqueta2',
//     quantityPerRoll: 750,
//     description: 'Descipcion2',
//   },
//   {
//     id: 3,
//     name: 'Etiqueta3',
//     quantityPerRoll: 1000,
//     description: 'Descipcion3',
//   },
// ];

const chakraStyles: ChakraStylesConfig<
  Partial<LabelType>,
  false,
  GroupBase<Partial<LabelType>>
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

const labelComponents = {
  DropdownIndicator: (
    props: DropdownIndicatorProps<
      Partial<LabelType>,
      false,
      GroupBase<Partial<LabelType>>
    >
  ) => (
    <chakraComponents.DropdownIndicator {...props}>
      <Icon as={MdOutlineArrowDropDownCircle} size='13px' />
    </chakraComponents.DropdownIndicator>
  ),
};

const LabelSelectBase: React.FC<LabelSelectBaseProps> = ({
  name,
  field,
  placeholder,
  setLabel,
  onChange,
}) => {
  const { paginationParams, filterProps } = usePagination();
  const { data, isLoading, refetch } = useLabels(paginationParams);

  const handleChange = (newValue: SingleValue<Partial<LabelType>>) => {
    if (setLabel) setLabel(newValue as Partial<LabelType>);
    if (onChange) onChange(newValue as Partial<LabelType>);
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
      noOptionsMessage={() => 'label not found'}
      isLoading={isLoading}
      options={data}
      getOptionLabel={(opt: Partial<LabelType>) => `${opt.name}`}
      getOptionValue={(opt: Partial<LabelType>) =>
        opt.id ? opt.id.toString() : ''
      }
      onChange={(newValue) => handleChange(newValue)}
      value={
        field?.value
          ? data.find((opt: Partial<LabelType>) => opt.id === field?.value)
          : undefined
      }
      placeholder={placeholder}
      //   onInputChange={(newValue) => {
      //     filterProps.setSearch(newValue);
      //     refetch();
      //   }}
      components={labelComponents}
    />
  );
};

export default LabelSelectBase;
