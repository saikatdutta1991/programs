<script>

    function makeFizzBuzzLogger(n, options) {

        let multipliers = Object.keys(options).map( x => parseInt(x));

        
        function isDivisible(n, m) {
            return n % m == 0;
        }

        function fizzBuzz(n) {
        
            let fizzbuzz =  multipliers.reduce((res, multiplier) => {
                return res + ( isDivisible(n, multiplier) ? options[multiplier] : "" );
            }, "");

            return fizzbuzz.length ? fizzbuzz : n; 
        }

        function run() {
        
            let numbers = Array.from({ length : n }, (x,i) => i + 1);
            return numbers.map( x => fizzBuzz(x));
        }

        return { run : run };
    }





    var options  = { 3 : "Fizz", 5 : "Buzz", 7 : "Woff" };
    var results = makeFizzBuzzLogger(50, options).run();

    console.log(results);


</script>
