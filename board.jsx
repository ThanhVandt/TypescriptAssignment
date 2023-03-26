import { useEffect, useState } from "react";
import Square from "./square";

const Board = () => {
    const [time, setTime] = useState(3);
    const [game, setGame] = useState([null, null, null, null, null, null, null, null, null]);
    const [color, setColor] = useState([false, false, false, false, false, false, false, false, false]);
    const [player, setPlayer] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(time - 1);
            if (time <= 0) {
                setTime(3);
                if (!player === true || !player === false) {
                    const gameRun = game.reduce((g, rand, index) => {
                        if (rand === null) {
                            return [...g, index];
                        }
                        return g;
                    }, []);
                    const random = Math.floor(Math.random() * gameRun.length);
                    const position = gameRun[random];

                    const newGame = game.map((g, index) => {
                        if (index === position) {
                            return player ? "X" : "O";
                        }
                        return g;
                    });

                    setGame(newGame);
                    setPlayer(!player);
                }
            }
        }, 1000);
        if (checkWinner() || !game.includes(null)) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [time, player, game]);
    useEffect(() => {
        if (checkWinner()) {
            change();
        }
    }, [game])

    const handlePlay = (position) => {
        if (checkWinner()) {
            return;
        }
        if (game[position] === null) {
            const newGame = game.map((g, index) => {
                if (index === position) {
                    return player ? "X" : "O";
                }
                return g;
            });
            setGame(newGame);
            setPlayer(!player);
            setTime(3);
        }
    };

    const listWinner = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    const change = () => {
        let boxColor = [false, false, false, false, false, false, false, false, false];
        for (let i = 0; i < listWinner.length; i++) {
            const [p1, p2, p3] = listWinner[i];
            if (game[p1] && game[p1] === game[p2] && game[p2] === game[p3]) {
                boxColor[p1] = true;
                boxColor[p2] = true;
                boxColor[p3] = true;
            }
        }
        setColor(boxColor);
    };
    const checkWinner = () => {
        for (let i = 0; i < listWinner.length; i++) {
            const [p1, p2, p3] = listWinner[i];
            if (game[p1] && game[p1] === game[p2] && game[p2] === game[p3]) {
                return game[p1];
            }
        }
        return null;
    };
    const winner = checkWinner();
    let check = "";
    if (winner) {
        check = `Người thắng: ${winner}`;
    } else if (!game.includes(null)) {
        check = "Hòa";
    } else {
        check = `Lượt: ${player ? "X" : "O"}`;
    }
    const Reset = () => {
        setGame([null, null, null, null, null, null, null, null, null]);
        setPlayer(player ? "X" : "O");
        setTime(3);
        return;
    }
    return (
        <>
            <div className="grid grid-cols-2 gap-20"></div>
            <h2>{time}</h2>
            <h2>{check}</h2>
            <button className="bg-green-200 hover:bg-emerald-400 rounded">Undo</button><br/>
            <div className="grid grid-cols-3 gap-2 w-[240px]">
                <Square value={game[0]} position={0} handlePlay={handlePlay} changeColor={color[0]} />
                <Square value={game[1]} position={1} handlePlay={handlePlay} changeColor={color[1]} />
                <Square value={game[2]} position={2} handlePlay={handlePlay} changeColor={color[2]} />
                <Square value={game[3]} position={3} handlePlay={handlePlay} changeColor={color[3]} />
                <Square value={game[4]} position={4} handlePlay={handlePlay} changeColor={color[4]} />
                <Square value={game[5]} position={5} handlePlay={handlePlay} changeColor={color[5]} />
                <Square value={game[6]} position={6} handlePlay={handlePlay} changeColor={color[6]} />
                <Square value={game[7]} position={7} handlePlay={handlePlay} changeColor={color[7]} />
                <Square value={game[8]} position={8} handlePlay={handlePlay} changeColor={color[8]} />
            </div><br/>
            <button onClick={Reset} className="bg-emerald-600 hover:bg-emerald-800 text-white rounded">New game</button>
        </>
    );
};

export default Board;