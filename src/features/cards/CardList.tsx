
import {Card} from 'deckofcardslib'

const CardList = ({cards}: {cards: Card[]}) => {
    return (
        <div>
            {cards.map(card => {
            return (<img src={card.image} className="card" alt={card.value} />)
            })}
        </div>
    )
}

export default CardList;