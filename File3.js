import { array1 } from "./File1.js";
import { array2 } from "./File2.js";

const finalArray = [...array1, ...array2];

console.log(finalArray);