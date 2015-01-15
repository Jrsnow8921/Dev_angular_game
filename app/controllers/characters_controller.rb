class CharactersController < ApplicationController

  def index
    characters = Character.all
    if characters.blank?
      render json: { error: 'No characters could be found' }, status: :not_found
    else
      render json: characters.as_json, status: :ok
    end
  end

  def show
    if params[:id].blank?
      render json: { error: 'Invalid Character ID' }, status: :bad_request
    else
      character = Character.find_by_id(params[:id])

      if character.nil?
        render json: { error: 'Character could not be found' }, status: :not_found
      else
        render json: character.as_json, status: :ok
      end
    end
  end

  def create
    character = Character.new(character_params.except('id'))

    begin
      character.save!
      render json: character.as_json, status: :created
    rescue ActiveRecord::RecordInvalid
      render json: { error: 'Character record is invalid' }, status: :bad_request
    rescue ActiveRecord::RecordNotSaved
      render json: { error: 'Character could not be saved' }, status: :internal_server_error
    end
  end

  def update
    if params[:id].blank?
      render json: { error: 'Invalid Character ID' }, status: :bad_request
    else
      character = Character.find_by_id(params[:id])

      if character.nil?
        render json: { error: 'Character could not be found' }, status: :not_found
      else
        character.assign_attributes(character_params.except('id'))

        begin
          character.save!
          render json: character.as_json, status: :ok
        rescue ActiveRecord::RecordInvalid
          render json: { error: 'Character record is invalid' }, status: :bad_request
        rescue ActiveRecord::RecordNotSaved
          render json: { error: 'Character could not be saved' }, status: :internal_server_error
        end
      end
    end
  end

  def destroy
    if params[:id].blank?
      render json: { error: 'Invalid Character ID' }, status: :bad_request
    else
      character = Character.find_by_id(params[:id])

      if character.nil?
        render json: { error: 'Character could not be found' }, status: :not_found
      else
        begin
          character.destroy!
          render json: { message: 'Character deleted successfully'}, status: :ok
        rescue
          render json: { error: 'Character could not be deleted' }, status: :internal_server_error
        end
      end
    end
  end

  private

  def character_params
    params.require(:character).permit(
      :id, :first_name, :last_name, :race, :party_id, :sex)
  end
end
