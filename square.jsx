const Square = ({ value, position, handlePlay, changeColor }) => {
    const squareHandlePlay = () => {
        if (!value) {
            handlePlay(position)
        }
    }
    const color = changeColor ? "w-[70px] h-[70px] bg-emerald-200 text-3xl text-white" : "w-[70px] h-[70px] bg-[#14bdac] text-3xl text-white";
    return <>
        <button
            onClick={squareHandlePlay}
            className={color}>
            {value}
        </button>
    </>
}

export default Square