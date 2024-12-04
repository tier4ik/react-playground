import { useState, useRef } from "react";
import { uuidv7 } from "uuidv7";
import MemoryGameCard from "./MemoryGameCard";
// custom hooks
import { useWatchIsVictory } from "./hooks/useWatchIsVictory";

type CardType = {
    id: string;
    src: string;
    isOpen: boolean;
}

function MemoryGameField({images}: {images: string[]}) {
    function fillCards() {
        const gameImages = images.concat(images);
        const shuffled = (function() {
            return gameImages.sort(() => Math.random() < 0.5 ? 1 : -1)
        })();
        return shuffled.map(img => ({id: uuidv7(), src: img, isOpen: false}))
    }    
    const [cards, setCards] = useState<CardType[]>(fillCards);
    const [openedCard, setOpenedCard] = useState<CardType | null>(null);
    const [isVictory, setIsVictory] = useState(false);
    const points = useRef(0);

    useWatchIsVictory(isVictory);

    function openCards(openedCard: CardType, currentRevealedCard: CardType) {
        setCards(prevCards => prevCards.map(c => c.id === openedCard.id || c.id === currentRevealedCard?.id ? {...c, isOpen: true} : c))
    }
    function closeCards(openedCard: CardType, currentRevealedCard: CardType) {
        // need timeout to play animation
        setTimeout(() => {
            setCards(prevCards => prevCards.map(c => c.id === openedCard.id || c.id === currentRevealedCard?.id ? {...c, isOpen: false} : c))
        }, 500)
    }
    function checkAreCardsTheSame(currentCard: CardType) {
        return currentCard.src === openedCard?.src
    }
    function checkIsGameOver() {
        return points.current === cards.length;
    }
    function increasePoints() {
        points.current += 2;
    }
    function showVictory() {
        setTimeout(() => {
            setIsVictory(true)
        }, 1000)
    }
    const revealTheCard = (id: string) => {
        const currentRevealedCard = cards.find(c => c.id === id);
        if (openedCard) {
            if (checkAreCardsTheSame(currentRevealedCard!)) {
                openCards(openedCard, currentRevealedCard!);
                increasePoints();
                if (checkIsGameOver()) {
                    showVictory()
                }
            } else {
                openCards(openedCard, currentRevealedCard!);
                closeCards(openedCard, currentRevealedCard!);
            }
            setOpenedCard(null);
        } else {
            setCards(prevCards => prevCards.map(c => c.id === currentRevealedCard?.id ? {...c, isOpen: true} : c))
            setOpenedCard(currentRevealedCard!);
        }
    };
    return (
        <div className="memory-game__field">
            {
                cards.map((card) => <MemoryGameCard key={card.id} id={card.id} src={card.src} isOpen={card.isOpen} clickHandler={revealTheCard}/>)
            }
        </div>
    )
}

export default MemoryGameField;