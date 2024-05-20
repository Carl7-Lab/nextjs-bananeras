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
import { MettoLabelType } from '../../../../types/box-brand/container/mettoLabel';

interface MettoLabelSelectBaseProps {
  name?: string;
  field?: FieldInputProps<any>;
  placeholder: string;
  setMettoLabel?: (mettoLabel: Partial<MettoLabelType>) => void;
  onChange?: (newValue: Partial<MettoLabelType>) => void;
}

const data: Partial<MettoLabelType>[] = [
  {
    id: 1,
    name: 'MettoLabel1',
    quantityPerPack: 500,
    art: 'imagen1',
    code: 'code001',
  },
  {
    id: 2,
    name: 'MettoLabel2',
    quantityPerPack: 750,
    art: 'imagen2',
    code: 'code002',
  },
  {
    id: 3,
    name: 'MettoLabel3',
    quantityPerPack: 1000,
    art: 'imagen3',
    code: 'code003',
  },
];

const chakraStyles: ChakraStylesConfig<
  Partial<MettoLabelType>,
  false,
  GroupBase<Partial<MettoLabelType>>
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

const mettoLabelComponents = {
  DropdownIndicator: (
    props: DropdownIndicatorProps<
      Partial<MettoLabelType>,
      false,
      GroupBase<Partial<MettoLabelType>>
    >
  ) => (
    <chakraComponents.DropdownIndicator {...props}>
      <Icon as={MdOutlineArrowDropDownCircle} size='13px' />
    </chakraComponents.DropdownIndicator>
  ),
};

const MettoLabelSelectBase: React.FC<MettoLabelSelectBaseProps> = ({
  name,
  field,
  placeholder,
  setMettoLabel,
  onChange,
}) => {
  //   const { paginationParams, filterProps } = usePagination();
  //   const { data, isLoading, refetch } = useStaples(paginationParams);

  const handleChange = (newValue: SingleValue<Partial<MettoLabelType>>) => {
    if (setMettoLabel) setMettoLabel(newValue as Partial<MettoLabelType>);
    if (onChange) onChange(newValue as Partial<MettoLabelType>);
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
      noOptionsMessage={() => 'metto label not found'}
      //   isLoading={isLoading}
      options={data}
      getOptionLabel={(opt: Partial<MettoLabelType>) => `${opt.name}`}
      getOptionValue={(opt: Partial<MettoLabelType>) =>
        opt.id ? opt.id.toString() : ''
      }
      onChange={(newValue) => handleChange(newValue)}
      value={
        field?.value
          ? data.find((opt: Partial<MettoLabelType>) => opt.id === field?.value)
          : undefined
      }
      placeholder={placeholder}
      //   onInputChange={(newValue) => {
      //     filterProps.setSearch(newValue);
      //     refetch();
      //   }}
      components={mettoLabelComponents}
    />
  );
};

export default MettoLabelSelectBase;
