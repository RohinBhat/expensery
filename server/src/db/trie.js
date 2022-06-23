const { validBankHeaders } = require("../utils/bankHeaders");

require("../utils/bankHeaders");

let SIZE = 36;

class TrieNode {
  constructor() {
    this.isEndOfWord = false;
    this.children = new Array(SIZE);
    for (let i = 0; i < SIZE; i++) this.children[i] = null;
  }
}

let root = new TrieNode();

const isAlpha = (ch) => {
  return /^[A-Z]$/i.test(ch);
};

const insert = (key) => {
  let level;
  let length = key.length;
  let index;

  let pCrawl = root;

  for (level = 0; level < length; level++) {
    if (isAlpha(key[level])) {
      index = key[level].charCodeAt(0) - 97;
    } else {
      index = key[level].charCodeAt(0) - 22;
    }

    if (pCrawl.children[index] == null) pCrawl.children[index] = new TrieNode();

    pCrawl = pCrawl.children[index];
  }

  pCrawl.isEndOfWord = true;
};

const searchTrie = (key) => {
  let level;
  let length = key.length;
  let index;
  let pCrawl = root;

  for (level = 0; level < length; level++) {
    if (isAlpha(key[level])) {
      index = key[level].charCodeAt(0) - 97;
    } else {
      index = key[level].charCodeAt(0) - 22;
    }

    if (pCrawl.children[index] == null) return false;

    pCrawl = pCrawl.children[index];
  }

  return pCrawl.isEndOfWord;
};

const initTrie = () => {
  for (let i = 0; i < validBankHeaders.length; i++) {
    insert(validBankHeaders[i]);
  }
};

module.exports = {
  initTrie,
  searchTrie,
};
