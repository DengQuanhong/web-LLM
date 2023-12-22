from flask import Flask, request, render_template,jsonify,make_response,session
import requests
from flask_cors import CORS
from transformers import AutoModel, AutoTokenizer
import os
import json


app = Flask(__name__,static_folder='static')

tokenizer = AutoTokenizer.from_pretrained("./models--chatglm", trust_remote_code=True)
model = AutoModel.from_pretrained("./models--chatglm", trust_remote_code=True).half().cuda()
model = model.eval()
temperature = 0.95
top_p = 0.7
max_length=2048

SECRET_KEY='dllg'

app.secret_key =SECRET_KEY



CORS(app)

@app.route('/',methods=['GET'])
def hello():
    return app.send_static_file("login.html")

@app.route('/login',methods=['POST','GET'])
def login():
    # id = request.args.get('id')
    # pswd = request.args.get('pswd')
    # session['name'] = 'dllg01073'

    return app.send_static_file("index.html")

@app.route("/home")
def home():
    session['id']='dllg01073'
    return app.send_static_file("index.html")

@app.route("/api/sessinfo",methods=['GET'])
def sessinfo():
    infos = []
    for fn in os.listdir("sesses"):
        with open(f"sesses/{fn}","r",encoding="utf-8") as f:
            history = json.load(f)
        if fn.startswith('xx'):
            d = {}
            d['name']='会话'+f"【{fn[2:6]}】{fn[6:-5]}"
            d['length'] = str(len(history))
            d['sessid']=fn[:-5]
            infos.append(d)

    infos = sorted(infos,key=lambda x:int(x['sessid'][2:]))
    # print(infos)
    return jsonify(infos)

@app.route("/api/search",methods=['GET'])
def search():
    q = request.args.get("q")
    print(q)
    infos = []
    for fn in os.listdir("sesses"):
        flag = False
        with open(f"sesses/{fn}","r",encoding="utf-8") as f:
            history = json.load(f)
            if q in fn:
                flag = True
            for ite in history:
                if q in ite[0]:
                    flag = True
                elif q in ite[1]:
                    flag = True
            
        if fn.startswith('xx') and flag == True:
            d = {}
            d['name']='会话'+f"【{fn[2:6]}】{fn[6:-5]}"
            d['length'] = str(len(history))
            d['sessid']=fn[:-5]
            infos.append(d)

    infos = sorted(infos,key=lambda x:int(x['sessid'][2:]))
    # print(infos)
    return jsonify(infos)
            

@app.route('/api/chat/',methods=['GET','POST'])
def chat():

    sessid = request.args.get('sessid')
    print("sessid")
    if f"{sessid}.json" in os.listdir("sesses"):
        with open(f"sesses/{sessid}.json","r",encoding='utf-8') as f:
            history = json.load(f)
    else:
        history = []
    if request.method=="GET":
        return history
    else:
        # 获取提交的history
        data = request.get_data()
        print(data)
        j_data = json.loads(data)
        # history = j_data['history']
        inp = j_data['inp']
        # print(history)
        print(inp)
        resp,history = model.chat(tokenizer,inp,history)
        resp = {'resp':resp}
        print(resp)
        print(history)
        with open(f"sesses/{sessid}.json","w",encoding='utf-8') as f:
            json.dump(history,f,ensure_ascii=False)

        return jsonify(resp)
    


if __name__=='__main__':
    app.run(debug=False,host='0.0.0.0',port=8090)



    
