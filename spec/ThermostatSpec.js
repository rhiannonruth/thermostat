describe('Thermostat', function(){

  var thermostat;

  beforeEach(function(){
    thermostat = new Thermostat();
  });

  it('starts at 20 degrees', function(){
    expect(thermostat.temperature()).toEqual(20)
  });

  describe('up button', function(){
    
    it('increases temp', function(){
      thermostat.up();
      expect(thermostat.temperature()).toEqual(21)
      });
  })
});
