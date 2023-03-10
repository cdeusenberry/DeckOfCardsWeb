import { useEffect, useState } from 'react'

import {CardDistribution, CardList, FilterToggles} from './features/cards';
import './App.css'

import {
  Card,
  SuitFlag,
  filterCardsBySuits,
  sortCards,
  useDecks,
  useHand,
  useReturnHand,
} from 'deckofcardslib'

function App() {
  const [hand, setHand] = useState<Card[]>([]);
  const [isSortEnabled, setIsSortEnabled] = useState(false);
  const [filterSuits, setFilterSuits] = useState(SuitFlag.All);

  const {
    data: deck,
    isLoading: deckLoading,
    refetch: fetchNewDeck,
  } = useDecks();

  const {data: cardCollectionData, isLoading: handLoading} = useHand(
    deck?.deck_id || '',
    {enabled: !!deck},
  );

  useEffect(() => {
    if (!cardCollectionData) {
      setHand([]);
      return;
    }

    // Only 5 cards, not a big deal
    const cardsCopy = [...cardCollectionData.cards];

    if (isSortEnabled) {
      sortCards(cardsCopy);
    }

    const filteredCards = filterCardsBySuits(cardsCopy, filterSuits);

    setHand(filteredCards);
  }, [cardCollectionData, isSortEnabled, filterSuits]);

  const {mutate: returnHand} = useReturnHand();

  const onGetDeckPressed = () => {
    fetchNewDeck();
  };

  const onGetHandPressed = () => {
    if (!deck) {
      return;
    }

    returnHand(deck.deck_id);
  };

  let messageText: string | undefined;
    if (deckLoading || handLoading) {
      messageText = 'Loading Data!';
    } else if (!deck) {
      messageText = 'Get a Deck!';
    } else if (!cardCollectionData) {
      messageText = 'Get a Hand!';
    }

  if (messageText) {
    return (
      <p>
        {messageText}
      </p>
    )
  }

  if (!deck || !hand) {
    return null;
  }

  return (
    <div className="App">
      <h1>Deck of Cards!</h1>
      <div>
        <button onClick={onGetDeckPressed}>
          Get a Deck!
        </button>
        <button onClick={onGetHandPressed}>
          Get a Hand!
        </button>
      </div>
      <CardDistribution cards={cardCollectionData?.cards} />
      <FilterToggles
          cards={cardCollectionData?.cards}
          isSortEnabled={isSortEnabled}
          setIsSortEnabled={setIsSortEnabled}
          filterSuits={filterSuits}
          toggleSuit={suit => setFilterSuits(filterSuits ^ suit)}
        />
      <CardList cards={hand} />
    </div>
  )
}

export default App
