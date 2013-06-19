require './app'
require 'heroku/bouncer'

use Heroku::Bouncer, expose_token:true, herokai_only:true
run Sinatra::Application
