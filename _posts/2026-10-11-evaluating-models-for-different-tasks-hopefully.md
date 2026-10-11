---
title: "Building my personal AI benchmark (hopefully)"
date: 2026-10-11 17:57:37 -0400
tags: [ai, software, engineering, development]
description: "Blind evaluation benchmark to see which models perform best for specific tasks"
---
Hey, we're back! I planned on posting again sooner but oh well, here we are. I'm sitting here watching the Eagles v Jaguars game who are playing in rainy London, fitting since its pretty rainy here today, but I'm noticing a pattern, maybe I'm inspired to write more watching sports... or maybe its because I can't sit still being on the couch for this long. Who knows. Either way, I digress, on to the post...

## Cool, what are we doing?

I recently attended Nufar Gaspar's "Build Your Personal AI Benchmark" webinar hosted by the AI Daily Brief - well, technically, I missed it (got the times wrong, woops) but I was able to watch the recording and go through the lab - where they went through how to build your own personal benchmark to evaluate different models for a specific task that you do either daily or weekly so you can see which models perform the best for the tasks you do most often according to your personal preference.

## How to set this up (in a nutshell)

The process is essentially having the model/agent you use most often to interview you around 4-5 tasks you do daily or weekly and what success and failure looks like on what your agent returns. Something like this (these are similar to my own):

| Task | Success | Failure |
| ----------- | ----------- | ----------- |
| Writing | Doesn't rewrite, just fixes grammar | rewrites the entire post |
| Code review | Output is concise explaining only what's needed | Output is too verbose |
| Research | Everything is sourced, answers what I was looking for | Basically unverified slop |

You get the idea. This list you will work with your agent to refine and give you an example scenario for you to use in your benchmarks. Ideally, you will build a prompt that you can reuse if you ever want to change which tasks you want to eval or just want to update it.

## Let's test it out

The next part is to do a blind evaluation of the models by assigning each model you want to benchmark a name or letter (ie. A, B, C) and then randomize the answers and pick the one that you agree with most. You can also score them 1 to 5 if you have multiple answers you like.

 It was suggested that you do this sequentially without looking at the answers but the way I achieved this was just tell Claude to spin up sub-agents with the models I wanted to test, in my case was Opus 5.5, Sonnet 5.5, and Haiku 5.5 and then have it do the randomization, removing any indicator of which model it is in the answers.

 ```mermaid
  flowchart LR
    tasks["`Paste task to Claude`"]
    subagents["`
      *Sub Agents*
      1. Opus
      2. Sonnet
      3. Haiku
    `"]
    randomize["`Claude randomizes answers`"]
    answers["`
      *Sub Agent Answers*
      1. C
      2. A
      3. D
    `"]
    tasks --> subagents --> randomize --> answers
 ```

Repeat this process for each task and then make your choices, just one sentence or so as you will pass to Claude and get it to give you a list of your finalized answers for each task, while revealing which model gave which answer.

> ### Some notes on this
> For myself, someone who doesn't have unlimited cash, I benchmarked solely Claude models since that is the product I use and have a subscription for, but you can use any combination of models you want (Opus, Astra, Grok, whatever) but also...
> 1. *Use a new chat but with the same request* - when you change an option that way the evaluation is the same
> 2. *Keep the names hidden* - will help keep your bias out of it
> 3. *Track other things* - the keenest of you will notice we didn't track token efficency or cost, this will be helpful in the event of a tie breaker
> 4. *Test it on release* - do this first with new model releases before letting the internet tell you what to think

## So what are my thoughts on the whole process?

I think overall it wasn't too eye opening. The frontier models nowadays are pretty good at most things, especially my personal day to day tasks. I use Opus 5.5 with varying effort levels depending on task for majority of things, while use Haiku for general questions (although I admit I don't like the formatting from Haiku bleh). The delta from my tests didn't compel me enough to switch from using what I already use now but it was a fun exercise and a good check in to see if I'm using things as I should, would recommend you do this for yourself as well.

One caveat I will say is I haven't gone through this process at work on those type of daily/weekly tasks where, I think, finding the most optimized models to do specific tasks will bear the most fruit. Maybe I'll make a follow up post to this once I do.

### Wrapping up

Well, that is all for this time folks. I hope the post gives you some inspiration to write your own benchmarks into how you're using your models in your daily lives, who knows, you may have more surprising results than I did. Until next time my friends, have a wonderful Thanksgiving! Live long and prosper.




