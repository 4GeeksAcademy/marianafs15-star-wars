"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity
from api.models import db, Users, Authors


api = Blueprint('api', __name__)
CORS(api)  # Allow CORS requests to this API


@api.route('/authors', methods=['GET', 'POST'])
def authors():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Authors)).scalars()
        # Opción 1
        # variable = [ 'objerivo' for  'iterador' in 'lista']
        result = [row.serialize() for row in rows]
        # Opción 2
        """ 
        result = []
        for row in rows:
            result.append(row.serialize()) 
        """
        response_body['message'] = 'Mensaje desde el GET'
        response_body['results'] = result
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        row = Authors(name=data.get('name'),
                      country=data.get('country'))
        db.session.add(row)
        db.session.commit()
        response_body['message'] = 'Mensaje desde el POST'
        response_body['results'] = row.serialize()
        return response_body, 200


@api.route("/login", methods=["POST"])
def login():
    response_body = {}
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = db.session.execute(db.select(Users).where(Users.email == email, Users.password == password, Users.is_active)).scalar()
    print(user)
    if not user:
        response_body['message'] = "Bad email or password"
        return response_body, 401
    access_token = create_access_token(identity={"email": user.email, 'id': user.id, "is_admin": user.is_admin})
    response_body['message'] = f'Usuario {email} logeado con exito'
    response_body['access_token'] = access_token
    return response_body, 200


@api.route("/profile", methods=["GET"])
@jwt_required()
def profile():
    response_body = {}
    current_user = get_jwt_identity()
    print(current_user)
    user = db.session.execute(db.select(Users).where(Users.id == current_user['id'])).scalar()
    print(user.serialize())
    response_body['message'] = 'Usuario con acceso'
    response_body['logged_in_as'] = current_user
    response_body['results'] = user.serialize()
    return response_body, 200


@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    response_body = {}
    current_user = get_jwt_identity()
    response_body['message'] = 'usuario con acceso'
    response_body['logged_in_as'] = current_user
    return response_body, 200


@api.route('/authors/<int:id>', methods=['GET', 'PUT', 'DELETE'])
@jwt_required()
def author(id):
    response_body = {}
    row = db.session.execute(db.select(Authors).where(Authors.id == id)).scalar()
    if not row:
        response_body['message'] = f'El autor {id} no existe'
        response_body['results'] = {}
        return response_body, 404
    if row.user_id != current_user["id"] : 
        print(row.serialize())
        response_body['message'] = f'Usted no puede modificar, ver o borrar los datos del autor {id}'
        response_body['results'] = {}
    if request.method == 'GET':
        response_body['message'] = f'Mensaje desde el GET de {id}'
        response_body['results'] = row.serialize()
        return response_body, 200
    if request.method == 'PUT':
        data = request.json
        row.name = data.get('name')
        row.country = data.get('country')
        db.session.commit()
        response_body['message'] = f'Mensaje desde el PUT de {id}'
        response_body['results'] = row.serialize()
        return response_body, 200
    if request.method == 'DELETE':
        db.session.delete(row)
        db.session.commit()
        response_body['message'] = f'Mensaje desde el DELETE de {id}'
        response_body['results'] = {}
        return response_body, 200