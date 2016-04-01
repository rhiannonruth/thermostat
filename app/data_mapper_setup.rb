require_relative 'models/thermostat'

DataMapper.setup(:default, ENV['DATABASE_URL'] || "postgres://localhost/thermostat_test")
DataMapper.finalize
DataMapper.auto_migrate!
