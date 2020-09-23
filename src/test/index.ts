import test from "ava";
import { main } from "..";

test(`main`, (t) => {
    t.is(main(), `just a simple function`);
})