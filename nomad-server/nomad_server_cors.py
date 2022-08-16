from flask import Flask, jsonify, request
from flask_cors import CORS
# import nomad_fe

app = Flask(__name__)

cors_config = {
    "origins": ["http://localhost:3000"],
    "methods": ["OPTIONS", "GET", "POST", "PUT"]
}

CORS(app, resources={
    r"/api/*": cors_config
})

@app.route("/api/nomad_app", methods=['post'])
def post():
	#def put(self): 
    print('Incoming..')
    nft_metadata = request.get_json()
    print(nft_metadata['nftMetadata']['image_uri'])
    nft_image = nft_metadata['nftMetadata']['image_uri']
#     nomad_fe.update_fe(nft_image)
    return jsonify({'success': nft_image})

if __name__ == "__main__":
  app.run(host='127.0.0.1', port=1243, debug=True)
#   test_fe.mainloop()