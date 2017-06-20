#! /usr/bin/python

import urllib
import urllib2

test_data = {'usr':'afnetworking','text':'hello afnetworking'}
test_data_urlencode = urllib.urlencode(test_data)

requrl = "http://118.89.24.72:8080/mars/hello2"

req = urllib2.Request(url = requrl,data =test_data_urlencode)
print req

res_data = urllib2.urlopen(req)
res = res_data.read()
print res

