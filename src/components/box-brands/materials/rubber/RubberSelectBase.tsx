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
import { useRubbers } from '../../../../hooks/box-brand/materials/rubber/getRubbers';
import { usePagination } from '../../../../hooks/usePagination';
import { RubberType } from '../../../../types/box-brand/materials/rubber';

interface RubberSelectBaseProps {
  name?: string;
  field?: FieldInputProps<any>;
  placeholder: string;
  isReadOnly?: boolean;
  setRubber?: (rubber: Partial<RubberType>) => void;
  onChange?: (newValue: Partial<RubberType>) => void;
}

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
    h: '36px',
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
  isReadOnly = false,
  setRubber,
  onChange,
}) => {
  const { paginationParams, filterProps } = usePagination();
  const { data, isLoading, refetch, error } = useRubbers(paginationParams);
  const router = useRouter();

  useEffect(() => {
    if (!!error) {
      const { response } = error as any;
      const { data = [] } = response;
      const { statusCode } = data;

      if (statusCode === 401) {
        router.push('/api/auth/signout');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

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
      noOptionsMessage={() =>
        !!error
          ? (error as any).response.data.message
          : 'Ya no hay liga/s disponible/s'
      }
      isLoading={isLoading}
      isReadOnly={isReadOnly}
      options={data}
      getOptionLabel={(opt: Partial<RubberType>) => `${opt.name}`}
      getOptionValue={(opt: Partial<RubberType>) =>
        opt.id ? opt.id.toString() : ''
      }
      onChange={(newValue) => handleChange(newValue)}
      value={
        field?.value
          ? data.find((opt: Partial<RubberType>) => opt.id === field?.value)
          : null
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
