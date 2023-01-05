import {Card, Suit, suitsEnumToString} from 'deckofcardslib';

const CardDistribution = ({cards}: {cards?: Card[]}) => {
  if (!cards || cards.length === 0) {
    return null;
  }

  // Object allows for easier count incrementing.
  const suitCountMap = new Map<Suit, {count: number}>([
    [Suit.Enum.HEARTS, {count: 0}],
    [Suit.Enum.CLUBS, {count: 0}],
    [Suit.Enum.DIAMONDS, {count: 0}],
    [Suit.Enum.SPADES, {count: 0}],
  ]);

  cards.forEach(card => {
    const counter = suitCountMap.get(card.suit);
    if (counter) {
      counter.count++;
    }
  });

  return (
    <div>
      <p style={{textAlign: 'center', fontSize: 16, fontWeight: 'bold'}}>
        Distributions
      </p>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}>
        {[...suitCountMap.entries()].map(entry => (
          <div key={entry[0]}>
            <p>{suitsEnumToString(entry[0])}</p>
            <p>{entry[1].count}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardDistribution;
