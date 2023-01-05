

import {Card, SuitFlag, suitsFlagToString} from 'deckofcardslib';

const FilterToggles = ({
  cards,
  isSortEnabled,
  setIsSortEnabled,
  filterSuits,
  toggleSuit,
}: {
  cards?: Card[];
  isSortEnabled: boolean;
  setIsSortEnabled: (val: boolean) => void;
  filterSuits: SuitFlag;
  toggleSuit: (val: SuitFlag) => void;
}) => {
  if (!cards || cards.length < 1) {
    return null;
  }

  const SuitToggle = ({suit}: {suit: SuitFlag}) => {
    return (
      <div>
        <p>{suitsFlagToString(suit)}</p>
        <input type='checkbox' id={suitsFlagToString(suit)} checked={(filterSuits & suit) > 0} onChange={() => toggleSuit(suit)} />
      </div>
    );
  };

  return (
    <div style={{marginBottom: 15}}>
      <p style={{textAlign: 'center', fontSize: 16, fontWeight: 'bold'}}>
        Sort and Filters
      </p>
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <div>
          <p>Sort</p>
          <input type='checkbox' id='sort' checked={isSortEnabled} onChange={() => setIsSortEnabled(!isSortEnabled)} />
        </div>
        <SuitToggle suit={SuitFlag.Hearts} />
        <SuitToggle suit={SuitFlag.Clubs} />
        <SuitToggle suit={SuitFlag.Diamonds} />
        <SuitToggle suit={SuitFlag.Spades} />
      </div>
    </div>
  );
};

export default FilterToggles;
