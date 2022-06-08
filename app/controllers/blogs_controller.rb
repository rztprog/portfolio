class BlogsController < ApplicationController
  def index
    @blogs = Blog.all
  end

  def new
    @blog = Blog.new
    # authorize @list
  end

  def create
    @blog = Blog.new(blog_params)
    # @list.user = current_user
    # authorize @list

    if @list.save
      redirect_to blog_path(@blog)
    else
      render :new
    end
  end

  private

  def set_blog
    @blog = Blog.find(params[:id])
  end

  def blog_params
    params.require(:blog).permit(:title, :post, :image)
  end
end
