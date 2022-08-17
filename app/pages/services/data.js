import { getOr } from 'lodash/fp'

const bombLocations = [
  {y: 0, x: 1},
  {y: 1, x: 1},
  {y: 5, x: 5},
]

// TODO: output the bomb adjancet counts
export const initGameState = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((y) => {
  return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((x) => {
    const bomb = bombLocations.some((bombLocation) => {
      return bombLocation.y === y && bombLocation.x === x
    })

    return {x, y, bomb, revealed: false, bombSurroundCount: 0}
  })
})

export const initGameStateWithBombCounts = initGameState.map((row) => {
  return row.map((cell) => {

    const surroundingCells = [
      getOr(undefined, `[${cell.y - 1}].[${cell.x}]`)(initGameState), // north
      getOr(undefined, `[${cell.y - 1}].[${cell.x + 1}]`)(initGameState), // north east
      getOr(undefined, `[${cell.y}].[${cell.x + 1}]`)(initGameState), // east
      getOr(undefined, `[${cell.y + 1}].[${cell.x + 1}]`)(initGameState), // south east
      getOr(undefined, `[${cell.y + 1}].[${cell.x}]`)(initGameState), // south
      getOr(undefined, `[${cell.y + 1}].[${cell.x - 1}]`)(initGameState), // south west
      getOr(undefined, `[${cell.y}].[${cell.x - 1}]`)(initGameState), // west
      getOr(undefined, `[${cell.y - 1}].[${cell.x - 1}]`)(initGameState), // north west
    ]

    const bombSurroundCount = surroundingCells.reduce((acc, adjancetCell) => {
      if (adjancetCell !== undefined && adjancetCell.bomb) {
        return acc + 1;
      }

      return acc;
    }, 0)

    return {
      ...cell,
      bombSurroundCount,
    }
  })
})
