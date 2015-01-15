class ApplicationController < ActionController::API
  include ActionController::MimeResponds

  before_filter :redirect_non_json

  def redirect_non_json
    respond_to do |format|
      format.json {}
      format.any do
        redirect_to '/'
      end
    end
  end
end
