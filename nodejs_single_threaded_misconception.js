// process.env.UV_THREADPOOL_SIZE = 1;

const { pbkdf2 } = require("crypto");

const start = Date.now();
const doExpensiveHashing = () => {
  pbkdf2("pwd", "salt", 100000, 512, "sha512", () =>
    console.log(`Done in ${Date.now() - start}ms`)
  );
};

doExpensiveHashing();
doExpensiveHashing();
doExpensiveHashing();
doExpensiveHashing();
