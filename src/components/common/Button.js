import styled from 'styled-components';

export function Button({ color, children, type, onClick }) {
  return (
    <StyledButton onClick={onClick} type={type} _color={color}>
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  padding: 12px;
  border: 1px solid ${({ _color }) => _color || '#83BF46'};
  color: ${({ _color }) => _color || '#83BF46'};
  background: transparent;
  border-radius: 8px;
  transition: background 0.1s linear;
  &:hover {
    color: #ffffff;
    background: ${({ _color }) => _color || '#83BF46'};
  }
`;
