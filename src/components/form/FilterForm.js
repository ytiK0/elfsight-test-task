import styled from 'styled-components';
import { UrlBindInput } from './UrlBindInput';
import { UrlBindSelect } from './UrlBindSelect';
import { Button } from '../common';
import { useData } from '../providers';
import { useCallback, useRef } from 'react';
import { setFilterParameters } from '../../utils';

const statusOptions = [
  { value: 'alive', label: 'Alive' },
  { value: 'dead', label: 'Dead' },
  { value: 'unknown', label: 'Unknown' }
];

const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'genderless', label: 'Genderless' },
  { value: 'unknown', label: 'Unknown' }
];

const speciesOptions = [
  { value: 'human', label: 'Human' },
  { value: 'alien', label: 'Alien' },
  { value: 'humanoid', label: 'Humanoid' },
  { value: 'mythological', label: 'Mythological' },
  { value: 'animal', label: 'Animal' },
  { value: 'robot', label: 'Robot' },
  { value: 'poopybutthole', label: 'Poopybutthole' },
  { value: 'Unknown', label: 'Unknown' }
];

export function FilterForm() {
  const { setApiURL, setActivePage } = useData();
  const resetersRef = useRef({});

  const addRef = (key) => (ref) => {
    resetersRef.current[key] = ref;
  };

  const handleSubmit = useCallback(
    (ev) => {
      ev.preventDefault();

      setApiURL((prevUrl) => setFilterParameters(prevUrl));
      setActivePage(0);
    },
    [setActivePage, setApiURL]
  );

  const handleReset = useCallback(
    (ev) => {
      ev.preventDefault();
      for (const key in resetersRef.current) {
        resetersRef.current[key].reset();
      }
      setApiURL((prevUrl) => {
        const resetUrl = new URL(prevUrl);
        resetUrl.search = '';

        return resetUrl.toString();
      });
    },
    [setApiURL]
  );

  return (
    <StyledForm onSubmit={handleSubmit}>
      <UrlBindSelect
        ref={addRef('status')}
        paramKey={'status'}
        placeholder={'Status'}
        options={statusOptions}
      />

      <UrlBindSelect
        ref={addRef('gender')}
        paramKey={'gender'}
        placeholder={'Gender'}
        options={genderOptions}
      />

      <UrlBindSelect
        ref={addRef('species')}
        paramKey={'species'}
        placeholder={'Species'}
        options={speciesOptions}
      />

      <UrlBindInput
        ref={addRef('name')}
        paramKey={'name'}
        placeholder={'Name'}
      />
      <UrlBindInput
        ref={addRef('type')}
        paramKey={'type'}
        placeholder={'Type'}
      />

      <ButtonsWrapper>
        <Button type={'submit'}>Apply</Button>
        <Button onClick={handleReset} color={'#FF5152'}>
          Reset
        </Button>
      </ButtonsWrapper>
    </StyledForm>
  );
}

const StyledForm = styled.form`
  width: 100%;
  max-width: 560px;
  display: grid;
  grid-template: repeat(2, auto) / repeat(3, 1fr);
  gap: 10px;

  @media (max-width: 950px) {
    max-width: 480px;
    gap: 15px;
  }

  @media (max-width: 530px) {
    max-width: 240px;
    grid-template-columns: repeat(1, 1fr);
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;

  @media (max-width: 530px) {
    flex-direction: column;
    gap: 15px;
  }

  & > button {
    flex: 1;
  }
`;
