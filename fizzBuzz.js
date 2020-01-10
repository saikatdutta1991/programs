var options  = { 3 : "Fizz", 5 : "Buzz" }

    function isDivisibleBy(n, m) {
        return n % m == 0;
    }

    function fizzBuzz(n, options) {
        console.log(n);
        let multipliers = Object.keys(options);
        let result = "";

        multipliers.forEach((m) => {
            if(isDivisibleBy(n, m)) {
                result += options[m];
            }
        });

        return result.length ? result : n;

    }

    function fizzBuzzLogger(n, options) {

        for(let i = 1; i <= n; i++) {
            console.log(fizzBuzz(i, options))
        }

    }
