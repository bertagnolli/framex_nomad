from flask import Flask
from flask_socketio import SocketIO, emit
from flask_cors import CORS, cross_origin

import os
from dotenv import load_dotenv, find_dotenv
load_dotenv(find_dotenv())

app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
#app.config['SECRET_KEY'] = os.environ.get('SECRET')
socketio = SocketIO(app, cors_allowed_origins="*")
CORS(app)

@socketio.on('connect')
def handle_connection():
    print("Connection received")
    #emit('server-client', 'Test message')


@socketio.on('client-server')
def handle_client_msg(msg):
  print("\n" + str(msg))


if __name__ == '__main__':
  app.run(host="127.0.0.1", port=os.environ.get('1243'))
  socketio.run(app)