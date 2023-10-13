from flask import Flask,render_template,request
from flask import redirect
from flaskext.mysql import MySQL
from flask import json
from flask import jsonify, make_response

app = Flask(__name__)

mysql=MySQL()

app.config['MYSQL_DATABASE_HOST'] ='localhost'
app.config['MYSQL_DATABASE_PORT'] =3306
app.config['MYSQL_DATABASE_USER'] ='root'
app.config['MYSQL_DATABASE_PASSWORD'] =''
app.config['MYSQL_DATABASE_DB'] ='db_university'


mysql.init_app(app)


@app.route('/',methods=["GET"])
def index():
    return render_template('index.html')


@app.route('/dashboard',methods=["GET"])
def dashboard():
    return render_template('dashboard.html')

@app.route('/api/analyse',methods=["GET"])
def analyse():
    return render_template('analyse.html')

@app.route('/api/analyse2019',methods=["GET"])
def analyse2019():
        conn = mysql.connect()
        cursor =conn.cursor()
        cursor.execute("SELECT annee, matricule, nom ,prenom ,sexe,specialite,moyenne from resultats where annee=2019")
        data = cursor.fetchall() 
        row_headers=[x[0] for x in cursor.description]
        cursor.close()
        json_data=[]
        for result in data:
         json_data.append(dict(zip(row_headers, result)))

        return make_response(jsonify(json_data),200)

@app.route('/api/analyse2020',methods=["GET"])
def analyse2020():
        conn = mysql.connect()
        cursor =conn.cursor()
        cursor.execute("SELECT annee, matricule, nom ,prenom ,sexe,specialite,moyenne from resultats where annee=2020")
        data = cursor.fetchall() 
        row_headers=[x[0] for x in cursor.description]
        cursor.close()
        json_data=[]
        for result in data:
         json_data.append(dict(zip(row_headers, result)))

        return make_response(jsonify(json_data),200)

@app.route('/api/analyse2021',methods=["GET"])
def analyse2021():
        conn = mysql.connect()
        cursor =conn.cursor()
        cursor.execute("SELECT annee, matricule, nom ,prenom ,sexe,specialite,moyenne from resultats where annee=2021")
        data = cursor.fetchall() 
        row_headers=[x[0] for x in cursor.description]
        cursor.close()
        json_data=[]
        for result in data:
         json_data.append(dict(zip(row_headers, result)))

        return make_response(jsonify(json_data),200)


@app.route('/api/datacourbe')
def doGetDatacourbe():
	
	data = {"years":[], "datasets":[]}
	
	conn = mysql.connect()	
	cursor =conn.cursor()	
	cursor.execute("SELECT DISTINCT annee FROM resultats")	

	years_tuple = cursor.fetchall()
	years_list =  [item[0] for item in years_tuple]
	data["years"]=years_list	

	cursor.execute("SELECT DISTINCT specialite FROM resultats")	

	specialite_tuple = cursor.fetchall()
	specialite_list =  [item[0] for item in specialite_tuple]
	
	for specialite in specialite_list:
		cursor.execute("SELECT COUNT(*) AS NBR FROM resultats WHERE  specialite='"+specialite+"' GROUP BY annee")	
		nbr_tuple = cursor.fetchall()
		nbr_list =  [item[0] for item in nbr_tuple]
		data["datasets"].append({"label":specialite, "data":nbr_list})	
	
	data_JSON = json.dumps(data)	
	return data_JSON 	
                 	
@app.route('/api/databar')
def doGetDatabar():
	
	data =[]
	
	conn = mysql.connect()	
	cursor =conn.cursor()	
	cursor.execute("SELECT DISTINCT annee FROM resultats")	

	years_tuple = cursor.fetchall()
	years_list =  [item[0] for item in years_tuple]
		
	
	
	cursor.execute("SELECT COUNT(*) AS NBR FROM resultats GROUP BY annee ")	
	nbr_tuple = cursor.fetchall()
	nbr_list =  [item[0] for item in nbr_tuple]
	data.append({"label":years_list, "nbr":nbr_list})	
	
	data_JSON = json.dumps(data)	
	return data_JSON 	

@app.route('/api/datapie')
def doGetDatapie():
	
	data = []
	
	conn = mysql.connect()	
	cursor =conn.cursor()	
	cursor.execute("SELECT DISTINCT sexe FROM resultats")	

	sexe_tuple = cursor.fetchall()
	sexe_list =  [item[0] for item in sexe_tuple]
		


	
	for sexe in sexe_list:
		cursor.execute("SELECT COUNT(*) AS NBR FROM resultats WHERE  sexe='"+sexe+"' ")	
		nbr_tuple = cursor.fetchall()
		nbr_list =  [item[0] for item in nbr_tuple]
		data.append({"label":sexe, "data":nbr_list})	
	
	data_JSON = json.dumps(data)	
	return data_JSON       

@app.route('/api/datadoublebar')
def doGetdoublebar():
	
	data = {"years":[], "datasets":[]}
	
	conn = mysql.connect()	
	cursor =conn.cursor()	
	cursor.execute("SELECT DISTINCT annee FROM resultats")	

	years_tuple = cursor.fetchall()
	years_list =  [item[0] for item in years_tuple]
	data["years"]=years_list	


	

	cursor.execute("SELECT COUNT(*) AS NBR FROM resultats WHERE  moyenne BETWEEN '10.00' AND '20' GROUP BY annee ")	
	passants_tuple = cursor.fetchall()
	passants_list =  [item[0] for item in passants_tuple]
	cursor.execute("SELECT COUNT(*) AS NBR FROM resultats WHERE  moyenne BETWEEN '0' AND '9.99' GROUP BY annee")	
	doublants_tuple = cursor.fetchall()
	doublants_list =  [item[0] for item in doublants_tuple]        

	data["datasets"].append({"passants":passants_list, "doublants":doublants_list})	
	
	data_JSON = json.dumps(data)	
	return data_JSON 	

@app.route('/api/dataDoughnut')
def doGetDoughnut():
	
	data = []
	
	conn = mysql.connect()	
	cursor =conn.cursor()	
	cursor.execute("SELECT DISTINCT annee FROM resultats")	

	cursor.execute("SELECT DISTINCT specialite FROM resultats")	
	specialite_tuple = cursor.fetchall()
	specialite_list =  [item[0] for item in specialite_tuple]


	cursor.execute("SELECT COUNT(*) AS NBR FROM resultats WHERE  moyenne BETWEEN '10.00' AND '20' GROUP BY specialite")	
	passants_tuple = cursor.fetchall()
	passants_list =  [item[0] for item in passants_tuple]

	data.append({"label":specialite_list, "data":passants_list})	
	
	data_JSON = json.dumps(data)	
	return data_JSON 
    

@app.route('/api/datasexe')
def doGetsexe():
	
	data = []
	
	conn = mysql.connect()	
	cursor =conn.cursor()	
	cursor.execute("SELECT COUNT(*) AS NBR FROM resultats WHERE  sexe='F' GROUP BY annee")	
	f_tuple = cursor.fetchall()
	f_list =  [item[0] for item in f_tuple]

	cursor.execute("SELECT COUNT(*) AS NBR FROM resultats WHERE  sexe='H' GROUP BY annee")	
	h_tuple = cursor.fetchall()
	h_list =  [item[0] for item in h_tuple]

	data.append({"femme":f_list, "homme":h_list})	
	
	data_JSON = json.dumps(data)	
	return data_JSON 

@app.route('/api/datamoy')
def doGetmoy():
	
	data = []
	
	conn = mysql.connect()	
	cursor =conn.cursor()	
	cursor.execute("SELECT DISTINCT annee FROM resultats")	

	years_tuple = cursor.fetchall()
	years_list =  [item[0] for item in years_tuple]
	cursor.execute("SELECT MAX(moyenne) FROM resultats GROUP BY annee")	
	moy_tuple = cursor.fetchall()
	moy_list =  [item[0] for item in moy_tuple]


	data.append({"year":years_list, "moyenne":moy_list})	
	
	data_JSON = json.dumps(data)	
	return data_JSON  

if __name__ == '__main__':
	app.run(debug=True, port=5000)









