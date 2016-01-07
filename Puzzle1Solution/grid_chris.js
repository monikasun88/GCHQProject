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
    row: i % nCellX,
    col: Math.floor((i-1)/ nCellY),
    isPermBlock: isPermBlock,
    isLocked: isPermBlock,
    isClicked: false,
  }
  grid.push(tile);
}

var clues = [];
for (var i=1; i<=nCellX; i++) {
  clues.push(i);
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

update(grid);

// lock logic, row
var lockR = svg.append('g')

var lockRLogic = lockR.selectAll('circle')
  .data(clues)
  .enter()
  .append('circle')
  .attr('cx', leftSectionWidth + tileSize*nCellX + tileSize/2)
  .attr('cy', function(d,i) {
    return topSectionHeight + tileSize/2 + tileSize*i
  })
  .attr('r', tileSize/3)
  .attr('fill', 'red')
  .attr('stroke', 'black')
  .on('mouseover', function() {
    var button = d3.select(this)
    button.attr('fill', 'white')
  })
  .on('mouseout', function() {
    var button = d3.select(this)
    button.attr('fill', 'red')
  })

var lockRLetters = lockR.selectAll('text')
  .data(clues)
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




// clear logic
var clearR = svg.append('g')

var clearRLogic = clearR.selectAll('circle')
  .data(clues)
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
    tile = d3.select(this)
    for (a=nCellX*i+i; a<=nCellX*i+24;a++) {
      if (permBlock.indexOf(a) === -1) {
        tile.attr('class', 'tile')
      } else {
        tile.attr('class', 'tileClicked')
      }
    }
  })

var clearRLetters = clearR.selectAll('text')
  .data(new Array(nCellX))
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
  .on('click', function(d, i) {
    grid.forEach(function(tile) {
      if (tile.row === i + 1) {
        tile.isClicked = false;
      }
    });
    update(grid);
  })


function update(data) {
  // draw tile svg based on data
  var tiles = viz.selectAll("rect").data(data);

  // create new data points
  tiles.enter().append('rect')

  // updates to data
  tiles
    .attr('class', function(d) {return d.isPermBlock ? "tileClicked" : "tile";})
    .attr('width', tileSize)
    .attr('height', tileSize)
    .attr('x', function(d) { return d.row * tileSize;})
    .attr('y', function(d) { return d.col * tileSize;})
    // .on('mouseover', function(d) {console.log(d)})
    .on('click', function(d) {
      var tile = d3.select(this);
      if (!d.isLocked && !d.isPermBlock) {
        tile.attr(
          'class',
          tile.attr('class') === 'tile' ? 'tileClicked' :
          (tile.attr('class') === 'tileClicked' ? 'tileNot' : 'tile')
        )
      }
    });

    // if data is removed
    tiles.exit().remove();
}
