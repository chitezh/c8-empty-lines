import test from "ava";
import { main } from "../main";

test(`main`, (t) => {
    t.is(main(), `just a simple function`);
});