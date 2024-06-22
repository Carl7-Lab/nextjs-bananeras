import { Icon } from '@chakra-ui/react';
import {
  ChakraStylesConfig,
  DropdownIndicatorProps,
  Select as ChakraSelect,
  GroupBase,
  chakraComponents,
  MultiValue,
  CSSObjectWithLabel,
} from 'chakra-react-select';
import { FieldInputProps } from 'formik';
import React from 'react';
import { MdOutlineArrowDropDownCircle } from 'react-icons/md';
import { RequirementType } from '../../../types/requirement';

interface RequirementMultiSelectBaseProps {
  name?: string;
  field?: FieldInputProps<any>;
  placeholder: string;
  setRequirements?: (requirements: Partial<RequirementType>[]) => void;
  onChange?: (newValues: Partial<RequirementType>[]) => void;
}

const data: Partial<RequirementType>[] = [
  { id: 1, name: 'Requirement 1' },
  { id: 2, name: 'Requirement 2' },
  { id: 3, name: 'Requirement 3' },
];

const chakraStyles: ChakraStylesConfig<
  Partial<RequirementType>,
  true,
  GroupBase<Partial<RequirementType>>
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

const requirementComponents = {
  DropdownIndicator: (
    props: DropdownIndicatorProps<
      Partial<RequirementType>,
      true,
      GroupBase<Partial<RequirementType>>
    >
  ) => (
    <chakraComponents.DropdownIndicator {...props}>
      <Icon as={MdOutlineArrowDropDownCircle} size='13px' />
    </chakraComponents.DropdownIndicator>
  ),
};

const RequirementMultiSelectBase: React.FC<RequirementMultiSelectBaseProps> = ({
  name,
  placeholder,
  field,
  onChange,
  setRequirements,
}) => {
  //   const { paginationParams, filterProps } = usePagination();
  //   const { data, isLoading, refetch } = useHarbors(paginationParams);

  const handleChange = (newValues: MultiValue<Partial<RequirementType>>) => {
    if (setRequirements) {
      setRequirements(newValues as Partial<RequirementType>[]);
    }

    if (onChange) {
      onChange(newValues as Partial<RequirementType>[]);
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
      noOptionsMessage={() => 'requirement not found'}
      //   isLoading={isLoading}
      options={data}
      getOptionLabel={(requirement: Partial<RequirementType>) =>
        `${requirement.name} - ${requirement.id}`
      }
      getOptionValue={(requirement: Partial<RequirementType>) =>
        requirement.id ? requirement.id.toString() : ''
      }
      onChange={(newValues) =>
        handleChange(newValues as Partial<RequirementType>[])
      }
      value={
        field?.value
          ? data.filter(
              (opt: Partial<RequirementType>) =>
                field.value.indexOf(opt.id) >= 0
            )
          : []
      }
      closeMenuOnSelect={false}
      placeholder={placeholder}
      components={requirementComponents}
    />
  );
};

export default RequirementMultiSelectBase;
