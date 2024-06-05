import { Icon } from '@chakra-ui/react';
import {
  ChakraStylesConfig,
  DropdownIndicatorProps,
  Select as ChakraSelect,
  GroupBase,
  MultiValue,
  chakraComponents,
  CSSObjectWithLabel,
} from 'chakra-react-select';
import { FieldInputProps } from 'formik';
import React from 'react';
import { MdOutlineArrowDropDownCircle } from 'react-icons/md';
import { usePesticides } from '../../../../hooks/box-brand/post-harvest/pesticide/getPesticides';
import { usePagination } from '../../../../hooks/usePagination';
import { PesticideType } from '../../../../types/box-brand/post-harvest/pesticide';

interface PesticideMultiSelectBaseProps {
  name?: string;
  field?: FieldInputProps<any>;
  placeholder: string;
  setPesticides?: (pesticides: Partial<PesticideType>[]) => void;
  onChange?: (newValues: Partial<PesticideType>[]) => void;
}

const chakraStyles: ChakraStylesConfig<
  Partial<PesticideType>,
  true,
  GroupBase<Partial<PesticideType>>
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

const pesticideComponents = {
  DropdownIndicator: (
    props: DropdownIndicatorProps<
      Partial<PesticideType>,
      true,
      GroupBase<Partial<PesticideType>>
    >
  ) => (
    <chakraComponents.DropdownIndicator {...props}>
      <Icon as={MdOutlineArrowDropDownCircle} size='13px' />
    </chakraComponents.DropdownIndicator>
  ),
};

const PesticideMultiSelectBase: React.FC<PesticideMultiSelectBaseProps> = ({
  name,
  placeholder,
  field,
  onChange,
  setPesticides,
}) => {
  const { paginationParams, filterProps } = usePagination();
  const { data, isLoading, refetch } = usePesticides(paginationParams);

  const handleChange = (newValues: MultiValue<Partial<PesticideType>>) => {
    if (setPesticides) {
      setPesticides(newValues as Partial<PesticideType>[]);
    }

    if (onChange) {
      onChange(newValues as Partial<PesticideType>[]);
    }
  };

  return (
    <ChakraSelect
      {...field}
      name={name}
      isMulti
      menuPortalTarget={document.body}
      styles={{
        menuPortal: (provided) =>
          ({ ...provided, zIndex: 100 }) as CSSObjectWithLabel,
      }}
      useBasicStyles
      chakraStyles={chakraStyles}
      noOptionsMessage={() => 'pesticide not found'}
      isLoading={isLoading}
      options={data}
      getOptionLabel={(pesticide: Partial<PesticideType>) =>
        `${pesticide.name} - ${pesticide.id}`
      }
      getOptionValue={(pesticide: Partial<PesticideType>) =>
        pesticide.id ? pesticide.id.toString() : ''
      }
      onChange={(newValues) =>
        handleChange(newValues as Partial<PesticideType>[])
      }
      value={
        field?.value
          ? data.filter(
              (opt: Partial<PesticideType>) => field.value.indexOf(opt.id) >= 0
            )
          : []
      }
      closeMenuOnSelect={false}
      placeholder={placeholder}
      components={pesticideComponents}
    />
  );
};

export default PesticideMultiSelectBase;
