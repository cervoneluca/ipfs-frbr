# ipfs-frbr

A npm package to handle versioning on IPFS by means of the FRBR and Ethereum ERC721 contracts.

## Description

The [Functional Requirements for Bibliographic Records (FRBR)](https://www.oclc.org/research/activities/frbr.html) reccomendation specifies that a products of intellectual or artistic endeavor can be described by means of four concepts:

  1. __the work__: a distinct intellectual or artistic creation
  2. __the expressions__: the intellectual or artistic realization of a work
  3. __the manifestation__: the physical embodiment of an expression of a work
  4. __the item__: a single exemplar of a manifestation.

The four concepts above are related as following:

  * a work is realized through one or more expressions;
  * each expression embodied in one or more manifestations;
  * each manifestation is exemplified by one or more items.

This package creates resources on the IPFS by organizing them as WORK, EXPRESSIONS, and MANIFESTATIONS.

The packages uses the standard INFURA APIs to communicate to IPFS and to Ethereum.

The ERC contract is currently stored on the ROPSTEN network at address: 0x3396922D398c0fD03Fe24aBF92f057e271A956cD
## Installation

npm install --save https://github.com/cervoneluca/ipfs-frbr.git

## Usage

This following code creates a work with a specific IFPS CID and a specific Token ID in the ethereum blockchain.

```javascript
const mnemonic = 'the mnemonic phrase of your wallet';
ipfsFrbr.init({
  mnemonic,
});

const work = await ipfsFrbr.createWork({
    name: 'A first work',
    description: 'The First Work',
});

console.log(work);
```

The results of the above code should be something like this:

```Javascript
{
  workId: 7,
  workUri: '/ipfs/QmfXCvuLPxyTQQBHxJVN3HqNvXv2t5K7VjeYBWGfZvb5eG',
  workMeta: {
    name: 'A first work',
    description: 'The First Work',
    expressions: []
  }
}
```

This following code creates an expression for the work created previousely.

```javascript
  const expr = await ipfsFrbr.addExpression({
    workId: 7,
    name: 'A first expression',
    description: 'The first expression on work with workId 7 and IPFS QmfXCvuLPxyTQQBHxJVN3HqNvXv2t5K7VjeYBWGfZvb5eG',
    version: '0.0.1',
  });

  console.log(expr);
```

The results of the above code should be something like this:

```javascript
{
  "workId":7,
  "workUri":"/ipfs/QmWbqvXR8pQW2R1HvgQ29RoVDi2VvunAZq59H4Axtsxh68",
  "workMeta":{
    "name":"A first work",
    "description":"The First Work",
    "expressions":[
      {"name":"A first expression",
      "description":"The first expression on work with workId 7",
      "version":"0.0.1",
      "manifestations":[]
      }
    ]
  }
}

```

This following code creates a manifestation for the expression created previousely.

```javascript
  const man = await ipfsFrbr.addManifestation({
    workId: 7,
    expressionVersion: '0.0.1',
    name: 'A first manifestation',
    description: 'The first expression on expression 0.0.1 of work with workId 7',
    fileName: 'text.txt',
    fileContent: 'hello ethereum and IPFS',
  });

  console.log(man);
```

Now, by calling

```javascript
let workUri = await ipfsFrbr.getWork({ workId: 7 });
```

you should receive /ipns/QmcHFG9BDArLqmheDz2Qkx3aeXG3oAABEqD3LAG53g9XJT that points to:

```javascript
{
  "workId":7,
  "workUri":"/ipfs/QmWbqvXR8pQW2R1HvgQ29RoVDi2VvunAZq59H4Axtsxh68",
  "workMeta":{
    "name":"A first work",
    "description":"The First Work",
    "expressions":[
      {
        "name":"A first expression",
        "description":"The first expression on work with workId 7",
        "version":"0.0.1",
        "manifestations":[
          {"name":"A first manifestation",
          "description":"The first expression on expression 0.0.1 of work with workId 7",
          "fileName":"text.txt",
          "manifestationCid":"QmS9xAAnr6VnVobnPRba5fFMTKSg2e1pmVnyjNiVU9Pk5L"
          }
        ]
      }
    ]
  }
}
```

While ipfs/QmS9xAAnr6VnVobnPRba5fFMTKSg2e1pmVnyjNiVU9Pk5L contains:

```
hello ethereum and IPFS
```
