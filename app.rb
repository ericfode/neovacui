require 'sinatra'
require 'sinatra/cookies'

set :root, File.dirname(__FILE__) + '/dist'
set :public_folder, File.dirname(__FILE__) + '/dist'
set :static, true


get '/' do 
  cookies[:token] = request.env['bouncer.token']
  File.read(File.join('dist', 'index.html'))
end


