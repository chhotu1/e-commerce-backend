
var Country = require("./../models/Country");
var State = require("./../models/State");
var City = require("./../models/City");

var countries = require('../staticData/countries');
var states = require('../staticData/states');
var cities = require('../staticData/cities');

var async = require("async");
const Response = require('./../utils/Response')

exports.sedeer = {
    country: async function (req, res) {
        async
            .each(countries, function iteratee(country, next) {
                var cn = new Country({ _id: country.id, sortname: country.sortname, name: country.name })

                cn.save(function (err, res) {
                    next();
                })
            }, function () {
                
                console.log("================= All Countries loaded ===================");
                let result = { message: "All Countries loaded" };
                return res.json(Response.Response(result));
            })

    },
    state: async function (req, res) {
        var countries = await Country.find();

        async.each(countries, function iteratee(country, nextCountry) {

            console.log("==========Started " + country.name + "==============")

            async.each(states, function iteratee(state, next) {

                if (state.country_id == (country.id + '')) {
                    var st = new State({ _id: state.id, name: state.name, country: country })

                    st.save(function (err, res) {
                        country
                            .states
                            .push(st)
                        country.save(function (er, resp) {
                            next()
                        })
                    })

                } else {
                    next();
                }

            }, function () {
                console.log("All States Done")
                console.log("========== Ended " + country.name + "==============")
                let result = { message: "All States Done",status:true };
                return res.json(Response.Response(result));
            })

        }, function () {
            console.log("All Countries Done")
        })

    },
    city: async function (req, res) {
        var states = await State.find()

        async.each(states, function iteratee(state, nextState) {

            console.log("==========Started " + state.name + "==============")

            async.each(cities, function iteratee(city, next) {

                if (city.state_id == (state.id + '')) {
                    var ct = new City({ _id: city.id, name: city.name, state: state })

                    ct.save(function (err, res) {
                        state
                            .cities
                            .push(ct)
                        state.save(function (er, resp) {
                            next()
                        })
                    })

                } else {
                    next();
                }

            }, function () {
                console.log("All Cities Done")
                console.log("========== Ended " + state.name + "==============")
                let result = { message: "All Cities Done",status:true };
                return res.json(Response.Response(result));
            })

        }, function () {
            console.log("All States Done")
        })

    },
};
