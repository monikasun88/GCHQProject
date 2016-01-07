# GIZMODO Puzzle
# http://gizmodo.com/can-you-solve-the-uk-intelligence-agencys-christmas-puz-1747265899

# Load libraries
library(iterpc)

# Initialize existing filled in squares and matrix
puzzleMat <- matrix(0, nrow = 25, ncol = 25)
existingFilled <- list(c(4,4), c(4,5),
  c(4,13), c(4,14),
  c(4,22),
  c(9,7), c(9,8),
  c(9,11),
  c(9,15), c(9,16),
  c(9,19),
  c(17,7), 
  c(17,12),
  c(17,17),
  c(17,21),
  c(22,4), c(22,5),
  c(22,10), c(22,11),
  c(22,16),
  c(22,21), c(22,22))
clueRows <- list(c(7,3,1,1,7), 
  c(1,1,2,2,1,1), 
  c(1,3,1,3,1,1,3,1), 
  c(1,3,1,1,6,1,3,1), 
  c(1,3,1,5,2,1,3,1),
  c(1,1,2,1,1), 
  c(7,1,1,1,1,1,7), 
  c(3,3), 
  c(1,2,3,1,1,3,1,1,2), 
  c(1,1,3,2,1,1),
  c(4,1,4,2,1,2),
  c(1,1,1,1,1,4,1,3), 
  c(2,1,1,1,2,5), 
  c(3,2,2,6,3,1), 
  c(1,9,1,1,2,1),
  c(2,1,2,2,3,1), 
  c(3,1,1,1,1,5,1), 
  c(1,2,2,5), 
  c(7,1,2,1,1,1,3), 
  c(1,1,2,1,2,2,1),
  c(1,3,1,4,5,1), 
  c(1,3,1,3,10,2), 
  c(1,3,1,1,6,6), 
  c(1,1,2,1,1,2), 
  c(7,2,1,2,5))
clueCols <- list(c(7,2,1,1,7),
  c(1,1,2,2,1,1),
  c(1,3,1,3,1,3,1,3,1),
  c(1,3,1,1,5,1,3,1),
  c(1,3,1,1,4,1,3,1),
  c(1,1,1,2,1,1),
  c(7,1,1,1,1,1,7),
  c(1,1,3),
  c(2,1,2,1,8,2,1),
  c(2,2,1,2,1,1,1,2),
  c(1,7,3,2,1),
  c(1,2,3,1,1,1,1,1),
  c(4,1,1,2,6),
  c(3,3,1,1,1,3,1),
  c(1,2,5,2,2),
  c(2,2,1,1,1,1,1,2,1),
  c(1,3,3,2,1,8,1),
  c(6,2,1),
  c(7,1,4,1,1,3),
  c(1,1,1,1,4),
  c(1,3,1,3,7,1),
  c(1,3,1,1,1,2,1,1,4),
  c(1,3,1,4,3,3),
  c(1,1,2,2,2,6,1),
  c(7,1,3,2,1,1))
puzzleMatOrig <- puzzleMat

### Helper functions
# Function to fill in a square
fillIn <- function(x, y, pMat) {
  if (pMat[x,y] == 0) {
    pMat[x,y] <- 1
  } else {
    print("Already Filled")
  }
  return(pMat)
}

# Function to print the puzzle matrix
printPuzzleMat <- function(pMat) {
  plot(1, type="n", axes=F, xlab="", ylab="", xlim = c(0, 26), ylim = c(0,26))
  for (nR in 1:nrow(pMat)) {
    for (nC in 1:ncol(pMat)) {
      rect(nC-1, 26-nR-1, nC, 26-nR, 
        col = ifelse(pMat[nR,nC] == 0, "white", "black"), 
        border = "black", lwd = 1)
    }
  }
}

# Function to test if a row/col matches the 1s at least
testOnesMatch <- function(pMatRow, rRow) {
  if (length(rRow) > length(pMatRow)) stop("Replacement longer than matrix col/row length.")
  pMatRow_ones <- which(pMatRow == 1)
  if (length(rRow) >= max(pMatRow_ones)) {
    return(all(rRow[pMatRow_ones] == 1))
  } else {
    return(FALSE)
  }
}

# Function to return all the possibilities of a row/col that match with the puzzle matrix row or column
possibleLines <- function(npos, nzeros, pMatRow, cRow) {
  combZeros <- getall(iterpc(npos, nzeros, replace = TRUE))
  combLines <- list()
  for (x in 1:nrow(combZeros )) {
    combLines[[x]] <- c(NA, lapply(cRow, function(x) rep(1, x)))
    for (y in 1:ncol(combZeros)) {
      if (combZeros[x,y] == 1) {
        combLines[[x]][[1]] <- c(combLines[[x]][[1]], 0)
      } else if (combZeros[x,y] == (length(cRow)+1)) {
        combLines[[x]][[(length(cRow)+1)]] <- c(combLines[[x]][[(length(cRow)+1)]], 0)
      } else {
        combLines[[x]][[combZeros[x,y]]] <- c(combLines[[x]][[combZeros[x,y]]], 0)
      }
    }
    combLines[[x]][c(2:(length(combLines[[x]])-1))] <- 
      lapply(combLines[[x]][c(2:(length(combLines[[x]])-1))], function(a) return(c(a, 0)))
    combLines[[x]] <- unlist(combLines[[x]])
    combLines[[x]] <- combLines[[x]][!is.na(combLines[[x]])]
  }
  
  combLinesMatch <- lapply(combLines, function(x) testOnesMatch(pMatRow, x))
  return(list(combLines, combLinesMatch))
}


# Fill in given squares
puzzleMat <- puzzleMatOrig
for (a in 1:length(existingFilled)) {
  puzzleMat <- fillIn(existingFilled[[a]][1], existingFilled[[a]][2], puzzleMat)
}

# Fill in obvious ones (add up to 25)
obvCols <- NULL
obvRows <- NULL

repCol <- list()
for (c in 1:ncol(puzzleMat)) {
  repCol[[c]] <- c(unlist(
    lapply(
      sapply(clueCols[[c]][-length(clueCols[[c]])], function(x) rep(1, x)), 
      function(x) c(x, 0))), rep(1, clueCols[[c]][length(clueCols[[c]])]))
  if (length(repCol[[c]]) == 25) {
    puzzleMat[,c] <- repCol[[c]]
    obvCols <- c(obvCols, c)  
  }
}

repRow <- list()
for (r in 1:nrow(puzzleMat)) {
  repRow[[r]] <-  c(unlist(
    lapply(
      sapply(clueRows[[r]][-length(clueRows[[r]])], function(x) rep(1, x)), 
      function(x) c(x, 0))), rep(1, clueRows[[r]][length(clueRows[[r]])]))
  if (length(repRow[[r]]) == 25) {
    puzzleMat[r,] <- repRow[[r]]
    obvRows <- c(obvRows, r)  
  }
}

notObvCols <- which(!1:25 %in% obvCols) 
notObvRows <- which(!1:25 %in% obvRows) 
knownCellCols <- unlist(lapply(repCol, length))
knownCellRows <- unlist(lapply(repRow, length))
clueColsLen <-  unlist(lapply(clueCols, length))
clueRowsLen <-  unlist(lapply(clueRows, length))

notObvCols_sorted <- notObvCols[order(-knownCellCols[notObvCols])]
clueColsLen[notObvCols][order(-knownCellCols[notObvCols])]

notObvRows_sorted <- notObvRows[order(-knownCellRows[notObvRows])]
clueRowsLen[notObvRows][order(-knownCellRows[notObvRows])]

# Test combinations of each unknown column
unknownCol <- list()
for (a in 1:length(notObvCols)) {
  unknownCol[[a]] <- possibleLines(clueColsLen[notObvCols_sorted[a]]+1, 
    25-knownCellCols[notObvCols_sorted[a]], puzzleMat[,notObvCols_sorted[a]], clueCols[[notObvCols_sorted[a]]])
  print(sum(unlist(unknownCol[[a]][[2]])))
}

# Test combinations of each unknown row
unknownRow <- list()
for (a in 1:length(notObvRows)) {
  unknownRow[[a]] <- possibleLines(clueRowsLen[notObvRows_sorted[a]]+1, 
    25-knownCellRows[notObvRows_sorted[a]], puzzleMat[notObvRows_sorted[a],], clueRows[[notObvRows_sorted[a]]])
  print(sum(unlist(unknownRow[[a]][[2]])))
}

possCols <- lapply(unknownCol, function(x) length(which(unlist(x[[2]]))))
possRows <- lapply(unknownRow, function(x) length(which(unlist(x[[2]]))))

while (TRUE) {
  start <- "row4"






  break
}





# Two row combinations only have 2 possibilities each so lets start with those.  These are row 4 and 5
puzzleMatTemp <- puzzleMat
row4Poss <- unknownRow[[1]][[1]][which(unlist(unknownRow[[1]][2]))]
row5Poss <- unknownRow[[2]][[1]][which(unlist(unknownRow[[2]][2]))]

puzzleMatTemp[4,] <- row4Poss[[2]]
testOnesMatch(puzzleMatTemp[5,], row5Poss[[1]])
testOnesMatch(puzzleMatTemp[5,], row5Poss[[2]])

puzzleMatTemp[5,] <- row4Poss[[2]]
testOnesMatch(puzzleMatTemp[4,], row4Poss[[1]])
testOnesMatch(puzzleMatTemp[4,], row4Poss[[2]])






Pseudocode:
set to one original possibility (row 4)
iterate through possibilities of other rows/columns by number of original possibilities until false occurs
return to first possibility if false occurs
if it does not occur you have the answer



