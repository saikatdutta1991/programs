const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

function readLine(question) {
    return new Promise((resolve, reject) => {
        readline.question(question, (answer) => resolve(answer));
    });
}

function battleField(falcorniaArmy) {

    let langaburuArmy = { H  : 100, E : 50, AT : 10, SG : 5 };
    let deployed = { H  : 0, E : 0, AT : 0, SG : 0 };
    let remaining = { H  : 0, E : 0, AT : 0, SG : 0 };


    function requiredToAttack(n) {
        return Math.ceil( n / 2 );
    }

    function deploy(unit, n) {
        let res = getUnit(unit, n);
        langaburuArmy[unit] = langaburuArmy[unit] - res[unit];
        deployed[unit] += res[unit];
        remaining[unit] += res.remaining;
    }

    function getReplacement(unit, n) {
        
        if(unit == 'H') {
            return [getUnit('E', Math.ceil(n / 2))];
        } else if(unit == 'SG') {
            return [getUnit('AT', n * 2)];
        } else if(unit == 'E') {
            let h = getUnit('H', n * 2);
            return [h, getUnit('AT', Math.ceil( (n - Math.ceil(h.H / 2)) / 2) )];
        } else if(unit == 'AT') {
            let e = getUnit('E', n * 2);
            return [e, getUnit('SG', Math.ceil( (n - Math.ceil(e.E / 2)) / 2))];
            
        }
    
    }

    function getUnit(u, n) {

        if( langaburuArmy[u] >= n ) {
            return { [u] : n, remaining : 0, unit : u }
        } else {
            return { [u] : langaburuArmy[u], remaining : n - langaburuArmy[u], unit : u }
        }
    }

    function isWon() {
        let sum = Object.keys(remaining).reduce((a, c) => {
            return a + remaining[c]
        }, 0);

        return sum === 0;
    }

    function replace(unit) {
        let r = getReplacement(unit, remaining[unit]);
        
        r.forEach( x => { 
            deploy(x.unit, x[x.unit]);
            if(x[x.unit] !== 0) {
                remaining[unit] = 0;
            }
        });
    }

    function start() {
        
        deploy('H', requiredToAttack(falcorniaArmy['H']));
        deploy('E', requiredToAttack(falcorniaArmy['E']));
        deploy('AT', requiredToAttack(falcorniaArmy['AT']));
        deploy('SG', requiredToAttack(falcorniaArmy['SG']));

        replace('H');
        replace("E");
        replace("AT");
        replace("SG");
    

        return `Lengaburu deploys ` + Object.keys(deployed).map( u => {
            return `${deployed[u]} ${u}`;
        })
        .join(', ') + ` and ${isWon() ? 'wins' : 'loses'}`;

    }

    return { start : start };

}

function parseInput(input) {

    let arr = input.split(" ");
    return {
        [arr[4].split(",")[0]] : parseInt(arr[3]),
        [arr[6].split(",")[0]] : parseInt(arr[5]),
        [arr[8].split(",")[0]] : parseInt(arr[7]),
        [arr[10].split(",")[0]] : parseInt(arr[9])
    };
}

(async function main(){

    console.log("\nPress ctrl + c to quit");

    while(true) {
        
        
        let input = await readLine("\ninput: ");
        let falcorniaArmy = parseInput(input);
    
        let res = battleField(falcorniaArmy).start();
        console.log(res);
    }

})();



// Input: Falicornia attacks with 100 H, 101 E, 20 AT, 5 SG
// Expected Output: Lengaburu deploys 52 H, 50 E, 10 AT, 3 SG and wins

// Input: Falicornia attacks with 150 H, 96 E, 26 AT, 8 SG
// Expected Output: Lengaburu deploys 75 H, 50 E, 10 AT, 5 SG and wins

// Input: Falicornia attacks with 250 H, 50 E, 20 AT, 15 SG
// Expected Output: Lengaburu deploys 100 H, 38 E, 10 AT, 5 SG and loses
