# ipfs-frbr

A npm package to handle versioning on IPFS by means of the FRBR and Ethereum ERC721 contracts.

## Description

The [Functional Requirements for Bibliographic Records (FRBR)](https://www.oclc.org/research/activities/frbr.html) reccomendation specifies that a products of intellectual or artistic endeavor can be described by means of four concepts:

  1. _the work_: a distinct intellectual or artistic creation
  2. _the expressions_: the intellectual or artistic realization of a work
  3. _the manifestation_: the physical embodiment of an expression of a work
  4. _the item_: a single exemplar of a manifestation.

The four concepts above are related as following:

  * a work is realized through one or more expressions;
  * each expression embodied in one or more manifestations;
  * each manifestation is exemplified by one or more items.
