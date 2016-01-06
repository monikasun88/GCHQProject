// user defined variables
var tileSize = 25;
var nCellX = 25;
var nCellY = nCellX;

var permBlock = [79, 80, 88, 89, 97,
  207, 208, 211, 215, 216, 219,
  407, 412, 417, 421,
  529, 530, 535, 536, 541, 546, 547];

var leftSectionVals = [
  [7,3,1,1,7],
  [1,1,2,2,1,1],
  [1,3,1,3,1,1,3,1],
  [1,3,1,1,6,1,3,1],
  [1,3,1,5,2,1,3,1],
  [1,1,2,1,1],
  [7,1,1,1,1,1,7],
  [3,3],
  [1,2,3,1,1,3,1,1,2],
  [1,1,3,2,1,1],
  [4,1,4,2,1,2],
  [1,1,1,1,1,4,1,3],
  [2,1,1,1,2,5],
  [3,2,2,6,3,1],
  [1,9,1,1,2,1],
  [2,1,2,2,3,1],
  [3,1,1,1,1,5,1],
  [1,2,2,5],
  [7,1,2,1,1,1,3],
  [1,1,2,1,2,2,1],
  [1,3,1,4,5,1],
  [1,3,1,3,10,2],
  [1,3,1,1,6,6],
  [1,1,2,1,1,2],
  [7,2,1,2,5]
];

var topSectionVals = [
  [7,2,1,1,7],
  [1,1,2,2,1,1],
  [1,3,1,3,1,3,1,3,1],
  [1,3,1,1,5,1,3,1],
  [1,3,1,1,4,1,3,1],
  [1,1,1,2,1,1],
  [7,1,1,1,1,1,7],
  [1,1,3],
  [2,1,2,1,8,2,1],
  [2,2,1,2,1,1,1,2],
  [1,7,3,2,1],
  [1,2,3,1,1,1,1,1],
  [4,1,1,2,6],
  [3,3,1,1,1,3,1],
  [1,2,5,2,2],
  [2,2,1,1,1,1,1,2,1],
  [1,3,3,2,1,8,1],
  [6,2,1],
  [7,1,4,1,1,3],
  [1,1,1,1,4],
  [1,3,1,3,7,1],
  [1,3,1,1,1,2,1,1,4],
  [1,3,1,4,3,3],
  [1,1,2,2,2,6,1],
  [7,1,3,2,1,1]
];

// calculated variables
var width = nCellY * tileSize;
var height = nCellX * tileSize;

var topSectionHeight = 14 * d3.max(
  topSectionVals, function(t) {
    return d3.max(t);
  });

var leftSectionWidth = 14 * d3.max(
  leftSectionVals, function(l) {
    return d3.max(l);
  });

var grid = [];
for (var i=1; i<=nCellX*nCellY; i++) {
  var isPermBlock = (permBlock.indexOf(i) >= 0) ? true : false;
  var tile = {
    index: i,
    row: Math.floor((i-1)/ nCellX) + 1,
    col: (i-1) % nCellY + 1,
    isPermBlock: isPermBlock,
    isLocked: isPermBlock,
    isClicked: false,
    isClickedNot: false,
  }
  grid.push(tile);
}

var lockButtonListR = [];
for (var i=1; i<= nCellY; i++) {
  var lockButtonR = {
    index: i,
    isClicked: false,
  }
  lockButtonListR.push(lockButtonR)
}

var lockButtonListC = [];
for (var i=1; i<= nCellX; i++) {
  var lockButtonC = {
    index: i,
    isClicked: false,
  }
  lockButtonListC.push(lockButtonC)
}

var buttonRadius = tileSize/3

// begin all logic
var svg = d3.select("#viz")
  .append("svg")
  .attr("width", width + leftSectionWidth + buttonRadius*6)
  .attr("height", height + topSectionHeight + buttonRadius*6);

// // topSection logic
// var topSection = svg.append('g')
//   .append('rect')
//   .attr('width', width)
//   .attr('height', 100)
//   .attr("fill", "blue");

// topSection logic
var topSection = svg.append('g')

// var topTiles = topSection.selectAll('rect')
//   .data(topSectionVals)
//   .enter()
//   .append('rect')
//   .attr('width', tileSize)
//   .attr('height', topSectionHeight)
//   .attr("x", function(d, i) {
//     return (i * tileSize) + leftSectionWidth
//   })
//   .attr("y", 0)
//   .attr("fill", "blue")
//   .attr("stroke", "black");

var topTileText = topSection.selectAll('text')
  .data(topSectionVals)
  .enter()
  .append('g')

topTileText.append("text")
  .each(function(d, i) {
    for (a=0; a<d.length; a++) {
      d3.select(this).append("tspan")
        .text(d[a])
        .attr("x", i * tileSize + (leftSectionWidth + tileSize/2))
        .attr("y", topSectionHeight-a*12-5)
        .attr("fill", "black")
        .attr("font-family", "courier")
        .attr("font-size", "12px")
        .attr("text-anchor","middle")
    }
  });

// leftSection logic
var leftSection = svg.append('g')

// var leftTiles = leftSection.selectAll('rect')
//   .data(leftSectionVals)
//   .enter()
//   .append('rect')
//   .attr('width', leftSectionWidth)
//   .attr('height', tileSize)
//   .attr("x", 0)
//   .attr("y", function(d, i) {
//     return (i * tileSize) + topSectionHeight
//   })
//   .attr("fill", "red")
//   .attr("stroke", "black");

var leftTileText = leftSection.selectAll('text')
  .data(leftSectionVals)
  .enter()
  .append('g')

leftTileText.append("text")
  .each(function(d, i) {
    for (a=0; a<d.length; a++) {
      d3.select(this).append("tspan")
        .text(d[a])
        .attr("x", leftSectionWidth-(d.length-a)*16)
        .attr("y", topSectionHeight+i*tileSize+(tileSize/3*2))
        .attr("fill", "black")
        .attr("font-family", "courier")
        .attr("font-size", "12px")
        .attr("text-anchor","middle")
    }
  });


// grid logic
var viz = svg.append('g')
  .attr("transform", "translate(" +
  leftSectionWidth + "," + topSectionHeight + ")");

var tiles = viz.selectAll('rect')
  .data(grid)
  .enter()
  .append('rect')
  .attr('class', function(d) {
    return (d.isPermBlock || d.isClicked) ? 'tileClicked' :
      (d.isClickedNot ? 'tileNot' : 'tile')
  })
  .attr('width', tileSize)
  .attr('height', tileSize)
  .attr('x', function(d) {
    return (d.col-1) * tileSize;
  })
  .attr('y', function(d) {
    return (d.row-1) * tileSize;
  })
  //.on('mouseover', function(d) {console.log(d)})
  .on('click', function(d, i) {
    grid.forEach(function(tile) {
      if (tile.index == i+1 & !d.isLocked) {
        tile.isClicked = (tile.isClicked ? false : true)
      }
    })
    var tile = d3.select(this);
    if (!d.isPermBlock & !d.isLocked) {
      tile.attr(
        'class',
        tile.attr('class') === 'tile' ? 'tileClicked' : 'tile')
    }
    updateTiles(grid);
  })
  .on("contextmenu", function(d, i) {
     //handle right click

     //stop showing browser menu
     d3.event.preventDefault();

     grid.forEach(function(tile) {
       if (tile.index == i+1 & !d.isLocked) {
         tile.isClickedNot = (tile.isClickedNot ? false : true)
       }
     })
     var tile = d3.select(this);
     if (!d.isPermBlock & !d.isLocked) {
       tile.attr(
         'class',
         tile.attr('class') === 'tile' ? 'tileNot' : 'tile')
     }
     updateTiles(grid);
   });

// lock logic, row
var lockR = svg.append('g')
var lockRLogic = lockR.selectAll('circle')
  .data(lockButtonListR)
  .enter()
  .append('circle')
  .attr('cx', leftSectionWidth + tileSize*nCellX + tileSize/2)
  .attr('cy', function(d) {
    return topSectionHeight + tileSize*d.index - tileSize/2
  })
  .attr('r', tileSize/3)
  .attr('class', function(d) {
    return d.isClicked ? 'lockButtonClicked' : 'lockButton'
  })
  .on('mouseover', function() {
    var button = d3.select(this)
    button.attr('fill', 'red')
  })
  .on('mouseout', function() {
    var button = d3.select(this)
    button.attr('fill', 'white')
  })
  .on('click', function(d, i) {
    lockButtonListR.forEach(function(button) {
      if (button.index === i+1) {
        button.isClicked = button.isClicked ? false : true
      }
    });
    updateLockRButton(lockButtonListR)
    grid.forEach(function(tile) {
      if (tile.row === i+1) {
        buttonC = lockButtonListC[tile.col-1].isClicked
        //console.log(buttonC)
        if (!buttonC) {
          tile.isLocked = (tile.isLocked ? false : true);
        }
      }
    });
    //console.log(lockButtonListR)
    updateTiles(grid);
  })

var lockRLetters = lockR.selectAll('text')
  .data(lockButtonListR)
  .enter()
  .append('text')
  .text('L')
  .attr("x", leftSectionWidth + tileSize*nCellX + tileSize/2)
  .attr("y", function(d,i) {
    return topSectionHeight + tileSize/2 + tileSize*i + 3
  })
  .attr("fill", "black")
  .attr("font-family", "courier")
  .attr("font-size", "9px")
  .attr("text-anchor","middle")

// lock logic, column
var lockC = svg.append('g')
var lockCLogic = lockC.selectAll('circle')
  .data(lockButtonListC)
  .enter()
  .append('circle')
  .attr('cx', function(d) {
    return leftSectionWidth + tileSize*d.index - tileSize/2
  })
  .attr('cy', topSectionHeight + tileSize*nCellY + tileSize/2)
  .attr('r', tileSize/3)
  .attr('class', function(d) {
    return d.isClicked ? 'lockButtonClicked' : 'lockButton'
  })
  .on('mouseover', function() {
    var button = d3.select(this)
    //console.log(button.isClicked)

    button.attr('fill', 'red')
  })
  .on('mouseout', function() {
    var button = d3.select(this)
    button.attr('fill', 'white')
  })
  .on('click', function(d, i) {
    lockButtonListC.forEach(function(button) {
      if (button.index === i + 1) {
        button.isClicked = button.isClicked ? false : true
      }
    });
    updateLockCButton(lockButtonListC)
    grid.forEach(function(tile) {
      if (tile.col === i+1) {
        buttonR = lockButtonListR[tile.row-1].isClicked
        //console.log(buttonR)
        if (!buttonR) {
          tile.isLocked = (tile.isLocked ? false : true);
        }
      }
    });
    updateTiles(grid);
  })

var lockCLetters = lockC.selectAll('text')
  .data(lockButtonListC)
  .enter()
  .append('text')
  .text('L')
  .attr("x", function(d,i) {
    return leftSectionWidth + tileSize/2 + tileSize*i
  })
  .attr("y", topSectionHeight + tileSize*nCellY + tileSize/2 + 3  )
  .attr("fill", "black")
  .attr("font-family", "courier")
  .attr("font-size", "9px")
  .attr("text-anchor","middle")

// clear logic, row
var clearR = svg.append('g')

var clearRLogic = clearR.selectAll('circle')
  .data(new Array(25))
  .enter()
  .append('circle')
  .attr('cx', function(d,i) {
    return leftSectionWidth + tileSize*(nCellX+1) + tileSize/2
  })
  .attr('cy', function(d,i) {
    return topSectionHeight + tileSize/2 + tileSize*i
  })
  .attr('r', tileSize/3)
  .attr('fill', 'white')
  .attr('stroke', 'black')
  .on('click', function(d, i) {
    grid.forEach(function(tile) {
      if (tile.row === i + 1 & !tile.isLocked) {
        tile.isClicked = false;
        tile.isClickedNot = false;
      }
    });
    updateTiles(grid);
  })

// clear logic, column
var clearC = svg.append('g')

var clearCLogic = clearC.selectAll('circle')
  .data(new Array(25))
  .enter()
  .append('circle')
  .attr('cx', function(d,i) {
    return leftSectionWidth + tileSize/2 + tileSize*i
  })
  .attr('cy', topSectionHeight + tileSize*(nCellY+1) + tileSize/2)
  .attr('r', tileSize/3)
  .attr('fill', 'white')
  .attr('stroke', 'black')
  .on('click', function(d, i) {
    grid.forEach(function(tile) {
      if (tile.col === i+1 & !tile.isLocked) {
        tile.isClicked = false;
        tile.isClickedNot = false;
      }
    });
    updateTiles(grid);
  })

var clearCLetters = clearC.selectAll('text')
  .data(new Array(25))
  .enter()
  .append('text')
  .text('C')
  .attr("x", function(d,i) {
    return leftSectionWidth + tileSize/2 + tileSize*i
  })
  .attr("y", topSectionHeight + tileSize*(nCellY+1) + tileSize/2 + 3)
  .attr("fill", "black")
  .attr("font-family", "courier")
  .attr("font-size", "9px")
  .attr("text-anchor","middle")

// clear logic, column
var clearC = svg.append('g')

var clearCLogic = clearC.selectAll('circle')
  .data(new Array(25))
  .enter()
  .append('circle')
  .attr('cx', function(d,i) {
    return topSectionHeight + tileSize/2 + tileSize*i
  })
  .attr('cy', function(d,i) {
    return leftSectionWidth + tileSize*(nCellX+1) + tileSize/2
  })
  .attr('r', tileSize/3)
  .attr('fill', 'white')
  .attr('stroke', 'black')
  // .on('click', function(d, i) {
  //   grid.forEach(function(tile) {
  //     if (tile.row === i + 1 & !tile.isLocked) {
  //       tile.isClicked = false;
  //       tile.isClickedNot = false;
  //     }
  //   });
  //   updateTiles(grid);
  // })

var clearCLetters = clearC.selectAll('text')
  .data(new Array(25))
  .enter()
  .append('text')
  .text('C')
  .attr("x", leftSectionWidth + tileSize*(nCellX+1) + tileSize/2)
  .attr("y", function(d,i) {
     return topSectionHeight + tileSize/2 + tileSize*(i % nCellX) + 3
  })
  .attr("fill", "black")
  .attr("font-family", "courier")
  .attr("font-size", "9px")
  .attr("text-anchor","middle")

function updateTiles(data) {
  // draw tile svg based on data
  var tiles = viz.selectAll("rect").data(data);

  // create new data points
  tiles.enter().append('rect')

  // updates to data
  tiles
    .attr('class', function(d) {
      return (d.isPermBlock || d.isClicked) ? 'tileClicked' :
        (d.isClickedNot ? 'tileNot' : 'tile')
    })
    .attr('width', tileSize)
    .attr('height', tileSize)
    .attr('x', function(d) { return (d.col - 1) * tileSize })
    .attr('y', function(d) { return (d.row - 1) * tileSize })
    // .on('mouseover', function(d) {console.log(d)})
    .on('click', function(d, i) {
      grid.forEach(function(tile) {
        if (tile.index == i+1 & !d.isLocked) {
          tile.isClicked = (tile.isClicked ? false : true)
        }
      })
      var tile = d3.select(this);
      if (!d.isPermBlock & !d.isLocked) {
        tile.attr(
          'class',
          tile.attr('class') === 'tile' ? 'tileClicked' : 'tile')
      }
      updateTiles(grid);
    });

    // if data is removed
    tiles.exit().remove();
}

function updateLockRButton(data) {
  // draw tile svg based on data
  var lockB = lockR.selectAll("circle").data(data);

  // create new data points
  lockB.enter().append('circle')

  // updates to data
  lockB
  .attr('cx', leftSectionWidth + tileSize*nCellX + tileSize/2)
  .attr('cy', function(d) {
    return topSectionHeight + tileSize*d.index - tileSize/2
  })
  .attr('r', tileSize/3)
  .attr('class', function(d) {
    return d.isClicked ? 'lockButtonClicked' : 'lockButton'
  })
  .on('mouseover', function() {
    var button = d3.select(this)
    //console.log(button.isClicked)
    button.attr('fill', 'red')
  })
  .on('mouseout', function() {
    var button = d3.select(this)
    button.attr('fill', 'white')
  })
  .on('click', function(d, i) {
    lockButtonListR.forEach(function(button) {
      if (button.index === i + 1) {
        button.isClicked = button.isClicked ? false : true
      }
    });
    updateLockRButton(lockButtonListR)
    grid.forEach(function(tile) {
      if (tile.row === i+1) {
        buttonC = lockButtonListC[tile.col-1].isClicked
        //console.log(buttonC)
        if (!buttonC) {
          tile.isLocked = (tile.isLocked ? false : true);
        }
      }
    });
    //console.log(lockButtonListR)

    updateTiles(grid);
  })

    // if data is removed
    lockB.exit().remove();
}

function updateLockCButton(data) {
  // draw tile svg based on data
  var lockB = lockC.selectAll("circle").data(data);

  // create new data points
  lockB.enter().append('circle')

  // updates to data
  lockB
  .attr('cx', function(d) {
    return leftSectionWidth + tileSize*d.index - tileSize/2
  })
  .attr('cy', topSectionHeight + tileSize*nCellY + tileSize/2)
  .attr('r', tileSize/3)
  .attr('class', function(d) {
    return d.isClicked ? 'lockButtonClicked' : 'lockButton'
  })
  .on('mouseover', function() {
    var button = d3.select(this)
    //console.log(button.isClicked)

    button.attr('fill', 'red')
  })
  .on('mouseout', function() {
    var button = d3.select(this)
    button.attr('fill', 'white')
  })
  .on('click', function(d, i) {
    lockButtonListC.forEach(function(button) {
      if (button.index === i + 1) {
        button.isClicked = button.isClicked ? false : true
      }
    });
    updateLockCButton(lockButtonListC)
    grid.forEach(function(tile) {
      if (tile.col === i+1) {
        buttonR = lockButtonListR[tile.row-1].isClicked
        //console.log(buttonR)
        if (!buttonR) {
          tile.isLocked = (tile.isLocked ? false : true);
        }
      }
    });
    updateTiles(grid);
  })

    // if data is removed
    lockB.exit().remove();
}
