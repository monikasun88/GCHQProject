Part 3 consists of four questions. The answer to each puzzle is a single word, which can be used to create a URL.

  A. Complete the sequence:
     Buck, Cod, Dahlia, Rook, Cuckoo, Rail, Haddock, ?

  B. Sum:
     pest + √(unfixed - riots) = ?

  C. Samuel says: if agony is the opposite of denial, and witty is the opposite of tepid, then what is the opposite of smart?

  D. The answers to the following cryptic crossword clues are all words of the same length. We have provided the first four clues only. What is the seventh and last answer?

        1. Withdraw as sailors hold festive sing-song
        2. It receives a worker and returns a queen
        3. Try and sing medley of violin parts
        4. Fit for capture
        5.
        6.
        7. ?

Solution
--------
Unlike the previous solution, this answer can not really be brute forced. However, the first thing I did do was check the javascript.  Under the accept button, there is the following function.

<pre><code>
  function check(dat) {
    # basic check function
    resultA = 3141592654;
    resultB = 1234567890;
    for (i=0; i<2; i++) {
        initA = resultA;
        initB = resultB;
        for (j=0; j<dat.length; j++) {
            resultA += dat.toLowerCase().charCodeAt(j);
            resultB = (resultA * 31) ^ resultB;
            tmp = resultA & resultA;
            resultA = resultB & resultB;
            resultB = tmp;
        }
        resultA = resultA ^ initA;
        resultB = resultB ^ initB;
    }
    return [resultA, resultB];
  }
  $("#answercheckform").submit(function(e) {
    answer = $("#word_a").val() + '\0' + $("#word_b").val() + '\0' + $("#word_c").val() + '\0' + $("#word_d").val();
    res = check(answer);
    if ((res[0] == 608334672) && (res[1] == 46009587)) {
        $("#answercheckresult").html("All your answers are correct!<br/><br/>Please now go to <b>http://www."+$("#word_a").val().toLowerCase()+"-"+$("#word_b").val().toLowerCase()+"-"+$("#word_c").val().toLowerCase()+".org.uk/"+$("#word_d").val().toLowerCase()+"</b> for Part 4.");
    } else {
        $("#answercheckresult").html("One or more of your answers is incorrect. Please try again.");
    }
    e.preventDefault();
  });
</pre></code>

As you can see, the solution for this problem is pretty complex and to back-solve this would be kind of tough so we'll see if we can answer any of the questions.

A. Complete the sequence:
   Buck, Cod, Dahlia, Rook, Cuckoo, Rail, Haddock, ?

Solution:
This sequence of works is actually a paindrome. BUCKCODDAHLIAROOKC U CKOORAILHADDOCK 'CUB' should be the missing word.

B. Sum:
   pest + √(unfixed - riots) = ?

Solution:
We can try taking the numerical value of these words to see if we can get a clue.

ABCDEFGHIJKLMNOPQRSTUVWXYZ
12345678901234567890123456

pest = 16+5+19+20 = 60
unfixed = 21+14+6+9+24+5+4 = 83
riots = 18+9+15+20+19 = 81
83-81 = 2

The square root of 2 is an irrational number but it's not immediately obvious what the square root of B is.  

C. Samuel says: if agony is the opposite of denial, and witty is the opposite of tepid, then what is the opposite of smart?

AGONY::DENIAL
WITTY::TEPID
?::SMART

Solution:
Who is Samuel?  This is an important clue because otherwise, there's not need to state a name here. Well the inventor of the morse code was Samuel Morse so lets take a look at what these words are in morse code

denial = -.././-./../.-/.-..
agony = .-/--./---/-./-.--

If you look closely, every dot is the opposite in agony.  We can double check this with witty and tepid.

witty = .--/../-/-/-.--
tepid = -/./.--./../-..

Now lets look at the word smart.  

smart = .../--/.-/.-./-
opposite of smart = ---..-.-.-.

The only part not sure about this is where the values split because its not the same between the two words.  Lets take a look at some options.

--/-..-.-.-.
M/(N,T,D)...

-/--..-.-.-.
T/(G,M,T,Z)...

---/..-.-.-.
O/(E,U,F)...
---/..-./-.-.
O/F/T/E/N

Often was the only sensible english word I could deduce from the morse code so we'll try that.

D. The answers to the following cryptic crossword clues are all words of the same length. We have provided the first four clues only. What is the seventh and last answer?

      1. Withdraw as sailors hold festive sing-song
      2. It receives a worker and returns a queen
      3. Try and sing medley of violin parts
      4. Fit for capture
      5.
      6.
      7. ?

The first clue is that these are crossword clues and the second is that they're all the same length.  The third clues is that the clues are cryptic meaning that they have some kind of code we need to figure out before we answer them.  Perhaps the code may help us figure out what 5 and 6 should be.

Since there are seven clues, perhaps we can thing of things there are seven of that are all the same length.


I couldn't figure questions 2 and 4 out so I used this site. In retrospect, I probably would never have figured either of them out...
https://www.reddit.com/r/puzzles/comments/3w6ja9/gchqs_christmas_puzzler_thread_spoilers_tagged/
