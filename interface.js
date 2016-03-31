"use strict";

$(document).ready(function() {
  var thermostat = new Thermostat();
  updateTemperature();

  $('#temperature-up').click(function() {
    thermostat.up();
    updateTemperature();
  });

  $('#temperature-down').click(function() {
    thermostat.down();
    updateTemperature();
  });

  $('#temperature-reset').click(function() {
    thermostat.reset();
    updateTemperature();
  });

  $('#powersaving-switch').click(function() {
    thermostat.powerSavingSwitch();
    if (thermostat._powerSavingMode === false) {
      $('#power-saving-status').text('off');
    } else {
      $('#power-saving-status').text('on');
    }
    updateTemperature();
  });

  function updateTemperature() {
    $('#temperature').text(thermostat._temperature);
    if (thermostat.energyUsage() === 'low') {
      $('#temperature').removeClass($('#temperature').attr('class')).addClass('low-usage');
    } else if (thermostat.energyUsage() === 'medium') {
      $('#temperature').removeClass($('#temperature').attr('class')).addClass('med-usage');
    } else {
      $('#temperature').removeClass($('#temperature').attr('class')).addClass('high-usage');
    }
  };

  $("#weather-submit").click(function(e) {
    e.preventDefault();
    var city = $('input[name="city"]').val();
    displayWeather(city);
  });

  function displayWeather(city) {
    var url = "http://api.openweathermap.org/data/2.5/weather?q=" + city;
    var token = "&appid=a2f6ade05ee1433ae21b182c6848bfe4";
    var units = "&units=metric";
    $.get(url + token + units, function(data) {
      $('#weather').text('Weather in ' + data.name + ': ' + data.main.temp);
    });
  }

$("#slider").roundSlider({
    radius: 80,
    width: 14,
    handleSize: "+8",
    handleShape: "dot",
    sliderType: "min-range",
    value: thermostat._temperature,
    change: updateTemp
});

function updateTemp(e) {
  thermostat._temperature = e.value;
  updateTemperature();
  console.log(e.type);
}



});
