require 'rails_helper'

RSpec.describe "Microposts", type: :request do
  describe "GET /index" do
    it "returns http success" do
      get "/microposts/index"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /show" do
    it "returns http success" do
      get "/microposts/show"
      expect(response).to have_http_status(:success)
    end
  end

end
