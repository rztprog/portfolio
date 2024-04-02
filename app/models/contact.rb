class Contact < MailForm::Base
  attribute :name,      validate: true
  attribute :email,     validate: /\A([\w\.%\+\-]+)@([\w\-]+\.)+([\w]{2,})\z/i
  attribute :message,   validate: true, length: { minimum: 12 }
  attribute :nickname,  captcha: true # For Bots

  # Declare the e-mail headers. It accepts anything the mail method
  # in ActionMailer accepts.
  def headers
    {
      :subject => "Contact via site",
      :to => "Rztprog@outlook.fr",
      :from => %("#{name}" <#{email}>)
    }
  end
end
