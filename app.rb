require 'sinatra'
set :root, File.dirname(__FILE__) + '/dist'
set :public_folder, File.dirname(__FILE__) + '/dist'
set :static, true


get '/' do 
  File.read(File.join('dist', 'index.html'))
end


