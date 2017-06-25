var starshipMap = {
  'CR90 Corvette' : {
    'id' : 2,
    'imgPath' : "img/CR90.jpg",
    'data' : {
      'cost' : 1000,
      'speed' : 1000,
      'cargo' : 1000,
      'passengers' : 1000
    }
  },
  'V-Wing' : {
    'id' : 75,
    'imgPath' : "img/Vwing.jpg",
    'data' : {
      'cost' : 9000,
      'speed' : 9000,
      'cargo' : 9000,
      'passengers' : 9000
    }
  },
  'Belbullab-22 Starfighter' : {
    'id' : 74,
    'imgPath' : "img/Belbullab-22.jpg",
    'data' : {
      'cost' : 8000,
      'speed' : 8000,
      'cargo' : 8000,
      'passengers' : 8000
    }
  }
}

var starshipArr = Object.keys(starshipMap);
var leftIdx = 1;
var rightIdx = 2;

function nextIdx(index) {
  if (index === starshipArr.length-1) {
    return 0;
  } else {
    return index + 1;
  }
}

function prevIdx(index) {
  if (index === 0) {
    return starshipArr.length-1;
  } else {
    return index - 1;
  }
}

function accessTableCell(table, node) {
  return table.childNodes[node].childNodes[3];
}

function updateCells(cells, data) {
  // Update cells with new data. Assumes cells is an array of elements to be updated.
  // Assumes data is in JSON format.
  cells[0].innerHTML = data.cost;
  cells[1].innerHTML = data.speed;
  cells[2].innerHTML = data.cargo;
  cells[3].innerHTML = data.passengers;
}

function initializeView() {
  updateView('left', leftIdx);
  updateView('right', rightIdx);
}

function updateView(view, index) {
  // Update browser with data for starship at index i in starshipArr. Assumes i is valid
  // index in starshipArr.
  if (view === 'left') {
    var table = $("#starship-data-left")[0];
    var name = $("#starship-name-left")[0];
    var img = $("#starship-img-left")[0];
  } else {
    var table = $("#starship-data-right")[0];
    var name = $("#starship-name-right")[0];
    var img = $("#starship-img-right")[0];
  }
  var cost = accessTableCell(table, 1);
  var speed = accessTableCell(table, 3);
  var cargo = accessTableCell(table, 5);
  var passengers = accessTableCell(table, 7);
  var data = getDataFromCache(index);
  name.innerHTML = starshipArr[index];
  img.src = starshipMap[starshipArr[index]]['imgPath'];
  updateCells([cost, speed, cargo, passengers], data);
}

function getDataFromCache(index) {
  // Checks if data already exists in cache. If not, the data is requested from the
  // server and stored in the cache.
  var starship = starshipArr[index];
  if (starshipMap[starship].data) {
    return starshipMap[starship].data;
  } else {
    starshipMap[starship].data = getDataFromServer(index);
    return starshipMap[starship].data;
  }
}

function getDataFromServer(index) {
  // async code goes here
}
// Add event listeners with jQuery
$("#starship-left-toggle-left").click(function() {
  leftIdx = prevIdx(leftIdx);
  if (leftIdx === rightIdx) {
    leftIdx = prevIdx(leftIdx);
  }
  updateView('left', leftIdx);
})
$("#starship-left-toggle-right").click(function() {
  leftIdx = nextIdx(leftIdx);
  if (leftIdx === rightIdx) {
    leftIdx = nextIdx(leftIdx);
  }
  updateView('left', leftIdx);
})
$("#starship-right-toggle-left").click(function() {
  rightIdx = prevIdx(rightIdx);
  if (rightIdx === leftIdx) {
    rightIdx = prevIdx(rightIdx);
  }
  updateView('right', rightIdx);
})
$("#starship-right-toggle-right").click(function() {
  rightIdx = nextIdx(rightIdx);
  if (rightIdx === leftIdx) {
    rightIdx = nextIdx(rightIdx);
  }
  updateView('right', rightIdx);
})
initializeView();
