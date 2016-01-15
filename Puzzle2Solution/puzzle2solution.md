This Markdown file was created to solve the second puzzle of the GCHQ 2015 Christmas puzzle. This puzzle involes a set of 6 multiple choice questions which all must be solved correctly for the solution to appear.  There is no mention afterwards of which question(s) were answered incorrectly and the player must reanswer all of the questions starting from the first if they get even one question wrong.  

Question 1
----------
Which of these is not the odd one out?

    A. STARLET
    B. SONNET
    C. SAFFRON
    D. SHALLOT
    E. TORRENT
    F. SUGGEST

Solution: The obvious difference is that TORRENT starts with a T while all of the other words start with S. The other answer it could be is B because that word has 6 letters while all of the other words have 7 letters.

Question 2
----------
What comes after GREEN, RED, BROWN, RED, BLUE, -, YELLOW, PINK?

    A. RED
    B. YELLOW
    C. GREEN
    D. BROWN
    E. BLUE
    F. PINK

Solution: When there are colors, the first thought is to see if combinations are occuring however the presence of brown is kind of out of place as brown is not an easily made color on the standard color wheel. A search of 'green red brown red blue yellow pink' reveals that many of these colors are involved in a game called snooker.  In this pool-esque game there are a particular set of rules especially involving the order that balls are hit into the holes and one of these seems to involve the need to alter red and other colored balls alternately.  When all of the red balls are hit in, the rest must be hit in in increasing point order.  The point values for the balls are in the following order beginning at 1: red, yellow, green, brown, blue, pink, black.  Therefore, since yellow and pink are next to each other, the value that comes before yellow must be red, A.

Question 3
----------
Which is the odd one out?

    A. MATURE
    B. LOVE
    C. WILDE
    D. BUCKET
    E. BECKHAM
    F. SHAKA

Solution: All except A are names or nicknames of footballers (soccer).  

Question 4
----------
I was looking at a man on top of a hill using flag semaphore to send a message, but to me it looked like a very odd message. It began "ZGJJQ EZRXM" before seemingly ending with a hashtag. Which hashtag?

    A. #SGM
    B. #SEM
    C. #SEN
    D. #SGN
    E. #TEN
    F. #TGN

Solution: Flag semaphores are a set of flag positions and colors which signifiy letters.  The code for the different positions can be found on [Wikipedia] (https://en.wikipedia.org/wiki/Flag_semaphore).  The hashtag is actually a strong hint for the solution.  In the list of symbols, hashtag corresponds to numbers which symbolizes that the following flag signals indicate numbers.  Also, if the code was simply shifted then the question would probably not have indicated a visual symbol system.  I tried to rotate each symbol horizontally first and noticed that the letters line up nicely with 'Happy Christmas'.  After re-rotating horizontally, the rest of the phrase TMAS corresponds to #SGM or A.

Question 5
----------
What comes after 74, 105, 110, 103, 108, 101, 98, 101, 108, 108?

    A. 108
    B. 101
    C. 115
    D. 123
    E. 111
    F. 103

Notes:
  - 108 is repeated in the sequence, therefore it's probably not a directly down the line dependence but rather a further upstream comparison.  Maybe it's just 108.
  - Difference: +31 +5 -7 +5 -7 -3 +3 +7 +0
  - Sum of Digits: 11 6 2 4 9 2 17 2 9 9
  - Difference from 100: -26 +5 +10 +3 +8 +1 -2 +1 +8 +8
  - Does it have something to do with prime numbers?
Prime Numbers:
2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131
  - Mod 26: 22 1 6 25 4 23 20 23 4 4
    ABCDEFGHIJKLMNOPQRSTUVWXYZ
    12345678901234567890123456
    VAFYDWTWDD

Question 6
----------
What comes next: D, D, P, V, C, C, D, ?

    A. F
    B. E
    C. D
    D. C
    E. B
    F. A



Notes:
  - Difference: +0 +0 +12 +6 +7 +0 +1
  - A lot of my guesses were related to transferring the letters into numbers.  The numbers are 4, 4, 16, 22, 3, 3, 4.
  - I tried summing up the numbers sequentially by pairs, then summing the pair sums up a few times but it didn't give anything significant
<pre><code>
A <- c(4, 4, 16, 22, 3, 3, 4)
B <- A[-1] + A[-length(A)]
C <- B[-1] + B[-length(B)]
D <- C[-1] + C[-length(C)]
E <- D[-1] + D[-length(D)]
F <- E[-1] + E[-length(E)]
-----
F
[1] 422 353
</code></pre>
  - I also looked at the differences between numbers:
<pre><code>
4 + 4 = 8
4 + 16 = 20
16 + 22 = 38
22 + 3 = 25
3 + 3 = 6
3 + 4 = 7
4 + ? = ?
</pre></code>
  - A few solutions online looked at setting seeds and then getting random number outputs however this didn't really make much sense because different languages produce difference numbers using the same seed.  Nevertheless, I tried a few by setting the seed to be something like a combination of the numbers or a combination of the sums of numbers.
<pre><code>
# the last digit indicates the number version of the letter answer
random.seed(4416223346)
# the last digit(s) indicate the sum of 4 and the last number
random.seed(8203825675)
print([random.randint(1, 26) for i in range(7)])
</pre></code>
  - Why is the answer set only between A-F but there are letters like P and V in the question?
  - Didn't see anything interesting in the greek alphabet.
  - Repeating letters in a sequence are always a clue for something.
  - The answers are backwards vs the enumerated answer letter?

Final Solution
--------------

Here is an example link of the final page which tells you if your answer is wrong or right.(http://s3-eu-west-1.amazonaws.com/puzzleinabucket/EAAAAE.html) If you get the answer wrong, the website will say: Sorry - you did not get all the questions correct. Please try again.

As you can see the URL is composed of the 6 letter answer choices, in the example aboe it is EAAAAE.  A brute force approach to this stage would be to go to every single possible URL and see if that page contains the word 'Sorry'.  The total number of possible choices is a permutation of 6 letters with repeats since multiple answers can be the same letter.  The total number of possibilities is 46,656.  We can reduce this because I know the answer to question 4 is A.  The resulting number of possibilities is 7,776.  I automated the website searching in R using the XML package.  The following code with search through the 7,776  combinations until it finds a website that does not contain the word sorry and print that URL out.  

The resulting answer is: http://s3-eu-west-1.amazonaws.com/puzzleinabucket/DEFACE.html

<pre><code>
library(XML)

answers <- c("A", "B", "C", "D", "E", "F")
answers_perm <- permutations(6, 6, answers, repeats.allowed = TRUE)
answers_perm_sub <- answers_perm[answers_perm[,4] == "A",]
answers_perm_sub_compact <- apply(answers_perm_sub, 1, function(x)
  paste(x, collapse = ""))
answers_perm_sub_compact <- paste("http://s3-eu-west-1.amazonaws.com/puzzleinabucket/",
  answers_perm_sub_compact, ".html", sep = "")
hasSorry <- sapply(answers_perm_sub_compact, function(x) {
  readGeneURL <- htmlTreeParse(x, isURL = TRUE)
  if(length(grep("Sorry", readGeneURL)) == 0) {
    stop(x)
  }
})
</pre></code>
