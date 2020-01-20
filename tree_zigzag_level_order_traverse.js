<script>

/**  This is binary tree node **/
function Node( key ) {
    this.key = key;
    this.left = null;
    this.right = null;
}

function levelOrderTraverse( root ) {

    let nodeValues = [],
        queue = [];

    queue.push( root ); // push the root node to start

    // check untill queue is not empty, 
    // and dequeue node and push to nodeValues 
    // and then enqueue the childrends of current node
    while( queue.length ) {

        let node = queue.shift();

        if( node ) {
            
            nodeValues.push( node.key);

            queue.push( node.left );
            queue.push( node.right );
        }

    }

    return nodeValues;    

}


function zigzagOrderTraversal( root ) {

    let nodeValues = [],
        currentStack = [],
        nextStack = [],
        isLeftToRight = true,
        node = null;

    // push root to current stack to start start trasaversal
    currentStack.push( root );

    while( currentStack.length ) {


        if( node = currentStack.pop() ) {

            nodeValues.push( node.key );

            nextStack.push( isLeftToRight ? node.left : node.right );
            nextStack.push( isLeftToRight ? node.right : node.left );

        }

        if( !currentStack.length ) {

            isLeftToRight = !isLeftToRight;
            currentStack = nextStack;
            nextStack = [];
        }


    }

    return nodeValues;

}



let root = new Node( 1 );
root.left = new Node( 2 );
root.right = new Node( 3 );
root.left.left = new Node( 4 );
root.left.right = new Node( 5 );
root.right.left = new Node( 6 );
root.right.right = new Node( 7 );


console.log( levelOrderTraverse( root ) )
console.log( zigzagOrderTraversal( root ) )


</script>
