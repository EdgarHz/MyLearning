#! /usr/bin/python

import os

result = os.popen('hg status')

movedFileList = []
movedFileNameList = []
unknownFileList = []
unknownFileNameList = []
while 1:
    line = result.readline()
    if not line:
        break
    line = line.strip("/n")
    if line.startswith("!"):
        # print line
        path = line.rpartition("!");
        string = path[len(path) - 1].lstrip().rstrip();
        string = string.replace(" ", "\ ");
        movedFileList.append(string);
        # print "!path:" + string
        path = string.rpartition("/");
        string = path[len(path) - 1].lstrip().rstrip();
        movedFileNameList.append(string);
        print "!name:" + string
    elif line.startswith("?"):
        path = line.rpartition("?");
        string = path[len(path) - 1].lstrip().rstrip();
        string = string.replace(" ", "\ ");
        unknownFileList.append(string);
        # print "?path:" + string
        path = string.rpartition("/");
        string = path[len(path) - 1].lstrip().rstrip();
        unknownFileNameList.append(string);
        print "?name:" + string

i = -1;
for movedFile in movedFileNameList:
    i+=1;
    j = -1;
    for someFile in unknownFileNameList:
        j+=1;
        if movedFile == someFile:
            print movedFile
            movedFilePath = movedFileList[i]
            newFilePath = unknownFileList[j]
            commandstring = 'hg mv -A ' + movedFilePath + ' ' + newFilePath
            print commandstring
            result = os.popen(commandstring);


            break
        # else:
        #     print movedFile + " != " + someFile
