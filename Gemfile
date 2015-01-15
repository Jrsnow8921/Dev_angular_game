ruby '2.1.1'

source 'https://rubygems.org'

gem 'rails', '4.1.1'
gem 'rails-api'
gem 'pg'

group :test, :development do
  gem 'rspec-rails'
  gem 'factory_girl_rails'

  # CI
  gem 'brakeman', require: false
  gem 'ci_reporter_rspec', require: false
  gem 'rubocop', '= 0.18.1', require: false
  gem 'rubocop-checkstyle_formatter', require: false
  gem 'simplecov'
  gem 'simplecov-rcov'
end

group :production do
  # Heroku
  gem 'rails_12factor'
end

# To use ActiveModel has_secure_password
# gem 'bcrypt-ruby', '~> 3.1.2'

# To use Jbuilder templates for JSON
# gem 'jbuilder'

# Use unicorn as the app server
# gem 'unicorn'

# Deploy with Capistrano
# gem 'capistrano', :group => :development

# To use debugger
# gem 'ruby-debug19', :require => 'ruby-debug'

