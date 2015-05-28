class TweetsController < ApplicationController
  def recent
    Tweet.ordered_json
    tweets = Tweet.ordered_json
    render json: tweets
  end

  def search
    hashtag = Hashtag.where(name: params[:keyword]).first
    if hashtag
      render json: hashtag.tweets.ordered_json
    else
      render :nothing => true, status: 404
    end
  end

  def create
    tweet = Tweet.new(tweet_params)
    tweet.content ||= Faker::Lorem.sentence
    tweet.username ||= Faker::Name.name
    tweet.handle ||= "@" + Faker::Internet.user_name
    tweet.avatar_url ||= Faker::Avatar.image(tweet.username)
    tweet.save

    params[:hashtags] = params[:tweet][:content].split(" ").select{ |i| i[/#\w+\z/] }.each{|w| w.slice!(0)}
    puts params[:hashtags]
    hashtags_names = params[:hashtags] || []
    hashtags_names.each do |name|
      hashtag = Hashtag.find(:first, conditions: ["name=?", name])
      hashtag ? tweet.hashtags << hashtag : tweet.hashtags.create(name: name)
    end

    render json: tweet.to_json(methods: :hashtag_names)
  end
end
