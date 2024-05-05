import { Icon } from '@chakra-ui/react';
import {
  chakraComponents,
  ChakraStylesConfig,
  CSSObjectWithLabel,
  DropdownIndicatorProps,
  GroupBase,
  Select,
  SingleValue,
} from 'chakra-react-select';
import { MdOutlineArrowDropDownCircle } from 'react-icons/md';
import { useBrands } from '@/hooks/brands/getBrands';
import { usePagination } from '@/hooks/usePagination';
import { BrandType } from '@/types/brand';

type IProps = {
  setBrand: (brand: SingleValue<BrandType>) => void;
};

const chakraStyles: ChakraStylesConfig<
  BrandType,
  false,
  GroupBase<BrandType>
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
    props: DropdownIndicatorProps<BrandType, false, GroupBase<BrandType>>
  ) => (
    <chakraComponents.DropdownIndicator {...props}>
      <Icon as={MdOutlineArrowDropDownCircle} size='13px' />
    </chakraComponents.DropdownIndicator>
  ),
};

export function BrandSelect({ setBrand }: IProps) {
  const { paginationParams, filterProps } = usePagination();
  const { data, isLoading, refetch } = useBrands(paginationParams);

  return (
    <Select
      menuPortalTarget={document.body}
      styles={{
        menuPortal: (provided) =>
          ({ ...provided, zIndex: 100 }) as CSSObjectWithLabel,
      }}
      useBasicStyles
      chakraStyles={chakraStyles}
      noOptionsMessage={() => 'brand box not found'}
      isLoading={isLoading}
      options={data}
      getOptionLabel={(brand: BrandType) => `${brand.name}`}
      getOptionValue={(brand: BrandType) => brand.id}
      onChange={(newValue) => setBrand(newValue)}
      placeholder='Select a brand'
      onInputChange={(newValue) => {
        filterProps.setSearch(newValue);
        refetch();
      }}
      components={brandComponents}
    />
  );
}
