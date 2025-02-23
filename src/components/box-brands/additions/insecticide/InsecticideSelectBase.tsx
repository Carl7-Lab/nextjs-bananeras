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
import { useInsecticides } from '../../../../hooks/box-brand/additions/insecticide/getInsecticides';
import { usePagination } from '../../../../hooks/usePagination';
import { InsecticideType } from '../../../../types/box-brand/additions/insecticide';

interface InsecticideSelectBaseProps {
  name?: string;
  field?: FieldInputProps<any>;
  placeholder: string;
  setInsecticide?: (insecticide: Partial<InsecticideType>) => void;
  onChange?: (newValue: Partial<InsecticideType>) => void;
}

const chakraStyles: ChakraStylesConfig<
  Partial<InsecticideType>,
  false,
  GroupBase<Partial<InsecticideType>>
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

const insecticideComponents = {
  DropdownIndicator: (
    props: DropdownIndicatorProps<
      Partial<InsecticideType>,
      false,
      GroupBase<Partial<InsecticideType>>
    >
  ): React.JSX.Element => (
    <chakraComponents.DropdownIndicator {...props}>
      <Icon as={MdOutlineArrowDropDownCircle} size='13px' />
    </chakraComponents.DropdownIndicator>
  ),
};

const InsecticideSelectBase: React.FC<InsecticideSelectBaseProps> = ({
  name,
  field,
  placeholder,
  setInsecticide,
  onChange,
}) => {
  const { paginationParams } = usePagination();
  const { data = [], isLoading, error } = useInsecticides(paginationParams);
  const router = useRouter();

  useEffect(() => {
    if (!!error) {
      const { response } = error as any;
      const { data } = response;
      const { statusCode } = data;

      if (statusCode === 401) {
        router.push('/api/auth/signout');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  useEffect(() => {
    if (!!setInsecticide)
      setInsecticide(
        (data as Partial<InsecticideType>[]).find(
          (insecticide) => insecticide.id === field?.value
        ) as Partial<InsecticideType>
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [field?.value]);

  const handleChange = (
    newValue: SingleValue<Partial<InsecticideType>>
  ): void => {
    if (setInsecticide) setInsecticide(newValue as Partial<InsecticideType>);
    if (onChange) onChange(newValue as Partial<InsecticideType>);
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
          : 'Ya no hay etiqueta/s disponible/s'
      }
      isLoading={isLoading}
      options={data}
      getOptionLabel={(opt: Partial<InsecticideType>) => `${opt.name}`}
      getOptionValue={(opt: Partial<InsecticideType>) =>
        opt.id ? opt.id.toString() : ''
      }
      onChange={(newValue) => handleChange(newValue)}
      value={
        field?.value
          ? data.find(
              (opt: Partial<InsecticideType>) => opt.id === field?.value
            )
          : undefined
      }
      placeholder={placeholder}
      //   onInputChange={(newValue) => {
      //     filterProps.setSearch(newValue);
      //     refetch();
      //   }}
      components={insecticideComponents}
    />
  );
};

export default InsecticideSelectBase;
