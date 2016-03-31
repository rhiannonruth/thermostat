$(document).ready(function(){
  var thermostat = new Thermostat();
  updateTemperature()

  $('#temperature-up').click(function() {
    thermostat.up();
    updateTemperature()
  });

  $('#temperature-down').click(function() {
    thermostat.down();
    updateTemperature()
  });

  $('#temperature-reset').click(function() {
    thermostat.reset();
    updateTemperature()
  });

  $('#powersaving-switch').click(function() {
    thermostat.powerSavingSwitch();
    if (thermostat._powerSavingMode === false){
      $('#power-saving-status').text('off');
    }
    else {
      $('#power-saving-status').text('on');
    };
  });

  function updateTemperature() {
  $('#temperature').text(thermostat._temperature);
  };



});
