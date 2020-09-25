# c8 [reporting issue](https://github.com/bcoe/c8/issues/112)

C8 mistakenly reports lack of coverage for empty lines - sometimes.
This only seems to happen to files with `export * from ...` pattern
with a newline preceeding EOF - at least that is the observed pattern.
I am not very familiar with the inner workings of c8. 


## This simple POC of the issue, provides two demonstrations.
Before we get into it, the source is organized to be accessed in two ways:

src/
  index.ts         - an exporter of main.ts (the problem file)
  main.ts          - the simple business end of the code


### Installation

```
git clone https://github.com/sramam/c8-empty-lines
npm install
NODE_V8_COVERAGW=./.c8-data

```

### The successful case - 100% coverage

```
rm -rf .c8-data .c8-report
npm run build
npm run test-main
npm run report
```

```
npm run report     

> c8-empty-lines@1.0.0 report C:\Users\srama\tmp\c8-empty-lines
> c8 report -r lcov -r text --report-dir ./.c8-report

----------|---------|----------|---------|---------|-------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------|---------|----------|---------|---------|-------------------
All files |     100 |      100 |     100 |     100 |
 src      |     100 |      100 |     100 |     100 |
  main.ts |     100 |      100 |     100 |     100 |
 src/test |     100 |      100 |     100 |     100 |
  main.ts |     100 |      100 |     100 |     100 |
----------|---------|----------|---------|---------|-------------------

```

### The trouble case

```
rm -rf .c8-data .c8-report
npm run build
npm run test-index
npm run report
```

```
npm run report

> c8-empty-lines@1.0.0 report C:\Users\srama\tmp\c8-empty-lines
> c8 report -r lcov -r text --report-dir ./.c8-report

-----------|---------|----------|---------|---------|-------------------
File       | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-----------|---------|----------|---------|---------|-------------------
All files  |     100 |       80 |     100 |     100 |
 src       |     100 |       75 |     100 |     100 |
  index.ts |     100 |    66.67 |     100 |     100 | 1
  main.ts  |     100 |      100 |     100 |     100 |
 src/test  |     100 |      100 |     100 |     100 |
  index.ts |     100 |      100 |     100 |     100 |
-----------|---------|----------|---------|---------|-------------------
```




