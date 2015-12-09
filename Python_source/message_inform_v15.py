import serial
import MySQLdb
from time import localtime, strftime
from datetime import datetime,timedelta
import time as t


present_time = datetime.now()

S = serial.Serial('COM3',9600)

status        = S.readline()


before_status = "TVOFF"
before_light_status = "LightOFF"
before_distance_status ="Distance"
after_status =""
after_light_status = ""
after_distance_status = ""



print "value : %s %s %s " % (before_status, before_light_status, before_distance_status)

first_value = 1
first_light_value = 1
first_distance_value = 1

print "value : %s %s %s " % (first_value, first_light_value, first_distance_value)

while True:

 db = MySQLdb.connect(host='210.107.198.21', user='sedb', passwd = 'sedb01',db='testdb') 

 time = strftime("%Y-%m-%d %H:%M:%S", localtime())

    
 if  ("TV" in before_status) and first_value == 1:
    
       with db:
        print "First TV value : %s %s " % (time,before_status)   
        cur = db.cursor()
        cur.execute("INSERT INTO message_inform(create_date,message_log) VALUES (%s, %s)" , (time,before_status))
        db.commit()
       
            
       first_value   = first_value + 1
       after_status  = before_status
       change_time   = present_time

       status        = S.readline()

       if "TV" in status:
           before_status = status
       elif "Light" in status:
           before_light_status = status
       elif "Distance" in status:
           before_distance_status = status
           
       print "tv value : %s %s" % (before_status,after_status)
       
 if    ("TV" in before_status)  and ( before_status != after_status) and after_status != "":
  
       change_time = datetime.now()

       running_time = change_time - present_time 
       present_time = change_time
                    

       with db:
        print "Change TV value : %s %s %s" % (time,before_status, running_time) 
        cur = db.cursor()
        cur.execute("INSERT INTO message_inform(create_date,message_log,use_time) VALUES (%s, %s, %s)" , (time,before_status,running_time))
        db.commit()
        after_status = before_status
    
        status        = S.readline()

       if "TV" in status:
           before_status = status
       elif "Light" in status:
           before_light_status = status
       elif "Distance" in status:
           before_distance_status = status
           
       print "change tv value : %s %s" % (before_status,after_status)
        
 if  ("Light" in before_light_status) and first_light_value == 1:
    
       with db:
        print "First Light value : %s %s " % (time,before_light_status)   
        cur = db.cursor()
        cur.execute("INSERT INTO message_inform(create_date,message_log) VALUES (%s, %s)" , (time,before_light_status))
        db.commit()
       
            
       first_light_value   = first_light_value + 1
       after_light_status  = before_light_status

       status = S.readline()

       if "TV" in status:
           before_status = status
       elif "Light" in status:
           before_light_status = status
       elif "Distance" in status:
           before_distance_status = status
           
       print "first light value : %s %s" % (before_light_status,after_light_status)   
   
 if    ("Light" in before_light_status)  and ( before_light_status != after_light_status ) and after_light_status !="":

       with db:
        print "Change Light value : %s %s" % (time,before_light_status[:-2]) 
        cur = db.cursor()
        cur.execute("INSERT INTO message_inform(create_date,message_log) VALUES (%s, %s)" , (time,before_light_status))
        db.commit()

        after_light_status = before_light_status

        status = S.readline()
        
        if "TV" in status:
           before_status = status
        elif "Light" in status:
           before_light_status = status
        elif "Distance" in status:
           before_distance_status = status

        print "change light value : %s %s" % (before_light_status,after_light_status)     

 if    ("Distance" in before_distance_status ) and first_distance_value == 1:
    
       with db:
        print "first Distance value : %s %s " % (time,before_distance_status)   
        cur = db.cursor()
        cur.execute("INSERT INTO message_inform(create_date,message_log) VALUES (%s, %s)" , (time,before_distance_status))
        db.commit()
       
        after_distance_status = before_distance_status

        status = S.readline()

        if "TV" in status:
           before_status = status
        elif "Light" in status:
           before_light_status = status
        elif "Distance" in status:
           before_distance_status = status

        print "first dis value : %s %s" % (before_distance_status,after_distance_status)
        
 if    "Distance" in before_distance_status and ( before_distance_status != after_distance_status ) and after_distance_status !="":
    
       with db:
        print "Change Distance value : %s %s " % (time,before_distance_status)   
        cur = db.cursor()
        cur.execute("INSERT INTO message_inform(create_date,message_log) VALUES (%s, %s)" , (time,before_distance_status))
        db.commit()
       
        after_distance_status = before_distance_status

        status = S.readline()

        if "TV" in status:
           before_status = status
        elif "Light" in status:
           before_light_status = status
        elif "Distance" in status:
           before_distance_status = status

        print "change dis value : %s %s" % (before_distance_status,after_distance_status)
        
   
 
 
