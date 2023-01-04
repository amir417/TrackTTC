# import smtplib
# import requests



# from flask import Flask
# from flask_cors import CORS, cross_origin

# app = Flask(__name__)
# cors = CORS(app, resources={r"https://alerts.ttc.ca/api/alerts/list": {"origins": "*"}})
# app.config['CORS_HEADERS'] = 'Content-Type'

# @app.route('/', methods=['POST','OPTIONS'])
# @cross_origin(origin='*',headers=['Content-Type','Authorization'])
# def foo():
#     return request.json['inputVar']

# if __name__ == '__main__':
#     app.run()


# def ttc_api (url):
#     response = requests.get(url) 
#     print(response.status_code)
#     response.headers.append('Access-Control-Allow-Credentials', 'true')
#     print(response.headers)
#     # if (response.status_code) == 204:
#     #     data = response.json()
#     #     print (data)
#     # else:
#     #     print('error')

# ttc_api('https://alerts.ttc.ca/api/alerts/list')
















# # Set up the SMTP server
# server = smtplib.SMTP('smtp.gmail.com', 587)
# server.starttls()
# server.login("aazam.amirreza@gmail.com", "nhxyzxqckxavflog")

# # Send the email
# msg = "testing to see if my mailer works. (I already know it works i just wanted to bother you)"
# server.sendmail("aazam.amirreza@gmail.com", " kimsihy093@gmail.com", msg)

# # Disconnect from the server
# server.quit()





