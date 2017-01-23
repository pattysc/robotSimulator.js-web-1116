'use strict';

const directions = ['north', 'east', 'south', 'west']

function Robot(){}

Robot.prototype.orient = function(x) {
  if(directions.includes(x)) {
    this.bearing = x
  } else {
    throw new Error('Invalid Robot Bearing')
  }
}

Robot.prototype.turnRight = function() {
    if (this.bearing === 'north') {
    this.orient('east')
  } else if (this.bearing === 'east') {
    this.orient('south')
  } else if (this.bearing === 'south') {
    this.orient('west')
  } else {
    this.orient('north')
  }
}

Robot.prototype.turnLeft = function() {
    if (this.bearing === 'north') {
    this.orient('west')
  } else if (this.bearing === 'east') {
    this.orient('north')
  } else if (this.bearing === 'south') {
    this.orient('east')
  } else {
    this.orient('south')
  }
}


Robot.prototype.at = function(x, y) {
  this.coordinates = [x, y]
}


Robot.prototype.advance = function() {
  if (this.bearing === 'east') {
    this.coordinates[0] += 1
  } else if (this.bearing === 'south') {
    this.coordinates[1] -= 1
  } else if (this.bearing === 'west') {
    this.coordinates[0] -= 1
  } else {
    this.coordinates[1] += 1
  }
}

Robot.prototype.instructions = function(s) {
 var a = []
  s.split("").forEach(function(e) {
    if (e === "L") {
      a.push('turnLeft')
    } else if (e === "R") {
      a.push('turnRight')
   } else if (e === "A") {
     a.push('advance')
   }
  })
  return a
}

Robot.prototype.place = function(obj) {
  this.at(obj.x, obj.y)
  this.orient(obj.direction)
}

Robot.prototype.evaluate = function(string){
  this.instructions(string).forEach(function(e){
    this[e]()
  }.bind(this))
}
