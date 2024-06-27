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
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { MdOutlineArrowDropDownCircle } from 'react-icons/md';
import { useBoxBrands } from '@/hooks/box-brand/getBoxBrands';
import { usePagination } from '@/hooks/usePagination';
import { BoxBrandType } from '../../types/box-brand/boxBrand';

interface BoxBrandSelectBaseProps {
  name?: string;
  field?: FieldInputProps<any>;
  placeholder: string;
  setBoxBrand?: (brand: Partial<BoxBrandType>) => void;
  onChange?: (newValue: Partial<BoxBrandType>) => void;
}

const chakraStyles: ChakraStylesConfig<
  Partial<BoxBrandType>,
  false,
  GroupBase<Partial<BoxBrandType>>
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
      Partial<BoxBrandType>,
      false,
      GroupBase<Partial<BoxBrandType>>
    >
  ) => (
    <chakraComponents.DropdownIndicator {...props}>
      <Icon as={MdOutlineArrowDropDownCircle} size='13px' />
    </chakraComponents.DropdownIndicator>
  ),
};

const BoxBrandSelectBase: React.FC<BoxBrandSelectBaseProps> = ({
  setBoxBrand,
  onChange,
  field,
  placeholder,
  name,
}) => {
  const { paginationParams, filterProps } = usePagination();
  const { data, isLoading, refetch, error } = useBoxBrands(paginationParams);
  const router = useRouter();

  useEffect(() => {
    if (!!error) {
      const { response } = error as any;
      const { data } = response;
      const { statusCode, message, error: errorTitle, model, prop } = data;

      if (statusCode === 401) {
        router.push('/api/auth/signout');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const handleChange = (newValue: SingleValue<Partial<BoxBrandType>>) => {
    if (setBoxBrand) {
      setBoxBrand(newValue as Partial<BoxBrandType>);
    }
    if (onChange) {
      onChange(newValue as Partial<BoxBrandType>);
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
      noOptionsMessage={() =>
        !!error
          ? (error as any).response.data.message
          : 'Ya no hay tipo/s de caja disponible/s'
      }
      isLoading={isLoading}
      options={data}
      getOptionLabel={(opt: Partial<BoxBrandType>) =>
        `${opt.brand?.name} - ${opt.name}`
      }
      getOptionValue={(opt: Partial<BoxBrandType>) =>
        opt.id ? opt.id.toString() : ''
      }
      onChange={(newValue) => handleChange(newValue)}
      value={
        field?.value
          ? data.find((opt: Partial<BoxBrandType>) => opt.id === field?.value)
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
