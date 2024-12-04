function MemoryGameCard({id, src, isOpen, clickHandler}: {id: string, src: string, isOpen: boolean, clickHandler: (id: string) => void}) {
    return (
        <div 
            className={isOpen ? "memory-game__card memory-game__card_open" : "memory-game__card"}
            onClick={() => {
                if (isOpen) return;
                clickHandler(id)
            }}>
            <div className="memory-game__card-inner">
                <div className="memory-game__card-front">
                    <img className="memory-game__card-image" src={src} alt="Memory game card image" />
                </div>
                <div className="memory-game__card-back"></div>
            </div>
        </div>
    )
}
export default MemoryGameCard;