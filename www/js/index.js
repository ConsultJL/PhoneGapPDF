/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
	onDeviceReady: function() {
		   app.receivedEvent('deviceready');
		   //FIRST GENERATE THE PDF DOCUMENT
		   console.dir("generating pdf...");
		   var doc = new jsPDF();

		   doc.text(20, 20, 'HELLO!');

		   doc.setFont("courier");
		   doc.setFontType("normal");
		   doc.text(20, 30, 'This is a PDF document generated using JSPDF.');
		   doc.text(20, 50, 'YES, Inside of PhoneGap!');

		   var pdfOutput = doc.output();
		   console.dir( pdfOutput );

		   //NEXT SAVE IT TO THE DEVICE'S LOCAL FILE SYSTEM
		   console.dir("file system...");
		   window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {

				   console.dir(fileSystem.name);
				   console.dir(fileSystem.root.name);
				   console.dir(fileSystem.root.fullPath);

				   fileSystem.root.getFile("test.pdf", {create: true, exclusive: false}, function(entry) {
					   var fileEntry = entry;
					   console.dir(entry);

					   entry.createWriter(function(writer) {
						   	writer.onwrite = function(evt) {
						   		console.dir("write success");

							   	console.dir("opening the file");
							   	window.open(entry.toURL(), '_blank', 'location=no,closebuttoncaption=Close,enableViewportScale=yes');
							   	console.dir("should have openned file...maybe");
							   	console.dir(entry.toURL());
						   	};

						   	console.dir("writing to file");
						   	writer.write( pdfOutput );
						   }, function(error) {
						   	console.dir(error);
						   });
				   }, function(error){
					   console.dir(error);
				   });
		    },
		    function(event){
			    console.dir( evt.target.error.code );
		    });
	   },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.dir('Received Event: ' + id);
    }
};
