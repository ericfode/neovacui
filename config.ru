require 'sinatra'
run Sinatra::Application

set :static, true
use Rack::NoWWW
use Rack::Static, :urls => ['/scripts', '/styles', '/app'], :root=> 'app'
set :public_folder, 'app'
