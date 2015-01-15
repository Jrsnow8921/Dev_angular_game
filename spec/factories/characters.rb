# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :character, class: Character do
    first_name     'John'
    last_name      'Doe'
    sex            'Male'
    race           'Human'
  end
end
