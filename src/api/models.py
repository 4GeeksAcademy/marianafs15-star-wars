from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    is_admin = db.Column(db.Boolean(), unique=False, nullable=False)
    name = db.Column(db.String(), unique=False, nullable=True)
    address = db.Column(db.String(), unique=False, nullable=True)
    identification_type = db.Column(db.Enum('DNI', 'NIE', 'GC', name='identification_type'))
    identification_number = db.Column(db.Integer)

    def __repr__(self):
        return f'<User {self.email} - {self.name}>'

    def serialize(self):
        return {
            'id': self.id,
            'email': self.email,
            'is_active': self.is_active,
            'is_admin': self.is_admin
        }


class Followers(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    follower_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    follower_to = db.relationship('Users', foreign_keys=[follower_id], backref=db.backref('follower_to', lazy='select'))
    following_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    following_to = db.relationship('Users', foreign_keys=[following_id], backref=db.backref('following_to', lazy='select'))


class Authors(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), unique=False, nullable=False)
    country = db.Column(db.String(), unique=False, nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_to = db.relationship('Users', foreign_keys=[user_id], backref=db.backref('author_to', lazy='select'))

    def __repr__(self):
        return f'<Authors: {self.id} - {self.name}>'

    def serialize(self):
        return {
            'id': self.id,
            'authors': self.name,
            'country': self.country,
            'books': [row.serialize() for row in self.book_to]
        }


class Books(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), unique=False, nullable=False)
    author_id = db.Column(db.Integer, db.ForeignKey('authors.id'))
    author_to = db.relationship('Authors', foreign_keys=[author_id], backref=db.backref('book_to'), lazy='select')

    def __repr__(self):
        return f'<Books> {self.id} / {self.name}'

    def serialize(self):
        return {
            'id': self.id,
            'book': self.name
        }


class Posts(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=True)
    body = db.Column(db.Text, nullable=True)
    date = db.Column(db.Date, nullable=False)
    image_url = db.Column(db.String(255), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user = db.relationship('Users', backref=db.backref('posts', lazy=True))

    def __repr__(self):
        return f'<Post {self.title}>'


class Comments(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)
    user = db.relationship('Users', backref=db.backref('comments', lazy=True))
    post = db.relationship('Posts', backref=db.backref('comments', lazy=True))

    def __repr__(self):
        return f'<Comment {self.body[:20]}>'


class Medias(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.Enum('image', 'video', name='media_type'), nullable=False)
    url = db.Column(db.String(255), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)
    post = db.relationship('Posts', backref=db.backref('media', lazy=True))

    def __repr__(self):
        return f'<Media {self.type} - {self.url}>'


class Characters(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    height = db.Column(db.String(50), nullable=True)
    mass = db.Column(db.String(50), nullable=True)
    hair_color = db.Column(db.String(50), nullable=True)
    skin_color = db.Column(db.String(50), nullable=True)
    eye_color = db.Column(db.String(50), nullable=True)
    birth_year = db.Column(db.String(50), nullable=True)
    gender = db.Column(db.String(50), nullable=True)

    def __repr__(self):
        return f'<Character {self.name}>'


class Planets(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    diameter = db.Column(db.String(50), nullable=True)
    rotation_period = db.Column(db.String(50), nullable=True)
    orbital_period = db.Column(db.String(50), nullable=True)
    gravity = db.Column(db.String(50), nullable=True)
    population = db.Column(db.String(50), nullable=True)
    climate = db.Column(db.String(50), nullable=True)
    terrain = db.Column(db.String(50), nullable=True)

    def __repr__(self):
        return f'<Planet {self.name}>'


class CharacterFavorites(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    character_id = db.Column(db.Integer, db.ForeignKey('characters.id'), nullable=False)
    user = db.relationship('Users', backref=db.backref('character_favorites', lazy=True))
    character = db.relationship('Characters', backref=db.backref('favorited_by', lazy=True))

    def __repr__(self):
        return f'<CharacterFavorite User: {self.user_id} - Character: {self.character_id}>'


class PlanetFavorites(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    planet_id = db.Column(db.Integer, db.ForeignKey('planets.id'), nullable=False)
    user = db.relationship('Users', backref=db.backref('planet_favorites', lazy=True))
    planet = db.relationship('Planets', backref=db.backref('favorited_by', lazy=True))

    def __repr__(self):
        return f'<PlanetFavorite User: {self.user_id} - Planet: {self.planet_id}>'
