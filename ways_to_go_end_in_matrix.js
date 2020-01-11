<script>

/**
 * You are given an N by M matrix of 0s and 1s. Starting from the top left corner, how many ways are there to reach the bottom right corner?
    You can only move right and down. 0 represents an empty space while 1 represents a wall you cannot walk through.
    Return two, as there are only two ways to get to the bottom right:

    Right, down, down, right
    Down, right, down, right
*/


function initPath({ mat, endx, endy }) {

    let rows = mat.length,
        cols = mat[0].length;

    function isValidCell(x, y) {
        
        if(x >= rows || y >= cols) return false;
        
        if(mat[x][y] === 1) return false;
        
        return true;
    }

    function isReached(x, y) {
        return (x === endx && y === endy);
    }

    function findWays(x, y) {

        if(isReached(x, y)) {
            return 1;
        }

        if(isValidCell(x, y)) {
            return findWays(x + 1, y) + findWays(x, y + 1);
        }

        return 0;
    }

    return { waysCount : findWays };

}   


let matrix = [
    [0, 0, 0, 1],
    [0, 1, 0, 0],
    [0, 0, 0, 0],
    [1, 1, 1, 0],
];

let path = initPath({ mat : matrix, endx : 3, endy : 3});
console.log( path.waysCount(0, 0) )




</script>
