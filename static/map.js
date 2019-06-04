/**
 * Created by zzz on 2017/12/4.
 */
$(document).ready(function () {

    var mymap = L.map('mapid', {attributionControl: false}).setView([25.2140, 118.2402], 10);


    var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osmAttrib = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
    var osm = new L.TileLayer(osmUrl, {minZoom: 4, maxZoom: 13, attribution: osmAttrib});
    mymap.addLayer(osm);
    $.get("/static/watershed.json", function (data) {
        var geolay = L.geoJSON(data);
        geolay.addTo(mymap);
        geolay.setStyle({
            weight: 1,
            opacity: 1,
            color: 'blue',
            dashArray: '3',
            fillOpacity: 0.1
        });
        console.log("here");

    });

    var geojsonMarkerOptions = {
        radius: 3,
        fillColor: "#ff7800",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };


    var rainIcon = L.icon({
        iconUrl: '/static/rainguage.jpg',
        iconSize: [16, 16]
    });

    var hydIcon = L.icon({
        iconUrl: '/static/hydguage.jpg',
        iconSize: [16, 16]
    });
    // L.marker([50.505, 30.57], {icon: myIcon}).addTo(map);


    function onMarkerClick(e) {
        $('#zdj_chart_nav li').removeClass('open active');
        if (e.target.feature.properties.Type == 'L') {
            $('#zdj_chart_nav li').eq(0).addClass('open active');
            var t = $("#myselect").val();
            $("#myselect").eq(0).val(1);
            var p = $("#myguage").val(e.target.feature.properties.Subbasin);
            $("#myselect").trigger('change');

        } else {
            $('#zdj_chart_nav li').eq(6).addClass('open active');
            var t = $("#myselect").val();
            $("#myselect").eq(0).val(7);
            var v = $("#pguage option:contains(" + e.target.feature.properties.Name + ")").val();
            $("#pguage").val(v);
            $("#myselect").trigger('change');
        }

        var c = $("#myselect").val();

        if (c < 7) {
            $("#pricipitationdiv").css('display', 'none');
            $("#tempturediv").css('display', 'none');
            $("#hydrologicdiv").css('display', 'none');
            $("#hydrologicdiv").css('display', 'block');
            var $this = $('#hydrologicdiv .chosen-select');
            $this.next().css({'width': $this.parent().width()});
        }
        if (c == 7) {
            $("#hydrologicdiv").css('display', 'none');
            $("#tempturediv").css('display', 'none');
            $("#pricipitationdiv").css('display', 'none');
            $("#pricipitationdiv").css('display', 'block');
            var $this = $('#pricipitationdiv .chosen-select');
            $this.next().css({'width': $this.parent().width()});
        }
        if (c == 8) {
            $("#hydrologicdiv").css('display', 'none');
            $("#pricipitationdiv").css('display', 'none');
            $("#tempturediv").css('display', 'none');
            $("#tempturediv").css('display', 'block');
            var $this = $('#tempturediv .chosen-select');
            $this.next().css({'width': $this.parent().width()});
        }

        $('#ace-chart-btn').addClass('open');
        $('#ace-chart-box').addClass('open');
    }

    $.get("/static/monitorpoint.json", function (data) {
        var geolay = L.geoJSON(data, {
            pointToLayer: function (feature, latlng) {
                // return L.circleMarker(latlng, geojsonMarkerOptions);
                if (feature.properties.Type == "RNG") {
                    return L.marker(latlng, {icon: rainIcon}).on('click', onMarkerClick);
                }
                else if (feature.properties.Type == "L") {
                    return L.marker(latlng, {icon: hydIcon}).on('click', onMarkerClick);
                }
            }
        });
        geolay.addTo(mymap);
        geolay.setStyle({
            weight: 3,
            opacity: 1,
            color: 'red',
            dashArray: '3',
            fillOpacity: 0.1
        });
    });

});