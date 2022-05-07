class SearchUsersForm
  # あたかもモデルのように動作するための記述
  include ActiveModel::Model
  include ActiveModel::Attributes

  # カラムの作成
  attribute :name, :string
  attribute :tag_ids, array: :integer #複数入れれるようにarray

  # 検索
  def search
    relation = User.distinct # 重複を防ぐ
    relation = relation.by_name(name) if name.present? # nameと一致するものを格納
    relation = relation.by_tag(tag_ids) if tag_ids.present? # tag_idsとtagの一致するものを格納
    relation
  end
end
