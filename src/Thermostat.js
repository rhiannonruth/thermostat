"use strict";

function Thermostat() {
  this.MINIMUM_TEMPERATURE = 10;
  this._powerSavingMode = true;
  this.DEFAULT_TEMPERATURE = 20;
  this._temperature = this.DEFAULT_TEMPERATURE;
  this.setMaxTemp();
}

Thermostat.prototype.temperature = function() {
  return this._temperature;
};

Thermostat.prototype.up = function() {
  if (this.isMaxTemp()) {
    throw new Error('too damn hot!');
  }
  this._temperature += 1;
};

Thermostat.prototype.down = function() {
  if (this.isMinTemp()) {
    throw new Error('too damn cold!');
  }
  this._temperature -= 1;
};

Thermostat.prototype.isMinTemp = function() {
  return (this._temperature <= this.MINIMUM_TEMPERATURE);
};

Thermostat.prototype.isMaxTemp = function() {
  return (this._temperature >= this.MAXIMUM_TEMPERATURE);
};

Thermostat.prototype.isPowerSavingModeOn = function() {
  return this._powerSavingMode === true;
};

Thermostat.prototype.powerSavingSwitch = function() {
  this._powerSavingMode = !this._powerSavingMode;
  this.setMaxTemp();
};

Thermostat.prototype.setMaxTemp = function() {
  this._powerSavingMode ? this.MAXIMUM_TEMPERATURE = 25 : this.MAXIMUM_TEMPERATURE = 32;
};

Thermostat.prototype.reset = function() {
  this._temperature = this.DEFAULT_TEMPERATURE;
};

Thermostat.prototype.energyUsage = function() {
  if (this._temperature < 18) {
    return 'low';
  }
  if (this._temperature < 25) {
    return 'medium';
  }
  return 'high';
};
