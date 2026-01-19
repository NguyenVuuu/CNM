// const mathUtils = require("./mathUtils");

import { sayHello } from "./greeting.js";
import { add, subtract, multiply } from "./mathUtils.js";

console.log('hello node.js');

console.log('----------------------');

console.log("Add:", add(5, 3));
console.log("Subtract:", subtract(10, 4));

console.log('----------------------');

console.log("Multiply:", multiply(20, 5));

console.log('----------------------');

const name = 'Lan'
sayHello(name)