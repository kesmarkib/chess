import { For, Index } from 'solid-js';
import './App.css'
import { Tile, type TileProps } from './components/tile';

function App() {

  const rows = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const columns = [1, 2, 3, 4, 5, 6, 7, 8];


  const tiles : Array<Array<TileProps>> = Array.from({ length: rows.length }, (_, rowIndex) =>
    Array.from({ length: columns.length }, (_, columnIndex) => ({
      pos: `${rows[rowIndex]}${columns[columnIndex]}`,
      isSelected: false,
      color: (rowIndex + columnIndex) % 2 === 0 ? 'white' : 'black',
      onClick: () => {}
    }))
  );

  return (
    <>
      <h1>Hello World</h1>
      <div class="chessboard">
        <Index each={rows}>
          {(item, index) => {
            return <div class="row-number">{item()}</div>
          }}
        </Index>
        <Index each={tiles}>
          {(item, index) => {
            const itemArray = item();
            return <>
            <div class="column-number">{columns[index]}</div>
            <Index each={itemArray}>
              {(item, index) => {
                return <>
                
                <Tile isSelected={false} pos={item().pos} color={item().color} onClick={() => {}} />
                </>
              }}
            </Index>
            </>
          }}
        </Index>
      </div>
    </>
  )
}

export default App
