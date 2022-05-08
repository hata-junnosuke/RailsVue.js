class Api::Me::AccountsController < ApplicationController
  before_action :authenticate

  def update
    current_user.assign_attributes(user_params) #　配列でuser_paramsを受け取り設定（保存はまだ）
    current_user.save_with_tags!(tag_names: tag_names) # タグが既に存在する場合は既存のレコードを取得、なければ新規作成
    render json: current_user, serializer: UserSerializer
  end

  private

  def user_params
    params.require(:user).permit(:name, :introduction, :avatar, avatar: :data)
  end

  def tag_names
    # ユーザーのタグを参照する
    params.dig(:user, :tag_names)
  end
end
