$(document).ready(function(){
  var thermostat = new Thermostat();
  $('#temperature').text(thermostat._temperature);
  $('#up').click(function() {
    thermostat.up();
  $('#temperature').text(thermostat._temperature);
  });
  $('#down').click(function() {
    thermostat.down();
  $('#temperature').text(thermostat._temperature);
  });
  $('#reset').click(function() {
    thermostat.reset();
  $('#temperature').text(thermostat._temperature);
  });
  $('#energySavingButton').click(function() {
    thermostat.powerSavingSwitch();
  });
});
