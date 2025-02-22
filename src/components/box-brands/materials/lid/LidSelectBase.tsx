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
import { usePagination } from '@/hooks/usePagination';
import { LidType } from '@/types/box-brand/materials/lid';
import { useLids } from '@/hooks/box-brand/materials/lid/getLids';

interface LidSelectBaseProps {
  name?: string;
  field?: FieldInputProps<any>;
  placeholder: string;
  isReadOnly?: boolean;
  setLid?: (lid: Partial<LidType>) => void;
  onChange?: (newValue: Partial<LidType>) => void;
}

const chakraStyles: ChakraStylesConfig<
  Partial<LidType>,
  false,
  GroupBase<Partial<LidType>>
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

const lidComponents = {
  DropdownIndicator: (
    props: DropdownIndicatorProps<
      Partial<LidType>,
      false,
      GroupBase<Partial<LidType>>
    >
  ) => (
    <chakraComponents.DropdownIndicator {...props}>
      <Icon as={MdOutlineArrowDropDownCircle} size='13px' />
    </chakraComponents.DropdownIndicator>
  ),
};

const LidSelectBase: React.FC<LidSelectBaseProps> = ({
  name,
  field,
  placeholder,
  isReadOnly = false,
  setLid,
  onChange,
}) => {
  const { paginationParams } = usePagination();
  const { data, isLoading, error } = useLids(paginationParams);
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

  const handleChange = (newValue: SingleValue<Partial<LidType>>) => {
    if (setLid) setLid(newValue as Partial<LidType>);
    if (onChange) onChange(newValue as Partial<LidType>);
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
          : 'Ya no hay tapa/s disponible/s'
      }
      isLoading={isLoading}
      isReadOnly={isReadOnly}
      options={data}
      getOptionLabel={(opt: Partial<LidType>) => `${opt.name}`}
      getOptionValue={(opt: Partial<LidType>) =>
        opt.id ? opt.id.toString() : ''
      }
      onChange={(newValue) => handleChange(newValue)}
      value={
        field?.value
          ? data.find((opt: Partial<LidType>) => opt.id === field?.value)
          : null
      }
      placeholder={placeholder}
      components={lidComponents}
    />
  );
};

export default LidSelectBase;
