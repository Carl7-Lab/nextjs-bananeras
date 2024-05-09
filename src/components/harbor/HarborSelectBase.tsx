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
import { useHarbors } from '../../hooks/harbor/getHarbors';
import { usePagination } from '../../hooks/usePagination';

export type PartialHarborType = {
  id: string;
  name: string;
  country: string;
  city: string;
  transportTime: string;
  latitude: string;
  longitude: string;
};

interface HarborSelectBaseProps {
  name?: string;
  field?: FieldInputProps<any>;
  placeholder: string;
  setHarbor?: (harbor: PartialHarborType) => void;
  onChange?: (newValue: PartialHarborType) => void;
}

const chakraStyles: ChakraStylesConfig<
  PartialHarborType,
  false,
  GroupBase<PartialHarborType>
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

const harborComponents = {
  DropdownIndicator: (
    props: DropdownIndicatorProps<
      PartialHarborType,
      false,
      GroupBase<PartialHarborType>
    >
  ) => (
    <chakraComponents.DropdownIndicator {...props}>
      <Icon as={MdOutlineArrowDropDownCircle} size='13px' />
    </chakraComponents.DropdownIndicator>
  ),
};

const HarborSelectBase: React.FC<HarborSelectBaseProps> = ({
  name,
  placeholder,
  field,
  onChange,
  setHarbor,
}) => {
  const { paginationParams, filterProps } = usePagination();
  const { data, isLoading, refetch } = useHarbors(paginationParams);

  const handleChange = (newValue: SingleValue<PartialHarborType>) => {
    if (setHarbor) {
      setHarbor(newValue as PartialHarborType);
    }

    if (onChange) {
      onChange(newValue as PartialHarborType);
    }
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
      noOptionsMessage={() => 'harbor not found'}
      isLoading={isLoading}
      options={data}
      getOptionLabel={(harbor: PartialHarborType) => `${harbor.name}`}
      getOptionValue={(harbor: PartialHarborType) => harbor.id}
      onChange={(newValue) => handleChange(newValue)}
      value={
        field?.value
          ? data.find((opt: PartialHarborType) => opt.id === field?.value)
          : undefined
      }
      placeholder={placeholder}
      components={harborComponents}
    />
  );
};

export default HarborSelectBase;
