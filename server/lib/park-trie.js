import PrefixTree from './prefix-tree.js';
import { npsApiClient } from '../api/NPSApiClient.js';

const parkTrie = new PrefixTree();

async function loadParks() {
  const apiData = await npsApiClient.fetchParks(0, 500);

  for (const park of apiData.data) {
    parkTrie.insert(park.fullName.toLowerCase());
  }

  console.log(`Loaded ${parkTrie.size} parks into trie`);
}

export { parkTrie, loadParks };
