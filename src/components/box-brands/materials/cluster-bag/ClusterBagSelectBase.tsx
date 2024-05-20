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
import { ClusterBagType } from '../../../../types/box-brand/materials/clusterBag';

interface ClusterBagSelectBaseProps {
  name?: string;
  field?: FieldInputProps<any>;
  placeholder: string;
  setClusterBag?: (clusterBag: Partial<ClusterBagType>) => void;
  onChange?: (newValue: Partial<ClusterBagType>) => void;
}

const data: Partial<ClusterBagType>[] = [
  {
    id: 1,
    name: 'Cluster Bag1',
    quantityPerPack: 500,
    art: 'Arte1',
    dimensions: 'dimensions1',
  },
  {
    id: 2,
    name: 'Cluster Bag2',
    quantityPerPack: 750,
    art: 'Arte2',
    dimensions: 'dimensions2',
  },
  {
    id: 3,
    name: 'Cluster Bag3',
    quantityPerPack: 1000,
    art: 'Arte3',
    dimensions: 'dimensions3',
  },
];

const chakraStyles: ChakraStylesConfig<
  Partial<ClusterBagType>,
  false,
  GroupBase<Partial<ClusterBagType>>
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

const clusterBagComponents = {
  DropdownIndicator: (
    props: DropdownIndicatorProps<
      Partial<ClusterBagType>,
      false,
      GroupBase<Partial<ClusterBagType>>
    >
  ) => (
    <chakraComponents.DropdownIndicator {...props}>
      <Icon as={MdOutlineArrowDropDownCircle} size='13px' />
    </chakraComponents.DropdownIndicator>
  ),
};

const ClusterBagSelectBase: React.FC<ClusterBagSelectBaseProps> = ({
  name,
  field,
  placeholder,
  setClusterBag,
  onChange,
}) => {
  //   const { paginationParams, filterProps } = usePagination();
  //   const { data, isLoading, refetch } = useClusterBags(paginationParams);

  const handleChange = (newValue: SingleValue<Partial<ClusterBagType>>) => {
    if (setClusterBag) setClusterBag(newValue as Partial<ClusterBagType>);
    if (onChange) onChange(newValue as Partial<ClusterBagType>);
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
      noOptionsMessage={() => 'cluster bag not found'}
      //   isLoading={isLoading}
      options={data}
      getOptionLabel={(opt: Partial<ClusterBagType>) => `${opt.name}`}
      getOptionValue={(opt: Partial<ClusterBagType>) =>
        opt.id ? opt.id.toString() : ''
      }
      onChange={(newValue) => handleChange(newValue)}
      value={
        field?.value
          ? data.find((opt: Partial<ClusterBagType>) => opt.id === field?.value)
          : undefined
      }
      placeholder={placeholder}
      //   onInputChange={(newValue) => {
      //     filterProps.setSearch(newValue);
      //     refetch();
      //   }}
      components={clusterBagComponents}
    />
  );
};

export default ClusterBagSelectBase;
