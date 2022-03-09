---
tag: [2022, book]
title: Algorithms to live by
description: Decision making inspired in algorithms invented for machines, valid in a world where computation time is not unlimited
---

# Algorithms to live by

## Notes

- Computer science ideas can apply to human decisions, even more so now, than infinite computation is not viable.

#### The secretary problem

- 37% rule. First gather data, and then choose. Applies when you know you cannot go back and chose a previous match and that you will get accepted. 25% if you get a 50/50 of getting accepted. And 63% if you can accept previous ones (like Kepler with his second wife).

#### Explore / Exploit:

- The multiarm bandit problem
- There's a balance between exploration (acquiring data) and exploitation (getting benefit). A matematician explored the solution and discovered the [[Gittins index]] as a solution to the [[Multiarm bandit problem]], how to chose weather to explore more, or continue with the current selection, considering the potential reward of the next selection, considering the future as discounted (geometrically, tomorrow's "profits" have a fixed rate less value than today's). For example, it might make more sense to optimise more for today's rewards if tomorrow is uncertain or if you have a bigger need to make profits for today.
- The less discounted the future, the better the rewards of exploration. 90% discount makes for 0.7 index a 0-0 wins/loses ratio, whereas 99% makes it 0.86.
- This doesn't take into account the cost of changing options. It might make sense to change restaurants to test out (no cost), but it might not make sense to change houses (mortgage).
- Though, the index is hard to estimate on the fly.
- This is the method.
  Regret minification
- A simpler way to approach things is by thinking in terms of minimisation of regret.
- Regret is always going to increase by default. A logarithmic increase is the optimal result.
- Depending on how close are we of ending the journey, we'll tend more towards exploitation than exploration.
- A common thread is that: as we get older, we enjoy life more, for we have maximised for enjoyment (exploit) and pruned bad arms.
- [Example of a paper on this subject](https://arxiv.org/pdf/1901.08387.pdf).

#### Sorting

- Google is not powerful because it searches, it's powerful because it sorts.
  - _This is the reason one goes to google when duck duck go does not produce great results_
- Sports use sorting algorithms to know who's the best at it.
- [[Lewis Caroll]] as a mathematician proposed a solution for sorting winners at Tennis, for he realised that the chances of second place to actually be the second best player were 16/32. And the best four to be the best four was 1/12.
- Sometimes, the best algorithms by efficiency is not the best for the job.
  - For example in Baseball, when you actually want the games for the games themselves.
  - Or in a fight, where you could do linear time if you just continue playing until defeated and the winner takes your place (fatigue).
- Pecking order and displacement are ways of sorting without confrontation. This is seen in monkeys, and, in a way, in poker one-on-one tables.

[Link](https://algorithmstoliveby.com/)

Consumed on:

- Year: [[2022]]
- Quarter: [[2022-Q1]]

![[Index#Sources]]
