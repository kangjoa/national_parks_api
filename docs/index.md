# Efficient Autocomplete Search for National Parks

The National Parks API project is a single page application where users can search for and add parks to a favorites list.

## The Problem

Originally, in the naive search function, the server fetched all parks (almost 500) from the NPS API and [filtered](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) for each search request. This means that each search request had a time complexity of **O(n \* m)** where **n** is the number of parks and **m** is the average length of the park name. We were always going through every park for every search.

To improve the search, I implemented a prefix tree autocomplete.

## What is a Prefix Tree?

A prefix tree is a tree data structure where each node stores a single character. We can retrieve words and strings from the structure by "traversing down a branch path of the tree" ([Joshi, V.](https://medium.com/basecs/trying-to-understand-tries-3ec6bede0014)). That is, strings are stored as paths from the root to terminal nodes. For example, "yorktown" and "yosemite" share the same path for "y" and "o" before branching apart, since they share the same prefix "yo".

To find all parks starting with a prefix like "yo", you walk down the tree following y -> o, then collect every string in the subtree below. We don't look at parks starting with other letters, which makes a trie great for autocomplete. We can jump to the relevant branch and only visit matches instead of having to check each park.

<img src="images/prefix-tree-diagram.png" alt="Prefix tree structure" width="600">

## What I Built

## Why this is better

### References

1. [Array.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
2. [Trying to Understand Tries](https://medium.com/basecs/trying-to-understand-tries-3ec6bede0014) by Vaidehi Joshi
