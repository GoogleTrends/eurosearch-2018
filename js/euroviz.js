$( window ).on('load', function() {

// jQuery to collapse the navbar on scroll
function collapseNavbar() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
}

$(window).scroll(collapseNavbar);
$(document).ready(collapseNavbar);

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function () {
    $('a.page-scroll').bind('click', function (event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function () {
    $(".navbar-collapse").collapse('hide');
});

//Map set up
//var mapwidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

var mapwidth = document.documentElement.clientWidth;
if (mapwidth > 1000) {
    mapwidth = 1000;
}
var mapratio = 7 / 10;
var mapheight = mapwidth * mapratio;

//Geo2Rect config
var config = {
    width: mapwidth,
    height: mapheight,
    padding: 10,
    projection: d3.geoMercator(),
    duration: 0,
    key: function (d) { return d.properties.ISO_A3; },
    grid: {
        ALB: { x: 5, y: 8 },
        ARM: { x: 9, y: 6 },
        AUS: { x: 9, y: 9 },
        AUT: { x: 4, y: 5 },
        AZE: { x: 9, y: 5 },
        BEL: { x: 2, y: 3 },
        BGR: { x: 7, y: 6 },
        BIH: { x: 5, y: 6 },
        BLR: { x: 6, y: 3 },
        CHE: { x: 3, y: 4 },
        CYP: { x: 8, y: 7 },
        CZE: { x: 4, y: 4 },
        DEU: { x: 4, y: 3 },
        DNK: { x: 4, y: 2 },
        ESP: { x: 1, y: 5 },
        EST: { x: 6, y: 1 },
        FIN: { x: 6, y: 0 },
        FRA: { x: 1, y: 4 },
        GBR: { x: 1, y: 2 },
        GEO: { x: 8, y: 5 },
        GRC: { x: 6, y: 8 },
        HUN: { x: 5, y: 5 },
        HRV: { x: 4, y: 6 },
        IRL: { x: 0, y: 2 },
        ISL: { x: 0, y: 0 },
        ISR: { x: 8, y: 8 },
        ITA: { x: 3, y: 5 },
        KOS: { x: 6, y: 7 },
        LTU: { x: 6, y: 2 },
        LUX: { x: 2, y: 4 },
        LVA: { x: 7, y: 2 },
        MDA: { x: 7, y: 5 },
        MKD: { x: 7, y: 7 },
        MLT: { x: 1, y: 7 },
        MNE: { x: 5, y: 7 },
        NLD: { x: 3, y: 3 },
        NOR: { x: 4, y: 0 },
        POL: { x: 5, y: 3 },
        PRT: { x: 0, y: 5 },
        ROU: { x: 6, y: 5 },
        RUS: { x: 7, y: 3 },
        SMR: { x: 2, y: 6 },
        SRB: { x: 6, y: 6 },
        SVK: { x: 5, y: 4 },
        SVN: { x: 3, y: 6 },
        SWE: { x: 5, y: 0 },
        UKR: { x: 6, y: 4 },
        TUR: { x: 8, y: 6 }
    }
};

//Data
var qualification = [
    { countrycode: 'ALB', countrycode2: 'al', qualifiedreal: false, name: 'Albania', round: 'first', qualified: true },
    { countrycode: 'ARM', countrycode2: 'ar', qualifiedreal: true, name: 'Armenia', round: 'first', qualified: true },
    { countrycode: 'AUS', countrycode2: 'au', qualifiedreal: true, name: 'Australia', round: 'first', qualified: true },
    { countrycode: 'AUT', countrycode2: 'at', qualifiedreal: true, name: 'Austria', round: 'second', qualified: true },
    { countrycode: 'AZE', countrycode2: 'az', qualifiedreal: true, name: 'Azerbaijan', round: 'first', qualified: true },
    { countrycode: 'BEL', countrycode2: 'be', qualifiedreal: true, name: 'Belgium', round: 'first', qualified: true },
    { countrycode: 'BGR', countrycode2: 'bg', qualifiedreal: true, name: 'Bulgaria', round: 'second', qualified: true },
    { countrycode: 'BIH', countrycode2: 'bi', qualifiedreal: false, name: 'Bosnia and Herzegovina', round: 'none', qualified: false },
    { countrycode: 'BLR', countrycode2: 'by', qualifiedreal: true, name: 'Belarus', round: 'second', qualified: false },
    { countrycode: 'CHE', countrycode2: 'ch', qualifiedreal: false, name: 'Switzerland', round: 'second', qualified: true },
    { countrycode: 'CYP', countrycode2: 'cy', qualifiedreal: true, name: 'Cyprus', round: 'first', qualified: true },
    { countrycode: 'CZE', countrycode2: 'cz', qualifiedreal: false, name: 'Czech Republic', round: 'first', qualified: false },
    { countrycode: 'DEU', countrycode2: 'de', qualifiedreal: true, name: 'Germany', round: 'final', qualified: true },
    { countrycode: 'DNK', countrycode2: 'dk', qualifiedreal: true, name: 'Denmark', round: 'second', qualified: true },
    { countrycode: 'ESP', countrycode2: 'es', qualifiedreal: true, name: 'Spain', round: 'final', qualified: true },
    { countrycode: 'EST', countrycode2: 'ee', qualifiedreal: false, name: 'Estonia', round: 'second', qualified: false },
    { countrycode: 'FIN', countrycode2: 'fi', qualifiedreal: false, name: 'Finland', round: 'first', qualified: true },
    { countrycode: 'FRA', countrycode2: 'fr', qualifiedreal: true, name: 'France', round: 'final', qualified: true },
    { countrycode: 'GBR', countrycode2: 'gb', qualifiedreal: true, name: 'Great Brittain', round: 'final', qualified: true },
    { countrycode: 'GEO', countrycode2: 'ge', qualifiedreal: false, name: 'Georgia', round: 'first', qualified: false },
    { countrycode: 'GRC', countrycode2: 'gr', qualifiedreal: true, name: 'Greece', round: 'first', qualified: true },
    { countrycode: 'HUN', countrycode2: 'hu', qualifiedreal: true, name: 'Hungary', round: 'second', qualified: true },
    { countrycode: 'HRV', countrycode2: 'hr', qualifiedreal: true, name: 'Croatia', round: 'second', qualified: true },
    { countrycode: 'IRL', countrycode2: 'ie', qualifiedreal: false, name: 'Ireland', round: 'second', qualified: true },
    { countrycode: 'ISL', countrycode2: 'is', qualifiedreal: false, name: 'Iceland', round: 'first', qualified: false },
    { countrycode: 'ISR', countrycode2: 'il', qualifiedreal: true, name: 'Israel', round: 'second', qualified: true },
    { countrycode: 'ITA', countrycode2: 'it', qualifiedreal: true, name: 'Italia', round: 'final', qualified: true },
    { countrycode: 'KOS', countrycode2: 'ko', qualifiedreal: false, name: 'Kosovo', round: 'none', qualified: false },
    { countrycode: 'LTU', countrycode2: 'lt', qualifiedreal: false, name: 'Lithuania', round: 'second', qualified: false },
    { countrycode: 'LUX', countrycode2: 'lu', qualifiedreal: false, name: 'Luxembourg', round: 'none', qualified: false },
    { countrycode: 'LVA', countrycode2: 'lv', qualifiedreal: false, name: 'Latvia', round: 'first', qualified: false },
    { countrycode: 'MDA', countrycode2: 'md', qualifiedreal: true, name: 'Moldova', round: 'first', qualified: false },
    { countrycode: 'MKD', countrycode2: 'mk', qualifiedreal: false, name: 'Macedonia', round: 'second', qualified: false },
    { countrycode: 'MLT', countrycode2: 'ml', qualifiedreal: false, name: 'Malta', round: 'second', qualified: false },
    { countrycode: 'MNE', countrycode2: 'me', qualifiedreal: false, name: 'Montenegro', round: 'first', qualified: false },
    { countrycode: 'NLD', countrycode2: 'nl', qualifiedreal: true, name: 'Netherlands', round: 'second', qualified: true },
    { countrycode: 'NOR', countrycode2: 'no', qualifiedreal: true, name: 'Norway', round: 'second', qualified: false },
    { countrycode: 'POL', countrycode2: 'pl', qualifiedreal: true, name: 'Poland', round: 'first', qualified: false },
    { countrycode: 'PRT', countrycode2: 'pt', qualifiedreal: true, name: 'Portugal', round: 'final', qualified: true },
    { countrycode: 'ROU', countrycode2: 'ro', qualifiedreal: true, name: 'Romania', round: 'second', qualified: false },
    { countrycode: 'RUS', countrycode2: 'ru', qualifiedreal: false, name: 'Russia', round: 'first', qualified: false },
    { countrycode: 'SMR', countrycode2: 'sm', qualifiedreal: false, name: 'San Marino', round: 'second', qualified: false },
    { countrycode: 'SRB', countrycode2: 'rs', qualifiedreal: false, name: 'Serbia', round: 'second', qualified: true },
    { countrycode: 'SVK', countrycode2: 'sk', qualifiedreal: false, name: 'Slovakia', round: 'none', qualified: false },
    { countrycode: 'SVN', countrycode2: 'si', qualifiedreal: false, name: 'Slovenia', round: 'first', qualified: false },
    { countrycode: 'SWE', countrycode2: 'se', qualifiedreal: true, name: 'Sweden', round: 'first', qualified: true },
    { countrycode: 'UKR', countrycode2: 'ua', qualifiedreal: true, name: 'Ukraine', round: 'first', qualified: true },
    { countrycode: 'TUR', countrycode2: 'tr', qualifiedreal: false, name: 'Turkey', round: 'none', qualified: false }
];

var finalists = [];
var losers = [];
var losersReal = [];
var qualifiers = [];
var qualifiersReal = [];
var nonparticipants = [];
var participants = [];
qualification.forEach(function (element) {
    if (element.round == 'final') {
        var obj = {};
        obj.countrycode = element.countrycode;
        obj.name = element.name;
        finalists.push(obj);
    }
    if (!element.qualified && element.round != 'none') {
        losers.push(element.countrycode);
    }
    if (!element.qualifiedreal && element.round != 'none') {
        losersReal.push(element.countrycode);
    }
    if ((element.round == "first" || element.round == "second") && element.qualified) {
        var obj = {};
        obj.countrycode = element.countrycode;
        obj.name = element.name;
        qualifiers.push(obj);
    }
    if ((element.round == "first" || element.round == "second") && element.qualifiedreal) {
        var obj = {};
        obj.countrycode = element.countrycode;
        obj.name = element.name;
        qualifiersReal.push(obj);
    }
    if (element.round == "none") {
        nonparticipants.push(element.countrycode);
    }
    if (element.round != "none") {
        participants.push(element.countrycode);
    }
});

//Countries in the final
var inthefinal = finalists.concat(qualifiersReal);
inthefinal = inthefinal.sort(function (a, b) {
    var nameA = a.name;
    var nameB = b.name;
    if (nameA < nameB) {
        return -1;
    }
    if (nameA > nameB) {
        return 1;
    }
});

//Reusable gridmap
function gridMap() {
    var margin = { top: 2, right: 0, bottom: 0, left: 0 },
        width = 760,
        height = 500,
        xValue = function (d) { return d[1]; },
        yValue = function (d) { return d[2]; },
        strokecolor = '#cccccc';

    function chart(selection) {
        selection.each(function (data) {

            var svg = d3.select(this).append('svg');

            var g = svg.append("g");

            // Update the outer dimensions.
            svg.attr("width", width)
                .attr("height", height);

            var cellsize = Math.min(Math.floor((height - margin.top) / 10), Math.floor((width - margin.top) / 10));
            var tocenter = (width - 10 * cellsize) / 2;
            var g = svg.select('g').attr("transform", "translate(" + tocenter + ",2)");

            g.selectAll('rect')
                .data(data)
                .enter().append('rect')
                .attr("x", function (d) { return cellsize * d.x; })
                .attr("y", function (d) { return cellsize * d.y; })
                .attr("height", cellsize)
                .attr("width", cellsize)
                .attr("class", function (d) { return 'id-' + d.countrycode; })
                .style("fill", "#aaaaaa")
                .style("stroke", strokecolor)
                .style("stroke-width", 2);
            g.selectAll('text')
                .data(data)
                .enter().append('text')
                .attr("x", function (d) { return cellsize * (d.x + 0.5); })
                .attr("y", function (d) { return cellsize * (d.y + 0.6); })
                .style('text-anchor', 'middle')
                .style("fill", "#ffffff")
                .style('opacity', 0.5)
                .style('font-size', 10)
                .style('font-family', 'Roboto')
                .text(function (d) { return d.countrycode; })

        });
    }

    chart.margin = function (_) {
        if (!arguments.length) return margin;
        margin = _;
        return chart;
    };

    chart.width = function (_) {
        if (!arguments.length) return width;
        width = _;
        return chart;
    };

    chart.height = function (_) {
        if (!arguments.length) return height;
        height = _;
        return chart;
    };

    chart.x = function (_) {
        if (!arguments.length) return xValue;
        xValue = _;
        return chart;
    };

    chart.y = function (_) {
        if (!arguments.length) return yValue;
        yValue = _;
        return chart;
    };

    chart.strokecolor = function (_) {
        if (!arguments.length) return strokecolor;
        strokecolor = _;
        return chart;
    };


    return chart;
}

//Load data and start drawing
d3.csv('data/votes_20170512.csv', function (data) {
    d3.csv('data/peoplesvotes_20170514.csv', function (realdata) {
        d3.csv('data/overallranking.csv', function (overallrank) {
            d3.csv('data/countrylookup.csv', function (countrydata) {
                //Create lookup objects for country names and country codes
                var lookup = {};
                var countryscore = {};
                countrydata.forEach(function (element) {
                    var obj = {};
                    obj.name = element.name;
                    obj.iso2 = element.iso2;
                    lookup[element.ISO3] = obj;
                    countryscore[element.ISO3] = 0;
                });

                //Data wrangling
                //Google search data
                data.forEach(function (element) {
                    element.points = +element.points;
                })
                //data = data.filter(function (element) {
                //    return element.points != 0;
                //});
                //Real voting data
                realdata.forEach(function (element) {
                    element.points = +element.points;
                })
                //realdata = realdata.filter(function (element) {
                    //return element.points != 0;
                //});

                //Get the points from or to a country
                function getpoints(country, fromto) {
                    if (fromto == "from") {
                        var pointsFrom = data.filter(function (element) {
                            return (element.from == country && element.points != 0);
                        })
                        pointsFrom.sort(function (a, b) {
                            return b.points - a.points;
                        })
                        return pointsFrom;
                    }
                    if (fromto == "to") {
                        var pointsTo = data.filter(function (element) {
                            return (element.to == country && element.points != 0);
                        })
                        pointsTo.sort(function (a, b) {
                            return a.points - b.points;
                        })
                        return pointsTo;
                    }
                }
                function getrealpoints(country, fromto) {
                    if (fromto == "from") {
                        var pointsFrom = realdata.filter(function (element) {
                            return element.from == country && element.points != 0;
                        })
                        pointsFrom.sort(function (a, b) {
                            return b.points - a.points;
                        })
                        return pointsFrom;
                    }
                    if (fromto == "to") {
                        var pointsTo = realdata.filter(function (element) {
                            return element.to == country && element.points != 0;
                        })
                        pointsTo.sort(function (a, b) {
                            return a.points - b.points;
                        })
                        return pointsTo;
                    }
                }

                //Final ranking
                //Google search ranking
                var ranking = d3.nest()
                    .key(function (d) { return d.to; }).sortKeys(d3.ascending)
                    .rollup(function (d) { return d3.sum(d, function (d) { return d.points; }) })
                    .entries(data);

                ranking = ranking.sort(function (a, b) {
                    return b.value - a.value;
                });

                //Real votes ranking
                var rankingReal = d3.nest()
                    .key(function (d) { return d.to; }).sortKeys(d3.ascending)
                    .rollup(function (d) { return d3.sum(d, function (d) { return d.points; }) })
                    .entries(realdata);
                rankingReal = rankingReal.sort(function (a, b) {
                    return b.value - a.value;
                });
                
                var rankingrealLookup = {};
                rankingReal.forEach(function(country){
                    rankingrealLookup[country.key] = country.value;
                });
                var rankinggoogleLookup = {};
                ranking.forEach(function(country){
                    rankinggoogleLookup[country.key] = country.value;
                });

                //Connecting lines between google and real rankings
                var rankingconnect = [];
                ranking.forEach(function (rankingelement, rankingindex) {
                    var obj = {};
                    obj.countrycode = rankingelement.key;
                    obj.googlerank = rankingindex + 1;
                    //rankingReal.forEach(function (rankingrealelement, rankingrealindex) {
                    overallrank.forEach(function (rankingrealelement, rankingrealindex) {
                        if (rankingelement.key == rankingrealelement.Country) {
                            obj.realrank = rankingrealindex + 1;
                        }
                    })
                    rankingconnect.push(obj);
                });

                //On click for country select list
                $(".dropdown-menu li div").click(function () {
                    var selectedCountry = $(this).data('value');
                    showvotesfrom(selectedCountry);
                });

                function showvotesfrom(selcountrycode) {
                    //Clear all transitions going on
                    d3.selectAll("#map-three circle").interrupt();

                    //Clear previous voting
                    d3.selectAll('#map-three rect').style('stroke-width', 2);
                    d3.selectAll('#map-three rect').style('fill', qualifiersColor);
                    inthefinal.forEach(function (country) {
                        d3.selectAll("#map-three rect.id-" + country.countrycode)
                            .style("fill", finalistColor);
                    });
                    d3.selectAll('#map-three rect.nonparticipant').style('fill', '#777777')
                    d3.selectAll("#map-three circle").remove();
                    d3.selectAll("#country-list li").remove();
                    d3.selectAll("#country-list-real li").remove();

                    $('.btn.btn-default.dropdown-toggle').html(lookup[selcountrycode].name + ' <span class="caret"></span>');
                    $('.btn.btn-default.dropdown-toggle').val($(selcountrycode).data('value'));

                    var pointsToAnimate = getpoints(selcountrycode, "from");
                    var pointsToAnimateReal = getrealpoints(selcountrycode, "from");
                    
                    //Add the circles for the voting animation
                    var googlecircles = cellgroup.selectAll("circle")
                        .data(pointsToAnimate)
                        .enter().append("circle")
                        .attr("cx", (cellsizeHalf * config.grid[selcountrycode].x + cellsizeHalf * 0.5))
                        .attr("cy", (cellsizeHalf * config.grid[selcountrycode].y + cellsizeHalf * 0.5))
                        .attr("r", function (d) { return d.points; })
                        .style("fill", "none")
                        .style("stroke", "#ffffff")
                        .style("stroke-width", 2);

                    var realcircles = cellgroup.selectAll("circle.real")
                        .data(pointsToAnimateReal)
                        .enter().append("circle")
                        .attr("cx", (cellsizeHalf * config.grid[selcountrycode].x + cellsizeHalf * 0.5))
                        .attr("cy", (cellsizeHalf * config.grid[selcountrycode].y + cellsizeHalf * 0.5))
                        .attr("r", function (d) {return d.points; })
                        .style("fill", "none")
                        .style("stroke", "#000000")
                        .style("stroke-width", 2);

                    //Put the text on top, above the new circles
                    d3.selectAll("#map-three text").raise()
                        .style('fill', '#ffffff')
                        .style('opacity', 0.5);

                    //Animate the circles to the awarded countries
                    googlecircles.transition().ease(d3.easeExpInOut)
                        .delay(function (d, i) {
                            return 600 * (10 - i);
                        })
                        .duration(3000)
                        .attr("cx", function (d, i) {
                            return (cellsizeHalf * config.grid[d.to].x + cellsizeHalf * 0.5)
                        })
                        .attr("cy", function (d, i) {
                            return (cellsizeHalf * config.grid[d.to].y + cellsizeHalf * 0.5)
                        })
                        .on("end", function (d, i) {
                            d3.select("#country-list")
                                .insert('li', ':first-child')
                                .html('<div class="pull-left points" width="30px">' + d.points + '</div> <span class="flag-icon flag-icon-' + lookup[d.to].iso2 + ' flag-icon-squared"></span> ' + lookup[d.to].name);
                        });
                    
                    //Real votes animation
                    realcircles.transition().ease(d3.easeExpInOut)
                        .delay(function (d, i) {
                            return 600 * (10 - i);
                        })
                        .duration(3000)
                        .attr("cx", function (d, i) {
                            return (cellsizeHalf * config.grid[d.to].x + cellsizeHalf * 0.5)
                        })
                        .attr("cy", function (d, i) {
                            return (cellsizeHalf * config.grid[d.to].y + cellsizeHalf * 0.5)
                        })
                        .on("end", function (d, i) {
                            d3.select("#country-list-real")
                                .insert('li', ':first-child')
                                .html('<div class="pull-left points" width="30px">' + d.points + '</div> <span class="flag-icon flag-icon-' + lookup[d.to].iso2 + ' flag-icon-squared"></span> ' + lookup[d.to].name);
                        });

                    d3.select("#map-three rect.id-" + selcountrycode).raise().transition().duration(500)
                        .style("fill", "#ffffff");
                    d3.select("#map-three text.id-" + selcountrycode).raise().transition().duration(500)
                        .style("fill", "#ff5454")
                        .style('opacity', 1);
                }

                //Draw maps
                let finalistColor = "#283369";
                let losersColor = "#E8BF52";
                let qualifiersColor = "#4997D1";

                var svgOne = d3.select('#map-one').append('svg').attr('width', config.width).attr('height', config.height);
                var svgTwo = d3.select('#map-two').append('svg').attr('width', config.width).attr('height', config.height);
                var mapThreeWidth = $('#map-three').width();
                if (mapThreeWidth > 500) { mapThreeWidth = 500; }
                var svgThree = d3.select('#map-three').append('svg').attr('width', mapThreeWidth).attr('height', mapThreeWidth + 20);
                
                var slopegraphWidth = $('#slopegraph').width();
                var slopegraphSvgWidth = slopegraphWidth;
                if (slopegraphWidth > 400) {
                    slopegraphSvgWidth = 400;
                }
                var svgFive = d3.select('#slopegraph').append('svg').attr('width', slopegraphSvgWidth).attr('height', 700);

                //Grid map from config.grid, Voting section
                var cellsizeHalf = Math.floor((mapThreeWidth - 4) / 10);
                var tocenter = (mapThreeWidth - 10 * cellsizeHalf) / 2;
                var cellgroup = svgThree.append('g')
                    .attr("transform", "translate(" + (2 + tocenter) + ",2)");
                for (country in config.grid) {
                    var countrydata = config.grid[country];
                    cellgroup.append("rect")
                        .attr("x", cellsizeHalf * countrydata.x)
                        .attr("y", cellsizeHalf * countrydata.y)
                        .attr("height", cellsizeHalf)
                        .attr("width", cellsizeHalf)
                        .attr("class", function () {
                            if (country == 'RUS' || country == 'LUX' || country == 'BIH' || country == 'SVK' || country == 'TUR' || country == 'KOS') {
                                return 'nonparticipant id-' + country;
                            }
                            else { return 'id-' + country; }
                        })
                        .style("fill", qualifiersColor)
                        .style("stroke", "#ffffff")
                        .style("stroke-width", 2);
                    cellgroup.append("text")
                        .attr("x", cellsizeHalf * countrydata.x + cellsizeHalf / 2)
                        .attr("y", cellsizeHalf * countrydata.y + cellsizeHalf / 2 + 4)
                        .style("fill", "#ffffff")
                        .style("text-anchor", "middle")
                        .style("opacity", 0.5)
                        .style("font-size", 12)
                        .style("font-family", "Roboto")
                        .attr("class", function () {
                            if (country == 'RUS' || country == 'LUX' || country == 'BIH' || country == 'SVK' || country == 'TUR' || country == 'KOS') {
                                return 'nonparticipant id-' + country;
                            }
                            else { return 'id-' + country; }
                        })
                        .text(country);
                }

                //On click on country on map
                d3.selectAll('#map-three svg g rect:not(.nonparticipant), #map-three svg g text:not(.nonparticipant)').on('click', function () {
                    var clickedcountry = d3.select(this).attr('class').substring(3, 6);
                    showvotesfrom(clickedcountry);
                });

                //Color scale and opacityscale
                var z = d3.scaleSequential(d3.interpolatePlasma);
                z.domain([0, d3.max(ranking, function (d) { return d.value; })]);
                var opacityscale = d3.scaleLinear()
                    .domain([0, d3.max(ranking, function (d) { return d.value; })])
                    .range([0.2, 1]);

                svgFive.append('text')
                    .attr('x', 140)
                    .attr('y', 20)
                    .attr('text-anchor', 'middle')
                    .attr('font-size', '16px')
                    .attr('font-family', 'Roboto')
                    .text('Search');
                /*svgFive.append('text')
                    .attr('x', 240)
                    .attr('y', 20)
                    .attr('font-size', '16px')
                    .attr('text-anchor', 'middle')
                    .style('font-family', 'Roboto')
                    .text('Eurovision');*/

                var countryheight = 24;
                //Connecting lines
                /*var connections = svgFive.selectAll('line.connection')
                    .data(rankingconnect)
                    .enter().append('line')
                    .attr('class', function (d) { return 'connection id-' + d.key; })
                    .attr('x1', 150)
                    .attr('x2', 230)
                    .attr('y1', function (d) { return countryheight*d.googlerank + 18; })
                    .attr('y2', function (d) { return countryheight*d.realrank + 18; })
                    //.style('stroke', '#eeeeee')
                    .style('stroke', function(d){
                        return '#eeeeee';
                    })
                    .style('stroke-width', 2);*/

                //Left part, search results
                svgFive.selectAll('image')
                    //.data(reverseranking)
                    .data(ranking)
                    .enter().append('image')
                    .attr("xlink:href", function (d) { return 'flags/round/svg/' + d.key + '.svg' })
                    .attr('x', 130)
                    .attr('y', function (d, i) { return 30 + countryheight * i; })
                    .attr('class', function (d) { return 'id-' + d.key; })
                    .attr('width', countryheight - 2)
                    .attr('height', countryheight - 2);
                var labels = svgFive.selectAll('text.countrylabel')
                    .data(ranking)
                    .enter().append('text')
                    .attr('x', 0)
                    .attr('y', function (d, i) { return countryheight * i + 46; })
                    .style('font-family', 'Roboto')
                    .style('font-size', '14px')
                    .attr('class', function (d) { return 'countrylabel id-' + d.key; })
                    .attr('id', function (d) { return d.key; })
                    .style('fill', '#000037')
                    //.style('opacity', function (d) { return opacityscale(d.value); })
                    .html(function (d, i) { return (i + 1) + '. ' + lookup[d.key].name /*+ ': <tspan class="score id-' + d.key + '">' + d.value + '</tspan>'*/; });

                //Right part, real scores
                /*svgFive.selectAll('image.real')
                    //.data(rankingReal)
                    .data(overallrank)
                    .enter().append('image')
                    .attr('xlink:href', function (d) { return 'flags/round/svg/' + d.Country + '.svg' })
                    //.attr('xlink:href', 'img/questionmark-circle.svg')
                    .attr('x', 230)
                    .attr('y', function (d, i) { return 30 + countryheight * i; })
                    .attr('class', function (d) { return 'id-' + d.Country; })
                    .attr('width', countryheight - 2)
                    .attr('height', countryheight - 2);*/
                
                //If screen is big enough, draw labels on the right
                /*if (slopegraphWidth > 400){
                var labelsReal = svgFive.selectAll('text.countrylabel.real')
                    .data(overallrank)
                    .enter().append('text')
                    .attr('x', 380)
                    //.attr('y', function (d) { return (y(d.value) + 14); })
                    .attr('y', function(d,i) { return countryheight*i + 46; })
                    .style('font-family', 'Roboto')
                    .style('font-size', '14px')
                    .style('text-anchor', 'end')
                    .attr('class', function (d) { return 'countrylabel id-' + d.Country; })
                    .attr('id', function (d) { return d.Country; })
                    .style('fill', '#000037')
                    .style('opacity', function(d) { return opacityscale(d.value); })
                    .html(function (d, i) { return (i + 1) + '. ' + lookup[d.Country].name ; });
        }*/

                //sort config.grid first on x, than on y for the shuffling rectangle
                var countrygrid = [];
                var countrygridAnim = [];
                for (country in config.grid) {
                    var countrydata = config.grid[country];
                    var obj = {};

                    obj.countrycode = country;
                    obj.x = countrydata.x;
                    obj.y = countrydata.y;

                    countrygrid.push(obj);
                    //Filter out non-participants for voting animation
                    if (obj.countrycode != 'KOS' && obj.countrycode != 'LUX' && obj.countrycode != 'BIH' && obj.countrycode != 'TUR' && obj.countrycode != 'SVK') {
                        countrygridAnim.push(obj);
                    }
                }
                countrygrid.sort(function (a, b) {
                    var x = a.y - b.y;
                    return x == 0 ? a.x - b.x : x;
                });

                $('#real-search-switch-four').change(function () {
                    var checked = this.checked;
                    d3.select("#smallmultiples").transition().duration(500)
                        .style("opacity", 0)
                        .on("end", function () {
                            d3.select("#smallmultiples").html("");
                            if (checked) {
                                htmlforsmallmult("real");
                                d3.select("#smallmultiples").transition().duration(500).style("opacity", 1);
                            }
                            else {
                                htmlforsmallmult("google");
                                d3.select("#smallmultiples").transition().duration(500).style("opacity", 1);
                            }
                        });
                });

                //Small multiple maps
                function htmlforsmallmult(sorting) {
                    var torank;
                    if (sorting == "google") {
                        torank = ranking;
                    }
                    if (sorting == "real") {
                        torank = rankingReal;
                    }
                    torank.forEach(function (element, index) {
                        //Add a row for each country
                        var smallmult = d3.select("div#smallmultiples");
                        smallmult.append('div')
                            .attr('class', 'row row-' + element.key);
                        var countryrow = d3.select('.row.row-' + element.key);
                        countryrow.append('h3').html((index + 1) + '. ' + '<span class="flag-icon flag-icon-' + lookup[element.key].iso2 + ' flag-icon-squared"></span> ' + lookup[element.key].name);

                        //Add a map for the Google searches
                        var smallmultGoogle = countryrow.append('div')
                            //.attr('class', 'col-md-6 col-xs-12')
                            .attr('class', 'col-md-12 col-xs-12')
                            .append('div');
                        smallmultGoogle.append('h4').text('Searches: ' + rankinggoogleLookup[element.key] + ' points');
                        smallmultGoogle.append('div')
                            .attr('class', 'smallmultiple google ' + element.key);

                        //Add a map for the real votes
                        /*var smallmultReal = countryrow.append('div')
                            .attr('class', 'col-md-6 col-xs-12')
                            .append('div');
                        smallmultReal.append('h4').text('Televoting: ' + rankingrealLookup[element.key] + ' points');
                        //smallmultReal.append('h4').text('Televoting');
                        smallmultReal.append('div')
                            .attr('class', 'smallmultiple real ' + element.key);*/
                    })
                    var map = gridMap()
                        .x(function (d) { return +d.x; })
                        .y(function (d) { return +d.y; });
                    var smMapWidth = d3.select(".smallmultiple").node().getBoundingClientRect().width;
                    if (smMapWidth > 300) {
                        smMapWidth = 300;
                    }

                    d3.selectAll(".smallmultiple")
                        .datum(countrygrid)
                        .call(map
                            .width(smMapWidth)
                            .height(smMapWidth)
                            .strokecolor("#ffffff"));

                    //Color small multiples
                    var smColorScale = d3.scaleSequential(d3.interpolateInferno)
                        .domain([14, 0]);

                    //Color the legend
                    d3.selectAll('.legend-item')
                        .style('background-color', function (d) {
                            return smColorScale(d3.select(this).text());
                        });

                    inthefinal.forEach(function (element) {
                        //highlight the country
                        d3.selectAll('.smallmultiple.' + element.countrycode + ' rect.id-' + element.countrycode)
                            .raise()
                            .style('fill', '#000000')
                            .style('stroke', '#ffffff')
                            .style('stroke-width', '6px');

                        var googletoscores = getpoints(element.countrycode, "to");
                        //d3.selectAll('.smallmultiple.google rect').style('fill-opacity', 0.15);
                        //d3.selectAll('.smallmultiple.google rect').style('stroke-opacity', 0.4);
                        googletoscores.forEach(function (fromelement) {
                            d3.select(".smallmultiple.google." + element.countrycode + " rect.id-" + fromelement.from)
                                /*.style('opacity',1)
                                .attr('width', fromelement.points/12*29)
                                .attr('height', fromelement.points/12*29)
                                .attr('x', function(){
                                    var currentx = parseFloat(d3.select(this).attr('x'));
                                    var newwidth = fromelement.points/12*29;
                                    return currentx + parseFloat(cellsizeHalf/2) - newwidth/2 ; })
                                .attr('y', function(){
                                    var currenty = parseFloat(d3.select(this).attr('y'));
                                    var newheight = fromelement.points/12*29;
                                    return currenty + parseFloat(cellsizeHalf/2) - newheight/2 ; })*/
                                .style('fill', smColorScale(fromelement.points));
                        });
                        var realtoscores = getrealpoints(element.countrycode, "to");
                        realtoscores.forEach(function (fromelement) {
                            d3.select(".smallmultiple.real." + element.countrycode + " rect.id-" + fromelement.from)
                                .style('fill', smColorScale(fromelement.points));
                        });
                    });
                }
                htmlforsmallmult("google");

                var gr = new geo2rect.draw();

                d3.json('./data/eurovis-countries-simplified-sanmarino.geojson', function (err, data) {

                    //Map 1
                    var projection = d3.geoMercator()
                        .center([20, 51])
                        .scale(mapwidth * 0.65)
                        .translate([config.width / 2, config.height / 2]);

                    var path = d3.geoPath()
                        .projection(projection);

                    var features = data.features;
                    svgOne.selectAll('path')
                        .data(features)
                        .enter().append('path')
                        .attr('class', function (d) { return 'id-' + d.properties.ISO_A3; })
                        .attr('d', path);

                    //Map 1 labels
                    var mapLabels = {
                        "FRA": [2.456, 47.155],
                        "ESP": [-3.970, 40.328],
                        "DEU": [10.406, 51.186],
                        "GBR": [-1.961, 52.441],
                        "UKR": [33.028, 48.270],
                        "TUR": [35.360, 38.873],
                        "POL": [19.284, 51.987],
                        "RUS": [37.531, 55.714],
                        "ITA": [9.884, 44.866],
                        "BLR": [27.882, 53.209],
                        "ROU": [24.671, 45.815]
                    }

                    for (country in mapLabels) {
                        var labeltext = d3.select('#map-one svg').append('text')
                            .attr('x', projection(mapLabels[country])[0])
                            .attr('y', projection(mapLabels[country])[1])
                            .attr('class', 'map-one-label')
                            .text(lookup[country].name);
                    }
                    //Lisbon
                    var lisboncoord = [-9.150, 38.703];
                    var lisbonLabel = [-9.150, 38.703];
                    d3.select('#map-one svg').append('rect')
                        .attr('x', projection(lisboncoord)[0])
                        .attr('y', projection(lisboncoord)[1])
                        .attr('height', 8)
                        .attr('width', 8)
                        .style('stroke', '#333333')
                        .style('fill', '#ffffff')
                        .style('stroke-width', 2);
                    d3.select('#map-one svg').append('text')
                        .attr('x', projection(lisbonLabel)[0])
                        .attr('y', projection(lisbonLabel)[1])
                        .attr('dx', -52)
                        .attr('dy', 14)
                        .attr('class', 'map-one-label')
                        .text('LISBON')
                        .style('opacity', 1)
                        .style('text-anchor', 'start');

                    //Map 2
                    var geojson = geo2rect.compute(data);

                    gr.config = config;
                    gr.data = geojson;
                    gr.svg = svgTwo.append('g');
                    gr.toggle();
                    gr.draw();
                    setTimeout(function () {
                        for (country in config.grid) {
                            var bbox = d3.selectAll('#map-two svg g path.id-' + country).node().getBBox();
                            var translate = d3.select('#map-two svg g path.id-' + country).node().getCTM();
                            var labelx = bbox.x + bbox.width / 2 + translate.e;
                            var labely = bbox.y + bbox.height / 2 + translate.f;
                            var labeltext = d3.select('#map-two svg').append('text')
                                .attr('x', labelx)
                                .attr('y', (labely + 4))
                                .attr('class', 'map-two-label')
                                .text(country);
                        }
                    }, 500);

                    gr.config.duration = 3000;

                    //Color maps
                    finalists.forEach(function (country) {
                        d3.selectAll("#map-one svg .id-" + country.countrycode + ", #map-two svg .id-" + country.countrycode)
                            .style("fill", finalistColor);
                    });
                    //Initial colors for first map
                    losers.forEach(function (country) {
                        d3.selectAll("#map-one svg .id-" + country)
                            .style("fill", losersColor);
                    });                    
                    qualifiers.forEach(function (country) {
                        d3.selectAll("#map-one svg .id-" + country.countrycode + ", #map-two svg .id-" + country.countrycode)
                            .style("fill", qualifiersColor);
                    });
                    //Second map uses real colors
                    qualifiersReal.forEach(function (country) {
                            d3.selectAll("#map-two svg .id-" + country.countrycode)
                                .style("fill", qualifiersColor);
                        });
                    losersReal.forEach(function (country) {
                            d3.selectAll("#map-two svg .id-" + country)
                                .style("fill", losersColor);
                            });

                    inthefinal.forEach(function (country) {
                        d3.selectAll("#map-three rect.id-" + country.countrycode)
                            .style("fill", finalistColor);
                    })
                    nonparticipants.forEach(function (countrycode) {
                        d3.selectAll("#map-one svg path.id-" + countrycode + ", #map-two svg path.id-" + countrycode + ", #map-three svg rect.id-" + countrycode)
                            .style("fill", "#777777");
                    });
                });
                //
                $('#real-search-switch-one').change(function () {
                    var thisswitch = $(this);
                    thisswitch.prop('disabled', true);
                    setTimeout(function () {
                                thisswitch.prop('disabled', false);
                            }, 1000);

                    if (!this.checked) {
                        qualifiers.forEach(function (country) {
                            d3.selectAll("#map-one svg .id-" + country.countrycode).transition().duration(1000)
                                .style("fill", "#ff5454");
                        });
                        losers.forEach(function (countrycode) {
                            d3.selectAll("#map-one svg .id-" + countrycode).transition().duration(1000)
                                .style("fill", "#7e7eb4");
                        });
                    }
                    if (this.checked) {
                        qualifiersReal.forEach(function (country) {
                            d3.selectAll("#map-one svg .id-" + country.countrycode).transition().duration(1000)
                                .style("fill", "#ff5454");
                        });
                        losersReal.forEach(function (countrycode) {
                            d3.selectAll("#map-one svg .id-" + countrycode).transition().duration(1000)
                                .style("fill", "#7e7eb4");
                        });
                    }
                });
                
                //Toggle squarify
                $('#mapswitch').change(function () {
                    gr.toggle();
                    gr.draw();
                    var thisswitch = $(this);
                    thisswitch.prop('disabled', true);
                    setTimeout(function () {
                                thisswitch.prop('disabled', false);
                            }, 3500);

                    if (!this.checked) {
                            d3.selectAll('#map-two text')
                                .transition().duration(3000)
                                .style('opacity', 0.5);
                    }
                    if (this.checked) {
                        d3.selectAll('#map-two text')
                            .transition().duration(3000)
                            .style('opacity', 0);
                    }
                });
            });
        });
    });
});
})