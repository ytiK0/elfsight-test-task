import styled from 'styled-components';
import { Logo } from './Logo';
import { FilterForm } from '../form';

export function Header() {
  return (
    <HeaderContainer>
      <Logo />
      <FilterForm />
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 950px) {
    flex-direction: column;
    gap: 30px;
  }
`;
