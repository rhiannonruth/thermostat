function Thermostat() {
  this._temperature = 20
}

Thermostat.prototype.temperature = function() {
  return this._temperature
}

Thermostat.prototype.up = function() {
  this._temperature += 1;
}

Thermostat.prototype.down = function() {
  if (this._temperature === 10){
    throw new Error('too damn cold!');
  }
  this._temperature -= 1;
}
