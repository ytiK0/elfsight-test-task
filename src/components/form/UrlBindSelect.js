import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState
} from 'react';
import { useQueryParams } from '../../hooks';
import Select from 'react-select';

const selectStyles = {
  container: (base) => ({
    ...base,
    width: '100%'
  }),
  control: (base) => ({
    ...base,
    color: '#ffffff',
    padding: '12px 16px',
    backgroundColor: '#263750',
    border: '1px solid #83BF46',
    borderRadius: 8,
    lineHeight: '16px'
  }),
  singleValue: (base) => ({
    ...base,
    color: 'white'
  }),
  valueContainer: (base) => ({
    ...base,
    padding: 0
  }),
  input: (base) => ({
    ...base,
    height: '16px',
    padding: 0,
    margin: 0
  }),
  indicatorSeparator: () => ({
    display: 'none'
  }),
  option: (base, state) => ({
    ...base,
    color: '#000',
    fontWeight: state.isSelected ? 600 : 400,
    backgroundColor: state.isFocused ? '#83BF4633' : null,
    '&:hover': {
      backgroundColor: '#83BF4633'
    }
  }),
  dropdownIndicator: (base, state) => {
    const {
      selectProps: { menuIsOpen, value }
    } = state;

    base.padding = 0;
    base.transition = 'rotate 0.1s linear';

    if (menuIsOpen) {
      return { ...base, color: '#ffffff', rotate: '-180deg' };
    } else if (value !== null) {
      return { display: 'none' };
    } else {
      return base;
    }
  },
  clearIndicator: (base, state) => {
    const {
      selectProps: { menuIsOpen }
    } = state;

    base.padding = 0;

    if (menuIsOpen) {
      return { display: 'none' };
    } else {
      return base;
    }
  }
};

export const UrlBindSelect = forwardRef(function (
  { paramKey, placeholder, options, onChange },
  ref
) {
  const { getParam, setParam, removeParam } = useQueryParams();

  const [selected, setSelected] = useState(() => {
    const queryValue = getParam(paramKey);

    return options.find(({ value }) => value === queryValue) || null;
  });

  const handleSelectChange = useCallback(
    (newSelected) => {
      setSelected(newSelected);

      if (onChange) {
        onChange(newSelected);
      }
    },
    [onChange]
  );

  useEffect(() => {
    if (selected === null) {
      removeParam(paramKey);
    } else {
      setParam(paramKey, selected.value);
    }
  }, [paramKey, removeParam, selected, setParam]);

  useImperativeHandle(
    ref,
    () => ({
      reset() {
        setSelected(null);
      }
    }),
    []
  );

  return (
    <Select
      options={options}
      isClearable={true}
      placeholder={placeholder}
      onChange={handleSelectChange}
      styles={selectStyles}
      value={selected}
      maxMenuHeight={160}
    />
  );
});
