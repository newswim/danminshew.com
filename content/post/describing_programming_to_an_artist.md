+++
date = "2017-02-28T17:26:47-06:00"
title = "Describing Programming To An Artist"
slug = "programming-to-an-artist"
comments = true
draft = false
toc = true

+++

```text
a lot of maintaining code bases is exploratory, trying to figure out what's going on
a lot of time it's poorly or mis-documented (or not at all)
there's nothing that can just run your code through an analytic engine and give you a read out of what's happening, it has to be somewhat self-documenting like that
```

>In curriculum class we talked about working backwards from products or formatting it so that the ideas are generative and product/ process flexible.
But it's literally working backwards trying to fix things

```text
yeah, there are a lot of parallels
debuggers work through a sequence of code linearly, stepping over broken bits, climbing up a call chain to get to the original signal
```

> Hmm is a debugger a person or a deployment of a tool?

```text
it's a thing within a programming environment that lets you inspect pieces of code one part at a time
but you have access to _only_ that part
and it works in a step-wise manner
```

> Ah ok
Ohh so it separates things by like actions?

```text
kind of. The runtime (or interpreter) evaluates your code line by line and puts values into a block of memory, then it runs your functions one at a time
that function might call other functions, which in turn might call other functions, but it always finds it's way back to the first one in the list, once that's all done, it proceeds to the next line
```

> Hmm it gets these by identifying like action verbs or something?

```text
and that all happens in fractions of a second
yeah exactly - the names are arbitrary, but it helps to name them in clever ways that indicate what's that piece of code is doing
there's really only two things that a language understands, statements and expressions
(those are the real names, and that's really all that can occur, programming is all about combining and building those up into robust systems)
```

> Statement vs expression. Go...

```text
a statement just says something about the world, "Name equals Tom", "If this is true, do this thing"
expressions take statements and perform some kind of computation on them
"Print the name Tom seventeen times"
"Find my current location on a map"
so expressions often contain verbs
```

> Wouldn't "if this is true do that" be an expression?

```text
the "do that" portion is
but the if/else is a statement about the world
```

> Got it
Like ____ = ______
If ____ then _____
Statement

```text
there are also a million tricks and hacky shorthands, but everything can theoretically be converted into simple statements and expressions
right!
yes
```

> What's a function vs an expression

```text
1 sec
Dan
back
Functions are sort of like containers or wrappers around statements and expressions, but they have the added ability to Return something (but they don't have to)
```

> Woah
Hmm so like a receipt of an expression?

```text
kind of! but a function can return any type of data (string, object, number or another function)
it can also return nothing
```

> Ok

```text
it's just a product of what a function is -- and it's a little bit different from one language to another
```

> So like what's an example?

```text
a function might reference things from outside itself, but the outside world has no access to what's inside of a function
that's called closure, and it's one of the core concepts behind languages like javascript
```

> Woah
Might of just lost me
why can't the outside world access it

```text
so if a function is like a container for things, it can access statements outside of itself (it's scope), but stuff outside of it can't change anything within it
so its contents are protected in that way
you need a way of protecting the values of your statements, and putting them inside of a function is one way to do that
but, I think that was enough programming facts for one night! That's actually a lot of stuff.
```

> I get it!
Got it!

```text
functions are one-way
```

> Container was misleading but it's like literally like parenthesis

```text
yeah totally
what's inside the parenthesis has to boil down to one thing
```

> So, like math.
