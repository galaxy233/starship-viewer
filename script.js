var starshipMap = {
  'CR90 Corvette' : {
    id : 2,
    imgPath : "img/CR90.jpg"
  },
  'V-Wing' : {
    id : 75,
    imgPath : "img/Vwing.jpg"
  },
  'Belbullab-22 Starfighter' : {
    id : 74,
    imgPath : "img/Belbullab-22.jpg"
  },
  'Jedi Interceptor': {
    id : 65,
    imgPath : "img/Interceptor.jpg"
  },
  'Star Destroyer': {
    id : 3,
    imgPath : "img/Star-Destroyer.jpg"
  },
  'Trade Fedaration Cruiser': {
    id : 59,
    imgPath : "img/Trade-Federation.jpg"
  },
  'Solar Sailer': {
    id : 58,
    imgPath : "img/Solar_sail.jpg"
  },
  'Republic Attack Cruiser': {
    id : 63,
    imgPath : "img/Republic_Attack.jpeg"
  },
  'A-wing': {
    id : 28,
    imgPath : "img/AWing.png"
  },
  'B-Wing': {
    id : 29,
    imgPath : "img/BWing.jpg"
  },
  'Naboo Fighter': {
    id : 39,
    imgPath : "img/Naboo.jpg"
  },
  'Millenium Falcon': {
    id : 10,
    imgPath : "img/millennium.jpg"
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
  var left = getStarshipPromise(leftIdx);
  var right = getStarshipPromise(rightIdx);
  left.then(data => updateView('left', leftIdx, data))
  right.then(data => updateView('right', rightIdx, data))
}

function getStarshipPromise(index) {
  var starship = starshipArr[index];
  var promise = new Promise(function(resolve, reject) {
    if (!starshipMap[starship].data) {
      fetch("http://swapi.co/api/starships/" + starshipMap[starship].id).then(function(resp) {
        return resp.json();
      }).then(function(data) {
        var starshipData = {
          cost:data["cost_in_credits"],
          speed:data["max_atmosphering_speed"],
          cargo:data["cargo_capacity"],
          passengers:data["passengers"]
        }
        starshipMap[starship].data = starshipData;
        resolve(starshipData);
      })
    } else {
      resolve(starshipMap[starship].data)
    }
  })
  return promise;
}

function updateView(view, index, data) {
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
  name.innerHTML = starshipArr[index];
  img.src = starshipMap[starshipArr[index]]['imgPath'];
  updateCells([cost, speed, cargo, passengers], data);
}

// Add event listeners with jQuery
$("#starship-left-toggle-left").click(function() {
  leftIdx = prevIdx(leftIdx);
  if (leftIdx === rightIdx) {
    leftIdx = prevIdx(leftIdx);
  }
  var promise = getStarshipPromise(leftIdx);
  promise.then(data => updateView('left', leftIdx, data));
})
$("#starship-left-toggle-right").click(function() {
  leftIdx = nextIdx(leftIdx);
  if (leftIdx === rightIdx) {
    leftIdx = nextIdx(leftIdx);
  }
  var promise = getStarshipPromise(leftIdx);
  promise.then(data => updateView('left', leftIdx, data));
})
$("#starship-right-toggle-left").click(function() {
  rightIdx = prevIdx(rightIdx);
  if (rightIdx === leftIdx) {
    rightIdx = prevIdx(rightIdx);
  }
  var promise = getStarshipPromise(rightIdx);
  promise.then(data => updateView('right', rightIdx, data));
})
$("#starship-right-toggle-right").click(function() {
  rightIdx = nextIdx(rightIdx);
  if (rightIdx === leftIdx) {
    rightIdx = nextIdx(rightIdx);
  }
  var promise = getStarshipPromise(rightIdx);
  promise.then(data => updateView('right', rightIdx, data));
})

initializeView();
