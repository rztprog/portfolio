class BlogsController < ApplicationController
    before_action :set_blog, only: [:show, :edit, :update]

    def index
        @blogs = Blog.all
        # faire un triage par plus récent
    end

    def show
    end

    def new
        @blog = Blog.new
        # authorize @list
    end

    def create
        @blog = Blog.new(blog_params)
        # @list.user = current_user
        # authorize @list

        if @blog.save
            redirect_to blogs_path
        else
            render :new
        end
    end

    def update
        @blog.update(blog_params)
        redirect_to blog_path(@blog)
    end

    private

    def set_blog
        @blog = Blog.find(params[:id])
    end

    def blog_params
        params.require(:blog).permit(:title, :post, :image)
    end
end
