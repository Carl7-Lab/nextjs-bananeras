/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { MdOutlineArrowDropDownCircle } from 'react-icons/md';
import { useSponges } from '@/hooks/box-brand/materials/sponge/getSponges';
import { usePagination } from '@/hooks/usePagination';
import { SpongeType } from '@/types/box-brand/materials/sponge';

interface SpongeSelectBaseProps {
  name?: string;
  field?: FieldInputProps<any>;
  placeholder: string;
  isReadOnly?: boolean;
  setSponge?: (sponge: Partial<SpongeType>) => void;
  onChange?: (newValue: Partial<SpongeType>) => void;
}

const chakraStyles: ChakraStylesConfig<
  Partial<SpongeType>,
  false,
  GroupBase<Partial<SpongeType>>
> = {
  container: (provided) => ({
    ...provided,
    w: 'full',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: 'gray.600',
    h: 'auto',
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

const spongeComponents = {
  DropdownIndicator: (
    props: DropdownIndicatorProps<
      Partial<SpongeType>,
      false,
      GroupBase<Partial<SpongeType>>
    >
  ): React.JSX.Element => (
    <chakraComponents.DropdownIndicator {...props}>
      <Icon as={MdOutlineArrowDropDownCircle} size='13px' />
    </chakraComponents.DropdownIndicator>
  ),
};

const SpongeSelectBase: React.FC<SpongeSelectBaseProps> = ({
  name,
  field,
  placeholder,
  isReadOnly = false,
  setSponge,
  onChange,
}) => {
  const { paginationParams } = usePagination();
  const { data, isLoading, error } = useSponges(paginationParams);
  const router = useRouter();

  useEffect(() => {
    if (error) {
      const { response } = error as any;
      if (response?.data?.statusCode === 401) {
        router.push('/api/auth/signout');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const handleChange = (newValue: SingleValue<Partial<SpongeType>>): void => {
    if (setSponge) setSponge(newValue as Partial<SpongeType>);
    if (onChange) onChange(newValue as Partial<SpongeType>);
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
        error
          ? (error as any).response.data.message
          : 'Ya no hay esponja/s disponible/s'
      }
      isLoading={isLoading}
      isReadOnly={isReadOnly}
      options={data}
      getOptionLabel={(opt: Partial<SpongeType>) => `${opt.name}`}
      getOptionValue={(opt: Partial<SpongeType>) =>
        opt.id ? opt.id.toString() : ''
      }
      onChange={(newValue) => handleChange(newValue)}
      value={
        field?.value
          ? data.find((opt: Partial<SpongeType>) => opt.id === field?.value)
          : null
      }
      placeholder={placeholder}
      components={spongeComponents}
    />
  );
};

export default SpongeSelectBase;
