require 'sinatra'
require 'json'

# Memory server implementation in Ruby

class Memory
  def initialize; clear; end
  def get; @value; end
  def add(value); @value = (@value||0) + value.to_f; end
  def subtract(value); @value = (@value||0) - value.to_f; end
  def clear; @value=nil; end
end
$memory = Memory.new

helpers do
  def send_json(value)
    if @jsonp
      content_type 'text/javascript'
      "#{@jsonp}(#{value.to_json})"
    else
      content_type :json
      value.to_json
    end
  end
end

before do
  @jsonp = params[:callback]
end

get '/memory' do
  send_json $memory.get
end

get '/memory/add/:value' do
  send_json $memory.add(params[:value])
end

get '/memory/subtract/:value' do
  send_json $memory.subtract(params[:value])
end

get '/memory/clear' do
  send_json $memory.clear
end
