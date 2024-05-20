import { Icon } from '@chakra-ui/react';
import {
  DropdownIndicatorProps,
  Select as ChakraSelect,
  GroupBase,
  chakraComponents,
  ChakraStylesConfig,
  SingleValue,
  CSSObjectWithLabel,
} from 'chakra-react-select';
import { FieldInputProps } from 'formik';
import React from 'react';
import { MdOutlineArrowDropDownCircle } from 'react-icons/md';
import { ThermographType } from '../../../../types/box-brand/container/thermograph';

interface ThermographSelectBaseProps {
  name?: string;
  field?: FieldInputProps<any>;
  placeholder: string;
  setThermo?: (thermo: Partial<ThermographType>) => void;
  onChange?: (newValue: Partial<ThermographType>) => void;
}

const data: Partial<ThermographType>[] = [
  {
    id: 1,
    name: 'Termografo1',
    type: 'Tipo1',
  },
  {
    id: 2,
    name: 'Termografo2',
    type: 'Tipo2',
  },
  {
    id: 3,
    name: 'Termografo3',
    type: 'Tipo3',
  },
];

const chakraStyles: ChakraStylesConfig<
  Partial<ThermographType>,
  false,
  GroupBase<Partial<ThermographType>>
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

const thermoComponents = {
  DropdownIndicator: (
    props: DropdownIndicatorProps<
      Partial<ThermographType>,
      false,
      GroupBase<Partial<ThermographType>>
    >
  ) => (
    <chakraComponents.DropdownIndicator {...props}>
      <Icon as={MdOutlineArrowDropDownCircle} size='13px' />
    </chakraComponents.DropdownIndicator>
  ),
};

const ThermographSelectBase: React.FC<ThermographSelectBaseProps> = ({
  name,
  field,
  placeholder,
  setThermo,
  onChange,
}) => {
  //   const { paginationParams, filterProps } = usePagination();
  //   const { data, isLoading, refetch } = useStaples(paginationParams);

  const handleChange = (newValue: SingleValue<Partial<ThermographType>>) => {
    if (setThermo) setThermo(newValue as Partial<ThermographType>);
    if (onChange) onChange(newValue as Partial<ThermographType>);
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
      noOptionsMessage={() => 'thermograph not found'}
      //   isLoading={isLoading}
      options={data}
      getOptionLabel={(opt: Partial<ThermographType>) => `${opt.name}`}
      getOptionValue={(opt: Partial<ThermographType>) =>
        opt.id ? opt.id.toString() : ''
      }
      onChange={(newValue) => handleChange(newValue)}
      value={
        field?.value
          ? data.find(
              (opt: Partial<ThermographType>) => opt.id === field?.value
            )
          : undefined
      }
      placeholder={placeholder}
      //   onInputChange={(newValue) => {
      //     filterProps.setSearch(newValue);
      //     refetch();
      //   }}
      components={thermoComponents}
    />
  );
};

export default ThermographSelectBase;
