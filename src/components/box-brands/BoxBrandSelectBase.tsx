import { Icon } from '@chakra-ui/react';
import {
  ChakraStylesConfig,
  DropdownIndicatorProps,
  Select as ChakraSelect,
  GroupBase,
  chakraComponents,
  CSSObjectWithLabel,
  SingleValue,
} from 'chakra-react-select';
import { FieldInputProps } from 'formik';
import React from 'react';
import { MdOutlineArrowDropDownCircle } from 'react-icons/md';
import { useBoxBrands } from '@/hooks/box-brand/getBoxBrands';
import { usePagination } from '@/hooks/usePagination';

export type PartialBoxBrandType = {
  id: string;
  brandId: string;
  name: string;
  brandCode: string;
};

const boxBrandsItems: PartialBoxBrandType[] = [
  {
    id: '1',
    brandId: '1',
    name: 'dole amarillo',
    brandCode: 'DBL001',
  },
  {
    id: '2',
    brandId: '2',
    name: 'chiquita morada',
    brandCode: 'DBL002',
  },
  {
    id: '3',
    brandId: '3',
    name: 'del monte morada',
    brandCode: 'DBL003',
  },
  {
    id: '4',
    brandId: '1',
    name: 'dole naranja',
    brandCode: 'DBL004',
  },
  {
    id: '5',
    brandId: '2',
    name: 'test',
    brandCode: 'DBL005',
  },
];

const chakraStyles: ChakraStylesConfig<
  PartialBoxBrandType,
  false,
  GroupBase<PartialBoxBrandType>
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

const brandComponents = {
  DropdownIndicator: (
    props: DropdownIndicatorProps<
      PartialBoxBrandType,
      false,
      GroupBase<PartialBoxBrandType>
    >
  ) => (
    <chakraComponents.DropdownIndicator {...props}>
      <Icon as={MdOutlineArrowDropDownCircle} size='13px' />
    </chakraComponents.DropdownIndicator>
  ),
};

const BoxBrandSelectBase: React.FC<{
  setBoxBrand?: (brand: PartialBoxBrandType) => void;
  onChange?: (newValue: PartialBoxBrandType) => void;
  name?: string;
  field?: FieldInputProps<any>;
  placeholder: string;
}> = ({ setBoxBrand, onChange, field, placeholder, name }) => {
  //   const { paginationParams, filterProps } = usePagination();
  //   const { data, isLoading, refetch } = useBoxBrands(paginationParams);

  const handleChange = (newValue: SingleValue<PartialBoxBrandType>) => {
    if (setBoxBrand) {
      setBoxBrand(newValue as PartialBoxBrandType);
      //   console.log('value BoxBrandSelect setBoxBrand: ', newValue);
    }
    if (onChange) {
      onChange(newValue as PartialBoxBrandType);
      //   console.log('value BoxBrandSelect onChange: ', newValue);
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
      noOptionsMessage={() => 'brand box not found'}
      //   isLoading={isLoading}
      //   options={data}
      options={boxBrandsItems}
      getOptionLabel={(boxBrand: PartialBoxBrandType) =>
        `${boxBrand.brandId} - ${boxBrand.name}`
      }
      getOptionValue={(boxBrand: PartialBoxBrandType) => boxBrand.id}
      onChange={(newValue) => handleChange(newValue)}
      //   value={
      //     field?.value
      //       ? data.find((opt: PartialBoxBrandType) => opt.id === field?.value)
      //       : undefined
      //   }
      value={
        field?.value
          ? boxBrandsItems.find(
              (opt: PartialBoxBrandType) => opt.id === field?.value
            )
          : undefined
      }
      placeholder={placeholder}
      //   onInputChange={(newValue) => {
      //     filterProps.setSearch(newValue);
      //     refetch();
      //   }}
      components={brandComponents}
    />
  );
};

export default BoxBrandSelectBase;
