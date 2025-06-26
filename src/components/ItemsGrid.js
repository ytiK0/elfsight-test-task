import { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Popup } from './popup';
import { useData } from './providers';
import { Card } from './Card';

const defaultPopupSettings = {
  visible: false,
  content: {}
};

export function ItemsGrid() {
  const { characters } = useData();
  const [popupSettings, setPopupSettings] = useState(defaultPopupSettings);

  const handleCardClick = useCallback((character) => {
    setPopupSettings({
      visible: true,
      content: { ...character }
    });
  }, []);

  const cards = useMemo(() => {
    return characters.map((character) => ({
      ...character,
      onClickHandler: () => handleCardClick(character)
    }));
  }, [characters, handleCardClick]);

  if (!characters.length) {
    return null;
  }

  return (
    <Container>
      {cards.map((props) => (
        <Card key={props.id} {...props} />
      ))}

      <Popup settings={popupSettings} setSettings={setPopupSettings} />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  justify-items: center;
  gap: 30px;
`;
