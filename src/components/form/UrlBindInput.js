import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState
} from 'react';
import { useQueryParams, useDebounce } from '../../hooks';
import styled from 'styled-components';

export const UrlBindInput = forwardRef(function (
  { paramKey, placeholder, onChange },
  ref
) {
  const { getParam, setParam, removeParam } = useQueryParams();

  const [inputValue, setInputValue] = useState(() => {
    return getParam(paramKey) || '';
  });
  const debounceValue = useDebounce(inputValue);

  const handleInputChange = useCallback((event) => {
    const target = event.target;

    setInputValue(target.value);
  }, []);

  useEffect(() => {
    if (debounceValue === '') {
      removeParam(paramKey);
    } else {
      setParam(paramKey, debounceValue);
    }

    if (onChange) {
      onChange(debounceValue);
    }
  }, [debounceValue, onChange, paramKey, removeParam, setParam]);

  useImperativeHandle(
    ref,
    () => ({
      reset() {
        setInputValue('');
      }
    }),
    []
  );

  return (
    <StyledInput
      type={'text'}
      onChange={handleInputChange}
      value={inputValue}
      placeholder={placeholder}
    />
  );
});

const StyledInput = styled.input`
  width: 100%;
  border-radius: 8px;
  padding: 12px 16px;
  background: #263750;
  border: 1px solid #83bf46;
  color: #f5f5f5;
  transition: background-color 0.2s linear;
  font-size: 16px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  &::placeholder {
    color: #b3b3b3;
  }
  &:hover {
    background: #334466;
  }
`;
