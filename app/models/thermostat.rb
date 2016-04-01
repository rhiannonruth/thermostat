require 'data_mapper'
require 'dm-postgres-adapter'

class ThermostatInfo

  include DataMapper::Resource

  property :id,     Serial
  property :temperature,  String
  property :city,    String

end
