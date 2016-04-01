"use strict";

$(document).ready(function() {
  var thermostat = new Thermostat();
  // updateTemperature();
  getTemp();
  getCity();
  // $("#slider").roundSlider("option", "value", startTemp);

  // $('#temperature-up').click(function() {
  //   thermostat.up();
  //   // updateTemperature();
  // });
  //
  // $('#temperature-down').click(function() {
  //   thermostat.down();
  //   // updateTemperature();
  // });

  $('#temperature-reset').click(function() {
    thermostat.reset();
    // updateTemperature();
    updateSlider();
  });

  $('#powersaving-switch').click(function() {
    thermostat.powerSavingSwitch();
    if (thermostat._powerSavingMode === false) {
      $('#power-saving-status').text('off');
    } else {
      $('#power-saving-status').text('on');
    }
    // updateTemperature();
    updateSlider();
  });

  // function updateTemperature() {
  //   $('#temperature').text(thermostat._temperature);
  //   if (thermostat.energyUsage() === 'low') {
  //     $('#temperature').removeClass($('#temperature').attr('class')).addClass('low-usage');
  //   } else if (thermostat.energyUsage() === 'medium') {
  //     $('#temperature').removeClass($('#temperature').attr('class')).addClass('med-usage');
  //   } else {
  //     $('#temperature').removeClass($('#temperature').attr('class')).addClass('high-usage');
  //   }
  // };

  $("#weather-submit").click(function(e) {
    e.preventDefault();
    var city = $('input[name="city"]').val();
    displayWeather(city);
    $.post('http://localhost:4567/dummycity?&city='+city, function(data){
    });
  });


  function getTemp(){
    $.getJSON('http://localhost:4567/dummytemp', function(data){
      $("#slider").roundSlider("option", "value", data.userinfo.temp);
      thermostat._temperature = data.userinfo.temp;
    });
  }

  function getCity(){
    $.getJSON('http://localhost:4567/dummytemp', function(data){
      $('.city').val(data.userinfo.city);
      if (data.userinfo.city != undefined){
        $('#weather-submit').click()
      };
    });
  }

  function displayWeather(city) {
    var url = "http://api.openweathermap.org/data/2.5/weather?q=" + city;
    var token = "&appid=a2f6ade05ee1433ae21b182c6848bfe4";
    var units = "&units=metric";
    $.get(url + token + units, function(data) {
      $('#weather').text('Weather in ' + data.name + ': ' + data.main.temp + '\u00B0C');
    });
  }

  // slider

$("#slider").roundSlider({
    radius: 200,
    width: 50,
    min: 5,
    max: 35,
    startAngle: 330,
    handleSize: "+8",
    handleShape: "dot",
    sliderType: "min-range",
    value: 20,
    drag: updateTemp
});

function updateTemp(e) {
  if (e.value >= thermostat.MAXIMUM_TEMPERATURE) {
    thermostat._temperature = thermostat.MAXIMUM_TEMPERATURE;
  } else if (e.value < 10) {
    thermostat._temperature = thermostat.MINIMUM_TEMPERATURE;
  } else {
    thermostat._temperature = e.value;
  };
  // updateTemperature();
  // console.log(thermostat._temperature);
  // console.log(thermostat.energyUsage());
  updateSlider();
  updateColor();
  $.post('http://localhost:4567/dummytemp?temperature='+thermostat._temperature, function(data){
  });
}

function updateSlider() {
  $('#slider').roundSlider("option", "value", thermostat._temperature);
};

  // slider styling
function updateColor() {
  if (thermostat.energyUsage() === 'low') {
    $('#slider .rs-border').css('background-color','#FFC48F');
  } else if (thermostat.energyUsage() === 'medium') {
    $('#slider .rs-border').css('background-color','#FFA04C');
  } else {
    $('#slider .rs-border').css('background-color','#E98125');
  }
};

$('input[type=submit]').hide();

});
