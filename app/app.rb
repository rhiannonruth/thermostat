require 'sinatra/base'
require 'json'
require_relative 'data_mapper_setup'
require_relative 'data_mapper_setup'

class Thermostat < Sinatra::Base

  # enable :sessions
  # set :session_secret, 'super secret'

  # get '/' do
  #   'Hello Thermostat!'
  # end
  #
  # get '/temperature' do
  #   headers 'Access-Control-Allow-Origin' => '*'
  #   { userinfo: {"temp":session['temp'],"lat":51.51}}.to_json
  #   tell_the_termo_the_old_temp > really just a string which themro will convert to int
  #
  # end
  #
  # psot temp do
  #   get a string from params[:name]
  #   store the string in the db
  #   "all good"
  # end

  get '/info' do
    response.headers['Access-Control-Allow-Origin'] = '*'
    @thermostat = ThermostatInfo.first
    @thermostat = ThermostatInfo.create(temperature: params[:temperature], city: params[:city]) if @thermostat.nil?
    {userinfo: {temp: @thermostat.temperature, city: @thermostat.city}}.to_json
  end

  post '/temp' do
    response.headers['Access-Control-Allow-Origin'] = '*'
    ThermostatInfo.first.update(temperature: params[:temperature])
  end

  post '/city' do
    response.headers['Access-Control-Allow-Origin'] = '*'
    ThermostatInfo.first.update(temperature: params[:temperature], city: params[:city])
  end

  # start the server if ruby file executed directly
  run! if app_file == $0
end
