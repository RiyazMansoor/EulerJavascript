
import { Integer, Set } from "./common";

const len: Integer = parseInt(process.argv[2] ?? "3");

Set.Combinations(6, len).forEach( s => console.log(s) );

