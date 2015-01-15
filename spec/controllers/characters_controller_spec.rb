require 'spec_helper'

describe CharactersController do

  before :each do
    request.accept = 'application/json'
  end

  describe 'GET /characters with no params' do
    it 'should return 404 when no records exist' do
      get :index
      expect(response.code).to eq('404')
    end

    it 'should return all characters in an array when records exist' do
      create(:character)
      create(:character)
      get :index
      expect(response.code).to eq('200')
      expect(response.body).to_not be_nil
    end
  end

  describe 'GET /characters with ID' do

    before :each do
      @character = create(:character)
    end

    it 'should return 400 when id is empty' do
      get :show, id: ''
      expect(response.code).to eq('400')
    end

    it 'should return 404 when invalid params are passed' do
      get :show, id: 'some_invalid_id'
      expect(response.code).to eq('404')
    end

    it 'should return 200 when valid params are passed' do
      get :show, id: @character.id
      expect(response.code).to eq('200')
    end

    it 'should return a character record when a valid ID is passed' do
      get :show, id: @character.id
      expect(response.body).to eq(@character.to_json)
    end
  end

  describe 'POST /characters' do
    it 'should return 201 when valid params are passed' do
      test_character = build(:character).attributes.except('created_at', 'updated_at', 'id')
      post :create, character: test_character
      expect(response.code).to eq('201')
    end

    it 'should create a character record when valid params are passed' do
      test_character = build(:character, first_name: 'some_test_name')
      post :create, character: test_character.attributes.except('created_at', 'updated_at', 'id')
      expect(Character.find_by_first_name('some_test_name')).not_to be_nil
    end

    it 'should return 500 when save fails' do
      test_character = build(:character)
      allow_any_instance_of(Character).to receive(:save!).and_raise(ActiveRecord::RecordNotSaved.new)
      post :create, character: test_character.attributes.except('created_at', 'updated_at', 'id')
      expect(response.code).to eq('500')
    end

    it 'should return 400 when record validation fails' do
      test_character = build(:character)
      allow_any_instance_of(Character).to receive(:save!).and_raise(ActiveRecord::RecordInvalid.new(test_character))
      post :create, character: test_character.attributes.except('created_at', 'updated_at', 'id')
      expect(response.code).to eq('400')
    end
  end

  describe 'PUT /characters' do

    before :each do
      @character = create(:character)
    end

    it 'should return 400 when id is empty' do
      put :update, id: ''
      expect(response.code).to eq('400')
    end

    it 'should return 404 when invalid params are passed' do
      put :update, id: 'some_invalid_id'
      expect(response.code).to eq('404')
    end

    it 'should return 200 when valid params are passed' do
      put :update, id: @character.id,
                   character: build(:character).attributes.except('created_at', 'updated_at')
      expect(response.code).to eq('200')
    end

    it 'should update a character record when valid params are passed' do
      test_character = build(:character, id: @character.id, first_name: 'some_test_name')
      put :update, id: @character.id,
                   character: test_character.attributes.except('created_at', 'updated_at', 'id')
      expect(Character.find_by_id(@character.id)).to eq(test_character)
    end

    it 'should return 500 when save fails' do
      allow_any_instance_of(Character).to receive(:save!).and_raise(ActiveRecord::RecordNotSaved.new)
      put :update, id: @character.id,
                   character: @character.attributes.except('created_at', 'updated_at')
      expect(response.code).to eq('500')
    end

    it 'should return 400 when character validation fails' do
      test_character = create(:character)
      allow_any_instance_of(Character).to receive(:save!).and_raise(ActiveRecord::RecordInvalid.new(test_character))
      put :update, id: test_character.id,
                   character: test_character.attributes.except('created_at', 'updated_at', 'id')
      expect(response.body).to_not be_nil
      expect(response.code).to eq('400')
    end
  end

  describe 'DELETE /characters' do

    before :each do
      @character = create(:character)
    end

    it 'should return 400 when id is empty' do
      delete :destroy, id: ''
      expect(response.code).to eq('400')
    end

    it 'should return 404 when invalid params are passed' do
      delete :destroy, id: 'some_invalid_id'
      expect(response.code).to eq('404')
    end

    it 'should return 200 when valid params are passed' do
      delete :destroy, id: @character.id
      expect(response.code).to eq('200')
    end

    it 'should return 500 when delete fails' do
      allow_any_instance_of(Character).to receive(:destroy!).and_raise(ActiveRecord::RecordNotSaved)
      delete :destroy, id: @character.id
      expect(response.code).to eq('500')
    end
  end
end
