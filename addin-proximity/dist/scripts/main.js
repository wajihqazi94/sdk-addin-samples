"use strict";geotab.addin.proximity=function(){var e=void 0,t=void 0,n=void 0,i=void 0,a=void 0,o=void 0,r=void 0,d=void 0,u=void 0,c=void 0,l=void 0,s=void 0,f=250,m={},v=[],g=!0,y=!1,p=function(e){l.innerHTML=e},h=function(e){e?s.style.display="block":setTimeout(function(){s.style.display="none"},600)},w=function(e){return e*(g?1:1.09361)},M=function(e){return new L.Marker(e,{icon:new L.DivIcon({className:"map-icon",iconSize:[16,16]})})},x=function(e){var t=new L.LatLng(e.latitude,e.longitude),i=e.distance,a=M(t),o=new Date(e.dateTime);a.bindTooltip(m[e.device.id].name+" was "+Math.floor(w(i))+" "+(g?" m":" yd")+" away on "+o.toDateString()+" at "+o.toTimeString()),n.addLayer(a)},b=function(){n.clearLayers(),i.clearLayers()},E=function(){if(p(""),""!==o.value){if(!y&&0===v.length)return void p("Select at least one vehicle to display");var n=new Date(u.value+":00Z"),a=new Date(n.setMinutes(n.getMinutes()+(new Date).getTimezoneOffset())).toISOString(),r=new Date(c.value+":00Z"),d=new Date(r.setMinutes(r.getMinutes()+(new Date).getTimezoneOffset())).toISOString();b(),h(!0),e.call("GetCoordinates",{addresses:[o.value]},function(n){if(!n||n.length<1||!n[0])return p("Could not find the address"),void h(!1);var r=function(e){var t=5*f;return e.filter(function(e){return e.distance<t})},u=function(e){p(e.length>0?"There were "+e.length+" locations recorded nearby to "+o.value+".":"There was no one near this area during this time frame."),e.forEach(x),h(!1)},c=function(e,t,n){return["Get",{typeName:"LogRecord",search:{deviceSearch:{id:e},fromDate:t,toDate:n}}]},l=function(e){return e.reduce(function(e,t){return e.concat(t)},[])},s=function(e,t,n,i,a){return new L.Circle([t,e],n,{stroke:!1,fillColor:i,fillOpacity:a})},g=s(n[0].x,n[0].y,1*f,"#ff4444",.3),w=s(n[0].x,n[0].y,2*f,"#ff8800",.3),M=s(n[0].x,n[0].y,3*f,"#ff8800",.3),b=s(n[0].x,n[0].y,4*f,"#99cc00",.3),E=s(n[0].x,n[0].y,5*f,"#33b5e5",.3),I={latitude:n[0].y,longitude:n[0].x};window.geotabHeatMap=window.geotabHeatMap||{},window.geotabHeatMap.center=I,t.setView(new L.LatLng(I.latitude,I.longitude),14),i.addLayer(g),i.addLayer(w),i.addLayer(M),i.addLayer(b),i.addLayer(E);var D=y?Object.keys(m).map(function(e){return m[e]}):v.map(function(e){return{id:e}}),T=D.map(function(e){return c(e.id,a,d)});e.multiCall(T,function(e){var t=new Parallel(l(e),{env:{center:I}}),n=function(e){var t="undefined"!=typeof window?window.geotabHeatMap.center:global.env.center,n=function(e){return e*(Math.PI/180)},i=n(t.latitude-e.latitude),a=n(t.longitude-e.longitude),o=Math.sin(i/2)*Math.sin(i/2)+Math.cos(n(e.latitude))*Math.cos(n(t.latitude))*Math.sin(a/2)*Math.sin(a/2),r=2*Math.atan2(Math.sqrt(o),Math.sqrt(1-o));return e.distance=6371e3*r,e};t.map(n).then(r).then(u)},function(e){p(e),h(!1)})},function(e){p(e),h(!1)})}},I=function(e,m){var p=function(t){var n=w(5*t),i=void 0,a=void 0;f=t,e&&n>=1e3?(i=Number(Math.round(n/1e3+"e1")+"e-1"),a="km"):!e&&n>=1760?(i=Number(Math.round(n/1760+"e1")+"e-1"),a="mi"):(i=Math.round(n),a=e?" m":" yd"),document.getElementById("proximity-size-label").innerHTML="("+i+" "+a+")"};g=e,t=new L.Map("proximity-map",{center:new L.LatLng(m.latitude,m.longitude),zoom:9}),L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ2VvdGFiIiwiYSI6ImNpd2NlaW02MjAxc28yeW9idTR3dmRxdTMifQ.ZH0koA2g2YMMBOcx6EYbwQ").addTo(t),n=L.layerGroup().addTo(t),i=L.layerGroup().addTo(t),o=document.getElementById("proximity-address"),r=document.getElementById("proximity-vehicles"),u=document.getElementById("proximity-from"),c=document.getElementById("proximity-to"),l=document.getElementById("proximity-error"),s=document.getElementById("proximity-loading"),d=document.getElementById("proximity-div-vehicles");var h=new Date,M=h.getDate(),x=h.getMonth()+1,b=h.getFullYear();M<10&&(M="0"+M),x<10&&(x="0"+x),u.value=b+"-"+x+"-"+M+"T00:00",c.value=b+"-"+x+"-"+M+"T23:59",p(300),a=new Choices(r,{removeItemButton:!0}),a.passedElement.addEventListener("change",function(){v=a.getValue().map(function(e){return e.value}),E()}),o.addEventListener("keydown",function(e){13===e.keyCode&&E()}),document.getElementById("proximity-size").addEventListener("change",function(e){p(e.target.value),E()}),document.getElementById("proximity-select-all").addEventListener("change",function(e){e.preventDefault(),y=!y,d.style.display=y?"none":"block",E()}),u.addEventListener("change",function(e){e.preventDefault(),E()}),c.addEventListener("change",function(e){e.preventDefault(),E()})},D=function(t){if(!t)throw new Error("'callback' is null or undefined");e.getSession(function(n){e.call("Get",{typeName:"User",search:{name:n.userName}},function(e){t(e.length>0&&!!e[0].isMetric)},function(){t(!1)})},!1)};return{initialize:function(t,n,i){e=t,D(function(e){"geolocation"in navigator?navigator.geolocation.getCurrentPosition(function(t){I(e,t.coords),i()}):(I(e,{longitude:-79.709441,latitude:43.434497}),i())})},focus:function(n,i){h(!0),e=n,e.call("Get",{typeName:"Device",resultsLimit:1e3,search:{fromDate:(new Date).toISOString(),groups:i.getGroupFilter()}},function(e){if(e&&!(e.length<1)){var t=e.map(function(e){return m[e.id]=e,{value:e.id,label:e.name}});a=a.setChoices(t,"value","label",!0),h(!1)}},function(e){p(e),h(!1)}),setTimeout(function(){t.invalidateSize()},800)},blur:function(){m&&(m={})}}};